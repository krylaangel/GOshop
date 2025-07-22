import ProductActions from './ProductActions.js'
import ProductColors from './ProductColors.js'
import ProductDescription from './ProductDescription.js'
import ProductHeader from './ProductHeader.js'
import ProductPricing from './ProductPricing.js'
import ProductSizes from './ProductSizes.js'

export default function ProductDetails({ brandName }: { brandName: string }) {
  return (
    <div className="col-span-1 gap-y-6 flex flex-col">
      <ProductHeader brandName={brandName} />
      <ProductPricing />
      <ProductColors />
      <ProductSizes />
      <ProductActions />
      <ProductDescription />
    </div>
  )
}
