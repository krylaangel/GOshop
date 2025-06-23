import type { ApiResponse, Brand, UUID } from '../types'
import { handleResponse } from '.'

export const brandService = {
  getAll: async (): Promise<ApiResponse<Brand[]>> => {
    return handleResponse((`/Brand/GetAll`))
  },
  getById: async (id: UUID): Promise<ApiResponse<Brand>> => {
    return handleResponse(`/Brand/GetById?id=${encodeURIComponent(id)}`)
  },
  add: async (brandData: Brand): Promise<ApiResponse<Brand>> => {
    return handleResponse(
      `/Brand/Add`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData),
      },
    )
  },
  update: async (brandData: Brand): Promise<ApiResponse<Brand>> => {
    return handleResponse(
      `/Brand/Update`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData),
      },
    )
  },
  delete: async (brandId: UUID): Promise<ApiResponse<void>> => {
    return handleResponse(`/Brand/Delete?brandId=${encodeURIComponent(brandId)}`, { method: 'DELETE' })
  },
}
