import ProductCardComponent from '@shared/components/ProductCardComponent'
import getImageURL from '@shared/utils/imageUtils'
import { useFavoriteStore } from '~/store/useFavoriteStore'

export function FavoritesProducts() {
  const favorites = useFavoriteStore(state => state.favorites)
  return (
    <div className="flex flex-col gap-3 my-3 w-full">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3">Список бажань</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 w-full">
        {favorites.map(favorite => (
          <div key={favorite.id} className="w-full">
            <ProductCardComponent
              id={favorite.id}
              imageUrl={favorite.imageUrl ?? getImageURL('default-product-card.png')}
              brandName={favorite.name ?? ''}
              price={favorite.price}
              salePrice={favorite.salePrice}
              averageRating={favorite.averageRating}
              name={favorite.name ?? ''}
              product={favorite.product}
            />
          </div>

        ))}
      </div>
    </div>
  )
}
