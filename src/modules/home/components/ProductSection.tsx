import type { UUID } from '~/api/types'

import type { ProductCardProps } from '~/shared/components/ProductCardComponent'
import { categoryService } from '@api/services/categoryService'
import { extractProductsFromTree } from '@home/components/categoryTree'
import { ProductCardSkeleton } from '@shared/skeleton/ProductCardSkeleton'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button from '~/shared/components/Button/Button'
import ProductCardComponent from '~/shared/components/ProductCardComponent'
import getImageURL from '~/shared/utils/imageUtils'
import { useProductStore } from '~/store/useProductStore'
import 'swiper/css'

enum Category {
  WOMEN = 'ДЛЯ НЕЇ',
  MEN = 'ДЛЯ НЬОГО',
  ACCESSORIES = 'АКСЕСУАРИ',
}

type Categories = {
  [key in Category]: ProductCardProps[];
}

const initialCategories: Categories = {
  [Category.WOMEN]: [],
  [Category.MEN]: [],
  [Category.ACCESSORIES]: [],
}

interface ProductSectionProps {
  title: string
  forHerId: UUID
  forHimId: UUID
  accessoriesId: UUID
}
function ProductSectionComponent({
  title,
  forHerId,
  forHimId,
  accessoriesId,
}: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    Category.WOMEN,
  )
  const { categories, setCategories } = useProductStore()

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchProducts = useCallback(async () => {
    try {
      const womenResponse = await categoryService.getProductByCategoryId(forHerId)
      const menResponse = await categoryService.getProductByCategoryId(forHimId)
      const accessoriesResponse = await categoryService.getProductByCategoryId(accessoriesId)

      const womenProductsMapped = extractProductsFromTree(womenResponse.data).map(({ product }) => ({
        id: product.id,
        imageUrl: product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png'),
        brandName: product.name ?? '',
        price: product.price,
        salePrice: product.salePrice,
        averageRating: product.averageRating,
        name: product.name ?? '',
        categoryId: product.categoryId ?? '',
        product,
      }))

      const menProductsMapped = extractProductsFromTree(menResponse.data).map(({ product }) => ({
        id: product.id,
        imageUrl: product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png'),
        brandName: product.name ?? '',
        price: product.price,
        salePrice: product.salePrice,
        averageRating: product.averageRating,
        name: product.name ?? '',
        categoryId: product.categoryId ?? '',
        product,
      }))

      const accessoriesProductsMapped = extractProductsFromTree(accessoriesResponse.data).map(({ product }) => ({
        id: product.id,
        imageUrl: product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png'),
        brandName: product.name ?? '',
        price: product.price,
        salePrice: product.salePrice,
        averageRating: product.averageRating,
        name: product.name ?? '',
        categoryId: product.categoryId ?? '',
        product,
      }))

      setCategories({
        [Category.WOMEN]: womenProductsMapped,
        [Category.MEN]: menProductsMapped,
        [Category.ACCESSORIES]: accessoriesProductsMapped,
      })
    }
    finally {
      setLoading(false)
    }
  }, [forHerId, forHimId, accessoriesId])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col text-center py-5 sm:py-12 lg:py-20 clamp">
      <h2 className="font-medium text-2xl sm:text-4xl leading-[140%] tracking-widest mb-6">
        {title}
      </h2>
      <div className="text-[var(--baseColorText)] flex justify-center gap-x-10 mb-8">
        {Object.values(Category).map(category => (
          <span
            key={category}
            className={`${category === activeCategory ? 'menu__active' : ''} cursor-pointer whitespace-nowrap text-sm sm:text-lg`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>
      <Swiper
        spaceBetween={4}
        slidesPerView={1.25}
        breakpoints={{
          480: { slidesPerView: 2.25, spaceBetween: 8,
          },
          768: { slidesPerView: 3, spaceBetween: 12 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className="w-full"
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : categories[activeCategory].map(product => (
              <SwiperSlide key={product.id}>
                <ProductCardComponent {...product} />
              </SwiperSlide>
            ))}
      </Swiper>
      <div className="flex justify-end w-full">
        <Button className="w-full sm:w-1/2 sm:w-1/4 " onClick={() => navigate('/allProducts')}>
          Переглянути всі
        </Button>
      </div>
    </div>
  )
}

export default ProductSectionComponent
