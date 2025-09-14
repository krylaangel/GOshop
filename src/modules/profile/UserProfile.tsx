import Button from '@shared/components/Button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/store/useAuth'

export function UserProfile() {
  const { userData } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'data' | 'addresses' | 'orders'>('data')
  const { signOut, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()

    navigate('/')
  }
  return (
    <div className="clamp py-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-4 py-4">
        <div className="space-y-2">
          <Button variant="secondary" onClick={() => setActiveTab('data')} className="w-full">
            Особисті
            данні:
          </Button>
          <Button
            variant="secondary"
            onClick={() => setActiveTab('addresses')}
            className="w-full"
          >
            Адреси:
          </Button>
          <Button
            variant="secondary"
            onClick={() => setActiveTab('orders')}
            className="w-full"
          >
            Замовлення:
          </Button>

        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 ">
            Вітаємо,
            {' '}
            {userData?.firstName}
            {' '}
            {userData?.lastName}
          </h1>
          {activeTab === 'data' && (

            <div className="flex flex-col gap-3">
              <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3">Особисті данні:</h2>
              <input
                className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
                value={userData?.firstName ?? ''}
              />
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={userData?.lastName ?? ''}
              />
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={userData?.phoneNumber}
              />
              <input
                className="border rounded-lg px-3 py-2 input-field input-field-styles"
                value={userData?.email ?? ''}
              />
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
      <div className="flex w-full justify-end">
        <Button onClick={handleSignOut} className="px-10 py-2">Вихід</Button>
      </div>
    </div>
  )
}
