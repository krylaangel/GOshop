import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductState {
  categoryTree: string[]
  productName: string
  setCategoryTree: (tree: string[]) => void
  setProductName: (name: string) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    set => ({
      categoryTree: [],
      productName: '',
      setCategoryTree: tree => set({ categoryTree: tree }),
      setProductName: name => set({ productName: name }),
    }),
    {
      name: 'product-storage',
    },
  ),
)
