import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'

interface ProductActionsProps {
  isFavorite: boolean
}

export default function ProductActions({ isFavorite }: ProductActionsProps) {
  return (
    <div className="flex gap-x-4">
      <Button className="w-full px-11 button">Купити</Button>
      <Button variant="secondary" className="w-[71px] justify-self-end">
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
  )
}
