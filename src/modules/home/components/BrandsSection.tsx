import Icons from '../../../assets/images/icon-sprite.svg'

function BrandsSection() {
  return (
    <section className="py-5 sm:py-10 bg-[var(--secondaryBgColor)] flex clamp items-center justify-between">
      <svg className="h-14 sm:h-18">
        <use href={`${Icons}#brands_puma`}></use>
      </svg>
      <svg className="h-14 sm:h-18">
        <use href={`${Icons}#brands_newBalance`}></use>
      </svg>
      <svg className="h-14 sm:h-18">
        <use href={`${Icons}#brands_asics`}></use>
      </svg>
      <svg className="h-14 sm:h-18">
        <use href={`${Icons}#brands_adidas`}></use>
      </svg>
      <svg className="h-14 sm:h-18">
        <use href={`${Icons}#brands_nike`}></use>
      </svg>
      <svg className="h-14 sm:h-18">
        <use href={`${Icons}#brands_fila`}></use>
      </svg>
    </section>
  )
}

export default BrandsSection
