import type { ApiResponse, CreateReview, Review, UpdateReview, UUID } from '../types'
import { handleResponse } from '.'

export const reviewService = {
  getAll: async (): Promise<ApiResponse<Review[]>> => {
    return handleResponse<Review[]>('/Review/GetAll')
  },
  getById: async (id: UUID): Promise<ApiResponse<Review>> => {
    return handleResponse<Review>(`/Review/GetById?id=${encodeURIComponent(id)}`)
  },
  getByProductId: async (productId: string): Promise<ApiResponse<Review[]>> => {
    return handleResponse<Review[]>(`/Review/GetByProductId?productId=${encodeURIComponent(productId)}`)
  },
  getByUserId: async (userId: string): Promise<ApiResponse<Review[]>> => {
    return handleResponse<Review[]>(`/Review/GetByUserId?userId=${encodeURIComponent(userId)}`)
  },
  add: async (reviewData: CreateReview): Promise<ApiResponse<Review>> => {
    return handleResponse<Review>(
      '/Review/Add',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: reviewData,
      },
    )
  },
  update: async (reviewData: UpdateReview): Promise<ApiResponse<Review>> => {
    return handleResponse<Review>(
      '/Review/Update',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: reviewData,
      },
    )
  },
  delete: async (id: UUID): Promise<ApiResponse<void>> => {
    return handleResponse<void>(`/Review/Delete?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
  },
}
