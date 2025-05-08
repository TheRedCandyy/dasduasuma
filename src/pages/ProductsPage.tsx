import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from '@/components/shared/ProductCard'

const categories = [
    { name: 'All Wines', value: null },
    { name: 'Red', value: 'red' },
    { name: 'White', value: 'white' },
    { name: 'Rosé', value: 'rosé' },
    { name: 'Sparkling', value: 'sparkling' },
    { name: 'Collections', value: 'collection' },
]

const ProductsPage = () => {
    const { data: products, isLoading, error } = useProducts()
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    // Filter products by category if one is selected
    const filteredProducts = activeCategory
        ? products?.filter((product) => product.category === activeCategory)
        : products

    return (
        <div className="py-8">
            <div className="container mx-auto px-4 lg:px-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">
                            Our Wines
                        </h1>
                        <p className="text-slate-700 max-w-[600px]">
                            Explore our collection of exquisite wines from New
                            Zealand's finest vineyards, crafted with passion and
                            expertise.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm font-medium mr-2 text-slate-700">
                            Sort by:
                        </span>
                        <select className="border border-[#d9c278] rounded-md py-1 px-2 bg-[#e9ddc0] text-slate-900 text-sm">
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Vintage: New to Old</option>
                        </select>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.value)}
                            className={`px-3 py-1.5 text-sm rounded-full ${
                                activeCategory === category.value
                                    ? 'bg-black text-white'
                                    : 'bg-[#e9ddc0] text-slate-700 hover:bg-[#d9c278] hover:text-slate-900'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center items-center py-16">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="rounded-lg bg-red-100 p-4 text-red-800 border border-red-300">
                        Error loading wines:{' '}
                        {error instanceof Error
                            ? error.message
                            : 'Unknown error'}
                    </div>
                )}

                {/* Empty state */}
                {filteredProducts?.length === 0 && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-20 w-20 rounded-full bg-[#e9ddc0] flex items-center justify-center border border-[#d9c278]">
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
                                className="h-10 w-10 text-slate-500"
                            >
                                <path d="M8 22h8"></path>
                                <path d="M7 10h10"></path>
                                <path d="M12 15v7"></path>
                                <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"></path>
                            </svg>
                        </div>
                        <h2 className="mt-4 text-xl font-semibold text-slate-900">
                            No wines found
                        </h2>
                        <p className="mt-2 text-slate-700 max-w-[500px]">
                            We couldn't find any wines in this category. Please
                            try selecting a different category or check back
                            later.
                        </p>
                    </div>
                )}

                {/* Product grid */}
                {filteredProducts && filteredProducts.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                showDescription={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductsPage
