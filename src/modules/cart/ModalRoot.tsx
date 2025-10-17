import AuthPage from '@auth/AuthPage'
import { BasketPage } from '@cart/BasketPage'
import { OrderSuccessModal } from '@modules/order/modalWindows/OrderSuccessModal'
import { OrderPage } from '@modules/order/OrderPage'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthStore } from '~/store/useAuth'
import { useModalStore } from '~/store/useModalStore'

export function ModalRoot() {
  const { current, close } = useModalStore()
  const { userData } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    if (current === 'auth' && userData) {
      close()
    }
  }, [current, userData, close])

  useEffect(() => {
    const policyPaths = ['/privacyPolicy', '/userAgreement']

    if (current && policyPaths.includes(location.pathname)) {
      close()
    }
  }, [location.pathname])

  switch (current) {
    case 'basket':
      return <BasketPage onClose={close} isOpen={true} />
    case 'auth':
      return <AuthPage isOpen={true} onClose={close} />
    case 'order':
      return <OrderPage isOpen={true} onClose={close} />
    case 'order-success':
      return <OrderSuccessModal onClose={close} />
    default:
      return null
  }
}
