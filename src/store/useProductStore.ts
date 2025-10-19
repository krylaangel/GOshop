import type { ProductCardProps } from '@shared/components/ProductCardComponent'
import { productService } from '@api/services/productService'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductState {
  categoryTree: string[]
  productName: string
  categories: Record<string, ProductCardProps[]>
  setCategoryTree: (tree: string[]) => void
  setProductName: (name: string) => void
  setCategories: (categories: Record<string, ProductCardProps[]>) => void
  refreshProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      categoryTree: [],
      productName: '',
      categories: {},
      setCategories: categories => set({ categories }),
      setCategoryTree: tree => set({ categoryTree: tree }),
      setProductName: name => set({ productName: name }),
      refreshProducts: async () => {
        try {
          const state = get() // <-- получаем текущее состояние
          const categoriesData = await Promise.all(
            ['ДЛЯ НЕЇ', 'ДЛЯ НЬОГО', 'АКСЕСУАРИ'].map(async (category) => {
              const products = state.categories[category] || [] // <-- используем state.categories
              const updatedProducts = await Promise.all(
                products.map(async (p) => {
                  const res = await productService.getById(p.id)
                  if (!res.isError && res.data) {
                    return {
                      ...p,
                      name: res.data.name ?? '',
                      price: res.data.price,
                      salePrice: res.data.salePrice,
                      averageRating: res.data.averageRating,
                      images: res.data.images ?? [],
                    }
                  }
                  return p
                }),
              )
              return [category, updatedProducts] as const
            }),
          )
          set({ categories: Object.fromEntries(categoriesData) })
        }
        catch (e) {
          console.error('Failed to refresh products:', e)
        }
      },
    }),
    {
      name: 'product-storage',
    },
  ),
)
