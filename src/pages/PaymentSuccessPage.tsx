import { Link } from 'react-router-dom'

const PaymentSuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Payment Successful!</h1>
                <p className="text-muted-foreground">
                    Thank you for your purchase. Your order has been confirmed.
                </p>
            </div>
            <div className="rounded-lg border p-6 w-full max-w-md">
                <h2 className="font-medium text-lg mb-4">Order Details</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Order ID</span>
                        <span className="font-medium">ORD-12345</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">
                            {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-medium">$224.97</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <Link
                    to="/"
                    className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                >
                    Return to Home
                </Link>
                <button className="px-4 py-2 border hover:bg-accent hover:text-accent-foreground rounded-md">
                    View Order Details
                </button>
            </div>
        </div>
    )
}

export default PaymentSuccessPage
