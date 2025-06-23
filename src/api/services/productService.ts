import type { ApiResponse, CreateAttribute, CreateAttributeValue, CreateProduct, CreateProductImage, CreateProductVariant, CreateProductVariantAttribute, GuidResult, Product, ProductAttribute, ProductAttributeValue, ProductImage, ProductSummary, ProductVariant, ProductVariantAttribute, UpdateProduct, UUID } from '../types'
import { handleResponse } from '.'

export const productService = {
  getAll: async (): Promise<ApiResponse<ProductSummary[]>> =>
    handleResponse('/Product/GetAll'),

  getById: async (productId: string): Promise<ApiResponse<Product>> =>
    handleResponse(`/Product/GetById?productId=${encodeURIComponent(productId)}`),

  getByBrandId: async (brandId: string): Promise<ApiResponse<Product[]>> =>
    handleResponse(`/Product/GetByBrandId?brandId=${encodeURIComponent(brandId)}`),

  getByCategoryId: async (categoryId: string): Promise<ApiResponse<Product[]>> =>
    handleResponse(`/Product/GetByCategoryId?categoryId=${encodeURIComponent(categoryId)}`),

  getByName: async (name: string): Promise<ApiResponse<Product[]>> =>
    handleResponse(`/Product/GetByName?name=${encodeURIComponent(name)}`),

  getSimilar: async (productId: string): Promise<ApiResponse<Product[]>> =>
    handleResponse(`/Product/GetSimilar?productId=${encodeURIComponent(productId)}`),

  add: async (productData: CreateProduct): Promise<ApiResponse<Product>> =>
    handleResponse('/Product/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    }),

  update: async (productData: UpdateProduct): Promise<ApiResponse<Product>> =>
    handleResponse('/Product/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    }),

  delete: async (productId: string): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/Product/Delete?productId=${encodeURIComponent(productId)}`, { method: 'DELETE' }),
}

export const productAttributesService = {
  getAll: async (): Promise<ApiResponse<ProductAttribute[]>> =>
    handleResponse('/ProductAttributes/GetAll'),

  getById: async (id: UUID): Promise<ApiResponse<ProductAttribute[]>> =>
    handleResponse(`/ProductAttributes/GetById?id=${encodeURIComponent(id)}`),

  add: async (attributeData: CreateAttribute): Promise<ApiResponse<ProductAttribute>> =>
    handleResponse('/ProductAttributes/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributeData),
    }),

  update: async (attributeData: ProductAttribute): Promise<ApiResponse<ProductAttribute>> =>
    handleResponse('/ProductAttributes/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributeData),
    }),

  delete: async (attributeId: string): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/ProductAttributes/Delete?attributeId=${encodeURIComponent(attributeId)}`, { method: 'DELETE' }),
}

export const productAttributeValuesService = {
  getAll: async (): Promise<ApiResponse<ProductAttributeValue[]>> =>
    handleResponse('/ProductAttributeValues/GetAll'),

  getById: async (id: UUID): Promise<ApiResponse<ProductAttributeValue>> =>
    handleResponse(`/ProductAttributeValues/GetById?id=${encodeURIComponent(id)}`),

  add: async (attributeValueData: CreateAttributeValue): Promise<ApiResponse<ProductAttributeValue>> =>
    handleResponse('/ProductAttributeValues/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributeValueData),
    }),

  update: async (attributeValueData: ProductAttributeValue): Promise<ApiResponse<ProductAttributeValue>> =>
    handleResponse('/ProductAttributeValues/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attributeValueData),
    }),

  delete: async (attributeId: string): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/ProductAttributeValues/Delete?attributeId=${encodeURIComponent(attributeId)}`, { method: 'DELETE' }),
}

export const productImageService = {
  getAll: async (): Promise<ApiResponse<ProductImage[]>> =>
    handleResponse('/ProductImage/GetAll'),

  getById: async (id: UUID): Promise<ApiResponse<ProductImage>> =>
    handleResponse(`/ProductImage/GetById?id=${encodeURIComponent(id)}`),

  getByProductId: async (productId: string): Promise<ApiResponse<ProductImage[]>> =>
    handleResponse(`/ProductImage/GetByProductId?productId=${encodeURIComponent(productId)}`),

  add: async (imageData: CreateProductImage): Promise<ApiResponse<ProductImage>> =>
    handleResponse('/ProductImage/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData),
    }),

  update: async (imageData: ProductImage): Promise<ApiResponse<ProductImage>> =>
    handleResponse('/ProductImage/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData),
    }),

  delete: async (id: UUID): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/ProductImage/Delete?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),

  deleteByProductId: async (id: UUID): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/ProductImage/DeleteByProductId?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),
}

export const productVariantAttributesService = {
  getById: async (variantId: string): Promise<ApiResponse<ProductVariantAttribute>> =>
    handleResponse(`/ProductVariantAttributes/GetById?variantId=${encodeURIComponent(variantId)}`),

  add: async (variantAttributeData: CreateProductVariantAttribute): Promise<ApiResponse<ProductVariantAttribute>> =>
    handleResponse('/ProductVariantAttributes/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variantAttributeData),
    }),

  delete: async (id: UUID): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/ProductVariantAttributes/Delete?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),
}

export const productVariantsService = {
  getAll: async (): Promise<ApiResponse<ProductVariant[]>> =>
    handleResponse('/ProductVariants/GetAll'),

  getById: async (productId: string): Promise<ApiResponse<ProductVariant>> =>
    handleResponse(`/ProductVariants/GetById?productId=${encodeURIComponent(productId)}`),

  add: async (variantData: CreateProductVariant): Promise<ApiResponse<ProductVariant>> =>
    handleResponse('/ProductVariants/Add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variantData),
    }),

  update: async (variantData: ProductVariant): Promise<ApiResponse<ProductVariant>> =>
    handleResponse('/ProductVariants/Update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variantData),
    }),

  delete: async (productId: string): Promise<ApiResponse<GuidResult>> =>
    handleResponse(`/ProductVariants/Delete?productId=${encodeURIComponent(productId)}`, { method: 'DELETE' }),
}
