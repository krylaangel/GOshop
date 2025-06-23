import Icons from '~/assets/images/icon-sprite.svg'
import Banner from '~/modules/home/components/BannerComponent'
import getImageURL from '~/shared/utils/imageUtils'
import styles from './FooterLink.module.css'
import SectionIntro from './LinkSections/SectionIntro'
import SectionLists from './LinkSections/SectionLists'

function About() {
  return (
    <div>
      <SectionIntro title="Про компанію">
        <p className="py-5 sm:py-10">
          <span className={styles.goSpan}>GO</span>
          — це онлайн-магазин
          спортивного одягу, взуття та аксесуарів, створений для тих, хто обирає
          активний стиль життя. Ми зібрали якісний асортимент товарів, щоб
          забезпечити комфорт, продуктивність і стиль як під час тренувань, так
          і в повсякденному житті.
        </p>
      </SectionIntro>
      <div className="clamp flex flex-col sm:flex-row bg-[var(--secondaryBgColor)] py-5 sm:py-10 items-center w-full gap-x-4">
        <div className="space-y-4">
          <p className={styles.textParagraph}>
            У
            {' '}
            <span className={styles.goSpan}>GO</span>
            {' '}
            ви знайдете продукцію
            від провідних світових брендів —
            {' '}
            <span className="text-black text-xl font-normal">
              Nike, Adidas, Puma, Reebok, Fila, Kappa
            </span>
            та інших, перевірених часом і мільйонами користувачів.
          </p>
          <p className={styles.textParagraph}>
            <span className="text-black text-xl font-normal">Наша мета</span>
            {' '}
            —
            мотивувати вас рухатися вперед, знаходити натхнення у спорті та
            обирати речі, які підкреслюють вашу індивідуальність і відповідають
            вашим потребам.
          </p>
        </div>
        <div className="space-y-2 sm:space-y-4 flex justify-between w-full sm:w-fit sm:flex-col py-5 sm:py-0">
          <svg className={styles.sizeSVG}>
            <use height={51} href={`${Icons}#brands_puma`}></use>
          </svg>
          <svg className={styles.sizeSVG}>
            <use height={51} href={`${Icons}#brands_newBalance`}></use>
          </svg>
          <svg className={styles.sizeSVG}>
            <use height={51} href={`${Icons}#brands_asics`}></use>
          </svg>
        </div>
        <div className="space-y-2 sm:space-y-4 flex justify-between w-full sm:w-fit sm:flex-col">
          <svg className={styles.sizeSVG}>
            <use height={51} href={`${Icons}#brands_adidas`}></use>
          </svg>
          <svg className={styles.sizeSVG}>
            <use height={51} href={`${Icons}#brands_nike`}></use>
          </svg>
          <svg className={styles.sizeSVG}>
            <use height={51} href={`${Icons}#brands_fila`}></use>
          </svg>
        </div>
      </div>
      <SectionLists
        className="py-6"
        additionalClass="list-disc marker:[var(--baseColorText)] pl-8"
        lists={[
          {
            title: 'У нас ви знайдете:',
            items: [
              <>
                <span className={styles.listSpan}>спортивне взуття </span>
                для
                бігу, фітнесу, тренажерного залу та прогулянок,
              </>,
              <>
                <span className={styles.listSpan}>спортивний одяг</span>
                {' '}
                із
                дихаючих матеріалів — спортивні костюми, футболки, шорти, штани
                та інші речі, що ідеально підходять як для тренувань, так і для
                активного відпочинку;
              </>,
              <>
                <span className={styles.listSpan}>аксесуари</span>
                , які
                доповнять ваш спортивний образ.
              </>,
            ],
          },
        ]}
      >
        <p className="pt-5 sm:pt-10 text-lg font-light leading-[140%] text-[var(--colorMenu)]">
          <span className="font-bold">Зверніть увагу:</span>
          {' '}
          сайт створено
          виключно в навчальних цілях. Придбати товари на ньому неможливо.
        </p>
      </SectionLists>

      <Banner imageUrl={getImageURL('about-section.png')} />
    </div>
  )
}

export default About
