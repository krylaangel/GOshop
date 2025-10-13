import type { UUID } from '@api/types/index'

export interface OrderItem {
  productId: UUID
  quantity: number
  price: number
  totalPrice: number
}
export interface Order {
  userId: UUID
  orderNumber: string
  status: string
  totalAmount: number
  shippingAddress: string
  billingAddress: string
  shippingMethod: string
  paymentMethod: string
  trackingNumber: string
  notes: string
  couponId?: UUID
  discountAmount: number
  orderItems: OrderItem[]
}
export interface GetOrder extends Order {
  createdAt: string
  updatedAt: string
}
