import type { JSX } from 'react'
import Button from '~/shared/components/Button/Button'
import getImageURL from '~/shared/utils/imageUtils'

interface HeroProps {
  backgroundImageURL: string
  mainImage: string | JSX.Element
  mainImageClassName?: string
}

function HeroSection({
  backgroundImageURL,
  mainImage,
  mainImageClassName,
}: HeroProps) {
  return (
    <section
      style={{
        backgroundImage: `
            linear-gradient(to right, rgba(2, 0, 66, 0.3), rgba(2, 0, 66, 0.3)),
            url(${getImageURL(backgroundImageURL)})`,
      }}
      className="h-[400px] sm:h-[580px] hero-section"
    >
      <div className="clamp flex w-full h-full max-w-full aspect-[16/9]">
        <div className="max-w-[446px] flex mt-[148px] sm:mt-0 sm:justify-center flex-col items-center">
          {typeof mainImage === 'string'
            ? (
                <img src={mainImage} alt="Main" className={mainImageClassName} />
              )
            : (
                mainImage
              )}
          <h1 className="text-xl sm:text-[40px] text-white text-center font-bold leading-[120%] py-6 sm:py-[49px]">
            Найбільший вибір товарів для спорту та активного відпочинку
          </h1>
          <Button
            variant="primary"
            className="button px-22 py-2.5 font-medium text-[14px] leading-[19.6px]"
            onClick={() => (window.location.href = '#')}
          >
            До каталогу
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
