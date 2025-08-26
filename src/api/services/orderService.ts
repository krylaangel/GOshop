import type { ApiResponse } from '@api/types'
import type { Order } from '@api/types/order'
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
}
