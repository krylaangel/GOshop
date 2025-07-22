import type { Product } from '@api/types'
import type { CategoryTree } from '@api/types/category'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // пробелы в дефисы
    .replace(/[^\w\-]+/g, '') // удалить все кроме букв, цифр и дефиса
    .replace(/-{2,}/g, '-') // убрать двойные дефисы
    .replace(/^-+/, '') // убрать дефисы в начале
    .replace(/-+$/, '') // убрать дефисы в конце
}

function findCategoryPath(tree: CategoryTree[] | CategoryTree, targetCategoryId: string, path: CategoryTree[] = [],
): CategoryTree[] | null {
  const nodes = Array.isArray(tree) ? tree : [tree]
  for (const node of nodes) {
    if (!node)
      continue
    if (node.id === targetCategoryId) {
      return [...path, node]
    }
    if (node.subCategories?.length) {
      const found = findCategoryPath(node.subCategories, targetCategoryId, [...path, node])
      if (found)
        return found
    }
  }

  return null
}

export default function buildProductUrl(
  categoryTree: CategoryTree[] | CategoryTree,
  product: Pick<Product, 'name' | 'categoryId'>,
): string | null {
  if (product.categoryId === null) {
    return null
  }

  const pathCategories = findCategoryPath(categoryTree, product.categoryId)

  if (!pathCategories)
    return null

  const categorySlugs = pathCategories.map(cat => slugify(cat.name))
  const productSlug = product.name ? slugify(product.name) : 'unknown-product'

  return `/${categorySlugs.join('/')}/product/${productSlug}`
}
