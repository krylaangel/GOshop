import Icons from '~/assets/images/icon-sprite.svg'

function BenefitsSection() {
  return (
    <section className="clamp bg-[var(--secondaryBgColor)] flex-center flex-col py-6 lg:py-10 gap-4">
      <h3 className="font-bold text-[var(--colorTextOther)] text-xl text-center sm:text-4xl leading-[50.4px] tracking-normal">
        4 причини замовити у нас
      </h3>
      <div className="w-full flex-center flex-col sm:flex-row gap-2 sm:gap-4 sm:pt-12 justify-center">
        <div className="benefits-item">
          <svg className="h-[50px] w-[50px] sm:h-[66px] sm:w-[66px]">
            <use href={`${Icons}#benefits_worldBrands`} />
          </svg>
          <p>Світові бренди</p>
        </div>
        <div className="benefits-item">
          <svg className="h-[50px] w-[50px] sm:h-[66px] sm:w-[66px]">
            <use href={`${Icons}#benefits_swapReturn`} />
          </svg>
          <p>Обмін та повернення</p>
        </div>

        <div className="benefits-item">
          <svg className="h-[50px] w-[50px] sm:h-[66px] sm:w-[66px]">
            <use href={`${Icons}#benefits_delivery`} />
          </svg>
          <p>Швидка доставка</p>
        </div>

        <div className="benefits-item">
          <svg className="h-[50px] w-[50px] sm:h-[66px] sm:w-[66px]">
            <use href={`${Icons}#benefits_receive`} />
          </svg>
          <p>Оплата при отриманні</p>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
