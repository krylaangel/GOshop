import type { Product } from '@api/types'
import { categoryService } from '@api/services/categoryService'
import { extractProductsFromTree } from '@home/components/categoryTree'
import { Filters } from '@modules/listProduct/components/Filters'
import Breadcrumbs from '@shared/components/Breadcrumbs'
import ProductCardComponent from '@shared/components/ProductCardComponent'
import { categoryUUIDMap } from '@shared/constants/categoryUUIDMap'
import { ERROR_MESSAGES } from '@shared/constants/errors'
import getImageURL from '@shared/utils/imageUtils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type ProductWithCategoryTree = Product & {
  categoryTree: string[]
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [productCount, setProductCount] = useState<number>()
  const [products, setProducts] = useState<ProductWithCategoryTree[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isFavorite = () => {
    return Boolean(Math.random() > 0.5)
  }
  useEffect(() => {
    if (!categoryId)
      return

    (async () => {
      try {
        setLoading(true)

        const categoryUUID = categoryUUIDMap[categoryId]
        setLoading(true)
        setError(null)
        setProducts([])
        setProductCount(0)

        if (!categoryUUID) {
          setError('Категория не найдена')
          setLoading(false)

          return
        }

        const response = await categoryService.getProductByCategoryId(categoryUUID)
        const productWithPaths = extractProductsFromTree(response.data)
        const productCount = response.data.productCount

        const enrichedProducts: ProductWithCategoryTree[] = productWithPaths.map(({ product, path }) => ({
          ...product,
          categoryTree: path,
        }))
        setProducts(enrichedProducts)
        setProductCount(productCount)
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
      }
      finally {
        setLoading(false)
      }
    })()
  }, [categoryId])

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
  return (
    <div className="clamp">
      {categoryId && <Breadcrumbs categoryId={categoryUUIDMap[categoryId]} />}

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>Немає продуктів у цій категорії.</p>}
      <div className="h-[49px] bg-red-500 w-full"></div>

      <div className="h-[94px]  grid grid-cols-[248px_1fr] w-full">
        <div className="text-xs flex-center font-normal text-[ver(--baseColorText)] ">
          {getProductCountLabel(productCount)}
        </div>
        <div className="ms-4 bg-blue-200"></div>
      </div>
      <div className="grid grid-cols-[248px_1fr] w-full">
        <Filters />

        <div className="ms-4 grid grid-cols-3 gap-x-4">
          {products.map((product, index) => (
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
