import type { Product, UUID } from '.'

export interface CategoryList {
  id: UUID
  parentId: UUID
  name: string
}
export interface CategoryInfo {
  id: UUID
  parentId: UUID
  name: string
}
export interface CategoryTree {
  id: string
  name: string
  productCount: number
  products: Product[]
  subCategories: CategoryTree[]
}
