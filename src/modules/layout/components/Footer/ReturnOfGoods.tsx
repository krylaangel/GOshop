import Banner from '~/modules/home/components/BannerComponent'
import getImageURL from '~/shared/utils/imageUtils'
import styles from './FooterLink.module.css'
import SectionIntro from './LinkSections/SectionIntro'
import SectionLists from './LinkSections/SectionLists'

function ReturnOfGoods() {
  return (
    <>
      <SectionIntro title="Повернення товару">
        <p className="py-5 sm:py-10">
          Вітаємо у розділі «Повернення» інтернет-магазину
          <span className={styles.goSpan}>GO</span>
          . Ми прагнемо зробити ваш
          досвід покупок максимально зручним, тому пропонуємо прозору та просту
          політику повернення товарів.
        </p>
      </SectionIntro>
      <SectionLists
        className="pb-6"
        additionalClass="list-disc"
        lists={[
          {
            title: 'Умови повернення',
            paragraph:
              'Якщо ви залишилися незадоволені замовленням або виявили дефект товару,\n'
              + 'ви маєте право повернути його згідно з такими умовами:',
            items: [
              <>
                <span className={styles.listSpan}>Термін повернення </span>
                {' '}
                —
                протягом
                <span className={styles.listSpan}>14 днів</span>
                {' '}
                з
                моменту отримання замовлення.
              </>,
              <>
                <span className={styles.listSpan}>Стан товару</span>
                — товар має
                бути
                {' '}
                <span className={styles.listSpan}>
                  новим, без слідів використання, з усіма бірками
                  {' '}
                </span>
                та
                {' '}
                <span className={styles.listSpan}>в оригінальній упаковці</span>
                .
              </>,
              <>
                <span className={styles.listSpan}>Документи</span>
                {' '}
                — обов’язково
                надайте
                <span className={styles.listSpan}>чек</span>
                {' '}
                або
                підтвердження покупки.
              </>,
            ],
          },
        ]}
      >
      </SectionLists>

      <SectionLists
        className="bg-[var(--secondaryBgColor)] py-5 sm:py-10 items-center w-full"
        lists={[
          {
            title: 'Як повернути товар',
            items: [
              <>Щоб ініціювати повернення, дотримуйтесь простого алгоритму:</>,
              <>
                <span className={styles.listSpan}>Зв’яжіться з нами</span>
                —
                зверніться до нашої служби підтримки, вказавши
                <span className={styles.listSpan}> номер замовлення</span>
                .
              </>,
              <>
                <span className={styles.listSpan}>Підготуйте товар</span>
                {' '}
                —
                упакуйте товар в оригінальну упаковку, додайте всі документи та
                заповнену форму повернення (ми її надішлемо).
              </>,
              <>
                <span className={styles.listSpan}>Відправка</span>
                {' '}
                — відправте
                товар через
                <span className={styles.listSpan}>Нову пошту</span>
                {' '}
                на адресу, зазначену у формі.
              </>,
            ],
          },
        ]}
      >
        <p
          className={`${styles.textParagraph} pt-5 sm:pt-10 text-lg font-light leading-[140%] text-[var(--colorMenu)]`}
        >
          Витрати на доставку покриває покупець
          {' '}
          <span className={styles.listSpan}>
            окрім випадків повернення через дефект або помилкову комплектацію.
          </span>
        </p>
      </SectionLists>
      <div className="clamp py-[30px]">
        <h2 className="font-bold text-xl leading-[140%]">Повернення коштів</h2>
        <p className={styles.textParagraph}>
          Після отримання та перевірки товару ми повернемо кошти протягом
          {' '}
          <span className={styles.listSpan}>7 робочих днів</span>
          .
        </p>
        <p className={styles.textParagraph}>
          Повернення здійснюється
          {' '}
          <span className={styles.listSpan}>тим самим способом</span>
          , яким була
          оплачена покупка.
        </p>
      </div>
      <Banner imageUrl={getImageURL('returnOfGods.png')} />
    </>
  )
}

export default ReturnOfGoods
