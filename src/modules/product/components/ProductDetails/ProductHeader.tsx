import { useProductContext } from '@product/ProductContext'
import RatingStars from '~/shared/components/RatingStars'

interface ProductHeaderProps {
  brandName: string
}

export default function ProductHeader({ brandName }: ProductHeaderProps) {
  const { product, reviewCount } = useProductContext()
  const averageRating = product.averageRating
  const skuCode = product.skuCode
  return (
    <>
      <h2 className="font-bold text-4xl leading-[140%] tracking-normal text-black">
        {brandName}
      </h2>
      <div className="flex justify-between whitespace-wrap gap-x-6 w-full">
        <RatingStars
          average={averageRating}
          reviews={reviewCount}
          interactive
          onRate={r => console.warn('#Todo: Оцінка', r)}
        />
        <p className="pt-1 font-light text-[14px] leading-[140%] items-center tracking-normal text-[var(--baseColorText)] whitespace-nowrap">
          Код: $
          {skuCode}
        </p>
      </div>
    </>
  )
}
