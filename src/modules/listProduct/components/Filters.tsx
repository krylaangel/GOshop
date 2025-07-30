import PriceFilter from '@modules/listProduct/components/PriceFilter'
import BrandFilter from "@modules/listProduct/components/BrandFilter";

export function Filters() {
  return (
    <div className="">
      <PriceFilter />
      <BrandFilter />
    </div>

  )
}
