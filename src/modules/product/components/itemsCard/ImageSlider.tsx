import { useState } from 'react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import getImageURL from '~/shared/utils/imageUtils'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface ImageSliderProps {
  imageUrls: (string | null)[] | undefined
  brandName: string
}

export default function ImageSlider({ imageUrls, brandName }: ImageSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const defaultImage = getImageURL('default-product-card.png')
  if (!imageUrls || imageUrls.length === 0) {
    imageUrls = [defaultImage]
  }
  return (
    <div className="col-span-1 gap-y-2 flex flex-col w-full">
      <div
        style={{ position: 'sticky', top: '0', bottom: '20px' }}
        className="hidden col-span-1 gap-y-4 md:flex flex-col"
      >
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full max-h-[762px] mySwiper"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                className="img-style w-full h-auto object-cover rounded-[10px]"
                src={url ?? defaultImage}
                alt={brandName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4.25}
          spaceBetween={10}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            950: { slidesPerView: 5.3 },
            1024: { slidesPerView: 6 },
          }}
          className="w-full"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-[104px] object-cover rounded-[10px] cursor-pointer w-full"
                src={url ?? defaultImage}
                alt={`${brandName}-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ position: 'sticky', top: '0' }} className="md:hidden w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                className="w-full h-[429px] object-cover rounded-[10px]"
                src={url ?? defaultImage}
                alt={`${brandName}-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
