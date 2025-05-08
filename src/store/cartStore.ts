import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Cart, CartItem, Product } from '@/lib/types'

interface CartState extends Cart {
    // Actions
    addItem: (product: Product, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
}

// Helper function to calculate cart totals
const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    )
    const shipping = items.length > 0 ? 4.99 : 0
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + shipping + tax

    return {
        subtotal,
        shipping,
        tax,
        total,
    }
}

// Create the store
export const useCartStore = create<CartState>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                subtotal: 0,
                shipping: 0,
                tax: 0,
                total: 0,

                addItem: (product, quantity = 1) => {
                    const { items } = get()
                    const existingItem = items.find(
                        (item) => item.productId === product.id
                    )

                    let newItems: CartItem[]

                    if (existingItem) {
                        // Update quantity if item already exists
                        newItems = items.map((item) =>
                            item.productId === product.id
                                ? {
                                      ...item,
                                      quantity: item.quantity + quantity,
                                  }
                                : item
                        )
                    } else {
                        // Add new item if it doesn't exist
                        newItems = [
                            ...items,
                            {
                                productId: product.id,
                                quantity,
                                product,
                            },
                        ]
                    }

                    // Set the state with new items and calculated totals
                    set({
                        items: newItems,
                        ...calculateTotals(newItems),
                    })
                },

                removeItem: (productId) => {
                    const { items } = get()
                    const newItems = items.filter(
                        (item) => item.productId !== productId
                    )

                    set({
                        items: newItems,
                        ...calculateTotals(newItems),
                    })
                },

                updateQuantity: (productId, quantity) => {
                    const { items } = get()

                    // Prevent negative quantities
                    if (quantity <= 0) {
                        return get().removeItem(productId)
                    }

                    const newItems = items.map((item) =>
                        item.productId === productId
                            ? { ...item, quantity }
                            : item
                    )

                    set({
                        items: newItems,
                        ...calculateTotals(newItems),
                    })
                },

                clearCart: () => {
                    set({
                        items: [],
                        subtotal: 0,
                        shipping: 0,
                        tax: 0,
                        total: 0,
                    })
                },
            }),
            {
                name: 'cart-storage',
                // Optional: Select which parts of the state to persist
                partialize: (state) => ({ items: state.items }),
            }
        )
    )
)
