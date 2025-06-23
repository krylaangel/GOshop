import type { ProductAboutProps } from '../itemsCard/ProductAbout.tsx'
import ProductActions from './ProductActions.js'
import ProductColors from './ProductColors.js'
import ProductDescription from './ProductDescription.js'
import ProductHeader from './ProductHeader.js'
import ProductPricing from './ProductPricing.js'
import ProductSizes from './ProductSizes.js'

export default function ProductDetails({
  brandName,
  price,
  salePrice,
  averageRating,
  isFavorite,
}: Omit<ProductAboutProps, 'imageUrl'>) {
  return (
    <div className="col-span-1 gap-y-6 flex flex-col">
      <ProductHeader brandName={brandName} averageRating={averageRating} />
      <ProductPricing price={price} salePrice={salePrice} />
      <ProductColors />
      <ProductSizes />
      <ProductActions isFavorite={isFavorite} />
      <ProductDescription />
    </div>
  )
}
