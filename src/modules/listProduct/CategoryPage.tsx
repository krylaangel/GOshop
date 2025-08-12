import type { Brand, Product, UUID } from '@api/types'
import { categoryService } from '@api/services/categoryService'
import { extractProductsFromTree } from '@home/components/categoryTree'
import { ClearBrandFilterButton } from '@modules/listProduct/components/ClearBrandFilterButton'
import { ClearFiltersButton } from '@modules/listProduct/components/ClearFiltersButton'
import { Filters } from '@modules/listProduct/components/Filters'
import Breadcrumbs from '@shared/components/Breadcrumbs'
import ProductCardComponent from '@shared/components/ProductCardComponent'
import { categoryUUIDMap } from '@shared/constants/categoryUUIDMap'
import { ERROR_MESSAGES } from '@shared/constants/errors'
import getImageURL from '@shared/utils/imageUtils'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

type ProductWithCategoryTree = Product & { categoryTree?: string[] }

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const categoryUUID = categoryId ? categoryUUIDMap[categoryId] : undefined
  const [productCountFromApi, setProductCountFromApi] = useState<number>()
  const [selectedBrands, setSelectedBrands] = useState<UUID[]>([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategoryTree[]>([])
  const [products, setProducts] = useState<ProductWithCategoryTree[]>([])
  const [allBrands, setAllBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const filtersRef = useRef<any>(null)

  const isFavorite = () => {
    return Boolean(Math.random() > 0.5)
  }
  const fetchAllProductsInCategory = async () => {
    if (!categoryUUID)
      return []

    try {
      setLoading(true)
      setError(null)
      setProducts([])
      setProductCountFromApi(0)

      const response = await categoryService.getProductByCategoryId(categoryUUID)
      const productWithPaths = extractProductsFromTree(response.data)
      const productCountFromApi = response.data.productCount
      const enrichedProducts: ProductWithCategoryTree[] = productWithPaths.map(({ product, path }) => ({
        ...product,
        categoryTree: path,
      }))

      setProductCountFromApi(productCountFromApi)
      setProducts(enrichedProducts)
      setFilteredProducts(enrichedProducts)
      setIsFiltered(false)

      return enrichedProducts
    }
    catch (err: any) {
      console.error(err)

      let message = ERROR_MESSAGES.DEFAULT

      if (err?.response?.status && ERROR_MESSAGES[err.response.status]) {
        message = ERROR_MESSAGES[err.response.status]
      }
      else if (err?.code && ERROR_MESSAGES[err.code]) {
        message = ERROR_MESSAGES[err.code]
      }

      setError(message)
      return []
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!categoryId)
      return

    setIsFiltered(false)
    setFilteredProducts([])
    setSelectedBrands([])
    fetchAllProductsInCategory()
  }, [categoryId])

  const productCountToShow = isFiltered ? filteredProducts.length : (productCountFromApi ?? 0)

  const hasActiveFilters = selectedBrands.length > 0

  const getProductCountLabel = (count?: number) => {
    if (typeof count !== 'number')
      return ''
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14)
      return `Знайдено ${count} товарів`
    if (lastDigit === 1)
      return `Знайдено ${count} товар`
    if (lastDigit >= 2 && lastDigit <= 4)
      return `Знайдено ${count} товари`

    return `Знайдено ${count} товарів`
  }
  const handleFilterChange = (filtered: ProductWithCategoryTree[]) => {
    setFilteredProducts(filtered)
    setIsFiltered(true)
  }
  const handleReset = async () => {
    if (filtersRef.current) {
      filtersRef.current.resetFilters()
    }
    await fetchAllProductsInCategory()
  }

  const selectedBrandsWithNames = allBrands.filter(brand => selectedBrands.includes(brand.id))

  return (
    <div className="clamp">
      {categoryUUID && <Breadcrumbs categoryId={categoryUUID} />}

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>Немає продуктів у цій категорії.</p>}

      <div className="h-[49px] w-full">

      </div>

      <div className="h-[94px]  grid grid-cols-[248px_1fr] w-full">
        <div className="text-xs flex-center font-normal text-[var(--baseColorText)] ">
          {getProductCountLabel(productCountToShow)}
        </div>
        <div className="flex items-center">
          <ClearFiltersButton
            onClear={handleReset}
            hasActiveFilters={hasActiveFilters}
          />
          <ClearBrandFilterButton
            selectedBrands={selectedBrandsWithNames}
            onRemoveBrand={(id) => {
              setSelectedBrands(prev => prev.filter(bid => bid !== id))
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-[248px_1fr] w-full">
        <Filters
          key={categoryUUID}
          onProductsChange={handleFilterChange}
          currentCategoryId={categoryUUID}
          ref={filtersRef}
          selectedBrands={selectedBrands}
          onSelectedBrandsChange={setSelectedBrands}
          setAllBrands={setAllBrands}
          allBrands={allBrands}
          onResetFilters={() => fetchAllProductsInCategory().then(() => {})}
        />

        <div className="pl-1 grid grid-cols-3 gap-x-4">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="w-[248px]">
              <ProductCardComponent
                id={product.id}
                imageUrl={product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png')}
                brandName={product.name ?? ''}
                price={product.price}
                salePrice={product.salePrice}
                averageRating={product.averageRating}
                isFavorite={isFavorite()}
                name={product.name ?? ''}
              />
            </div>
          ))}
          {' '}

        </div>

      </div>

    </div>
  )
}
