import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import type { JSX } from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import ImageSlider from './ImageSlider'

interface ProductAboutProps {
  brandName: string
  selectedSize: SizesOption | null
  setSelectedSize: (size: SizesOption | null) => void
  selectedColor: ColorsOption | null
  setSelectedColor: (color: ColorsOption | null) => void
}

export default function ProductAbout({
  brandName,
  setSelectedSize,
  selectedSize,
  setSelectedColor,
  selectedColor,
}: ProductAboutProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <ImageSlider brandName={brandName} />
      <ProductDetails
        brandName={brandName}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  )
}
