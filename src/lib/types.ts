export interface Product {
    id: string
    name: string
    description: string
    price: number
    image?: string
    category: string
    inStock: boolean
    features?: string[]
}

export interface CartItem {
    productId: string
    quantity: number
    product: Product
}

export interface Cart {
    items: CartItem[]
    subtotal: number
    shipping: number
    tax: number
    total: number
}
