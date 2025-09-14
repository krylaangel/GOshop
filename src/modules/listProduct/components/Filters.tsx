import type { Product, UUID } from '@api/types'
import BrandFilter from '@modules/listProduct/components/BrandFilter'
import PriceFilter from '@modules/listProduct/components/PriceFilter'
import { forwardRef, useImperativeHandle } from 'react'

interface FiltersProps {
  onProductsChange: (products: Product[]) => void
  currentCategoryId: UUID | undefined
  onResetFilters: () => Promise<void>
  selectedBrands: UUID[]
  onSelectedBrandsChange: (brands: UUID[]) => void
}
export const Filters = forwardRef(({ onProductsChange, currentCategoryId, onResetFilters, selectedBrands, onSelectedBrandsChange }: FiltersProps, ref) => {
  const resetFilters = () => {
    onSelectedBrandsChange([])
    onResetFilters()
  }

  useImperativeHandle(ref, () => ({
    resetFilters,
  }))

  return (
    <div className="pr-4 pb-4">
      <PriceFilter />
      {currentCategoryId && (
        <BrandFilter
          selectedBrands={selectedBrands}
          onSelectedBrandsChange={onSelectedBrandsChange}
          onProductsChange={onProductsChange}
          currentCategoryId={currentCategoryId}
          onResetFilters={onResetFilters}
        />
      )}
    </div>
  )
})
