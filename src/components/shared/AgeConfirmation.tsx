import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAgeVerificationStore } from '@/store/useAgeVerificationStore'
import { Wine } from 'lucide-react'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'

const AgeConfirmation = () => {
  const { t } = useTranslation()
  const { setVerified } = useAgeVerificationStore()
  const [error, setError] = useState(false)

  // Lock scrolling when the component mounts
  useEffect(() => {
    lockScroll()
    return () => {
      unlockScroll()
    }
  }, [])

  const handleConfirm = () => {
    setVerified(true)
  }

  const handleDecline = () => {
    setError(true)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#f0e4c7] rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold italic font-serif text-slate-900 mb-6">Das Duas Uma</h2>

          <Wine className="w-16 h-16 mb-6 text-[#534c3e] opacity-80" strokeWidth={1.5} />

          <h3 className="text-xl font-medium text-slate-800 mb-4">
            {t('ageConfirmation.title', 'Age Confirmation')}
          </h3>

          <p className="text-slate-700 mb-6">
            {t(
              'ageConfirmation.message',
              'This website contains information about alcoholic beverages. Please confirm you are of legal drinking age in your country of residence before entering.'
            )}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 w-full">
              {t(
                'ageConfirmation.error',
                'You must be of legal drinking age to visit this website.'
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleDecline}
              className="flex-1 bg-white text-slate-800 px-4 py-3 rounded-md font-medium border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              {t('ageConfirmation.noButton', 'No, I am not')}
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-[#534c3e] text-white px-4 py-3 rounded-md font-medium hover:bg-[#3a342c] transition-colors"
            >
              {t('ageConfirmation.yesButton', 'Yes, I am')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgeConfirmation
