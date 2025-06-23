import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import getImageURL from '~/shared/utils/imageUtils'

export interface ProductMiniCardProps {
  price: number
  salePrice: number
  isFavorite: boolean
}
export default function ProductMiniCard({
  price,
  salePrice,
  isFavorite,
}: ProductMiniCardProps) {
  const hasDiscount = salePrice < price

  return (
    <div className="hidden w-[336px] h-[224px] md:flex flex-col p-4 border border-[var(--hoverBorder)] rounded-[12px]">
      <div className="w-full h-full flex">
        <img
          className="object-cover w-[92px] h-[136px]"
          src={getImageURL('testImag.png')}
          alt="Опис зображення"
        />
        <div className="flex flex-col justify-center gap-x-[10px] pl-[10px]">
          <p className="whitespace-nowrap text-base font-medium leading-[140%] w-[204px]">
            Спортивний костюм Puma
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
