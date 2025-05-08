import { Link } from 'react-router-dom'

const PaymentFailurePage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
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
                    className="text-red-600"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Payment Failed</h1>
                <p className="text-muted-foreground">
                    We couldn't process your payment. Please try again or use a
                    different payment method.
                </p>
            </div>
            <div className="rounded-lg border p-6 w-full max-w-md">
                <h2 className="font-medium text-lg mb-4">Error Details</h2>
                <p className="text-muted-foreground">
                    Your payment could not be processed due to one of the
                    following reasons:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    <li>Insufficient funds</li>
                    <li>Card declined by the issuing bank</li>
                    <li>Incorrect payment information</li>
                    <li>Technical error with the payment system</li>
                </ul>
            </div>
            <div className="flex gap-4">
                <Link
                    to="/checkout"
                    className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                >
                    Try Again
                </Link>
                <Link
                    to="/cart"
                    className="px-4 py-2 border hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                    Return to Cart
                </Link>
            </div>
        </div>
    )
}

export default PaymentFailurePage
