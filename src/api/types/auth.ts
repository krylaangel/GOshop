import type { UUID } from '.'

export interface RegisterUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface ForgotPassword {
  email: string
}

export interface ResetPassword {
  token: string
  newPassword: string
}

export interface AuthResponse {
  id: UUID
  token: string
}

export interface User {
  id: UUID
  token: string
}

export interface UserProfile {
  id: UUID
  email: string
  firstName?: string
  lastName?: string
  createdAt?: string
}

export interface UserData extends UserProfile {}
