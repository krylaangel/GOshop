import Button from '@shared/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/store/useAuth'
import { useCartStore } from '~/store/useCartStore'

export function CartFooter() {
  const navigate = useNavigate()
  const handleProfileClick = () => {
    navigate(isAuthenticated ? '/order' : '/auth')
  }
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const cart = useCartStore(state => state.cart)
  const totalSum = cart.reduce((acc, item) => {
    const price = item.price
    const salePrice = item.salePrice
    const currentPrice = salePrice < price ? salePrice : price
    return acc + currentPrice * item.quantity
  }, 0).toFixed(2)

  return (
    <div className="mt-6 h-[78px] w-full flex justify-between items-center">
      <Button variant="secondary" onClick={() => navigate('/')} className="px-2 py-4">Продовжити покупки</Button>
      <div className="bg-[var(--hoverBorder)] h-full rounded-[10px] py-6 px-3 flex items-center gap-5">
        <div className="flex flex-col gap-x-1 items-end">
          <p className="font-medium text-base text-[var(--colorMenu)]">До сплати</p>
          <p className="font-bold text-xl text-[var(--colorMenu)]">
            {totalSum}
            {' '}
            грн
          </p>
        </div>
        <Button onClick={handleProfileClick} className="px-[47px] py-2">Оформити замовлення</Button>
      </div>
    </div>
  )
}
