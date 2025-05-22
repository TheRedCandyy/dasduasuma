import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

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

const ScrollArrow = () => {
  return (
    <div className="flex flex-col items-center mt-6 animate-bounce">
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

  return (
    <div className="bg-[#f0e4c7] text-slate-900">
      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 flex-grow flex items-center">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex flex-col md:w-1/2 justify-center">
              <FadeIn delay={300}>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8 font-serif italic">
                  {t('homePage.heroTitle')}
                </h1>
              </FadeIn>

              <FadeIn delay={600}>
                <p className="text-slate-800 text-lg leading-relaxed hidden md:block">
                  {t('homePage.heroDescription1')}
                </p>
              </FadeIn>

              <FadeIn delay={900}>
                <p className="text-slate-800 text-lg leading-relaxed mt-4 hidden md:block">
                  {t('homePage.heroDescription2')}
                </p>
              </FadeIn>
            </div>
            <div className="md:w-1/2 flex items-center justify-center m-12 md:m-0">
              {/* Wine bottle image */}
              <FadeIn delay={500} duration={1000}>
                <div className="w-full max-w-sm">
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
        <div className="flex flex-col items-center mb-12">
          <FadeIn delay={1200}>
            <div className="container mx-auto px-4 lg:px-8 text-center mb-6">
              <p className="text-slate-800 text-xl italic font-serif">
                "{t('homePage.heroQuote')}"
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={1500}>
            <ScrollArrow />
          </FadeIn>
        </div>
      </section>

      {/* Sensory Experience Section */}
      <section className="py-16 md:py-24 bg-[#e9ddc0]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Title */}
          <FadeIn delay={300}>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-12 font-serif italic text-center">
              {t('sensoryExperience.title')}
            </h2>
          </FadeIn>

          {/* Low-intervention wines */}
          <FadeIn delay={400}>
            <div className="mb-16">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 font-serif italic">
                {t('sensoryExperience.lowIntervention.title')}
              </h3>
              <p className="text-slate-800 leading-relaxed mb-4">
                {t('sensoryExperience.lowIntervention.description1')}
              </p>
              <p className="text-slate-800 leading-relaxed">
                {t('sensoryExperience.lowIntervention.description2')}
              </p>
            </div>
          </FadeIn>

          {/* Defects as virtues */}
          <FadeIn delay={500}>
            <div className="bg-[#f0e4c7] rounded-lg p-8 shadow-md mb-16">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 font-serif italic text-center">
                {t('sensoryExperience.defectsAsVirtues.title')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="mb-4 md:mb-0">
                  <h4 className="font-bold text-slate-900 mb-1">
                    {t('sensoryExperience.defectsAsVirtues.diacetil.title')}
                  </h4>
                  <p className="text-slate-800 leading-relaxed mb-1">
                    <span className="font-medium">
                      {t('sensoryExperience.defectsAsVirtues.description')}
                    </span>{' '}
                    – {t('sensoryExperience.defectsAsVirtues.diacetil.description')}
                  </p>
                  <p className="text-slate-800 leading-relaxed">
                    <span className="font-medium">
                      {t('sensoryExperience.defectsAsVirtues.cause')}
                    </span>{' '}
                    – {t('sensoryExperience.defectsAsVirtues.diacetil.cause')}
                  </p>
                </div>

                <div className="mb-4 md:mb-0">
                  <h4 className="font-bold text-slate-900 mb-1">
                    {t('sensoryExperience.defectsAsVirtues.oxidation.title')}
                  </h4>
                  <p className="text-slate-800 leading-relaxed mb-1">
                    <span className="font-medium">
                      {t('sensoryExperience.defectsAsVirtues.description')}
                    </span>{' '}
                    – {t('sensoryExperience.defectsAsVirtues.oxidation.description')}
                  </p>
                  <p className="text-slate-800 leading-relaxed">
                    <span className="font-medium">
                      {t('sensoryExperience.defectsAsVirtues.cause')}
                    </span>{' '}
                    – {t('sensoryExperience.defectsAsVirtues.oxidation.cause')}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    {t('sensoryExperience.defectsAsVirtues.cooked.title')}
                  </h4>
                  <p className="text-slate-800 leading-relaxed mb-1">
                    <span className="font-medium">
                      {t('sensoryExperience.defectsAsVirtues.description')}
                    </span>{' '}
                    – {t('sensoryExperience.defectsAsVirtues.cooked.description')}
                  </p>
                  <p className="text-slate-800 leading-relaxed">
                    <span className="font-medium">
                      {t('sensoryExperience.defectsAsVirtues.cause')}
                    </span>{' '}
                    – {t('sensoryExperience.defectsAsVirtues.cooked.cause')}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* The Wine / Sensory Experience */}
          <FadeIn delay={600}>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-6 font-serif italic">
                {t('sensoryExperience.theWine.title')}
              </h3>

              <p className="text-slate-800 text-lg leading-relaxed mb-8 italic">
                {t('sensoryExperience.theWine.intro')}
              </p>

              <p className="text-slate-800 leading-relaxed mb-12">
                {t('sensoryExperience.theWine.instructions')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-[#f0e4c7] rounded-lg p-6 shadow-md">
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 mb-4 font-serif italic text-center">
                    {t('sensoryExperience.theWine.eyes.title')}
                  </h4>
                  <p className="text-slate-800 leading-relaxed">
                    {t('sensoryExperience.theWine.eyes.description')}
                  </p>
                </div>

                <div className="bg-[#f0e4c7] rounded-lg p-6 shadow-md">
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 mb-4 font-serif italic text-center">
                    {t('sensoryExperience.theWine.nose.title')}
                  </h4>
                  <p className="text-slate-800 leading-relaxed mb-4">
                    {t('sensoryExperience.theWine.nose.description1')}
                  </p>
                  <p className="text-slate-800 leading-relaxed">
                    {t('sensoryExperience.theWine.nose.description2')}
                  </p>
                </div>

                <div className="bg-[#f0e4c7] rounded-lg p-6 shadow-md">
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 mb-4 font-serif italic text-center">
                    {t('sensoryExperience.theWine.mouth.title')}
                  </h4>
                  <p className="text-slate-800 leading-relaxed">
                    {t('sensoryExperience.theWine.mouth.description')}
                  </p>
                </div>
              </div>

              <p className="text-slate-800 leading-relaxed mb-4">
                <span className="font-bold">
                  {t('sensoryExperience.theWine.acetaldehyde.title')}:
                </span>{' '}
                {t('sensoryExperience.theWine.acetaldehyde.description')}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default HomePage
