import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

const CartButton = () => {
    const itemCount = useCartStore((state) => state.items.length)
    const itemQuantity = useCartStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    )
    const toggleCart = useUIStore((state) => state.toggleCart)

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 rounded-full text-slate-800 hover:text-black"
            aria-label="Open cart"
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
                className="h-6 w-6"
            >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>

            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                    {itemQuantity}
                </span>
            )}
        </button>
    )
}

export default CartButton
