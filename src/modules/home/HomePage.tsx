import type { UUID } from '~/api/types'
import Icons from '~/assets/images/icon-sprite.svg'
import getImageURL from '~/shared/utils/imageUtils'
import Banner from './components/BannerComponent'
import BenefitsSection from './components/BenefitsSection'
import BrandsSection from './components/BrandsSection'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'
import FAQSection from './components/FAQSection'
import HeroSection from './components/HeroSection'
import OfferSection from './components/OfferSection'
import ProductSectionComponent from './components/ProductSection'

function HomePage() {
  return (
    <div>
      <HeroSection
        backgroundImageURL="hero1.png"
        mainImage={(
          <svg className="md:w-36 md:h-20 w-[99px] h-[56px]">
            <use href={`${Icons}#logo`} />
          </svg>
        )}
      >
      </HeroSection>
      <BrandsSection />
      <CategoriesSection />
      <ProductSectionComponent
        forHerId={'38041709-5590-41da-888b-f0ff5b59319c' as UUID}
        forHimId={'a1351a42-1cbd-4a1e-aa2e-f4f53081ff77' as UUID}
        accessoriesId={'b1902fc6-bd4e-4a86-8db1-b44cbd1807b8' as UUID}
        title="Обирай новинки"
      />
      <Banner imageUrl={getImageURL('banner.jpg')} />
      <ProductSectionComponent
        forHerId={'0241c91a-b336-4dbb-817d-7915b8da7941' as UUID}
        forHimId={'7c513ee0-956c-4b98-92ce-f6db8cf2a7be' as UUID}
        accessoriesId={'55e8195e-2de2-4238-9745-cec29f270bf2' as UUID}
        title="Популярні товари"
      />
      <BenefitsSection />
      <OfferSection />
      <FAQSection />
    </div>
  )
}
export default HomePage
