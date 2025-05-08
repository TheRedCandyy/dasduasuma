import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'

const CartPage = () => {
    const {
        items,
        subtotal,
        shipping,
        tax,
        total,
        removeItem,
        updateQuantity,
    } = useCartStore()

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
                <p className="text-muted-foreground">
                    Review and manage your items before checkout
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                <div className="space-y-4">
                    {items.length === 0 ? (
                        <div className="rounded-lg border p-8 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
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
                                    className="h-12 w-12 text-muted-foreground"
                                >
                                    <circle cx="8" cy="21" r="1" />
                                    <circle cx="19" cy="21" r="1" />
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                                <h2 className="text-xl font-medium">
                                    Your cart is empty
                                </h2>
                                <p className="text-muted-foreground">
                                    Looks like you haven't added anything to
                                    your cart yet.
                                </p>
                                <Link
                                    to="/products"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 px-4 py-2 rounded-md"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg border">
                            {items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="p-4 flex items-center gap-4 border-b last:border-b-0"
                                >
                                    <div className="h-16 w-16 bg-muted rounded" />
                                    <div className="flex-1">
                                        <Link
                                            to={`/products/${item.productId}`}
                                        >
                                            <h3 className="font-medium hover:text-primary">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">
                                            ${item.product.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="h-8 w-8 rounded-md border flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="h-8 w-8 rounded-md border flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            $
                                            {(
                                                item.product.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeItem(item.productId)
                                            }
                                            className="text-sm text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="space-y-4">
                        <div className="rounded-lg border p-4 space-y-4">
                            <h3 className="font-medium">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link
                                to="/checkout"
                                className="block w-full py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-center"
                            >
                                Proceed to Checkout
                            </Link>
                            <button
                                onClick={() =>
                                    useCartStore.getState().clearCart()
                                }
                                className="w-full text-sm text-center text-red-500 mt-2"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage
