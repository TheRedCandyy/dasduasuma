import { Link } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from '@/components/shared/ProductCard'

const HomePage = () => {
    const { data: products, isLoading } = useProducts()

    // Take first 3 products as featured products
    const featuredProducts = products?.slice(0, 3)

    return (
        <div className="space-y-12 bg-[#f0e4c7] text-slate-900">
            {/* Hero section */}
            <section className="relative py-16 md:py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col md:w-1/2">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8 font-serif italic">
                                Das Duas Uma
                            </h1>
                            <p className="text-slate-800 text-lg leading-relaxed">
                                With its cool, wine-growing regions, New Zealand
                                is home to some of the world's best pinot noirs.
                                Absolutely breathtaking, deep, dark-fruited,
                                fresh and lively wines are being made in places
                                like Central Otago. And in the heart of this
                                region lies Felton Road, maker of some complex
                                pinots.
                            </p>
                            <p className="text-slate-800 text-lg leading-relaxed mt-4">
                                Their Calvert Vineyard rendition takes its charm
                                from the Bannockburn soils, which are
                                essentially lake-bed silty loam, gravel and
                                schist. These soils do hold a bit of water, and
                                at lower elevations, help grapes ripen evenly
                                and fully.
                            </p>
                            <div className="mt-8">
                                <Link
                                    to="/products"
                                    className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-md font-medium inline-block"
                                >
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex items-center justify-center">
                            {/* Wine bottle placeholder */}
                            <div className="aspect-[2/3] w-full max-w-xs bg-[#e9ddc0] rounded flex items-center justify-center border border-[#d9c278]">
                                <span className="text-slate-500">
                                    Wine Bottle Image
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured wines showcase */}
            <section className="bg-[#e9ddc0] py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="bg-[#f0e4c7] rounded-lg p-6 flex flex-col items-center border border-[#d9c278]">
                            {/* Wine placeholder */}
                            <div className="aspect-[2/3] w-32 bg-[#e9ddc0] rounded mb-4 flex items-center justify-center">
                                <span className="text-slate-500">
                                    Wine Image
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-black italic mb-2">
                                Le Vinto Wine
                            </h3>
                            <p className="text-black font-bold text-lg">$170</p>
                        </div>

                        <div className="bg-[#f0e4c7] rounded-lg p-6 flex flex-col items-center border border-[#d9c278]">
                            {/* Wine placeholder */}
                            <div className="aspect-[2/3] w-32 bg-[#e9ddc0] rounded mb-4 flex items-center justify-center">
                                <span className="text-slate-500">
                                    Wine Image
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-black italic mb-2">
                                Spina Wine
                            </h3>
                            <p className="text-black font-bold text-lg">$200</p>
                        </div>

                        <div className="bg-[#f0e4c7] rounded-lg p-6 flex flex-col items-center border border-[#d9c278]">
                            {/* Featured wine showcase */}
                            <div className="aspect-[2/3] w-32 bg-[#e9ddc0] rounded mb-4 flex items-center justify-center">
                                <span className="text-slate-500">
                                    Wine Image
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-black italic mb-2">
                                Das Duas Uma
                            </h3>
                            <p className="text-slate-600 text-sm mb-2">
                                Vinho Branco
                            </p>
                            <p className="text-black font-bold text-lg">$170</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About our wines section */}
            <section>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-1 text-slate-900 font-serif italic">
                                Our Collection
                            </h2>
                            <p className="text-slate-600">
                                Discover our handcrafted wines from New
                                Zealand's finest vineyards
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="text-black hover:underline font-medium"
                        >
                            View All Wines
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-10">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts?.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    imageSize="large"
                                    showDescription={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter section */}
            <section className="bg-black text-white py-12">
                <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold tracking-tight font-serif italic">
                        Join Our Wine Club
                    </h2>
                    <p className="mt-2 max-w-[600px]">
                        Receive exclusive access to limited releases and special
                        offers.
                    </p>
                    <div className="mt-6 w-full max-w-md">
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 py-2 px-4 rounded-l-md bg-[#e9ddc0] border-[#d9c278] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d9c278]"
                            />
                            <button className="bg-slate-900 text-white px-4 py-2 rounded-r-md font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
