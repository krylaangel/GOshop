import type { ProductCardProps } from '~/shared/components/ProductCardComponent'

import { useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
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
import { categoryService } from '@api/services/categoryService'
import { extractProductsFromTree } from '@home/components/categoryTree'
import { useEffect } from 'react'
import getImageURL from '~/shared/utils/imageUtils'

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
  const fetchProducts = useCallback(async () => {
    const womenResponse = await categoryService.getProductByCategoryId(forHerId)
    const menResponse = await categoryService.getProductByCategoryId(forHimId)

    const accessoriesResponse
        = await categoryService.getProductByCategoryId(accessoriesId)

    const womenProducts = extractProductsFromTree(womenResponse.data)
    const menProducts = extractProductsFromTree(menResponse.data)
    const accessoriesProducts = extractProductsFromTree(accessoriesResponse.data)

    const isFavorite = () => {
      return Boolean(Math.random() > 0.5)
    }

    setCategories(prev => ({
      ...prev,
      [Category.WOMEN]: womenProducts.map(({ product }) => {
        return {
          id: product.id,
          imageUrl: product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png'),
          brandName: product.name ?? '',
          price: product.price,
          salePrice: product.salePrice,
          averageRating: product.averageRating,
          isFavorite: isFavorite(),
          name: product.name ?? '',
          categoryId: product.categoryId ?? '',
        }
      }),
      [Category.MEN]: menProducts.map(({ product }) => ({
        id: product.id,
        imageUrl: product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png'),
        brandName: product.name ?? '',
        price: product.price,
        salePrice: product.salePrice,
        averageRating: product.averageRating,
        isFavorite: isFavorite(),
        name: product.name ?? '',
        categoryId: product.categoryId ?? '',
      })),
      [Category.ACCESSORIES]: accessoriesProducts.map(
        ({ product }) => ({
          id: product.id,
          imageUrl: product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png'),
          brandName: product.name ?? '',
          price: product.price,
          salePrice: product.salePrice,
          averageRating: product.averageRating,
          isFavorite: isFavorite(),
          name: product.name ?? '',
          categoryId: product.categoryId ?? '',
        }),
      ),
    }))
    // #TODO handle isFavorite
  }, [forHerId, forHimId, accessoriesId])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col text-center py-5 sm:py-12 lg:py-20 clamp">
      <h2 className="font-medium text-2xl sm:text-4xl leading-[140%] tracking-widest my-6">
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
        {categories[activeCategory].map(product => (
          <SwiperSlide key={product.id} className="">
            <ProductCardComponent {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-end w-full">
        <Button className="w-full sm:w-1/2 sm:w-1/4 ">
          Переглянути всі
        </Button>
      </div>
    </div>
  )
}

export default ProductSectionComponent
