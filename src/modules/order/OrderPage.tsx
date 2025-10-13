import type { UUID } from '@api/types'
import { orderService } from '@api/services/orderService'
import { CartFooterMini } from '@modules/order/components/cartMini/CartFooterMini'
import { CartItemMini } from '@modules/order/components/cartMini/CartItemMini'
import { Delivery } from '@modules/order/components/Delivery'
import { OtherReceiver } from '@modules/order/components/OtherReceiver'
import { PayOrder } from '@modules/order/components/PayOrder'
import { PersonalData } from '@modules/order/components/PersonalData'
import Button from '@shared/components/Button/Button'
import { useEffect, useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'
import { useAuthStore } from '~/store/useAuth'
import { useCartStore } from '~/store/useCartStore'
import { useModalStore } from '~/store/useModalStore'

export function OrderPage({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen)
    return null
  const { open } = useModalStore()

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)
  const { userData } = useAuthStore()
  const [selectedPayMethod, setSelectedPayMethod] = useState('Оплата при отриманні')
  const [deliveryMethod, setDeliveryMethod] = useState('Самовивіз')
  const [otherReceiver, setOtherReceiver] = useState({ firstName: '', lastName: '', fatherName: '', phoneNumber: '', note: '' })
  const [addresses, setAddresses] = useState({
    city: '',
    street: '',
    numberBuilding: '',
    flat: '',
    flor: '',
    frontDoor: '',
  })
  const [errors, setErrors] = useState({
    deliveryMethod: '',
    addresses: {
      city: '',
      street: '',
      numberBuilding: '',
      flat: '',
      flor: '',
      frontDoor: '',
    },
    otherReceiver: {
      firstName: '',
      lastName: '',
      fatherName: '',
      phoneNumber: '',
    },
  })
  const validateForm = () => {
    const newErrors = {
      deliveryMethod: !deliveryMethod ? 'Оберіть спосіб доставки' : '',
      addresses: {
        city: addresses.city.trim() ? '' : 'Введіть місто',
        street: ['Кур\'єр Нова Пошта', 'Відділення Нова Пошта', 'Поштомат Нова Пошта'].includes(deliveryMethod)
          ? (addresses.street.trim() ? '' : 'Введіть вулицю')
          : '',
        numberBuilding: deliveryMethod === 'Кур\'єр Нова Пошта'
          ? (addresses.numberBuilding.trim() ? '' : 'Введіть номер будинку')
          : '',
        flat: deliveryMethod === 'Кур\'єр Нова Пошта'
          ? (addresses.flat.trim() ? '' : 'Введіть номер квартири')
          : '',
        flor: deliveryMethod === 'Кур\'єр Нова Пошта'
          ? (addresses.flor.trim() ? '' : 'Введіть поверх')
          : '',
        frontDoor: deliveryMethod === 'Кур\'єр Нова Пошта'
          ? (addresses.frontDoor.trim() ? '' : 'Введіть під\'їзд')
          : '',
      },
      otherReceiver: {
        firstName: otherReceiver.firstName || otherReceiver.lastName || otherReceiver.fatherName || otherReceiver.phoneNumber
          ? (otherReceiver.firstName.trim() ? '' : 'Введіть ім’я')
          : '',
        lastName: otherReceiver.firstName || otherReceiver.lastName || otherReceiver.fatherName || otherReceiver.phoneNumber
          ? (otherReceiver.lastName.trim() ? '' : 'Введіть прізвище')
          : '',
        fatherName: '',
        phoneNumber: otherReceiver.firstName || otherReceiver.lastName || otherReceiver.fatherName || otherReceiver.phoneNumber
          ? (otherReceiver.phoneNumber.trim() ? '' : 'Введіть телефон')
          : '',
      },
    }
    setErrors(newErrors)
    const hasErrors = Object.values(newErrors).some((section) => {
      if (typeof section === 'string')
        return section !== ''
      return Object.values(section).some(e => e !== '')
    })

    return !hasErrors
  }

  const handleSubmitOrder = async () => {
    if (!userData?.id) {
      console.error('Користувач не існує')
      return
    }
    if (!validateForm())
      return

    const items = cart.map(item => ({
      productId: item.id as UUID,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.price * item.quantity,
    }))
    console.log('Cart перед отправкой:', cart)
    console.log('Items перед отправкой:', items)
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
      orderItems: items,

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
      open('order-success')
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
        <div className="py-8 grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="flex flex-col lg:pr-[50px]">
            <h1 className="text-xl font-bold mb-6">Оформлення замовлення</h1>
            <PersonalData />
            <Delivery
              selected={deliveryMethod}
              setSelected={setDeliveryMethod}
              addresses={addresses}
              setAddresses={setAddresses}
              errors={errors.addresses}
            />
            <PayOrder
              selected={selectedPayMethod}
              setSelected={setSelectedPayMethod}
            />
            <OtherReceiver
              receiver={otherReceiver}
              setReceiver={setOtherReceiver}
              errors={errors.otherReceiver}
            />
            <div className="px-8 mb-6">
              <Button onClick={handleSubmitOrder} className="w-full py-2 px-4">
                Підтверджую замовлення
              </Button>
            </div>

          </div>
          <div className="flex flex-col border border-[var(--hoverBorder)] rounded-lg p-1 md:p-6 h-fit">
            <CartItemMini />
            <CartFooterMini totalSum={totalSum} />

          </div>
        </div>
      </div>
    </div>
  )
}
