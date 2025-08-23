import Button from '@shared/components/Button/Button'
import { useState } from 'react'
import { useAuthStore } from '~/store/useAuth'

export function UserProfile() {
  const { user, userData } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'data' | 'addresses' | 'orders'>('data')
  return (
    <div className="clamp grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-2 py-4">
      <div className="space-y-2">
        <Button variant="secondary" onClick={() => setActiveTab('data')} className="w-full">Особисті данні:</Button>
        <Button variant="secondary" onClick={() => setActiveTab('addresses')} className="w-full">Адреси:</Button>
        <Button variant="secondary" onClick={() => setActiveTab('orders')} className="w-full">Замовлення:</Button>

      </div>
      <div>
        <h1 className="font-bold text-xl mb-3 ">
          Вітаємо,
          {userData?.firstName}
          {' '}
          {userData?.lastName}
        </h1>
        {activeTab === 'data' && (

          <div className="flex flex-col gap-3">
            <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3">Особисті данні:</h2>
            <div className="border-[var(--hoverBorder)] border rounded-lg p-3">{userData?.firstName}</div>
            <div className="border-[var(--hoverBorder)] border rounded-lg p-3">{userData?.lastName}</div>
            <div className="border-[var(--hoverBorder)] border rounded-lg p-3">{userData?.email}</div>
          </div>
        )}
        {activeTab === 'addresses' && (<div></div>)}
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-3 my-3">
            <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3">Історія замовлень</h2>
          </div>
        )}

      </div>

    </div>
  )
}
