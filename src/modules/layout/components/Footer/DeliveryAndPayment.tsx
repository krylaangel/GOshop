import Banner from '~/modules/home/components/BannerComponent'
import getImageURL from '~/shared/utils/imageUtils'
import styles from './FooterLink.module.css'
import SectionIntro from './LinkSections/SectionIntro'
import SectionLists from './LinkSections/SectionLists'

export function DeliveryAndPayment() {
  return (
    <>
      <SectionIntro title="Доставка і оплата">
        <p className="py-5 sm:py-10">
          Ласкаво просимо до розділу «Доставка і оплата» інтернет-магазину
          {' '}
          <span className={styles.goSpan}>GO</span>
          . Тут ви знайдете всю
          необхідну інформацію про варіанти доставки та способи оплати, доступні
          для наших клієнтів.
        </p>
      </SectionIntro>
      <SectionLists
        className="pb-6"
        additionalClass="list-disc"
        lists={[
          {
            title: 'Контактні дані',
            paragraph: 'Щоб оформити замовлення, будь ласка, вкажіть:',
            items: [
              <>Прізвище</>,
              <>Ім’я</>,
              <>По батькові</>,
              <>Номер телефону</>,
              <>Електронну пошту</>,
            ],
          },
        ]}
      >
        <p className={styles.textParagraph}>
          Якщо ви маєте акаунт, просто увійдіть у профіль, і форма замовлення
          заповниться автоматично.
        </p>
      </SectionLists>
      <div className="bg-[var(--secondaryBgColor)] py-5 sm:py-10 items-center w-full">
        <SectionLists
          additionalClass="pl-0!"
          lists={[
            {
              title: 'Доставка',
              items: [
                <>
                  Ми здійснюємо доставку за допомогою сервісу Нова Пошта та
                  пропонуємо такі варіанти отримання:
                </>,
                <>
                  <span className={styles.listSpan}>
                    Доставка до відділення
                  </span>
                  {' '}
                  — обирайте зручне відділення у вашому місті.
                </>,
                <>
                  <span className={styles.listSpan}>Кур'єрська доставка</span>
                  {' '}
                  —
                  доставимо замовлення прямо до вашого дому чи офісу.
                </>,
                <>
                  <span className={styles.listSpan}>Доставка до поштомату</span>
                  {' '}
                  — забирайте посилку у зручний для вас час через найближчий
                  поштомат.
                  {' '}
                </>,
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
              title: 'Умови відправлення:',
              items: [
                <>
                  Замовлення, оформлені до 13:00, відправляються в той же день.
                </>,
                <>
                  Замовлення після 13:00 — відправляються наступного робочого
                  дня.
                </>,
              ],
            },
          ]}
        >
        </SectionLists>
      </div>
      <SectionLists
        className="items-center w-full py-5 sm:py-10"
        additionalClass="list-disc marker:[var(--baseColorText)]"
        lists={[
          {
            title: 'Оплата',
            paragraph: 'Для вашої зручності доступні такі способи оплати:',
            items: [
              <>
                <span className={styles.listSpan}>Оплата при отриманні</span>
                {' '}
                —
                комісія складає 20 грн + 3,2% від суми замовлення.
              </>,
              <>
                <span className={styles.listSpan}>
                  Онлайн оплата банківською карткою
                </span>
                — швидко, безпечно та без додаткових комісій.
              </>,
              <>
                <span className={styles.listSpan}>
                  Оплата через електронні гаманці
                </span>
                (Apple Pay, Google Pay) — для ще більш зручної покупки.
              </>,
            ],
          },
        ]}
      >
        <p
          className={`${styles.textParagraph} pt-5 sm:pt-10 text-lg font-light leading-[140%] text-[var(--colorMenu)]`}
        >
          Наші умови доставки та оплати розроблені так, щоб ваш шопінг у
          <span className={styles.listSpan}>GO</span>
          {' '}
          був максимально простим,
          комфортним і безпечним.
        </p>
      </SectionLists>
      <Banner imageUrl={getImageURL('deliveryAndPayment.png')} />
    </>
  )
}

export default DeliveryAndPayment
