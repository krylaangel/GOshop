import { useCallback, useReducer } from 'react'
import AuthContainer from './components/AuthContainer'
import EmailSent from './components/EmailSent'
import LoginForm from './components/LoginForm'
import PasswordRecoveryForm from './components/PasswordRecoveryForm'
import RegisterForm from './components/RegisterForm'

type AuthState = 'login' | 'register' | 'recovery' | 'emailSent'

function AuthPage() {
  const [authState, setAuthState] = useReducer((_, newState: AuthState) => newState, 'login')

  const handleNavigation = useCallback((state: AuthState) => setAuthState(state), [])

  return (
    <AuthContainer>
      {authState === 'emailSent' && <EmailSent onNavigate={() => handleNavigation('login')} />}
      {authState === 'recovery' && <PasswordRecoveryForm onNavigate={handleNavigation} />}
      {authState === 'register' && <RegisterForm onNavigate={handleNavigation} />}
      {authState === 'login' && <LoginForm onNavigate={handleNavigation} />}
    </AuthContainer>
  )
}

export default AuthPage
