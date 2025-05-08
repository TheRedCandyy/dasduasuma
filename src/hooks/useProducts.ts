import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getAllProducts(),
    })
}

export function useProduct(id: string) {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id, // Only run if id is provided
    })
}

export function useProductsByCategory(category: string) {
    return useQuery({
        queryKey: ['products', 'category', category],
        queryFn: () => productService.getProductsByCategory(category),
        enabled: !!category, // Only run if category is provided
    })
}

export function useProductSearch(query: string) {
    return useQuery({
        queryKey: ['products', 'search', query],
        queryFn: () => productService.searchProducts(query),
        enabled: query.length > 0, // Only run if query has content
    })
}
