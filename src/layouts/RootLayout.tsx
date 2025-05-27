import { Outlet } from 'react-router-dom'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CartSheet from '@/components/shared/CartSheet'
import LoadingScreen from '@/components/shared/LoadingScreen'
import AgeConfirmation from '@/components/shared/AgeConfirmation'
import { useAgeVerificationStore } from '@/store/useAgeVerificationStore'

const RootLayout = () => {
  const { isVerified } = useAgeVerificationStore()

  return (
    <>
      <LoadingScreen minDisplayTime={2500} />
      {!isVerified && <AgeConfirmation />}
      <Navbar />
      <div className="flex min-h-screen flex-col bg-[#f0e4c7] text-slate-900">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartSheet />
      </div>
    </>
  )
}

export default RootLayout
