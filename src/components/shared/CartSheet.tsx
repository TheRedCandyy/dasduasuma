import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { Link } from 'react-router-dom'

const CartSheet = () => {
    const isCartOpen = useUIStore((state) => state.isCartOpen)
    const closeCart = useUIStore((state) => state.closeCart)
    const {
        items,
        subtotal,
        shipping,
        tax,
        total,
        removeItem,
        updateQuantity,
    } = useCartStore()

    if (!isCartOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
                onClick={closeCart}
            />

            {/* Cart Sheet */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col bg-[#f0e4c7] text-slate-900 shadow-lg">
                <div className="flex items-center justify-between px-6 py-4">
                    <h2 className="text-lg font-medium">Shopping Cart</h2>
                    <button
                        onClick={closeCart}
                        className="p-2 rounded-full text-slate-800 hover:text-black"
                        aria-label="Close cart"
                    >
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
                            className="h-5 w-5"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
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
                                className="h-12 w-12 text-slate-500"
                            >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            <p className="text-slate-600">Your cart is empty</p>
                            <button
                                onClick={closeCart}
                                className="bg-black text-white hover:bg-gray-900 px-4 py-2 rounded-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.productId}
                                    className="flex gap-4 pb-4"
                                >
                                    <div className="h-20 w-20 bg-[#e9ddc0] rounded-md shrink-0 border border-[#d9c278]" />
                                    <div className="flex-1 space-y-1">
                                        <h3 className="font-medium">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            ${item.product.price.toFixed(2)}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="h-7 w-7 rounded-md border border-[#d9c278] flex items-center justify-center text-slate-800 hover:bg-[#e9ddc0]"
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
                                                className="h-7 w-7 rounded-md border border-[#d9c278] flex items-center justify-center text-slate-800 hover:bg-[#e9ddc0]"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <span className="font-medium text-black">
                                            $
                                            {(
                                                item.product.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() =>
                                                removeItem(item.productId)
                                            }
                                            className="text-sm text-red-700 hover:text-red-900"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 space-y-4">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-black">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/checkout"
                                onClick={closeCart}
                                className="bg-black text-white hover:bg-gray-900 py-2 rounded-md text-center"
                            >
                                Checkout
                            </Link>
                            <Link
                                to="/cart"
                                onClick={closeCart}
                                className="border border-[#d9c278] hover:bg-[#e9ddc0] py-2 rounded-md text-center"
                            >
                                View Cart
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartSheet
