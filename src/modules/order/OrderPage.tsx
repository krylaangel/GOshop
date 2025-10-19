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
    numberDelivery: '',
  })
  const [errors, setErrors] = useState({
    deliveryMethod: '',
    addresses: {
      city: '',
      street: '',
      numberBuilding: '',
      numberDelivery: '',
    },
    otherReceiver: {
      firstName: '',
      lastName: '',
      fatherName: '',
      phoneNumber: '',
    },
  })
  const validateForm = () => {
    if (deliveryMethod === 'Самовивіз') {
      setErrors({
        deliveryMethod: '',
        addresses: {
          city: '',
          street: '',
          numberBuilding: '',
          numberDelivery: '',
        },
        otherReceiver: {
          firstName: '',
          lastName: '',
          fatherName: '',
          phoneNumber: '',
        },
      })
      return true
    }

    const newErrors = {
      deliveryMethod: !deliveryMethod ? 'Оберіть спосіб доставки' : '',
      addresses: {
        city: addresses.city.trim() ? '' : 'Введіть місто',
        street: deliveryMethod === 'Кур\'єр Нова Пошта'
          ? (addresses.street.trim() ? '' : 'Введіть вулицю')
          : '',
        numberDelivery:
            ['Відділення Нова Пошта', 'Поштомат Нова Пошта'].includes(deliveryMethod)
              ? (addresses.numberDelivery.trim()
                  ? ''
                  : deliveryMethod === 'Відділення Нова Пошта'
                    ? 'Введіть відділення Нова Пошта'
                    : 'Введіть поштомат')
              : '',
        numberBuilding: deliveryMethod === 'Кур\'єр Нова Пошта'
          ? (addresses.numberBuilding.trim() ? '' : 'Введіть номер будинку')
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
    const order = {
      userId: userData.id,
      status: 'new',
      totalAmount: totalWithoutDiscount,
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
        numberDelivery: '',
      })
      open('order-success')
    }
    catch (error) {
      console.error('Помилка відправки замовлення', error)
    }
  }
  const { totalWithoutDiscount, totalDiscount } = cart.reduce(
    (acc, item) => {
      const price = item.price
      const salePrice = item.salePrice
      const quantity = item.quantity

      acc.totalWithoutDiscount += price * quantity

      if (salePrice < price) {
        acc.totalDiscount += (price - salePrice) * quantity
      }

      return acc
    },
    { totalWithoutDiscount: 0, totalDiscount: 0 },
  )
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
  const handleSetDeliveryMethod = (method: string) => {
    setDeliveryMethod(method)

    // сбрасываем ошибки, связанные с адресами
    setErrors(prev => ({
      ...prev,
      deliveryMethod: '',
      addresses: {
        city: '',
        street: '',
        numberBuilding: '',
        numberDelivery: '',
      },
    }))
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
              setSelected={handleSetDeliveryMethod}
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
            <CartFooterMini totalSum={totalWithoutDiscount} totalDiscount={totalDiscount} />

          </div>
        </div>
      </div>
    </div>
  )
}
