import type { ProductCardProps } from '~/shared/components/ProductCardComponent'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { productService } from '~/api/services/productService'
import Button from '~/shared/components/Button/Button'
import ProductCardComponent from '~/shared/components/ProductCardComponent'
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

import type { UUID } from '~/api/types'
import { useEffect } from 'react'

function ProductSectionComponent({
  title,
  forHerId,
  forHimId,
  accessoriesId,
}: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    Category.WOMEN,
  )
  const [categories, setCategories] = useState<Categories>(initialCategories)

  useEffect(() => {
    async function fetchProducts() {
      const womenResponse = await productService.getByCategoryId(forHerId)
      const menResponse = await productService.getByCategoryId(forHimId)
      const accessoriesResponse
        = await productService.getByCategoryId(accessoriesId)
      const isFavorite = () => {
        return Boolean(Math.random() > 0.5)
      }
      // #TODO handle isFavorite
      setCategories(prev => ({
        ...prev,
        [Category.WOMEN]: (womenResponse.data ?? []).map(product => ({
          id: product.id,
          imageUrl: product.images?.[0]?.imageUrl ?? '',
          brandName: product.name ?? '',
          price: product.price,
          salePrice: product.salePrice,
          averageRating: product.averageRating,
          isFavorite: isFavorite(),
        })),
        [Category.MEN]: (menResponse.data ?? []).map(product => ({
          id: product.id,
          imageUrl: product.images?.[0]?.imageUrl ?? '',
          brandName: product.name ?? '',
          price: product.price,
          salePrice: product.salePrice,
          averageRating: product.averageRating,
          isFavorite: isFavorite(),
        })),
        [Category.ACCESSORIES]: (accessoriesResponse.data ?? []).map(
          product => ({
            id: product.id,
            imageUrl: product.images?.[0]?.imageUrl ?? '',
            brandName: product.name ?? '',
            price: product.price,
            salePrice: product.salePrice,
            averageRating: product.averageRating,
            isFavorite: isFavorite(),
          }),
        ),
      }))
    }
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col text-center pb-9 clamp">
      <h2 className="font-semibold text-2xl sm:text-3xl leading-[50.4px] py-9 tracking-widest">
        {title}
      </h2>
      <div className="text-[var(--baseColorText)] flex justify-center gap-x-10">
        {Object.values(Category).map(category => (
          <span
            key={category}
            className={`${category === activeCategory ? 'menu__active' : ''} menu cursor-pointer whitespace-nowrap text-sm sm:text-lg`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.75}
        breakpoints={{
          480: { slidesPerView: 2.25 },
          768: { slidesPerView: 3.25 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full mt-9"
      >
        {categories[activeCategory].map(product => (
          <SwiperSlide key={product.id} className="w-full">
            <ProductCardComponent {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-end w-full">
        <Button className="w-full sm:w-1/2 sm:w-1/4 mt-2 md:mt-6">
          Переглянути всі
        </Button>
      </div>
    </div>
  )
}

export default ProductSectionComponent
