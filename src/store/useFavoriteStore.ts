import type { UUID } from '@api/types'
import type { ProductCardProps } from '@shared/components/ProductCardComponent'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStore {
  favorites: ProductCardProps[]
  toggleFavorite: (product: ProductCardProps) => void
  isFavorite: (id: UUID) => boolean
  clearFavorites: () => void
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
    }),
    { name: 'FavoriteStore' },
  ),
)
