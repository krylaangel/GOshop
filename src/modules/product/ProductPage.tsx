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
    return <div>Loading...</div>
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

  return (
    <div className="clamp">
      <div className="h-15 items-center flex">
        <div className="text-black font-light flex justify-start gap-x-2 sm:gap-x-4 md:gap-x-6">
          {Object.values(Category).map(category => (
            <div
              key={category}
              className={`${category === activeCategory ? 'menu__active' : ''} menu cursor-pointer whitespace-nowrap text-xs md:text-sm`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {activeCategory === Category.ABOUT && (
        <ProductAbout
          imageUrls={product.images?.map(image => image.imageUrl)}
          brandName={brandName}
          price={product.price}
          salePrice={product.salePrice}
          averageRating={product.averageRating}
          isFavorite={isFavorite}
        />
      )}

      {activeCategory === Category.CHARACTERISTICS && (
        <Characteristics product={{ price: product.price, salePrice: product.salePrice, isFavorite }} />
      )}

      {activeCategory === Category.REVIEWS && (
        <Reviews product={{ price: product.price, salePrice: product.salePrice, isFavorite }} />
      )}

      <h2 className="font-medium text-[36px] leading-[140%] tracking-[0.1em] text-center pt-10">
        Схожі товари
      </h2>

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
        {similarProducts.map(similar => (
          <SwiperSlide key={similar.id} className="w-full">
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
