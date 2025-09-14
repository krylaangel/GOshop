import type { UUID } from '@api/types'
import { orderService } from '@api/services/orderService'
import { CartFooterMini } from '@modules/order/components/cartMini/CartFooterMini'
import { CartItemMini } from '@modules/order/components/cartMini/CartItemMini'
import { Delivery } from '@modules/order/components/Delivery'
import { OtherReceiver } from '@modules/order/components/OtherReceiver'
import { PayOrder } from '@modules/order/components/PayOrder'
import { PersonalData } from '@modules/order/components/PersonalData'
import { OrderSuccessModal } from '@modules/order/modalWindows/OrderSuccessModal'
import Button from '@shared/components/Button/Button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icons from '~/assets/images/icon-sprite.svg'
import { useAuthStore } from '~/store/useAuth'
import { useCartStore } from '~/store/useCartStore'
import { useModalStore } from '~/store/useModalStore'

export function OrderPage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen)
    return null

  const navigate = useNavigate()
  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const { userData } = useAuthStore()
  const [selectedPayMethod, setSelectedPayMethod] = useState('Оплата при отриманні')
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [otherReceiver, setOtherReceiver] = useState({ firstName: '', lastName: '', fatherName: '', phoneNumber: '', note: '' })
  const [addresses, setAddresses] = useState({
    city: '',
    street: '',
    numberBuilding: '',
    flat: '',
    flor: '',
    frontDoor: '',
  })

  const handleSubmitOrder = async () => {
    if (!userData?.id) {
      console.error('Користувач не існує')
      return
    }

    const order = {
      userId: userData.id,
      status: 'new',
      totalAmount: totalSum,
      orderNumber: `ORD-${Date.now()}`,
      shippingAddress: `${addresses.city}, ${addresses.street} ${addresses.numberBuilding}, кв. ${addresses.flat}`,
      billingAddress: `${userData?.firstName} ${userData?.lastName}, ${userData?.email}`,
      shippingMethod: deliveryMethod,
      paymentMethod: selectedPayMethod,
      trackingNumber: '',
      notes: otherReceiver.note,
      couponId: undefined,
      discountAmount: 0,
      items: cart.map(item => ({
        productId: item.id as UUID,
        productVariantId: item.id as UUID,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      })),

    }
    try {
      await orderService.add(order)
      clearCart()

      setDeliveryMethod('')
      setSelectedPayMethod('Оплата при отриманні')
      setOtherReceiver({
        firstName: '',
        lastName: '',
        fatherName: '',
        phoneNumber: '',
        note: '',
      })
      setAddresses({
        city: '',
        street: '',
        numberBuilding: '',
        flat: '',
        flor: '',
        frontDoor: '',
      })
      setIsModalOpen(true)
      onClose()
      setTimeout(() => navigate('/'), 3000)
    }
    catch (error) {
      console.error('Помилка відправки замовлення', error)
    }
  }
  const totalSum = cart.reduce((acc, item) => {
    const price = item.price
    const salePrice = item.salePrice
    const currentPrice = salePrice < price ? salePrice : price
    return acc + currentPrice * item.quantity
  }, 0)
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
  if (!userData) {
    useModalStore.getState().open('auth')
    return null
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/70 w-full h-screen flex items-center justify-center">
      <div className="bg-white py-12 clamp  max-h-screen overflow-y-auto">
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
        <div className="py-8 grid grid-cols-1 md:grid-cols-2">
          <OrderSuccessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <div className="flex flex-col pr-[50px]">
            <h1 className="text-xl font-bold mb-6">Оформлення замовлення</h1>
            <PersonalData />
            <Delivery
              selected={deliveryMethod}
              setSelected={setDeliveryMethod}
              addresses={addresses}
              setAddresses={setAddresses}
            />
            <PayOrder selected={selectedPayMethod} setSelected={setSelectedPayMethod} />
            <OtherReceiver receiver={otherReceiver} setReceiver={setOtherReceiver} />
            <div className="px-8">
              <Button onClick={handleSubmitOrder} className="w-full py-2 px-4">
                Підтверджую
                замовлення
              </Button>
            </div>

          </div>
          <div className="flex flex-col border border-[var(--hoverBorder)] rounded-lg p-6 h-fit">
            <CartItemMini />
            <CartFooterMini totalSum={totalSum} />

          </div>
        </div>
      </div>
    </div>
  )
}
