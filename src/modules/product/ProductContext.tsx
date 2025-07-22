import type { Product } from '@api/types'
import { createContext, useContext } from 'react'

interface ProductContextProps {
  product: Product
  isFavorite: boolean
  reviewCount: number

}
export const ProductContext = createContext<ProductContextProps | null>(null)
export function useProductContext() {
  const context = useContext(ProductContext)
  if (!context)
    throw new Error('useProductContext must be used within ProductProvider')
  return context
}
