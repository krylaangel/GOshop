import type { UUID } from '~/api/types'
import type { ProductCardProps } from '~/shared/components/ProductCardComponent'

export default function getRandomProduct(id: UUID): ProductCardProps {
  const brands = ['Nike', 'Adidas', 'Apple', 'Samsung', 'Sony', 'Puma']
  const price = Number.parseFloat((Math.random() * 100 + 10).toFixed(2))
  return {
    id,
    imageUrl: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
    brandName: brands[Math.floor(Math.random() * brands.length)],
    price,
    salePrice: Math.random() > 0.5 ? price - Math.floor(Math.random() * 50) : price,
    averageRating: Number.parseFloat((Math.random() * 5).toFixed(1)),
    isFavorite: Math.random() > 0.5,
  }
};
