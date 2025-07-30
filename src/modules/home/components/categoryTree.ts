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

export function findBreadcrumbsPath(category: CategoryTree, targetId: string, path: { id: string, name: string }[] = []): { id: string, name: string }[] | null {
  const newPath = [...path, { id: category.id, name: category.name }]

  if (category.id === targetId) {
    return newPath
  }

  for (const sub of category.subCategories || []) {
    const result = findBreadcrumbsPath(sub, targetId, newPath)
    if (result)
      return result
  }

  return null
}
