import getImageURL from '@shared/utils/imageUtils'
import { useCallback, useEffect, useReducer } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'
import AuthContainer from './components/AuthContainer'
import EmailSent from './components/EmailSent'
import LoginForm from './components/LoginForm'
import PasswordRecoveryForm from './components/PasswordRecoveryForm'
import RegisterForm from './components/RegisterForm'

type AuthState = 'login' | 'register' | 'recovery' | 'emailSent'

function AuthPage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [authState, setAuthState] = useReducer((_, newState: AuthState) => newState, 'login')

  const handleNavigation = useCallback((state: AuthState) => setAuthState(state), [])
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen)
    return null
  return (
    <div className="fixed inset-0 z-50  bg-black/70 h-full w-full flex-center flex-col ">
      <div
        className="relative  overflow-y-auto w-full sm:w-[500px] scrollbar-hide"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.1), rgba(2, 0, 66, 0.3)),
            url(${getImageURL('aut-img.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute right-3 top-3 p-1 md:p-3">
          <button onClick={onClose} className="cursor-pointer h-8 w-8 text-[var(--hoverBorder)]">
            <svg className="w-5 h-5 md:w-6 md:h-6">
              <use href={`${Icons}#header_burger-close`} />
            </svg>
          </button>
        </div>
        <AuthContainer>
          {authState === 'emailSent' && <EmailSent onNavigate={() => handleNavigation('login')} />}
          {authState === 'recovery' && <PasswordRecoveryForm onNavigate={handleNavigation} />}
          {authState === 'register' && <RegisterForm onNavigate={handleNavigation} />}
          {authState === 'login' && <LoginForm onNavigate={handleNavigation} />}
        </AuthContainer>
      </div>
    </div>
  )
}

export default AuthPage
