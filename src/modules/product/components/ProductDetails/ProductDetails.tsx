import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import ProductActions from './ProductActions.js'
import ProductColors from './ProductColors.js'
import ProductDescription from './ProductDescription.js'
import ProductHeader from './ProductHeader.js'
import ProductPricing from './ProductPricing.js'
import ProductSizes from './ProductSizes.js'

interface ProductDetailsProps {
  brandName: string
  selectedSize: SizesOption | null
  setSelectedSize: (sizes: SizesOption | null) => void
  selectedColor: ColorsOption | null
  setSelectedColor: (color: ColorsOption | null) => void

}
export default function ProductDetails({ brandName, setSelectedSize, selectedSize, selectedColor, setSelectedColor }: ProductDetailsProps) {
  return (
    <div className="col-span-1 gap-y-6 flex flex-col">
      <ProductHeader brandName={brandName} />
      <ProductPricing />
      <ProductColors selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <ProductSizes
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <ProductActions selectedSize={selectedSize} setSelectedSize={setSelectedSize} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <ProductDescription />
    </div>
  )
}
