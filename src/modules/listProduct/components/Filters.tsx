import type { Brand, Product, UUID } from '@api/types'
import BrandFilter from '@modules/listProduct/components/BrandFilter'
import PriceFilter from '@modules/listProduct/components/PriceFilter'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

interface FiltersProps {
  onProductsChange: (products: Product[]) => void
  currentCategoryId: UUID | undefined
  onResetFilters: () => Promise<void>
  selectedBrands: UUID[]
  onSelectedBrandsChange: (brands: UUID[]) => void
  setAllBrands?: (brands: Brand[]) => void
  allBrands: Brand[]

}
export const Filters = forwardRef(({ setAllBrands, allBrands, onProductsChange, currentCategoryId, onResetFilters, selectedBrands, onSelectedBrandsChange }: FiltersProps, ref) => {
  const resetFilters = () => {
    onSelectedBrandsChange([])
    onResetFilters()
  }
  useEffect(() => {
  }, [selectedBrands])
  useImperativeHandle(ref, () => ({
    resetFilters,
  }))

  return (
    <div className="pr-4">
      <PriceFilter />
      {currentCategoryId && (
        <BrandFilter
          selectedBrands={selectedBrands}
          onSelectedBrandsChange={onSelectedBrandsChange}
          onProductsChange={onProductsChange}
          currentCategoryId={currentCategoryId}
          onResetFilters={onResetFilters}
          allBrands={allBrands}
          setAllBrands={setAllBrands}
        />
      )}
    </div>

  )
})
