import type { UUID } from '@api/types'
import type { ProductCardProps } from '@shared/components/ProductCardComponent'
import { productService } from '@api/services/productService'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStore {
  favorites: ProductCardProps[]
  toggleFavorite: (product: ProductCardProps) => void
  isFavorite: (id: UUID) => boolean
  clearFavorites: () => void
  syncFavorites: () => Promise<void>
}
export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (product) => {
        const { favorites } = get()
        const exists = favorites.some(f => f.id === product.id)

        set({
          favorites: exists
            ? favorites.filter(f => f.id !== product.id)
            : [...favorites, product],
        })
      },
      isFavorite: (id: UUID) => get().favorites.some(f => f.id === id),
      clearFavorites: () => set({ favorites: [] }),
      syncFavorites: async () => {
        const { favorites } = get()
        if (favorites.length === 0)
          return

        try {
          const updatedFavorites: ProductCardProps[] = await Promise.all(
            favorites.map(async (f) => {
              const res = await productService.getById(f.id)
              if (!res.isError && res.data) {
                return {
                  ...f,
                  name: res.data.name ?? '',
                  description: res.data.description ?? '',
                  price: res.data.price,
                  salePrice: res.data.salePrice,
                  stockQuantity: res.data.stockQuantity,
                  brandId: res.data.brandId,
                  categoryId: res.data.categoryId,
                  images: res.data.images ?? [],
                  averageRating: res.data.averageRating,
                }
              }
              return f
            }),
          )

          set({ favorites: updatedFavorites })
        }
        catch (e) {
          console.error('Failed to sync favorites:', e)
        }
      },

    }),
    { name: 'FavoriteStore' },
  ),
)
