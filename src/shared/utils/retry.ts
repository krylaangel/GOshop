import { BASE_RETRY_DELAY, MAX_RETRIES, RETRYABLE_ERRORS } from '@shared/constants/errors'

export interface RetryError {
  status?: number
  errorCode?: string
  message?: string
}

export interface ApiErrorResponse {
  isError: true
  errorCode?: string
  errorMessage?: string
}

function isApiErrorResponse(result: any): result is ApiErrorResponse {
  return (
    result
    && typeof result === 'object'
    && 'isError' in result
    && result.isError === true
  )
}

interface RetryOptions {
  maxRetries?: number
  baseDelayMs?: number
  jitterMs?: number
  shouldRetry?: (error: RetryError) => boolean
  onRetry?: (attempt: number, delay: number, error: RetryError) => void
  signal?: AbortSignal
  logger?: (message: string, meta: Record<string, any>) => void
}

function defaultShouldRetry(error: RetryError): boolean {
  if (error.message?.includes('Failed to fetch')) {
    return RETRYABLE_ERRORS.includes('NETWORK_ERROR')
  }
  return (
    (error.status && RETRYABLE_ERRORS.includes(error.status))
    || (error.errorCode && RETRYABLE_ERRORS.includes(error.errorCode))
    || false
  )
}

function defaultLogger(message: string, meta: Record<string, any>) {
  console.warn(`[Retry] ${message}`, meta)
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = MAX_RETRIES,
    baseDelayMs = BASE_RETRY_DELAY,
    jitterMs = 100,
    shouldRetry = defaultShouldRetry,
    onRetry,
    signal,
    logger = defaultLogger,
  } = options

  let lastError: RetryError | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (signal?.aborted) {
      const abortError: RetryError = { message: 'Retry aborted' }
      logger('Retry aborted by signal', { attempt, reason: signal.reason })
      throw abortError
    }

    try {
      const result = await fn()
      if (isApiErrorResponse(result)) {
        const error: RetryError = {
          errorCode: result.errorCode,
          message: result.errorMessage || 'API error response',
        }
        throw error
      }
      return result
    }
    catch (error: any) {
      lastError = {
        status: error.status,
        errorCode: error.errorCode,
        message: error.message || String(error),
      }

      logger(`Attempt ${attempt} failed`, {
        error: lastError,
        function: fn.name || 'anonymous',
        attempt,
        maxRetries,
      })

      if (!shouldRetry(lastError) || attempt === maxRetries) {
        throw lastError
      }

      const backoff = baseDelayMs * 2 ** (attempt - 1)
      const jitter = Math.random() * jitterMs
      const delay = backoff + jitter

      onRetry?.(attempt, delay, lastError)

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay)
        signal?.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new Error('Retry aborted during delay'))
        }, { once: true })
      })
    }
  }

  throw lastError || new Error('Retry failed without error')
}
