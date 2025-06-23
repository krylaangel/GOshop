import type { JSX } from 'react'
import ImageSlider from '../components/itemsCard/ImageSlider'
import ProductDetails from '../components/ProductDetails/ProductDetails'

interface ProductAboutProps {
  imageUrl: string
  brandName: string
  price: number
  salePrice: number
  averageRating: number
  isFavorite: boolean
}
export default function ProductAbout({
  imageUrl,
  brandName,
  price,
  salePrice,
  averageRating,
  isFavorite,
}: ProductAboutProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <ImageSlider imageUrl={imageUrl} brandName={brandName} />
      <ProductDetails
        brandName={brandName}
        price={price}
        salePrice={salePrice}
        averageRating={averageRating}
        isFavorite={isFavorite}
      />
    </div>
  )
}
