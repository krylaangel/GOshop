import type { CategoryInfo, CategoryList, CategoryTree } from '@api/types/category'
import type { ApiResponse, Product, UUID } from '../types'
import { handleResponse } from '.'

export const categoryService = {
  getProductsByCategoryId: async (categoryId: UUID): Promise<ApiResponse<Product[]>> =>
    handleResponse(`/Product/GetByCategoryId?categoryId=${encodeURIComponent(categoryId)}`),

  getCategoryById: async (categoryId: UUID): Promise<ApiResponse<CategoryInfo>> =>
    handleResponse(`/Category/${encodeURIComponent(categoryId)}`),

  getCategory: async (): Promise<ApiResponse<CategoryList[]>> =>
    handleResponse(`/Category`),

  getProductByCategoryId: async (categoryId: string): Promise<ApiResponse<CategoryTree>> =>
    handleResponse(`/Category/${encodeURIComponent(categoryId)}/tree`),

  getProductsPaginated: async ({
                                 categoryId,
                                 page = 1,
                                 pageSize = 12,
                                 search = '',
                                 orderBy = 'Name',
                                 sortDirection = 'Asc',
                               }: {
    categoryId: string
    page?: number
    pageSize?: number
    search?: string
    orderBy?: string
    sortDirection?: 'Asc' | 'Desc'
  }): Promise<ApiResponse<Product[]>> =>
      handleResponse(
          `/Product/GetByCategoryId?categoryId=${encodeURIComponent(categoryId)}&page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&orderBy=${orderBy}&sortDirection=${sortDirection}`
      ),
}
