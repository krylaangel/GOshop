import type { User, UserData } from '@api/types'
import { authService } from '@api/services/authService'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  userData: UserData | null
  setUserData: (data: Partial<UserData>) => void
  isLoading: boolean
  isAuthenticated: boolean
  checkAuth: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string) => Promise<void>
  signOut: () => Promise<void>
  passwordRecovery: (email: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  isLoading: true,
  isAuthenticated: false,
  setUserData: (data: Partial<Omit<UserData, 'id'>>) => set(state => ({
    userData: { ...state.userData!, ...data },
  })),
  checkAuth: async () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
    if (!storedUser?.token) {
      set({ user: null, userData: null, isAuthenticated: false })
      return
    }

    set({ isLoading: true })
    try {
      const response = await authService.me(storedUser.id, storedUser.token)
      if (response.isError)
        throw new Error(response.errorMessage || 'Auth check failed')

      set({
        user: { id: response.data.id, token: storedUser.token },
        userData: {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          createdAt: response.data.createdAt,
          phoneNumber: response.data.phoneNumber,
        },
        isAuthenticated: true,
        isLoading: false,
      })
    }
    catch (err) {
      console.error('Auth check failed:', err)
      localStorage.removeItem('user')
      set({ user: null, userData: null, isAuthenticated: false, isLoading: false })
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true })
    try {
      const response = await authService.login({ email, password })
      if (response.isError)
        throw new Error(response.errorMessage || 'Login failed')

      const user = { id: response.data.id, token: response.data.token }
      localStorage.setItem('user', JSON.stringify(user))

      await get().checkAuth()
    }
    catch (err: any) {
      throw new Error(err.message || 'Invalid credentials')
    }
    finally {
      set({ isLoading: false })
    }
  },

  signUp: async (email, password, firstName, lastName, phoneNumber) => {
    set({ isLoading: true })
    try {
      const response = await authService.register({ email, password, firstName, lastName, phoneNumber })
      if (response.isError)
        throw new Error(response.errorMessage || 'Registration failed')

      const user = { id: response.data.id, token: response.data.token }
      localStorage.setItem('user', JSON.stringify(user))

      await get().checkAuth()
    }
    catch (err: any) {
      throw new Error(err.message || 'Failed to create account')
    }
    finally {
      set({ isLoading: false })
    }
  },

  signOut: async () => {
    try {
      const { user } = get()
      if (user?.token) {
        await authService.logout(user.token).catch(() => {})
      }
    }
    finally {
      localStorage.removeItem('user')
      set({ user: null, userData: null, isAuthenticated: false })
    }
  },

  passwordRecovery: async (email: string) => {
    try {
      const response = await authService.forgotPassword({ email })
      if (response.isError)
        throw new Error(response.errorMessage || 'Password recovery failed')
    }
    catch (err: any) {
      throw new Error(err.message || 'Failed to send recovery email')
    }
  },
}))
