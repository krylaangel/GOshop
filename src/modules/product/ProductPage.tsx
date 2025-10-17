import type { ColorsOption } from '@shared/constants/colors'
import type { SizesOption } from '@shared/constants/sizes'
import { ProductContext } from '@product/ProductContext'
import Breadcrumbs from '@shared/components/Breadcrumbs'
import SkeletonProduct from '@shared/skeleton/SkeletonProduct'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  } = useProductView(true, true)
  const [selectedSize, setSelectedSize] = useState<SizesOption | null>(null)
  const [selectedColor, setSelectedColor] = useState<ColorsOption | null>(null)
  const [reviews, setReviews] = useState(product?.reviews || [])

  useEffect(() => {
    if (product?.reviews) {
      const sorted = [...product.reviews].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setReviews(sorted)
    }
  }, [product])

  const [activeCategory, setActiveCategory] = useState<Category>(Category.ABOUT)
  const navigate = useNavigate()

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
  const reviewCount = reviews.length ?? 0

  const tabLabels = {
    [Category.ABOUT]: 'Усе про товар',
    [Category.CHARACTERISTICS]: 'Характеристики',
    [Category.REVIEWS]: `Відгуки${reviewCount > 0 ? ` (${reviewCount})` : ''}`,

  }

  return (
    <div className="clamp mt-5">
      {product.categoryId && <Breadcrumbs categoryId={product.categoryId} productName={product.name ?? undefined} />}
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
      <ProductContext.Provider value={{ product, reviewCount }}>
        {activeCategory === Category.ABOUT && (
          <ProductAbout
            brandName={brandName}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        )}

        {activeCategory === Category.CHARACTERISTICS && (
          <Characteristics
            selectedColor={selectedColor}
            brandName={brandName}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setSelectedColor={setSelectedColor}
          />
        )}

        {activeCategory === Category.REVIEWS && (
          <Reviews
            selectedColor={selectedColor}
            brandName={brandName}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            setSelectedColor={setSelectedColor}
            reviews={reviews}
            onAddReview={newReview => setReviews([newReview, ...reviews])}
          />
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
          <SwiperSlide key={similar.id} className="mr-2">
            <ProductCardComponent
              id={similar.id}
              imageUrl={similar.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png')}
              brandName={similar.name ?? ''}
              price={similar.price}
              salePrice={similar.salePrice}
              averageRating={similar.averageRating ?? 0}
              product={product}
              name={similar.name ?? ''}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-end w-full mb-10">
        <Button className="w-full sm:w-1/4 mt-2 md:mt-6" onClick={() => navigate('/allProducts')}>
          Переглянути всі
        </Button>
      </div>
    </div>
  )
}

export default ProductPage
