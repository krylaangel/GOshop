import { CartFooter } from '@cart/basket/CartFooter'
import { CartItem } from '@cart/basket/CartItem'
import { useCartStore } from '~/store/useCartStore'

export function BasketPage() {
  const cart = useCartStore(state => state.cart)

  if (cart.length === 0)
    return <p>Корзина пуста</p>

  return (
    <div className="clamp py-12">
      <h1 className="text-xl font-bold mb-[30px]">Кошик</h1>
      <CartItem />
      <CartFooter />
    </div>
  )
}
