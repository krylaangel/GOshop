import { useProductContext } from '@product/ProductContext'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'

import getImageURL from '~/shared/utils/imageUtils'

interface ProductMiniCardProps {
  brandName: string
}
export default function ProductMiniCard({ brandName }: ProductMiniCardProps) {
  const { product, isFavorite } = useProductContext()
  const defaultImage = getImageURL('default-product-card.png')
  let imageUrls = product.images?.map(img => img.imageUrl)
  if (!imageUrls || imageUrls.length === 0) {
    imageUrls = [defaultImage]
  }

  const price = product.price
  const salePrice = product.salePrice
  const hasDiscount = salePrice < price

  return (
    <div className="hidden w-[336px] h-[224px] md:flex flex-col p-4 border border-[var(--hoverBorder)] rounded-[12px]">
      <div className="w-full h-full flex">
        {imageUrls.length > 0 && (
          <div className="w-[92px] h-[136px]">
            <img
              className="img-style object-cover rounded-[10px]"
              src={imageUrls[0] ?? defaultImage}
              alt={brandName}
            />
          </div>
        )}

        <div className="flex flex-col justify-center gap-x-[10px] pl-[10px]">
          <p className="text-base font-medium leading-[140%] w-[204px] mb-[10px]">
            {product.name}
          </p>
          <p className="whitespace-nowrap font-bold text-xl leading-[140%] tracking-normal">
            {hasDiscount
              ? (
                  <>
                    <span className="pr-[10px]">
                      {salePrice.toFixed(2)}
                      {' '}
                      грн
                    </span>
                    <span className="font-light text-base leading-[110%] tracking-normal line-through text-[var(--secondaryColorText)]">
                      {price.toFixed(2)}
                      {' '}
                      грн
                    </span>
                  </>
                )
              : (
                  `${price.toFixed(2)} грн`
                )}
          </p>
        </div>
      </div>

      <div className="w-full flex pt-4 gap-x-2">
        <Button className="w-[240px] px-11 button">Купити</Button>
        <Button className="w-[56px] justify-self-end">
          {isFavorite
            ? (
                <svg className="w-[20px] h-[18px] fill-current stroke-current">
                  <use href={`${Icons}#like`} />
                </svg>
              )
            : (
                <svg className="w-[25px] h-[24px] fill-current stroke-current stroke-[0.25]">
                  <use href={`${Icons}#like-button`} />
                </svg>
              )}
        </Button>
      </div>
    </div>
  )
}
