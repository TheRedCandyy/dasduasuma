import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageLoading } from '@/hooks/usePageLoading'
import SoundToggle from './Sound'
import { useSoundStore } from '@/store/useSoundStore'

interface LoadingScreenProps {
  minDisplayTime?: number // Minimum time to show the loading screen in ms
}

const LoadingScreen = ({ minDisplayTime = 2000 }: LoadingScreenProps) => {
  const { t, i18n } = useTranslation()
  const { isLoading: pageIsLoading } = usePageLoading()
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [languageSelected, setLanguageSelected] = useState(false)
  const { soundEnabled } = useSoundStore()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguageSelected(true)
  }

  useEffect(() => {
    if (!languageSelected) return

    const startTime = Date.now()

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 - prev) * 0.1
        return Math.min(newProgress, pageIsLoading ? 85 : 99) // Cap at 85% until page is loaded
      })
    }, 100)

    // Handle the end of loading
    const completeLoading = () => {
      const elapsedTime = Date.now() - startTime

      // Ensure minimum display time
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime)

      setTimeout(() => {
        setProgress(100)
        setTimeout(() => setIsVisible(false), 500) // Fade out animation time
      }, remainingTime)
    }

    // When page is loaded, complete the loading process
    if (!pageIsLoading) {
      completeLoading()
    }

    return () => {
      clearInterval(interval)
    }
  }, [pageIsLoading, minDisplayTime, languageSelected])

  if (!isVisible) return null

  // Language selection screen
  if (!languageSelected) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f0e4c7]">
        <div className="flex flex-col items-center text-center max-w-md px-6">
          <h1 className="text-4xl font-bold italic font-serif text-slate-900 mb-12">
            Das Duas Uma
          </h1>

          <div className="w-full max-w-xs space-y-10">
            {/* Sound Toggle */}
            <div className="flex flex-col items-center">
              <SoundToggle />
              <p className="mt-3 text-lg text-slate-800">{t('sound.enablePrompt')}</p>
            </div>

            {/* Divider */}
            <div className="flex items-center w-full">
              <div className="flex-grow h-px bg-[#d9c278] opacity-50"></div>
              <span className="px-4 text-lg text-[#534c3e] italic">{t('common.and')}</span>
              <div className="flex-grow h-px bg-[#d9c278] opacity-50"></div>
            </div>

            {/* Language Selection */}
            <div className="flex flex-col items-center space-y-6">
              <p className="text-lg text-slate-800">{t('language.selectLanguage')}</p>

              <div className="flex gap-4 justify-center w-full">
                <button
                  onClick={() => changeLanguage('en')}
                  className="flex-1 hover:cursor-pointer bg-[#534c3e] text-white px-6 py-3 rounded-md font-medium transition-all hover:bg-[#3a342c] focus:outline-none focus:ring-2 focus:ring-[#d9c278] flex items-center justify-center"
                >
                  <span className="mr-2 w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                    <img
                      src="/img/flags/en.svg"
                      alt="English flag"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  {t('language.en')}
                </button>
                <button
                  onClick={() => changeLanguage('pt')}
                  className="flex-1 hover:cursor-pointer bg-[#534c3e] text-white px-6 py-3 rounded-md font-medium transition-all hover:bg-[#3a342c] focus:outline-none focus:ring-2 focus:ring-[#d9c278] flex items-center justify-center"
                >
                  <span className="mr-2 w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                    <img
                      src="/img/flags/pt.svg"
                      alt="Portuguese flag"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  {t('language.pt')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f0e4c7] transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}
      style={{ pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      <div className="flex flex-col items-center">
        {/* Simplified wine bottle with direct height-based filling */}
        <div className="mb-10">
          <div className="relative w-20 h-48 animate-[subtle-float_3s_ease-in-out_infinite]">
            {/* Cork */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-[#b08968] rounded-t-md z-30"></div>

            {/* Bottle outline */}
            <div className="absolute inset-0">
              {/* Neck */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-[#534c3e] rounded-t-md"></div>

              {/* Body */}
              <div className="absolute top-8 inset-x-0 bottom-0 bg-[#534c3e] rounded-lg"></div>

              {/* Interior */}
              <div className="absolute top-8 inset-x-1 bottom-1 bg-[#e9ddc0] opacity-40 rounded-lg"></div>
            </div>

            {/* This is the fill level container - it starts from the bottom */}
            <div className="absolute inset-x-2 bottom-2 top-8 overflow-hidden">
              {/* This div represents the liquid and its height is controlled by the progress */}
              <div
                className="absolute inset-x-0 bottom-0 bg-[#d9c278]"
                style={{
                  height: `${progress}%`,
                  transition: 'height 0.3s ease-out',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                }}
              ></div>
            </div>

            {/* Bottle neck fill - separate element that only shows at 90%+ */}
            {progress >= 90 && (
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 overflow-hidden z-20"
                style={{
                  height: progress >= 100 ? '8px' : `${((progress - 90) * 8) / 10}px`,
                }}
              >
                <div className="absolute inset-0 bg-[#d9c278]"></div>
              </div>
            )}

            {/* Bottle highlight */}
            <div className="absolute top-10 bottom-2 left-2 w-2 bg-white opacity-10 rounded-l-lg z-20"></div>
          </div>
        </div>

        <div className="text-4xl font-bold italic font-serif text-slate-900 mb-6">
          {t('homePage.heroTitle')}
        </div>

        {/* Visual progress bar */}
        <div className="w-64 h-2 bg-[#e9ddc0] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[#534c3e] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="text-center mb-4">
          <span className="text-sm text-slate-800 font-medium">{Math.round(progress)}%</span>
        </div>

        <p className="text-slate-800 italic">
          {progress < 100 ? t('loading.loading') : t('loading.welcome')}
        </p>
      </div>

      <style>
        {`
          @keyframes subtle-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateY(0) scaleY(1); }
            50% { transform: translateY(-2px) scaleY(1.3); }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingScreen
