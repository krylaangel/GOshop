import type { ApiResponse, ServerApiError } from '../types'
import type { RetryError } from '~/shared/utils/retry'
import { ERROR_MESSAGES } from '~/shared/constants/errors'
import { retry } from '~/shared/utils/retry'
import { API_CONFIG } from '../config'

class ApiError extends Error implements RetryError {
  status?: number
  errorCode?: string
  response?: Response

  constructor(message: string, options?: { status?: number, response?: Response, errorCode?: string }) {
    super(message)
    this.name = 'ApiError'
    this.status = options?.status
    this.response = options?.response
    this.errorCode = options?.errorCode
  }
}

function isApiErrorWithResponse(error: unknown): error is ApiError & { response: Response } {
  return error instanceof ApiError && !!error.response
}

function isRetryError(error: unknown): error is RetryError {
  return (
    error != null
    && typeof error === 'object'
    && ('status' in error || 'errorCode' in error || 'message' in error)
  )
}

async function resolveErrorDetails(
  error: RetryError,
): Promise<{ errorCode: string, errorMessage: string, status: number }> {
  const status = error.status ?? 0
  let errorCode = error.errorCode ?? ''
  let errorMessage = ERROR_MESSAGES.DEFAULT

  if (error.message?.includes('Failed to fetch') && error.errorCode === 'NETWORK_ERROR') {
    return { errorCode: 'NETWORK_ERROR', errorMessage: ERROR_MESSAGES.NETWORK_ERROR, status }
  }

  if (isApiErrorWithResponse(error)) {
    try {
      const apiError = await error.response.json() as ServerApiError
      errorCode = apiError.errorCode ?? ''
      errorMessage
        = (errorCode && ERROR_MESSAGES[errorCode])
          ?? ERROR_MESSAGES[status.toString()]
          ?? apiError.message
          ?? ERROR_MESSAGES.DEFAULT
    }
    catch {
      errorMessage = ERROR_MESSAGES[status.toString()] ?? ERROR_MESSAGES.DEFAULT
    }
    return { errorCode, errorMessage, status }
  }

  if (error.errorCode) {
    const errorMessage = ERROR_MESSAGES[error.errorCode] ?? ERROR_MESSAGES.DEFAULT
    return { errorCode, errorMessage, status }
  }

  return { errorCode, errorMessage, status }
}

export async function handleResponse<T>(
  url: string,
  options: {
    signal?: AbortSignal
    maxRetries?: number
    method?: string
    mode?: RequestMode
    headers?: HeadersInit
    body?: BodyInit | object
  } = {
    method: 'GET',
    mode: 'cors',
    headers: API_CONFIG.HEADERS,
    maxRetries: 3,
  },
): Promise<ApiResponse<T>> {
  try {
    const response = await retry(
      async () => {
        const body
          = options.body && typeof options.body === 'object'
            ? JSON.stringify(options.body)
            : options.body

        const res = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
          method: options.method,
          headers: options.headers,
          body,
          mode: options.mode,
          signal: options.signal,
        })
        if (!res.ok) {
          throw new ApiError(`HTTP ${res.status}`, { status: res.status, response: res })
        }
        return res
      },
      {
        signal: options.signal,
        maxRetries: options.maxRetries,
        shouldRetry: error =>
          (error.status && [429, 503].includes(error.status))
          || (error.message?.includes('Failed to fetch') && error.errorCode === 'NETWORK_ERROR')
          || false,
        onRetry: (attempt, delay, error) => {
          console.warn(`Retrying API call (attempt ${attempt}) after ${delay}ms due to:`, error)
        },
      },
    )

    const responseJson = await response.json()
    if (responseJson.error) {
      throw new ApiError(responseJson.error.message, {
        status: response.status,
        response,
        errorCode: responseJson.error.code,
      })
    }
    else {
      const data = responseJson.data as T || responseJson as T
      return {
        isError: false,
        data,
        errorMessage: '',
        status: response.status,
      }
    }
  }
  catch (error: unknown) {
    const defaultResponse: ApiResponse<T> = {
      isError: true,
      data: null as T,
      errorMessage: ERROR_MESSAGES.DEFAULT,
      status: 0,
      errorCode: '',
    }

    if (!isRetryError(error)) {
      console.error(`API Error: ${defaultResponse.errorMessage}`, { error })
      return defaultResponse
    }

    const { errorCode, errorMessage, status } = await resolveErrorDetails(error)
    console.error(`API Error: ${errorMessage}`, { status, errorCode, error })
    return {
      isError: true,
      data: null as T,
      errorMessage,
      status,
      errorCode,
    }
  }
}
