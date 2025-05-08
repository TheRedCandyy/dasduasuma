import { Link } from 'react-router-dom'
import type { Product } from '@/lib/types'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

interface ProductCardProps {
    product: Product
    imageSize?: 'small' | 'medium' | 'large'
    showDescription?: boolean
}

export default function ProductCard({
    product,
    imageSize = 'medium',
    showDescription = false,
}: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem)
    const openCart = useUIStore((state) => state.openCart)

    const handleAddToCart = () => {
        addItem(product)
        openCart()
    }

    const imageSizeClasses = {
        small: 'h-32',
        medium: 'h-48',
        large: 'h-64',
    }

    return (
        <div className="group rounded-lg border border-[#d9c278] bg-[#f0e4c7] overflow-hidden transition-all hover:shadow-lg hover:shadow-black/10">
            <Link to={`/products/${product.id}`}>
                <div
                    className={`${imageSizeClasses[imageSize]} bg-[#e9ddc0] relative overflow-hidden`}
                >
                    {/* This would be an actual image in a real app */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                        <span className="sr-only">Wine image</span>
                        {/* Wine bottle SVG placeholder */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-12 w-12 opacity-50"
                        >
                            <path d="M8 22h8"></path>
                            <path d="M7 10h10"></path>
                            <path d="M12 15v7"></path>
                            <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"></path>
                        </svg>
                    </div>

                    {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-700/90 text-white text-xs px-2 py-1 rounded">
                            Sold Out
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <div className="space-y-2">
                    <div className="flex items-start justify-between">
                        <Link
                            to={`/products/${product.id}`}
                            className="space-y-1"
                        >
                            <h3 className="font-medium text-slate-900 group-hover:text-black transition-colors font-serif italic">
                                {product.name}
                            </h3>
                            <p className="text-sm font-medium text-black">
                                ${product.price.toFixed(2)}
                            </p>
                        </Link>

                        <span className="text-xs bg-[#e9ddc0] text-slate-700 px-2 py-1 rounded-full">
                            {product.category}
                        </span>
                    </div>

                    {showDescription && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`w-full py-2 rounded-md text-sm transition-colors ${
                            product.inStock
                                ? 'bg-black text-white hover:bg-gray-900'
                                : 'bg-[#e9ddc0] text-slate-500 cursor-not-allowed'
                        }`}
                    >
                        {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    )
}
