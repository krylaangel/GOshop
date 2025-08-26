import type { Product } from '@api/types'
import { create } from 'zustand'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>(set => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),

  addToCart: product =>
    set((state) => {
      const existingIndex = state.cart.findIndex(item => item.id === product.id)
      let updatedCart
      if (existingIndex !== -1) {
        updatedCart = state.cart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }]
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }),

  removeFromCart: id =>
    set((state) => {
      const updated = state.cart.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updated))
      return { cart: updated }
    }),
  updateQuantity: (id: string, quantity: number) => {
    set(state => ({
      cart: state.cart.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    }))
  },
    clearCart: () => {
        localStorage.removeItem('cart')
        set({ cart: [] })
    }
}))
