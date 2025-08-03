import { ChooseSize } from '@layout/components/Footer/ChooseSize'

import CategoryPage from '@modules/listProduct/CategoryPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from '~/modules/auth/AuthPage'
import { UserProvider } from '~/modules/auth/hooks/useAuth'
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
import ScrollToTop from './ScrollToTop'

function RootComponent() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <UserProvider>
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
        </Routes>
      </UserProvider>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default RootComponent
