import { Link, useRouteError } from 'react-router-dom'

interface RouterError {
    statusText?: string
    message?: string
}

const NotFoundPage = () => {
    const error = useRouteError() as RouterError | Error

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 space-y-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
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
                    className="text-muted-foreground"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <div className="text-center space-y-2 max-w-md">
                <h1 className="text-3xl font-bold">Page Not Found</h1>
                <p className="text-muted-foreground">
                    Sorry, the page you are looking for doesn't exist or has
                    been moved.
                </p>
                {error && (
                    <p className="text-sm text-red-500">
                        {error instanceof Error
                            ? error.message
                            : error.statusText ||
                              error.message ||
                              'Unknown error'}
                    </p>
                )}
            </div>
            <Link
                to="/"
                className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
                Return to Home
            </Link>
        </div>
    )
}

export default NotFoundPage
