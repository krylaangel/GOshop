import type { Product, UUID } from '@api/types'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import BrandFilter from './BrandFilter'
import PriceFilter from './PriceFilter'

interface FiltersProps {
  products: Product[]
  filteredProducts: Product[]
  currentCategoryId?: UUID
  selectedBrands: UUID[]
  onSelectedBrandsChange: (brands: UUID[]) => void
  onProductsChange: (products: Product[]) => void
  onResetFilters: () => Promise<void>
}

export const Filters = forwardRef(
  (
    {
      products,
      filteredProducts,
      currentCategoryId,
      selectedBrands,
      onSelectedBrandsChange,
      onProductsChange,
      onResetFilters,
    }: FiltersProps,
    ref,
  ) => {
    const MIN = 0
    const MAX = 50000
    const [priceRange, setPriceRange] = useState<[number, number]>([MIN, MAX])

    const resetFilters = () => {
      onSelectedBrandsChange([])
      setPriceRange([MIN, MAX])
      onResetFilters()
    }

    useImperativeHandle(ref, () => ({
      resetFilters,
    }))

    useEffect(() => {
      let filtered = products

      // Фильтр по брендам
      if (selectedBrands.length > 0) {
        filtered = filtered.filter(p => p.brandId && selectedBrands.includes(p.brandId))
      }

      // Фильтр по цене
      filtered = filtered.filter((p) => {
        const price = p.salePrice ?? p.price ?? 0
        return price >= priceRange[0] && price <= priceRange[1]
      })

      onProductsChange(filtered)
    }, [products, selectedBrands, priceRange])

    return (
      <div className="pr-4 pb-4">
        <PriceFilter priceRange={priceRange} onPriceChange={setPriceRange} />
        {currentCategoryId && (
          <BrandFilter
            selectedBrands={selectedBrands}
            onSelectedBrandsChange={onSelectedBrandsChange}
            currentCategoryId={currentCategoryId}
          />
        )}
      </div>
    )
  },
)
