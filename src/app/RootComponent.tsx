import { BasketPage } from '@cart/BasketPage'

import { OrderPage } from '@cart/OrderPage'
import { ChooseSize } from '@layout/components/Footer/ChooseSize'
import CategoryPage from '@modules/listProduct/CategoryPage'
import { UserProfile } from '@modules/profile/UserProfile'
import { RequireAuth } from '@shared/utils/RequireAuth'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from '~/modules/auth/AuthPage'
import HomePage from '~/modules/home/HomePage'
import FooterComponent from '~/modules/layout/components/Footer'
import About from '~/modules/layout/components/Footer/About'
import DeliveryAndPayment from '~/modules/layout/components/Footer/DeliveryAndPayment'
import PrivacyPolicy from '~/modules/layout/components/Footer/PrivacyPolicy'
import ReturnOfGoods from '~/modules/layout/components/Footer/ReturnOfGoods'
import UserAgreement from '~/modules/layout/components/Footer/UserAgreement'
import HeaderComponent from '~/modules/layout/components/Header'
import NotFoundPage from '~/modules/notFound/NotFoundPage'
import ProductPage from '~/modules/product/ProductPage'
import { ROUTES } from '~/shared/constants/routes'
import { useAuthStore } from '~/store/useAuth'
import ScrollToTop from './ScrollToTop'

function RootComponent() {
  const checkAuth = useAuthStore(state => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route path="/forher/:categoryId" element={<CategoryPage />} />
        <Route path="/forhim/:categoryId" element={<CategoryPage />} />
        <Route path="/accessories/:categoryId" element={<CategoryPage />} />
        <Route path="/:categoryId" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
        <Route path={ROUTES.AUTH_ROUTE} element={<AuthPage />} />
        <Route path={ROUTES.PRODUCT_ROUTE} element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/returnOfGoods" element={<ReturnOfGoods />} />
        <Route path="/deliveryAndPayment" element={<DeliveryAndPayment />} />
        <Route path="/chooseSize" element={<ChooseSize />} />
        <Route path="/userAgreement" element={<UserAgreement />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
        <Route path="/cart" element={<BasketPage />} />
        <Route path="/order" element={<OrderPage />} />

      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default RootComponent
