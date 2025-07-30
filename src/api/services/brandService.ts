import type { ApiResponse, Brand, UUID } from '../types'
import { handleResponse } from '.'

export const brandService = {
  get: async (Search?: string, Page?: number, PageSize?: number, OrderBy?: string, SortDirection?: 'asc' | 'desc'): Promise<ApiResponse<Brand[]>> => {
    const query = new URLSearchParams()

    if (Search)
      query.append('Search', Search)
    if (Page !== undefined)
      query.append('Page', Page.toString())
    if (PageSize !== undefined)
      query.append('PageSize', PageSize.toString())
    if (OrderBy)
      query.append('OrderBy', OrderBy)
    if (SortDirection)
      query.append('SortDirection', SortDirection)

    const url = `/Brand?${query.toString()}`

    return handleResponse(url)
  },
  getAll: async (): Promise<ApiResponse<Brand[]>> => {
    return handleResponse((`/Brand/GetAll`))
  },
  getById: async (id: UUID): Promise<ApiResponse<Brand>> => {
    return handleResponse(`/Brand/${encodeURIComponent(id)}`)
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
