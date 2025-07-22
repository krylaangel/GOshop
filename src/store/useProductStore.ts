import { create } from 'zustand/react'

interface ProductState {
  categoryTree: string[]
  productName: string
  setCategoryTree: (tree: string[]) => void
  setProductName: (name: string) => void
}

export const useProductStore = create<ProductState>(set => ({
  categoryTree: [],
  productName: '',
  setCategoryTree: tree => set({ categoryTree: tree }),
  setProductName: name => set({ productName: name }),
}))
