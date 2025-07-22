import type { Product } from '@api/types'
import type { CategoryTree } from '@api/types/category'

interface ProductWithPath {
  product: Product
  path: string[]
}
export function extractProductsFromTree(tree: CategoryTree | CategoryTree[]): ProductWithPath[] {
  const result: ProductWithPath[] = []

  const walk = (node: CategoryTree, path: string[]) => {
    const newPath = [...path, node.name]

    node.products?.forEach((product) => {
      result.push({ product, path: newPath })
    })

    node.subCategories?.forEach(sub => walk(sub, newPath))
  }

  if (Array.isArray(tree)) {
    tree.forEach(node => walk(node, []))
  }
  else {
    walk(tree, [])
  }

  return result
}
