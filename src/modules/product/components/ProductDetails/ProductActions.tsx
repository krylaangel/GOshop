import { useProductContext } from '@product/ProductContext'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import { useCartStore } from '~/store/useCartStore'

export default function ProductActions() {
  const { product, isFavorite } = useProductContext()
  const addToCart = useCartStore(state => state.addToCart)

  return (
    <div className="flex gap-x-4">
      <Button
        onClick={() => addToCart(product)}
        className="w-full px-11 button"
      >
        Купити
      </Button>
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
