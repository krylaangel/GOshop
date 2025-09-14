import { CartFooter } from '@cart/basket/CartFooter'
import { CartItem } from '@cart/basket/CartItem'
import Button from '@shared/components/Button/Button'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icons from '~/assets/images/icon-sprite.svg'
import { useCartStore } from '~/store/useCartStore'

export function BasketPage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const cart = useCartStore(state => state.cart)
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/')
    onClose()
  }

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

  return (
    <div className="fixed inset-0 z-50  bg-black/70 h-full w-full flex-center flex-col">
      <div className="h-full w-full flex flex-col bg-white clamp py-12 overflow-y-auto">
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer h-8 w-8 text-[var(--hoverBorder)]"
          >
            <svg className="w-4 h-4 md:w-8 md:h-8">
              <use href={`${Icons}#header_burger-close`} />
            </svg>
          </button>
        </div>
        <h1 className="text-xl font-bold flex justify-start w-full">Кошик</h1>
        {cart.length === 0
          ? (
              <div className="flex flex-col gap-y-[10px] items-center justify-center h-full">
                <p className="text-lg font-light text-[var(--secondarColorMenu)]">Ваш кошик порожній</p>
                <Button className="px-4 py-2" variant="secondary" onClick={handleContinue}>Продовжити покупки</Button>
              </div>
            )
          : (
              <div>
                <CartItem />
                <CartFooter />
              </div>
            )}
      </div>
    </div>
  )
}
