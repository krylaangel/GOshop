import type { Review, UUID } from '.'

export interface ProductSummary {
  id: UUID
  name: string | null
  description: string | null
  skuCode: string | null
  price: number
  salePrice: number
  stockQuantity: number
  brandId: UUID | null
  categoryId: UUID | null
  isActive: boolean
  averageRating: number
  image: ProductImage
}

export interface Product {
  id: UUID
  name: string | null
  description: string | null
  skuCode: string | null
  price: number
  salePrice: number
  stockQuantity: number
  brandId: UUID | null
  categoryId: UUID | null
  isActive: boolean
  averageRating: number
  createdAt: string
  lastModified: string | null
  deletedAt: string | null
  reviews: Review[] | null
  images: ProductImage[] | null
}

export interface ProductImage {
  id: UUID
  productId: UUID
  imageUrl: string | null
  isPrimary: boolean
  displayOrder: number
  createdAt: string
  lastModified: string | null
  deletedAt: string | null
}

export interface ProductAttribute {
  id: UUID
  name: string | null
  description: string | null
}

export type colorAttributeValue = Record<string, string>
export type sizeAttributeValue = Record<string, string>
export interface ProductAttributeValue {
  id: UUID
  attributeId: UUID
  value: colorAttributeValue | sizeAttributeValue | null
  displayOrder: number
}

export interface ProductVariant {
  id: UUID
  productId: UUID
  skuCode: string | null
  price: number
  stockQuantity: number
  isActive: boolean
}

export interface ProductVariantAttribute {
  id: UUID
  productVariantId: UUID
  attributeValueId: UUID
}

export interface CreateProduct {
  name: string | null
  description: string | null
  skuCode: string | null
  price: number
  salePrice: number
  stockQuantity: number
  brandId: UUID | null
  categoryId: UUID | null
  isActive: boolean
}

export interface UpdateProduct extends CreateProduct {
  id: UUID
  brandId: UUID
  categoryId: UUID
}

export interface CreateAttribute {
  name: string | null
  description: string | null
}

export interface CreateAttributeValue {
  attributeId: UUID
  value: string | null
  displayOrder: number
}

export interface CreateProductImage {
  productId: UUID
  imageUrl: string | null
  isPrimary: boolean
  displayOrder: number
}

export interface CreateProductVariant {
  productId: UUID
  skuCode: string | null
  price: number
  stockQuantity: number
  isActive: boolean
}

export interface CreateProductVariantAttribute {
  productVariantId: UUID
  attributeValueId: UUID
}
