import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import { useProductContext } from '@product/ProductContext'
import { Success } from '@shared/components/modalWindows/Success'
import { useState } from 'react'
import Icons from '~/assets/images/icon-sprite.svg'
import Button from '~/shared/components/Button/Button'
import { useCartStore } from '~/store/useCartStore'

interface ProductActionsProps {
  selectedSize: SizesOption | null
  setSelectedSize: (size: SizesOption | null) => void
  selectedColor: ColorsOption | null
  setSelectedColor: (color: ColorsOption | null) => void

}
export default function ProductActions({ selectedSize, setSelectedSize, selectedColor, setSelectedColor }: ProductActionsProps) {
  const { product, isFavorite } = useProductContext()
  const addToCart = useCartStore(state => state.addToCart)
  const [successMessage, setSuccessMessage] = useState('')

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor)
      return
    addToCart({ product, size: selectedSize, color: selectedColor })

    setSuccessMessage('✅ Товар додано до корзини\n')
    setSelectedColor(null)
    setSelectedSize(null)

    setTimeout(() => setSuccessMessage(''), 3000)
  }

  return (
    <div className="flex gap-x-4">
      {successMessage && (
        <Success successMessage={successMessage} />
      )}
      <Button
        onClick={handleAddToCart}
        className="w-full px-11 button"
        disabled={!selectedSize || !selectedColor}
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
