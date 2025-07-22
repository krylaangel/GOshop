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
        forHerId={'5582d88b-cf73-41ad-9b96-2505c7ae674a' as UUID}
        forHimId={'c209f70d-3d66-4a79-8724-7309726eba25' as UUID}
        accessoriesId={'8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID}
        title="Обирай новинки"
      />
      <Banner imageUrl={getImageURL('banner.jpg')} />
      <ProductSectionComponent
        forHerId={'5582d88b-cf73-41ad-9b96-2505c7ae674a' as UUID}
        forHimId={'c209f70d-3d66-4a79-8724-7309726eba25' as UUID}
        accessoriesId={'8dad40f8-af15-4478-a60e-22f6ffc6717e' as UUID}
        title="Популярні товари"
      />
      <BenefitsSection />
      <OfferSection />
      <FAQSection />
    </div>
  )
}
export default HomePage
