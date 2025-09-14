import { useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'

export interface RatingStarsProps {
  average: number
  reviews?: number
  value?: number
  interactive?: boolean
  onRate?: (rating: number) => void
  className?: string
}

export default function RatingStars({
  value,
  average,
  reviews,
  interactive = false,
  onRate,
  className = '',
}: RatingStarsProps) {
  const [hover, setHover] = useState<number | null>(null)

  const filled = (star: number) => {
    if (hover !== null)
      return star <= hover

    if (interactive && value)
      return star < value
    return star < Math.round(average)
  }

  const handleClick = (star: number) => {
    if (!interactive)
      return
    onRate?.(star + 1)
  }

  return (
    <div
      className={`flex items-center gap-[6px] ${className}`}
      onMouseLeave={() => setHover(null)}
    >
      {/* Зірки */}
      <div className="flex items-center gap-x-[2px]">
        {Array.from({ length: 5 }).map((_, idx) => {
          const star = idx + 1 // <-- теперь звёздочки считаются с 1 до 5
          return (
            <svg
              key={star}
              className={`w-4 h-[17px] sm:w-[18px] sm:h-[18px] align-middle ${
                interactive ? 'cursor-pointer' : 'cursor-default'
              }`}
              onMouseEnter={() => interactive && setHover(star)}
              onClick={() => handleClick(star)}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1}
            >
              <use
                className={
                  filled(star)
                    ? 'text-[var(--buttonColor)] stroke-[var(--buttonColor)]'
                    : 'text-white stroke-[var(--buttonColor)]'
                }
                href={`${Icons}#cardComponent_starDefault`}
              />
            </svg>
          )
        })}
      </div>

      {/* Відгуки */
      }
      {
        typeof reviews === 'number' && (
          <p className="text-[14px] font-medium text-[var(--baseColorText)] leading-[140%] pt-1 whitespace-nowrap">
            {reviews}
            {' '}
            відгуків
          </p>
        )
      }
    </div>
  )
}
