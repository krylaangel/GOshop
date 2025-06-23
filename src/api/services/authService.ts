import type { ApiResponse, AuthCredentials, AuthResponse, ForgotPassword, RegisterUser, ResetPassword, UserProfile } from '../types'
import { handleResponse } from '.'

export const authService = {
  register: async (userData: RegisterUser): Promise<ApiResponse<AuthResponse>> => {
    return handleResponse<AuthResponse>(
      '/auth/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      },
    )
  },
  login: async (credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> => {
    return handleResponse<AuthResponse>(
      '/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      },
    )
  },
  forgotPassword: async (emailData: ForgotPassword): Promise<ApiResponse<void>> => {
    return handleResponse<void>(
      '/auth/forgotpassword',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: emailData,
      },
    )
  },
  resetPassword: async (resetData: ResetPassword): Promise<ApiResponse<void>> => {
    return handleResponse<void>(
      '/auth/resetpassword',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: resetData,
      },
    )
  },
  me: async (userId: string, userToken: string): Promise<ApiResponse<UserProfile>> => {
    return handleResponse<UserProfile>(
      `/auth/me/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
  },
  getUserById: async (userId: string): Promise<ApiResponse<UserProfile>> => {
    return handleResponse<UserProfile>(
      `/auth/GetById/${userId}`,
      {
        method: 'GET',
      },
    )
  },
  logout: async (userToken: string): Promise<ApiResponse<void>> => {
    return handleResponse<void>(
      '/auth/logout',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
  },
}
