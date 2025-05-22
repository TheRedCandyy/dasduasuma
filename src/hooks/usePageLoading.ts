import { useState, useEffect } from 'react'

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set loading to false when the page is fully loaded
    const handleLoad = () => {
      setIsLoading(false)
    }

    // Check if the page is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      window.addEventListener('load', handleLoad)

      // Fallback timeout (in case load event doesn't fire)
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 5000)

      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(timeout)
      }
    }
  }, [])

  return { isLoading }
}
