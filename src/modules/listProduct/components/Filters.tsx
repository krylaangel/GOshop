import BrandFilter from '@modules/listProduct/components/BrandFilter'
import PriceFilter from '@modules/listProduct/components/PriceFilter'

export function Filters() {
  return (
    <div className="">
      <PriceFilter />
      <BrandFilter />
    </div>

  )
}
