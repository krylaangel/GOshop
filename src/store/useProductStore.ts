import type { ProductCardProps } from '@shared/components/ProductCardComponent'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductState {
  categoryTree: string[]
  productName: string
  categories: Record<string, ProductCardProps[]>
  setCategoryTree: (tree: string[]) => void
  setProductName: (name: string) => void
  setCategories: (categories: Record<string, ProductCardProps[]>) => void

}

export const useProductStore = create<ProductState>()(
  persist(
    set => ({
      categoryTree: [],
      productName: '',
      categories: {},
      setCategories: categories => set({ categories }),
      setCategoryTree: tree => set({ categoryTree: tree }),
      setProductName: name => set({ productName: name }),
    }),
    {
      name: 'product-storage',
    },
  ),
)
