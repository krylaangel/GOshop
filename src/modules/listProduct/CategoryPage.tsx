import type { Brand, Product, UUID } from '@api/types'
import { categoryService } from '@api/services/categoryService'
import { extractProductsFromTree } from '@home/components/categoryTree'
import { useWindowsSize } from '@layout/components/Navigation/hooks/useWindowsSize'
import { ClearBrandFilterButton } from '@modules/listProduct/components/ClearBrandFilterButton'
import { Filters } from '@modules/listProduct/components/Filters'
import Breadcrumbs from '@shared/components/Breadcrumbs'
import Button from '@shared/components/Button/Button'
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
  const { width } = useWindowsSize()
  const isDesktop = width >= 768
  const [open, setOpen] = useState(false)

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

  useEffect(() => {
    if (open && !isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open, isDesktop]);

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
    setSelectedBrands([])
    setOpen(false);
    await fetchAllProductsInCategory()
  }

  const selectedBrandsWithNames = allBrands.filter(brand => selectedBrands.includes(brand.id))

  return (
    <div className="clamp">
      {categoryUUID && <Breadcrumbs categoryId={categoryUUID} />}

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>Немає продуктів у цій категорії.</p>}

      <div className="w-full">
        {!isDesktop && (<Button onClick={()=>setOpen(true)} className="px-6 py-2">Фільтри</Button>
        )}
      </div>

      <div className="grid grid-cols-[248px_1fr] w-full">
        <div className="text-xs flex-center font-normal text-[var(--baseColorText)] ">
          {getProductCountLabel(productCountToShow)}
        </div>
        <div className="flex items-center flex-wrap">
                  <ClearBrandFilterButton
              onClear={handleReset}
              hasActiveFilters={hasActiveFilters}
            selectedBrands={selectedBrandsWithNames}
            onRemoveBrand={(id) => {
              setSelectedBrands(prev => prev.filter(bid => bid !== id))
            }}
          />
        </div>
      </div>
      <div className={`grid ${isDesktop ? 'grid-cols-[248px_1fr]' : 'grid-cols-1'} gap-4 relative`}>
        {(isDesktop || open) &&(
            <div
                className={`
        ${isDesktop ? 'static w-[248px]' : `
          fixed top-0 left-0 px-4 h-full w-3/4 max-w-xs z-50 bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out 
          ${open ? 'translate-x-0' : '-translate-x-full'}`}  overflow-y-auto
      `}
            >
              <div className="w-full justify-end flex">
                <button onClick={() => setOpen(false)}
                        className="w-4! h-4 text-[var(--inputField)] cursor-pointer md:hidden">X
                </button>
              </div>
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
        /></div>)}
        {!isDesktop && open && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 overflow-y-auto"
                onClick={() => setOpen(false)}
            />
        )}
        <div className={`${(isDesktop || open) ? '' : 'pl-0'} grid grid-cols-2 xl:grid-cols-3 gap-x-4`}>
          {filteredProducts.map((product, index) => (
              <div key={product.id} className="w-full">
              <ProductCardComponent
                id={product.id}
                imageUrl={product.images?.[0]?.imageUrl ?? getImageURL('default-product-card.png')}
                brandName={product.name ?? ''}
                price={product.price}
                salePrice={product.salePrice}
                averageRating={product.averageRating}
                isFavorite={isFavorite()}
                name={product.name ?? ''}
                product={product}
              />
            </div>
          ))}
          {' '}

        </div>

      </div>

    </div>
  )
}
