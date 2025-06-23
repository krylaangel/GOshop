import { useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'

export interface RatingStarsProps {
  average: number
  reviews?: number
  interactive?: boolean
  onRate?: (rating: number) => void
  className?: string
}

export default function RatingStars({
  average,
  reviews,
  interactive = false,
  onRate,
  className = '',
}: RatingStarsProps) {
  const [hover, setHover] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const filled = (idx: number) => {
    if (hover !== null)
      return idx <= hover
    if (selected !== null)
      return idx <= selected
    if (interactive)
      return false
    return idx < Math.round(average)
  }

  const handleClick = (idx: number) => {
    if (!interactive)
      return
    setSelected(idx)
    onRate?.(idx + 1)
  }

  return (
    <div
      className={`flex items-center gap-[6px] ${className}`}
      onMouseLeave={() => setHover(null)}
    >
      {/* Зірки */}
      <div className="flex items-center gap-x-[2px]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <svg
            key={idx}
            className={`w-4 h-[17px] sm:w-[18px] sm:h-[18px] align-middle ${
              interactive ? 'cursor-pointer' : 'cursor-default'
            }`}
            onMouseEnter={() => interactive && setHover(idx)}
            onClick={() => handleClick(idx)}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
          >
            <use
              className={
                filled(idx)
                  ? 'text-[var(--buttonColor)] stroke-[var(--buttonColor)]'
                  : 'text-white stroke-[var(--buttonColor)]'
              }
              href={`${Icons}#cardComponent_starDefault`}
            />
          </svg>
        ))}
      </div>

      {/* Відгуки */}
      {typeof reviews === 'number' && (
        <p className="text-[14px] font-medium text-[var(--baseColorText)] leading-[140%] pt-1 whitespace-nowrap">
          {reviews}
          {' '}
          відгуків
        </p>
      )}
    </div>
  )
}
