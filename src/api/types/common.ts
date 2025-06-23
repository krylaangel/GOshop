import type { UUID } from '.'

export interface GuidResult {
  data: string
  isError: boolean
  errorMessage: string | null
}

export interface ApiResponse<T> {
  data: T
  isError: boolean
  errorMessage: string
  status?: number
  errorCode?: string
}

export interface ServerApiError {
  errorCode?: string
  message?: string
}

export interface Brand {
  id: UUID
  name: string
  description: string
  logoUrl: string
}
export interface Category {
  id: UUID
  name: string
  description: string
  parentId?: string | null
}
