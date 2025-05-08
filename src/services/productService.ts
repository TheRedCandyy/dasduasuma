import type { Product } from '@/lib/types'
import { mockProducts } from '@/lib/mock-data'

// Simulate API request delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const productService = {
    // Get all products
    async getAllProducts(): Promise<Product[]> {
        // Simulate API call
        await delay(500)
        return mockProducts
    },

    // Get a single product by ID
    async getProductById(id: string): Promise<Product | undefined> {
        // Simulate API call
        await delay(300)
        return mockProducts.find((product) => product.id === id)
    },

    // Get products by category
    async getProductsByCategory(category: string): Promise<Product[]> {
        // Simulate API call
        await delay(500)
        return mockProducts.filter((product) => product.category === category)
    },

    // Search products
    async searchProducts(query: string): Promise<Product[]> {
        // Simulate API call
        await delay(700)
        const lowercaseQuery = query.toLowerCase()
        return mockProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(lowercaseQuery) ||
                product.description.toLowerCase().includes(lowercaseQuery)
        )
    },
}
