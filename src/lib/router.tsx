import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import PaymentSuccessPage from '@/pages/PaymentSuccessPage'
import PaymentFailurePage from '@/pages/PaymentFailurePage'
import NotFoundPage from '@/pages/NotFoundPage'
import SensorialExperiencePage from '@/pages/SensorialExperiencePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'payment/success',
        element: <PaymentSuccessPage />,
      },
      {
        path: 'payment/failure',
        element: <PaymentFailurePage />,
      },
    ],
  },
  // Sensorial experience page is outside the root layout
  {
    path: '/sensorial-experience',
    element: <SensorialExperiencePage />,
    errorElement: <NotFoundPage />,
  },
])
