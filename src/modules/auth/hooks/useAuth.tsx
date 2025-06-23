import type { User, UserData } from '@api/types'
import { authService } from '@api/services/authService'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextType {
  user: User | null
  userData: UserData | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, surname: string) => Promise<void>
  signOut: () => Promise<void>
  passwordRecovery: (email: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null')

    if (!storedUser || !storedUser.token) {
      setUser(null)
      setUserData(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.me(storedUser.id, storedUser.token)

      if (response.isError) {
        throw new Error(response.errorMessage || 'Failed to fetch user data')
      }

      setUser({ id: response.data.id, token: storedUser.token })
      setUserData({
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        createdAt: response.data.createdAt,
      })
      console.warn('User data updated:', { user: { id: response.data.id, token: storedUser.token }, userData: response.data })
    }
    catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
      setUserData(null)
      localStorage.removeItem('user')
    }
    finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.warn('Attempting to sign in with email:', email)
      const response = await authService.login({ email, password })
      console.warn('Sign in response:', response)
      if (response.isError) {
        throw new Error(response.errorMessage || 'Login failed')
      }

      const user = { id: response.data.id, token: response.data.token }
      setUser(user)
      await localStorage.setItem('user', JSON.stringify(user))
      await checkAuth()
    }
    catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.message || 'Invalid credentials')
    }
  }, [checkAuth])

  const signUp = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await authService.register({ firstName, lastName, email, password })
      if (response.isError) {
        throw new Error(response.errorMessage || 'Registration failed')
      }

      console.warn('User registered successfully:', response.data)
      const user = { id: response.data.id, token: response.data.token }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      console.warn('localStorage after signUp:', JSON.parse(localStorage.getItem('user') || 'null'))
      await checkAuth()
    }
    catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(error.message || 'Failed to create account')
    }
  }, [checkAuth])

  const signOut = useCallback(async () => {
    try {
      if (!user || !user.token) {
        console.warn('No user or token, clearing state')
        setUser(null)
        setUserData(null)
        localStorage.removeItem('user')
        return
      }
      const response = await authService.logout(user.token)
      if (response.isError) {
        throw new Error(response.errorMessage || 'Logout failed')
      }
      console.warn('User logged out successfully')
    }
    catch (error) {
      console.error('Logout error:', error)
    }
    finally {
      setUser(null)
      setUserData(null)
      localStorage.removeItem('user')
    }
  }, [user])

  const passwordRecovery = useCallback(async (email: string) => {
    try {
      const response = await authService.forgotPassword({ email })
      if (response.isError) {
        throw new Error(response.errorMessage || 'Password recovery failed')
      }
      console.warn('Password recovery email sent')
    }
    catch (error: any) {
      console.error('Password recovery error:', error)
      throw new Error(error.message || 'Failed to send recovery email')
    }
  }, [])

  const value = useMemo(
    () => ({ userData, user, signIn, signUp, signOut, passwordRecovery, isLoading }),
    [user, userData, signIn, signUp, signOut, passwordRecovery, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
