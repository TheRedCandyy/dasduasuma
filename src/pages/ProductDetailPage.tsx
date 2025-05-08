import { useParams, Link } from 'react-router-dom'
import { useProduct } from '@/hooks/useProducts'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useState } from 'react'

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>()
    const { data: product, isLoading, error } = useProduct(productId || '')
    const addItem = useCartStore((state) => state.addItem)
    const openCart = useUIStore((state) => state.openCart)
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (value: number) => {
        // Ensure quantity doesn't go below 1
        setQuantity(Math.max(1, value))
    }

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity)
            openCart()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Link
                    to="/products"
                    className="text-muted-foreground hover:text-foreground"
                >
                    Products
                </Link>
                <span className="text-muted-foreground">/</span>
                <span>{product?.name || `Product ${productId}`}</span>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
            )}

            {error && (
                <div className="rounded-lg bg-red-100 p-4 text-red-700">
                    Error loading product:{' '}
                    {error instanceof Error ? error.message : 'Unknown error'}
                </div>
            )}

            {product && (
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="aspect-square bg-muted rounded-lg" />
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="text-2xl font-bold">
                            ${product.price.toFixed(2)}
                        </div>
                        <p className="text-muted-foreground">
                            {product.description}
                        </p>

                        {product.features && product.features.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-medium">Features</h3>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {product.inStock && (
                            <div className="space-y-2">
                                <h3 className="font-medium">Quantity</h3>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(quantity - 1)
                                        }
                                        className="h-8 w-8 rounded-md border flex items-center justify-center"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(quantity + 1)
                                        }
                                        className="h-8 w-8 rounded-md border flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddToCart}
                                className={`px-4 py-2 rounded-md ${
                                    product.inStock
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                                }`}
                                disabled={!product.inStock}
                            >
                                {product.inStock
                                    ? 'Add to Cart'
                                    : 'Out of Stock'}
                            </button>
                            <button className="px-4 py-2 border hover:bg-accent hover:text-accent-foreground rounded-md">
                                Save for Later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetailPage
