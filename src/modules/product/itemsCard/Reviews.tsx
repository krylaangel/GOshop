import { useAnimatedHeight } from '@layout/components/Navigation/hooks/useAnimatedHeight'
import { useProductContext } from '@product/ProductContext'
import { useRef, useState } from 'react'
import { animated } from 'react-spring'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import ProductMiniCard from './ProductMiniCard'
import ReviewsCard from './ReviewsCard'

interface ReviewsProps {
  brandName: string

}
export default function Reviews({ brandName }: ReviewsProps) {
  const { product } = useProductContext()
  const reviews = product.reviews || []
  const [showAll, setShowAll] = useState(false)
  const reviewPreview = reviews.slice(0, 3)
  const shouldShowButton = reviews.length > 3
  const reviewAllShow = reviews.slice(3)
  const ref = useRef<HTMLDivElement>(null)
  const styles = useAnimatedHeight({ ref, open: showAll, deps: [reviews] })

  return (
    <div className="flex justify-between gap-x-6 lg:gap-x-[100px] pt-6 w-full">
      <div className="flex flex-col gap-y-4 w-full">
        {reviewPreview.map(review => (
          <ReviewsCard
            review={review}
            key={review.id}
          />
        ))}
        <animated.div style={{ ...styles, overflow: 'hidden' }} ref={ref}>
          {reviewAllShow.map(review => (
            <ReviewsCard
              review={review}
              key={review.id}
            />
          ))}
        </animated.div>
        {shouldShowButton && (
          <Button
            onClick={() => setShowAll(prev => !prev)}
            variant="secondary"
            className="w-[248px] self-end space-x-3"
          >
            {showAll ? 'Згорнути' : 'Показати ще'}
            {' '}
            <span className="w-3"></span>
            <svg className={`icons__states w-3 h-3 ${showAll ? 'rotate-180' : ''}`}>
              <use href={`${Icons}#header_arrow-open`} />

            </svg>
          </Button>
        )}

      </div>
      <ProductMiniCard brandName={brandName} />
    </div>
  )
}
