import type { Product } from '@api/types'
import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import { create } from 'zustand'

interface CartItem extends Product {
  quantity: number
  selectedSize: SizesOption
  selectedColor: ColorsOption
}
interface AddToCartPayload {
  product: Product
  size: SizesOption
  color: ColorsOption
}
interface CartState {
  cart: CartItem[]
  addToCart: (payload: AddToCartPayload) => void
  removeFromCart: (id: string, size: SizesOption, color: ColorsOption) => void
  updateQuantity: (id: string, quantity: number, size: SizesOption, color: ColorsOption) => void
  clearCart: () => void
  setItemSize: (id: string, oldSize: SizesOption, newSize: SizesOption) => void
  setItemColor: (id: string, newColor: ColorsOption, oldColor: ColorsOption) => void
}

export const useCartStore = create<CartState>(set => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),

  addToCart: ({ product, size, color }: AddToCartPayload) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color)
      let updatedCart
      if (existingIndex !== -1) {
        updatedCart = state.cart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      else {
        updatedCart = [...state.cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),

  removeFromCart: (id, size, color) =>
    set((state) => {
      const updated = state.cart.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color),
      )
      localStorage.setItem('cart', JSON.stringify(updated))
      return { cart: updated }
    }),
  updateQuantity: (id, quantity, size, color) =>
    set((state) => {
      const updatedCart = state.cart.map(i =>
        i.id === id && i.selectedSize === size && i.selectedColor === color
          ? { ...i, quantity: Math.max(1, quantity) }
          : i,
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),
  clearCart: () => {
    localStorage.removeItem('cart')
    set({ cart: [] })
  },
  setItemSize: (id, oldSize, newSize) =>
    set((state) => {
      const updatedCart = state.cart.map(i =>
        i.id === id && i.selectedSize === oldSize
          ? { ...i, selectedSize: newSize }
          : i,
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),
  setItemColor: (id, oldColor, newColor) =>
    set((state) => {
      const updatedCart = state.cart.map(i =>
        i.id === id && i.selectedColor === oldColor
          ? { ...i, selectedColor: newColor }
          : i,
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),
}))
