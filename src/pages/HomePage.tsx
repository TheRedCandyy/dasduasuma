import { useTranslation } from 'react-i18next'
import { useEffect, useState, useRef } from 'react'
import CodeEntry from '@/components/sensorial/CodeEntry'

const FadeIn = ({
  children,
  delay = 0,
  duration = 700,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all ease-in-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const ScrollArrow = ({ onClick, className = '' }: { onClick: () => void; className?: string }) => {
  return (
    <div
      className={`flex flex-col items-center mt-6 animate-bounce cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      aria-label="Scroll down"
      tabIndex={0}
    >
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
        className="text-slate-700"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  )
}

const HomePage = () => {
  const { t } = useTranslation()
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const mobileSection2Ref = useRef<HTMLElement>(null)
  const mobileSection3Ref = useRef<HTMLElement>(null)

  const desktopCodeEntrySectionRef = useRef<HTMLElement>(null)

  const handleDesktopScrollToCode = () => {
    desktopCodeEntrySectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToMobileSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#f0e4c7] text-slate-900">
      {/* Mobile Layout: 3 sections, scroll snap */}
      <div
        ref={mobileContainerRef}
        className="md:hidden h-screen snap-y snap-mandatory overflow-y-auto"
      >
        {/* Mobile Section 1: Title & Image */}
        <section
          id="mobile-hero1"
          className="h-screen snap-start relative flex flex-col items-center justify-center p-4 pt-12"
        >
          <div className="text-center w-full max-w-md">
            <FadeIn delay={300}>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-8 font-serif italic">
                {t('homePage.heroTitle')}
              </h1>
            </FadeIn>
            <FadeIn delay={500} duration={1000}>
              <div className="w-full max-w-xs mx-auto">
                <img
                  src="/img/wine_1.jpeg"
                  alt="Das Duas Uma Wine Bottle"
                  className="w-full h-auto rounded shadow-md"
                />
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={800} className="absolute bottom-6">
            <ScrollArrow onClick={() => scrollToMobileSection(mobileSection2Ref)} />
          </FadeIn>
        </section>

        {/* Mobile Section 2: Descriptions & Quote */}
        <section
          ref={mobileSection2Ref}
          id="mobile-hero2"
          className="h-screen snap-start relative flex flex-col items-center justify-center p-6 text-center"
        >
          <FadeIn delay={300}>
            <p className="text-slate-800 text-lg leading-relaxed mb-4">
              {t('homePage.heroDescription1')}
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <p className="text-slate-800 text-lg leading-relaxed mb-8">
              {t('homePage.heroDescription2')}
            </p>
          </FadeIn>
          <FadeIn delay={900}>
            <p className="text-slate-800 text-xl italic font-serif mb-6">
              "{t('homePage.heroQuote')}"
            </p>
          </FadeIn>
          <FadeIn delay={1200} className="absolute bottom-6">
            <ScrollArrow onClick={() => scrollToMobileSection(mobileSection3Ref)} />
          </FadeIn>
        </section>

        {/* Mobile Section 3: Code Entry */}
        <section
          ref={mobileSection3Ref}
          id="mobile-code"
          className="h-screen snap-start flex flex-col items-center justify-center p-4"
        >
          <FadeIn className="w-full max-w-md">
            <CodeEntry />
          </FadeIn>
        </section>
      </div>

      {/* Desktop Layout: Existing 2 sections */}
      <div className="hidden md:block">
        <section
          id="desktop-hero"
          className="relative flex flex-col items-center justify-center"
          style={{ height: '100vh' }}
        >
          <div className="container mx-auto px-4 lg:px-8 flex-grow flex items-center">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <div className="flex flex-col md:w-1/2 justify-center">
                <FadeIn delay={300}>
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8 font-serif italic">
                    {t('homePage.heroTitle')}
                  </h1>
                </FadeIn>
                <FadeIn delay={600}>
                  <p className="text-slate-800 text-lg leading-relaxed">
                    {t('homePage.heroDescription1')}
                  </p>
                </FadeIn>
                <FadeIn delay={900}>
                  <p className="text-slate-800 text-lg leading-relaxed mt-4">
                    {t('homePage.heroDescription2')}
                  </p>
                </FadeIn>
              </div>
              <div className="md:w-1/2 flex items-center justify-center m-12 md:m-0">
                <FadeIn delay={500} duration={1000}>
                  <div className="w-full max-w-xs">
                    <img
                      src="/img/wine_1.jpeg"
                      alt="Das Duas Uma Wine Bottle"
                      className="w-full h-auto rounded shadow-md"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-6 absolute bottom-4">
            <FadeIn delay={1200}>
              <div className="container mx-auto px-4 lg:px-8 text-center mb-2">
                <p className="text-slate-800 text-xl italic font-serif">
                  "{t('homePage.heroQuote')}"
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={1500}>
              <div className="hover:opacity-80 transition-opacity">
                <ScrollArrow onClick={handleDesktopScrollToCode} />
              </div>
            </FadeIn>
          </div>
        </section>

        <section
          ref={desktopCodeEntrySectionRef}
          id="desktop-code"
          className="py-16 bg-[#f0e4c7] flex items-center justify-center"
          style={{ height: '80vh' }}
        >
          <div className="container mx-auto px-4 w-full">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <CodeEntry />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
