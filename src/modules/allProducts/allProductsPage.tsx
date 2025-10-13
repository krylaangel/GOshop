import InputField from '@shared/components/InputField'
import ProductCardComponent from '@shared/components/ProductCardComponent'
import React, { useState } from 'react'
import { useProductStore } from '~/store/useProductStore'

export function AllProductsPage() {
  const { categories, setCategories } = useProductStore()
  const [searchTerm, setSearchTerm] = useState('')
  const products = [
    ...(categories['ДЛЯ НЕЇ'] || []),
    ...(categories['ДЛЯ НЬОГО'] || []),
    ...(categories['АКСЕСУАРИ'] || []),
  ]
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  return (
    <div className="clamp">
      <div className="flex justify-center mb-4">
        <div className="w-full md:w-1/2">
          <InputField
            name="search"
            type="text"
            placeholder="Пошук товару"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {filteredProducts.length > 0
        ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map(productCard => (
                <ProductCardComponent
                  key={productCard.id}
                  {...productCard}
                  product={productCard.product}
                />
              ))}
            </div>
          )
        : (
            <div className="flex flex-col gap-y-[10px] items-center justify-center h-full h-screen">
              <p className="text-lg font-light text-[var(--secondarColorMenu)]">Нічого не знайдено</p>
            </div>
          )}
    </div>
  )
}
