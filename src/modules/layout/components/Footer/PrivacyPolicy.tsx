import Banner from '~/modules/home/components/BannerComponent'
import getImageURL from '~/shared/utils/imageUtils'
import styles from './FooterLink.module.css'
import SectionIntro from './LinkSections/SectionIntro'
import SectionLists from './LinkSections/SectionLists'

export function PrivacyPolicy() {
  return (
    <>
      <SectionIntro title="Політика конфіденційності">
        <p className={styles.textParagraph}>
          Ми в
          {' '}
          <span className={styles.goSpan}>GO</span>
          {' '}
          поважаємо вашу
          приватність і дбаємо про захист ваших персональних даних.
        </p>
      </SectionIntro>

      <SectionLists
        additionalClass="list-disc"
        lists={[
          {
            title: 'Які дані ми збираємо',
            items: [
              <>Ім’я, прізвище, по батькові</>,
              <>Контактний номер телефону</>,
              <>Електронна пошта</>,
              <>Адреса доставки</>,
            ],
          },
        ]}
      >
      </SectionLists>

      <SectionLists
        className="pt-6"
        additionalClass="list-disc"
        lists={[
          {
            title: 'Які дані ми збираємо',
            items: [
              <>Ім’я, прізвище, по батькові</>,
              <>Контактний номер телефону</>,
              <>Електронна пошта</>,
              <>Адреса доставки</>,
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
            title: 'Мета збору даних',
            items: [
              <>Для оформлення та виконання ваших замовлень</>,
              <>Для інформування вас про статус замовлення</>,
              <>Для надання консультацій та підтримки клієнтів</>,
              <>Для покращення роботи сайту та сервісу</>,
            ],
          },
        ]}
      >
      </SectionLists>

      <div className="bg-[var(--secondaryBgColor)] py-5 sm:pt-6 sm:pb-10 items-center w-full">
        <SectionLists
          additionalClass="list-disc"
          lists={[
            {
              title: 'Захист інформації',
              items: [
                <>Ваші дані зберігаються на захищених серверах.</>,
                <>
                  Ми не передаємо ваші особисті дані третім особам без вашої
                  згоди, за винятком випадків, передбачених законом.
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
              title: 'Права користувача',
              items: [
                <>
                  Ви маєте право змінювати, уточнювати або видаляти свої
                  персональні дані.
                </>,
                <>Ви можете відмовитися від розсилок у будь-який момент.</>,
              ],
            },
          ]}
        >
        </SectionLists>
        <SectionLists
          additionalClass="list-disc"
          lists={[
            {
              title: 'Зміни до Політики конфіденційності',
              items: [
                <>Ми можемо періодично оновлювати цю політику.</>,
                <>Усі зміни публікуються на цій сторінці.</>,
              ],
            },
          ]}
        >
        </SectionLists>
      </div>
      <Banner imageUrl={getImageURL('privacyPolicy.png')} />
    </>
  )
}

export default PrivacyPolicy
