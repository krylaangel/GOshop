import { FavoritesProducts } from '@modules/profile/components/FavoritesProducts'
import { ListOrders } from '@modules/profile/components/ListOrders'
import { PersonalDates } from '@modules/profile/components/PersonalDates'
import Button from '@shared/components/Button/Button'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/store/useAuth'

export function UserProfile() {
  const { userData } = useAuthStore()
  const location = useLocation()
  const initialTab = location.state?.tab ?? 'data'
  const [activeTab, setActiveTab] = useState<'data' | 'orders' | 'favoritesProducts'>(initialTab)
  const { signOut, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()

    navigate('/')
  }
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab)
    }
  }, [location.state?.tab])
  return (
    <div className="clamp py-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-4 py-4">
        <div className="space-y-2">
          <Button
            variant={activeTab === 'data' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('data')}
            className="w-full"
          >
            Особисті
            данні:
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('orders')}
            className="w-full"
          >
            Замовлення:
          </Button>
          <Button
            variant={activeTab === 'favoritesProducts' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('favoritesProducts')}
            className="w-full"
          >
            Список бажань:
          </Button>

        </div>
        <div>
          <h1 className="font-bold text-xl mt-3 md:mt-0 mb-3 ">
            Вітаємо,
            {' '}
            {userData?.firstName}
            {' '}
            {userData?.lastName}
          </h1>
          {activeTab === 'data' && (
            <PersonalDates />
          )}
          {activeTab === 'orders' && (
            <ListOrders />
          )}
          {activeTab === 'favoritesProducts' && (
            <FavoritesProducts />)}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button onClick={handleSignOut} className="px-10 py-2">Вихід</Button>
      </div>
    </div>
  )
}
