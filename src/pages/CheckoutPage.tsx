const CheckoutPage = () => {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                <p className="text-muted-foreground">
                    Complete your order by providing your details
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                <div className="space-y-6">
                    <div className="rounded-lg border p-4 space-y-4">
                        <h2 className="font-medium text-lg">
                            Contact Information
                        </h2>
                        <div className="grid gap-4">
                            <div>
                                <label
                                    className="text-sm font-medium"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="mt-1 w-full rounded-md border p-2"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label
                                    className="text-sm font-medium"
                                    htmlFor="phone"
                                >
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="mt-1 w-full rounded-md border p-2"
                                    placeholder="+1 (123) 456-7890"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border p-4 space-y-4">
                        <h2 className="font-medium text-lg">
                            Shipping Address
                        </h2>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="mt-1 w-full rounded-md border p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="mt-1 w-full rounded-md border p-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="text-sm font-medium"
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    className="mt-1 w-full rounded-md border p-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="city"
                                    >
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        className="mt-1 w-full rounded-md border p-2"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="zip"
                                    >
                                        Zip Code
                                    </label>
                                    <input
                                        id="zip"
                                        type="text"
                                        className="mt-1 w-full rounded-md border p-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border p-4 space-y-4">
                        <h2 className="font-medium text-lg">
                            Payment Information
                        </h2>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Stripe integration will be implemented here
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="rounded-lg border p-4 space-y-4">
                        <h3 className="font-medium">Order Summary</h3>
                        <div className="space-y-2">
                            {/* Cart items summary */}
                            <div className="text-sm">2 items</div>
                            <div className="border-t my-2"></div>
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>$199.98</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>$4.99</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax</span>
                                <span>$20.00</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-medium">
                                <span>Total</span>
                                <span>$224.97</span>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                            Complete Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
