import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-[#f0e4c7]">
            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold italic text-slate-900">
                            Das Duas Uma
                        </h3>
                        <p className="text-sm text-slate-700">
                            Exquisite wines from New Zealand's finest vineyards.
                            Crafted with passion and expertise for the
                            discerning wine enthusiast.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-900">
                            Our Wines
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-slate-700 hover:text-black"
                                >
                                    All Wines
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=red"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Red Wines
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=white"
                                    className="text-slate-700 hover:text-black"
                                >
                                    White Wines
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=sparkling"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Sparkling
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-900">
                            About Us
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Our Story
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Vineyards
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Winemaking Process
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Awards
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-900">
                            Visit Us
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Tasting Room
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Wine Tours
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Events
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-slate-700 hover:text-black"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-slate-600">
                        &copy; {new Date().getFullYear()} Das Duas Uma. All
                        rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-xs text-slate-600 hover:text-black"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-xs text-slate-600 hover:text-black"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="text-xs text-slate-600 hover:text-black"
                        >
                            Shipping
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
