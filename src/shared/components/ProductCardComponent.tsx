import type { Product, UUID } from '~/api/types'
import { useNavigate } from 'react-router-dom'
import Icons from '~/assets/images/icon-sprite.svg'
import { useAuthStore } from '~/store/useAuth'
import { useFavoriteStore } from '~/store/useFavoriteStore'
import { useModalStore } from '~/store/useModalStore'
import Button from './Button/Button'
import RatingStars from './RatingStars'

export interface ProductCardProps {
  id: UUID
  imageUrl: string
  brandName: string
  price: number
  salePrice: number
  averageRating: number
  name: string
  product: Product
}

function ProductCardComponent({
  id,
  imageUrl,
  brandName,
  price,
  salePrice,
  averageRating,
  product,
  name,
}: ProductCardProps) {
  const isFavorite = useFavoriteStore(state => state.isFavorite(id))
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite)
  const { isAuthenticated } = useAuthStore()

  const hasDiscount = salePrice !== price
  const navigate = useNavigate()
  const handleBuyClick = () => {
    navigate(`/product/${id}`)
  }
  const { open } = useModalStore()

  const handleIsFavorite = () => {
    if (!isAuthenticated) {
      open('auth')
      return
    }
    toggleFavorite({ id, imageUrl, brandName, price, salePrice, averageRating, product, name })
  }

  return (
    <div className="h-full w-full flex flex-col align-middle justify-center gap-y-[10px] sm:gap-y-4">

      <div className="h-[369px] cursor-pointer">
        <img onClick={handleBuyClick} className="h-full w-full object-cover rounded-[10px]" src={imageUrl} alt={brandName} />
      </div>
      <p onClick={handleBuyClick} className="cursor-pointer border-b border-transparent hover:border-black  font-medium text-left text-sm sm:text-base leading-[22.4px] w-full tracking-normal overflow-hidden text-ellipsis whitespace-nowrap pb-5 h-5">
        {brandName}
      </p>
      <div className="flex flex-col">
        <div className="justify-start sm:justify-end flex items-start pb-[10px]">
          <RatingStars
            average={averageRating}

            onRate={r => console.warn('#Todo: Оцінка', r)}
          />
        </div>
        <div className="font-bold text-sm sm:text-xl leading-[28px] tracking-normal flex whitespace-nowrap h-7 gap-x-1 ">
          {hasDiscount
            ? (
                <>
                  <p className="justify-self-start flex text-sm sm:text-xl">
                    {salePrice.toFixed(2)}
                    {' '}
                    грн
                  </p>
                  <p className="justify-self-start flex font-light text-sm sm:text-base  space-y-[5px] line-through text-[var(--secondaryColorText)]">
                    {price.toFixed(2)}
                    {' '}
                    грн
                  </p>
                </>
              )
            : (
                `${price.toFixed(2)} грн`
              )}
        </div>
        <div className="flex justify-between col-span-2 gap-x-1 md:gap-x-2 w-full py-[10px] sm:py-4">
          <Button onClick={handleBuyClick} className="w-3/4 px-11 button">
            Купити
          </Button>
          <Button onClick={handleIsFavorite} className="w-1/4 justify-self-end">
            {isFavorite
              ? (
                  <svg className="w-5 h-5">
                    <use href={`${Icons}#like`} />
                  </svg>
                )
              : (
                  <svg className="w-6 h-6">
                    <use href={`${Icons}#like-button`} />
                  </svg>
                )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCardComponent
