import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'
import SoundToggle from './Sound'

type Language = 'en' | 'pt'

interface LanguageModalProps {
  isOpen: boolean
  onClose: () => void
}

const LanguageModal = ({ isOpen, onClose }: LanguageModalProps) => {
  const { t, i18n } = useTranslation()

  // Lock scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      lockScroll()
    }

    return () => {
      // Always unlock on unmount regardless of isOpen state
      unlockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLanguageChange = (language: Language) => {
    i18n.changeLanguage(language)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#f0e4c7] rounded-lg p-6 max-w-md w-full m-4 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-700 hover:text-slate-900"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold italic font-serif text-slate-900 mb-6">
            {t('language.selectLanguage', 'Select Language')}
          </h2>

          <div className="w-full space-y-8 mb-4">
            {/* Sound Toggle */}
            <div className="flex flex-col items-center">
              <SoundToggle />
              <p className="mt-3 text-sm text-slate-800">
                {t('sound.enablePrompt', 'Enable Sound')}
              </p>
            </div>

            {/* Language Selection */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex gap-4 justify-center w-full">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="flex-1 hover:cursor-pointer bg-[#534c3e] text-white px-6 py-3 rounded-md font-medium transition-all hover:bg-[#3a342c] focus:outline-none focus:ring-2 focus:ring-[#d9c278] flex items-center justify-center"
                >
                  <span className="mr-2 w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                    <img
                      src="/img/flags/en.svg"
                      alt="English flag"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  {t('language.en', 'English')}
                </button>
                <button
                  onClick={() => handleLanguageChange('pt')}
                  className="flex-1 hover:cursor-pointer bg-[#534c3e] text-white px-6 py-3 rounded-md font-medium transition-all hover:bg-[#3a342c] focus:outline-none focus:ring-2 focus:ring-[#d9c278] flex items-center justify-center"
                >
                  <span className="mr-2 w-6 h-4 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                    <img
                      src="/img/flags/pt.svg"
                      alt="Portuguese flag"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  {t('language.pt', 'Portuguese')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageModal
