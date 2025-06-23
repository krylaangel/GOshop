import type { ProductMiniCardProps } from './ProductMiniCard'
import type { UUID } from '~/api/types/index'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import ProductMiniCard from './ProductMiniCard'
import ReviewsCard from './ReviewsCard'

export interface ReviewsProps {
  product: ProductMiniCardProps
}
export default function Reviews({ product }: ReviewsProps) {
  return (
    <div className="flex justify-between gap-x-[100px] pt-6">
      <div className="flex flex-col gap-y-4">
        <ReviewsCard
          id={'' as UUID}
          productId={'' as UUID}
          userId={'' as UUID}
          rating={5}
          comment=""
          createdAt={new Date()}
          lastModified={new Date()}
          deletedAt={new Date()}
        />
        <ReviewsCard
          id={'' as UUID}
          productId={'' as UUID}
          userId={'' as UUID}
          rating={5}
          comment=""
          createdAt={new Date()}
          lastModified={new Date()}
          deletedAt={new Date()}
        />
        <ReviewsCard
          id={'' as UUID}
          productId={'' as UUID}
          userId={'' as UUID}
          rating={5}
          comment=""
          createdAt={new Date()}
          lastModified={new Date()}
          deletedAt={new Date()}
        />
        <Button variant="secondary" className="w-[248px] self-end space-x-3">
          Показати ще
          {' '}
          <span className="w-3"></span>
          <svg className="icons__states w-3 h-3">
            <use href={`${Icons}#header_arrow-open`} />
          </svg>
        </Button>
      </div>
      <ProductMiniCard {...product} />
    </div>
  )
}
