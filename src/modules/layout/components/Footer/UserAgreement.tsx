import Banner from '~/modules/home/components/BannerComponent'
import getImageURL from '~/shared/utils/imageUtils'
import styles from './FooterLink.module.css'
import SectionIntro from './LinkSections/SectionIntro'
import SectionLists from './LinkSections/SectionLists'

export function UserAgreement() {
  return (
    <>
      <SectionIntro title="Угода користувача">
        <p className={styles.textParagraph}>
          Ласкаво просимо на сайт інтернет-магазину
          {' '}
          <span className={styles.goSpan}>GO</span>
          !
        </p>
        <p className={styles.textParagraph}>
          Просимо уважно ознайомитися з правилами користування нашим сайтом.
        </p>
      </SectionIntro>
      <SectionLists
        className="pt-6"
        additionalClass="list-disc"
        lists={[
          {
            title: 'Основні положення',
            items: [
              <>
                Використовуючи сайт, ви погоджуєтеся з умовами цієї Угоди
                користувача.
              </>,
              <>
                Адміністрація сайту залишає за собою право змінювати умови
                використання без попереднього повідомлення. Оновлені правила
                набирають чинності з моменту їх публікації.
              </>,
            ],
          },
        ]}
      >
      </SectionLists>
      <SectionLists
        className="py-6"
        additionalClass="list-disc"
        lists={[
          {
            title: 'Реєстрація користувача',
            items: [
              <>
                Для оформлення замовлення користувач може створити акаунт або
                здійснити покупку без реєстрації.
              </>,
              <>
                Під час реєстрації або оформлення замовлення користувач
                зобов’язується надавати достовірну та актуальну інформацію.
              </>,
            ],
          },
        ]}
      >
      </SectionLists>

      <div className="bg-[var(--secondaryBgColor)] py-5 sm:py-10 items-center w-full space-y-6">
        <h2 className={`${styles.mainTitle} clamp`}>
          Права та обов'язки сторін
        </h2>
        <SectionLists
          additionalClass="list-disc"
          lists={[
            {
              title: 'Користувач має право:',
              items: [
                <>Оформлювати замовлення на сайті.</>,
                <>
                  Отримувати актуальну інформацію про товари, доставку та
                  оплату.
                </>,
                <>Звертатися за підтримкою у разі виникнення питань.</>,
              ],
            },
          ]}
        >
        </SectionLists>

        <SectionLists
          additionalClass="list-disc"
          lists={[
            {
              title: 'Користувач зобов\'язується:',
              items: [
                <>Оформлювати замовлення на сайті.</>,
                <>Не використовувати сайт для протиправних цілей.</>,
                <>
                  Не порушувати права інших користувачів та адміністрації сайту.
                </>,
              ],
            },
          ]}
        >
        </SectionLists>
        <SectionLists
          additionalClass="list-disc"
          lists={[
            {
              title: 'Адміністрація має право:',
              items: [
                <>Оформлювати замовлення на сайті.</>,
                <>
                  Вносити зміни в асортимент, ціни та умови обслуговування без
                  попередження.
                </>,
                <>
                  Блокувати доступ користувачам, які порушують правила сайту.
                </>,
              ],
            },
          ]}
        >
        </SectionLists>
        <SectionLists
          additionalClass="list-disc"
          lists={[
            {
              title: 'Відповідальність',
              items: [
                <>Оформлювати замовлення на сайті.</>,
                <>
                  Інтернет-магазин
                  {' '}
                  <span className={styles.goSpan}>GO</span>
                  {' '}
                  не
                  несе відповідальності за затримки або збої в обслуговуванні,
                  спричинені форс-мажорними обставинами.
                </>,
              ],
            },
          ]}
        >
        </SectionLists>
      </div>
      <Banner imageUrl={getImageURL('userAgreement.png')} />
    </>
  )
}

export default UserAgreement
