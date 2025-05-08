import { Link } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import CartButton from './CartButton'

const navItems = [
    { name: 'Products', path: '/products' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Contact', path: '/contact' },
]

const categoryItems = [
    { name: 'All', category: null },
    { name: 'Electronics', category: 'electronics' },
    { name: 'Clothing', category: 'clothing' },
    { name: 'Home', category: 'home' },
    { name: 'Accessories', category: 'accessories' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    return (
        <header className="w-full bg-[#f0e4c7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f0e4c7]/60">
            <div className="container mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
                {/* Logo and desktop nav */}
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold italic text-slate-900">
                            Das Duas Uma
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-sm font-medium text-slate-800 transition-colors hover:text-black"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 -mr-2 rounded-md text-slate-800"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

                {/* Right side actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="p-2 rounded-full text-slate-800 hover:text-black"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                    <CartButton />
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden p-4 bg-[#f0e4c7]">
                    <nav className="grid gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center py-2 text-sm font-medium text-slate-800 hover:text-black"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex justify-between py-4">
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setShowSearch(!showSearch)
                                        setIsOpen(false)
                                    }}
                                    className="p-2 rounded-full text-slate-800 hover:text-black"
                                    aria-label="Search"
                                >
                                    <Search className="h-5 w-5" />
                                </button>
                                <CartButton />
                            </div>
                        </div>
                    </nav>
                </div>
            )}

            {/* Search bar */}
            {showSearch && (
                <div className="p-4 bg-[#f0e4c7]">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search wines..."
                                className="flex-1 p-2 border border-[#d9c278] bg-[#e9ddc0] rounded-l-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <button className="p-2 bg-black text-white rounded-r-md">
                                <Search className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setShowSearch(false)}
                                className="p-2 ml-2 rounded-md text-slate-800 hover:text-black"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
