import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import { useAnimatedHeight } from '@layout/components/Navigation/hooks/useAnimatedHeight'
import { SentReview } from '@product/itemsCard/SentReview'
import { useProductContext } from '@product/ProductContext'
import React, { useRef, useState } from 'react'
import { animated } from 'react-spring'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import ProductMiniCard from './ProductMiniCard'
import ReviewsCard from './ReviewsCard'

interface ReviewsProps {
  brandName: string
  selectedSize: SizesOption | null
  selectedColor: ColorsOption | null
  setSelectedColor: (color: ColorsOption | null) => void
  setSelectedSize: (size: SizesOption | null) => void
}
export default function Reviews({ brandName, selectedSize, selectedColor, setSelectedSize, setSelectedColor }: ReviewsProps) {
  const { product } = useProductContext()
  const reviews = product.reviews || []
  const [showAll, setShowAll] = useState(false)
  const reviewPreview = reviews.slice(0, 3)
  const shouldShowButton = reviews.length > 3
  const reviewAllShow = reviews.slice(3)
  const ref = useRef<HTMLDivElement>(null)
  const styles = useAnimatedHeight({ ref, open: showAll, deps: [reviews] })

  return (
    <div className="flex justify-between gap-x-6 lg:gap-x-[100px] pt-4 w-full">

      <div className="flex flex-col gap-y-4 w-full">
        <SentReview />
        {reviews.length === 0 && (
          <div className="text-base md:text-l font-normal">На цей товар поки що не залишили відгуки :(</div>
        )}
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
      <ProductMiniCard
        brandName={brandName}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
      />
    </div>
  )
}
