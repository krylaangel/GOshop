import type { Product } from '@api/types'
import type { CategoryTree } from '@api/types/category'

export function extractProductsFromTree(tree: CategoryTree | CategoryTree[]): Product[] {
  const result: Product[] = []

  const walk = (node: CategoryTree) => {
    if (!tree)
      return null

    if (node.products?.length) {
      result.push(...node.products)
    }
    if (node.subCategories?.length) {
      node.subCategories.forEach(walk)
    }
  }

  if (Array.isArray(tree)) {
    tree.forEach(walk)
  }
  else {
    walk(tree)
  }

  return result
}
