import { Outlet } from 'react-router-dom'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CartSheet from '@/components/shared/CartSheet'
import LoadingScreen from '@/components/shared/LoadingScreen'

const RootLayout = () => {
  return (
    <>
      <LoadingScreen minDisplayTime={2500} />
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
