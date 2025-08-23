import type { JSX } from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import ImageSlider from './ImageSlider'

interface ProductAboutProps {
  brandName: string
}

export default function ProductAbout({
  brandName,
}: ProductAboutProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
      <ImageSlider brandName={brandName} />
      <ProductDetails
        brandName={brandName}
      />
    </div>
  )
}
