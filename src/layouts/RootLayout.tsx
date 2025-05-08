import { Outlet } from 'react-router-dom'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CartSheet from '@/components/shared/CartSheet'

const RootLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#f0e4c7] text-slate-900">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <CartSheet />
        </div>
    )
}

export default RootLayout
