import { CartFooterMini } from '@modules/order/components/cartMini/CartFooterMini'
import { CartItemMini } from '@modules/order/components/cartMini/CartItemMini'
import { Delivery } from '@modules/order/components/Delivery'
import { OtherReceiver } from '@modules/order/components/OtherReceiver'
import { PayOrder } from '@modules/order/components/PayOrder'
import { PersonalData } from '@modules/order/components/PersonalData'
import Button from '@shared/components/Button/Button'
import {useCartStore} from "~/store/useCartStore";
import {useAuthStore} from "~/store/useAuth";
import {useState} from "react";
import {orderService} from "@api/services/orderService";
import {UUID} from "@api/types";
import {Success} from "@shared/components/modalWindows/Success";

export function OrderPage() {
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart)
    const { userData } = useAuthStore();
    const [selectedPayMethod, setSelectedPayMethod] = useState('Оплата при отриманні')
    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [otherReceiver, setOtherReceiver] = useState({firstName: '',
        lastName: '',
        fatherName: '',
        phoneNumber: '',
        note: '',});
    const [addresses, setAddresses] = useState({
        city: '',
        street: '',
        numberBuilding: '',
        flat: '',
        flor: '',
        frontDoor: '',
    })

    const handleSubmitOrder = async ()=>{
        if (!userData?.id) {
            console.error('Користувач не існує');
            return;
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
            const response = await orderService.add(order)
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
            setSuccessMessage('✅ Ваше замовлення успішно створено!')

            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (error) {
            console.error('Помилка відправки замовлення', error)
        }
          }
    const totalSum = cart.reduce((acc, item) => {
        const price = item.price
        const salePrice = item.salePrice
        const currentPrice = salePrice < price ? salePrice : price
        return acc + currentPrice * item.quantity
    }, 0)
    return (
    <div className="clamp py-8 grid grid-cols-1 md:grid-cols-2">
        {successMessage && (

            <Success successMessage={successMessage}/>)}
      <div className="flex flex-col pr-[50px]">
        <h1 className="text-xl font-bold mb-6">Оформлення замовлення</h1>
        <PersonalData />
          <Delivery selected={deliveryMethod} setSelected={setDeliveryMethod} addresses={addresses} setAddresses={setAddresses} />
          <PayOrder selected={selectedPayMethod} setSelected={setSelectedPayMethod} />
          <OtherReceiver receiver={otherReceiver} setReceiver={setOtherReceiver}/>
        <div onClick={handleSubmitOrder} className="px-8"><Button className="w-full py-2 px-4">Підтверджую замовлення</Button></div>

      </div>
      <div className="flex flex-col border border-[var(--hoverBorder)] rounded-lg p-6 h-fit">
        <CartItemMini />
        <CartFooterMini totalSum={totalSum}/>

      </div>

    </div>
  )
}
