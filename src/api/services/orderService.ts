import type { ApiResponse, UUID } from '@api/types'
import type { GetOrder, Order } from '@api/types/order'
import { handleResponse } from '@api/services/index'

export const orderService = {
  add: async (order: Order): Promise<ApiResponse<Order>> => {
    return handleResponse(
      `/Orders`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      },
    )
  },
  get: async (userId: UUID, page?: number, pageSize?: number): Promise<ApiResponse<GetOrder[]>> => {
    const query = new URLSearchParams()

    if (page !== undefined)
      query.append('page', page.toString())
    if (pageSize !== undefined)
      query.append('pageSize', pageSize.toString())
    const url = `/Orders/${userId}?${query.toString()}`

    return handleResponse(url)
  },
}
