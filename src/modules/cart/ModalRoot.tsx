import AuthPage from '@auth/AuthPage'
import { BasketPage } from '@cart/BasketPage'
import { OrderSuccessModal } from '@modules/order/modalWindows/OrderSuccessModal'
import { OrderPage } from '@modules/order/OrderPage'
import { useEffect } from 'react'
import { useAuthStore } from '~/store/useAuth'
import { useModalStore } from '~/store/useModalStore'

export function ModalRoot() {
  const { current, close } = useModalStore()
  const { userData } = useAuthStore()

  useEffect(() => {
    if (current === 'auth' && userData) {
      close()
    }
  }, [current, userData, close])

  switch (current) {
    case 'basket':
      return <BasketPage onClose={close} isOpen={true} />
    case 'auth':
      return <AuthPage isOpen={true} onClose={close} />
    case 'order':
      return <OrderPage isOpen={true} onClose={close} />
    case 'order-success':
      return <OrderSuccessModal onClose={close} />
    default: return null
  }
}
