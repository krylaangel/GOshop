import Button from '@shared/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/store/useAuth'
import { useCartStore } from '~/store/useCartStore'
import { useModalStore } from '~/store/useModalStore'

export function CartFooter() {
  const navigate = useNavigate()
  const { open, close } = useModalStore()
  const handleContinue = () => {
    navigate('/')
    close()
  }
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const cart = useCartStore(state => state.cart)
  const totalSum = cart.reduce((acc, item) => {
    const price = item.price
    const salePrice = item.salePrice
    const currentPrice = salePrice < price ? salePrice : price
    return acc + currentPrice * item.quantity
  }, 0).toFixed(2)
  const handleProfileClick = () => {
    if (isAuthenticated) {
      open('order')
    }
    else {
      open('auth')
    }
  }
  return (
    <div className="mt-6 h-[78px] w-full grid grid-cols-1 md:grid-cols-[1fr_minmax(305px,424px)] gap-4 items-center">
      <div className="md:flex flex justify-end sm:justify-start hidden "><Button variant="secondary" onClick={handleContinue} className="w-[174px] py-4">Продовжити покупки</Button></div>
      <div className="bg-[var(--hoverBorder)] h-full rounded-[10px] py-3 px-6 flex items-center gap-5 justify-center sm:justify-between flex-wrap sm:flex-nowrap">
        <div className="flex md:flex-col gap-x-1 items-center md:items-end justify-between w-full">
          <p className="font-medium text-base text-[var(--colorMenu)] whitespace-nowrap">До сплати</p>
          <p className="font-bold text-xl text-[var(--colorMenu)] whitespace-nowrap">
            {totalSum}
            {' '}
            грн
          </p>
        </div>
        <Button onClick={handleProfileClick} className="px-[47px] py-2 text-sm!">Оформити замовлення</Button>
      </div>
    </div>
  )
}
