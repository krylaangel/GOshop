import type { GetOrder } from '@api/types/order'
import { orderService } from '@api/services/orderService'
import { productService } from '@api/services/productService'
import Button from '@shared/components/Button/Button'
import { SkeletonText } from '@shared/skeleton/SkeletonText'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '~/store/useAuth'

export function ListOrders() {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<GetOrder[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 5
  const { userData } = useAuthStore()
  const [productNames, setProductNames] = useState<Record<string, string>>({})
  const isFetching = useRef(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchOrders = async () => {
    if (isFetching.current || !userData?.id)
      return

    if (!userData?.id || loading)
      return
    setLoading(true)
    try {
      const response = await orderService.get(userData?.id, page, pageSize)
      if (response.isError) {
        console.error('Не вдалось завантажити замовлення:', response.errorMessage)
        return
      }
      setHasMore(response.data.length === pageSize)

      setOrders((prev) => {
        const existingIds = new Set(prev.map(o => o.orderNumber))
        const newOrders = response.data.filter(o => !existingIds.has(o.orderNumber))
        return [...prev, ...newOrders]
      })

      const names: Record<string, string> = {}
      await Promise.all(
        response.data.flatMap(order =>
          order.orderItems.map(async (item) => {
            const res = await productService.getById(item.productId)
            if (!res.isError && res.data) {
              if (res.data.name != null) {
                names[item.productId] = res.data.name
              }
            }
          }),
        ),
      )
      setProductNames(prev => ({ ...prev, ...names }))
    }
    catch (err) {
      console.error('Не вдалось завантажити замовлення:', err)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [page, userData?.id])

  const skeletons = Array.from({ length: 3 })

  return (
    <div className="flex flex-col gap-3 my-3 w-full">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3">Історія замовлень</h2>
      <ul className="flex flex-col gap-2 w-full">

        {loading && orders.length === 0
          ? skeletons.map((_, idx) => (
              <li key={idx} className="border-[var(--hoverBorder)] border  p-3 rounded-lg flex flex-col gap-2 w-full animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
                <div className="flex flex-col gap-2 mt-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-6 bg-gray-300 rounded w-full flex justify-between px-4"></div>
                  ))}
                </div>
              </li>
            ))
          : orders.map((order, idx) => (
              <li
                key={`${order.orderNumber}-${idx}`}
                className="border-[var(--hoverBorder)] border p-3 rounded-lg flex flex-col gap-2 w-full"
              >
                <div className="w-full">
                  <p className="font-bold">
                    №
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.status}
                    {' '}
                    •
                    {' '}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="font-bold flex justify-between w-full mt-2">
                  <p>Загальна вартість</p>
                  <p>
                    {order.totalAmount}
                    {' '}
                    грн
                  </p>
                </div>
                <div className="text-gray-600 mt-2 w-full flex flex-col gap-2">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={`${item.productId}-${idx}`}
                      className="border-[var(--hoverBorder)] border p-3 rounded-lg flex justify-between items-center gap-4 w-full flex-wrap md:flex-nowrap"
                    >
                      {productNames[item.productId]
                        ? (
                            <p className="w-full text-sm">{productNames[item.productId]}</p>
                          )
                        : (
                            <SkeletonText width="w-24" />
                          )}
                      <div className="flex justify-between items-center gap-2 w-full">
                        {item.price
                          ? (
                              <p className="whitespace-nowrap text-sm w-1/3">
                                {item.price}
                                {' '}
                                грн
                              </p>
                            )
                          : <SkeletonText width="w-16" />}
                        {item.quantity ? <p>{item.quantity}</p> : <SkeletonText width="w-10" />}
                        {item.totalPrice
                          ? (
                              <p className="whitespace-nowrap text-sm w-1/3">
                                {item.totalPrice}
                                {' '}
                                грн
                              </p>
                            )
                          : <SkeletonText width="w-20" />}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}

        {orders.length > 0 && (
          <Button
            onClick={() => {
              if (hasMore) {
                setPage(prev => prev + 1)
              }
              else {
                setPage(1)
                setOrders([])
              }
            }}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {hasMore ? 'Завантажити ще' : 'Згорнути'}
          </Button>
        )}

      </ul>
    </div>
  )
}
