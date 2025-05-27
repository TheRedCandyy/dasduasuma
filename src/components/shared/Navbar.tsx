import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [animated, setAnimated] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down 100px or more
      const shouldShow = window.scrollY > 100

      // Update navbar visibility
      if (shouldShow !== visible) {
        setVisible(shouldShow)

        // Reset animation state when navbar is hidden
        if (!shouldShow) {
          setAnimated(false)
        }
      }

      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible, lastScrollY])

  // Trigger animations after navbar becomes visible
  useEffect(() => {
    if (visible && !animated) {
      const timer = setTimeout(() => {
        setAnimated(true)
      }, 100) // Small delay after navbar appears

      return () => clearTimeout(timer)
    }
  }, [visible, animated])

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full bg-[#f0e4c7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f0e4c7]/60 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 shadow-md' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center transition-all duration-500"
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateX(0)' : 'translateX(-20px)',
          }}
        >
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-serif font-bold italic text-slate-900">
              {t('homePage.heroTitle')}
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div
          className="flex items-center transition-all duration-500"
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateX(0)' : 'translateX(20px)',
            transitionDelay: '150ms',
          }}
        >
          {/* <CartButton /> // CartButton removed for now */}
        </div>
      </div>
    </header>
  )
}
