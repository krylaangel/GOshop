import { ProductContext } from '@product/ProductContext'
import SkeletonProduct from '@product/skeleton/SkeletonProduct'
import Breadcrumbs from '@shared/components/Breadcrumbs'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button from '~/shared/components/Button/Button'
import ProductCardComponent from '~/shared/components/ProductCardComponent'
import getImageURL from '~/shared/utils/imageUtils'
import useProductView from './hooks/useProductView'
import Characteristics from './itemsCard/Characteristics'
import ProductAbout from './itemsCard/ProductAbout'
import Reviews from './itemsCard/Reviews'

enum Category {
  ABOUT = 'Усе про товар',
  CHARACTERISTICS = 'Характеристики',
  REVIEWS = 'Відгуки',
}

function ProductPage() {
  const {
    product,
    isLoading,
    error,
    brandName,
    similarProducts,
  } = useProductView(true, true, true)

  const [activeCategory, setActiveCategory] = useState<Category>(Category.ABOUT)
  const [isFavorite] = useState(() => Boolean(Math.random()))

  if (isLoading)
    return <SkeletonProduct />
  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    )
  }
  if (!product)
    return <div>Product not found</div>
  const reviewCount = product.reviews?.length ?? 0

  const tabLabels = {
    [Category.ABOUT]: 'Усе про товар',
    [Category.CHARACTERISTICS]: 'Характеристики',
    [Category.REVIEWS]: `Відгуки${reviewCount > 0 ? ` (${reviewCount})` : ''}`,
  }

  return (
    <div className="clamp">
      <Breadcrumbs />
      <div className="h-15 items-center flex">
        <div className="text-black font-light flex justify-start gap-x-2 sm:gap-x-4 md:gap-x-6">
          {Object.values(Category).map(category => (
            <div
              key={category}
              className={`${category === activeCategory ? 'menu__active' : ''} menu cursor-pointer whitespace-nowrap text-xs md:text-sm`}
              onClick={() => setActiveCategory(category)}
            >
              {tabLabels[category]}
            </div>
          ))}
        </div>
      </div>
      <ProductContext.Provider value={{ product, isFavorite, reviewCount }}>
        {activeCategory === Category.ABOUT && (
          <ProductAbout brandName={brandName} />
        )}

        {activeCategory === Category.CHARACTERISTICS && (
          <Characteristics brandName={brandName} />
        )}

        {activeCategory === Category.REVIEWS && (
          <Reviews brandName={brandName} />
        )}
      </ProductContext.Provider>
      <h2 className="font-medium text-[36px] leading-[140%] tracking-[0.1em] text-center pt-10">
        Схожі товари
      </h2>

      <Swiper
        slidesPerView={1.25}
        breakpoints={{
          480: { slidesPerView: 2.25, spaceBetween: 4 },
          768: { slidesPerView: 3, spaceBetween: 8 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        className="w-full mt-5"
      >
        {similarProducts.map(similar => (
          <SwiperSlide key={similar.id} className="">
            <ProductCardComponent
              id={similar.id}
              imageUrl={similar.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png')}
              brandName={similar.name ?? ''}
              price={similar.price}
              salePrice={similar.salePrice}
              averageRating={similar.averageRating}
              isFavorite={isFavorite}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-end w-full mb-10">
        <Button className="w-full sm:w-1/4 mt-2 md:mt-6">
          Переглянути всі
        </Button>
      </div>
    </div>
  )
}

export default ProductPage
