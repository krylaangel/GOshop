import type { JSX } from 'react'
import { UserProfileSkeleton } from '@shared/skeleton/UserProfileSkeleton'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '~/store/useAuth'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading)
    return <UserProfileSkeleton />
  if (!isAuthenticated)
    return <Navigate to="/auth" replace />
  return children
}
