import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Wine, Lock, Unlock, KeyRound } from 'lucide-react'
import { useSensorialExperienceStore } from '@/store/useSensorialExperienceStore'
import { useNavigate } from 'react-router-dom'

const CodeEntry = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { unlockWithCode } = useSensorialExperienceStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) {
      setError(true)
      return
    }

    setIsSubmitting(true)
    setError(false)

    // Small delay to show the submitting state
    setTimeout(() => {
      const success = unlockWithCode(code)

      if (success) {
        // Navigate to the sensorial experience page instead of showing it in-place
        navigate('/sensorial-experience')
      } else {
        setError(true)
        setIsSubmitting(false)
      }
    }, 600)
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4 bg-[#f0e4c7]">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <Wine className="w-16 h-16 text-[#534c3e] mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-3xl font-bold italic font-serif text-slate-900 mb-4">
            {t('sensorialExperience.codeEntry.title', 'Sensorial Experience')}
          </h2>
          <p className="text-slate-700">
            {t(
              'sensorialExperience.codeEntry.description',
              'Enter the code found on the cork of your Das Duas Uma wine bottle to access an exclusive sensorial journey.'
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-slate-500" strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={code}
              onChange={e => {
                setCode(e.target.value)
                if (error) setError(false)
              }}
              placeholder={t('sensorialExperience.codeEntry.placeholder', 'Enter your access code')}
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 ${
                error
                  ? 'border-red-300 focus:ring-red-200 text-red-800'
                  : 'border-slate-300 focus:ring-[#d9c278] text-slate-800'
              }`}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {t(
                'sensorialExperience.codeEntry.error',
                'Invalid code. Please check and try again.'
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#534c3e] text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-[#3a342c] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t('sensorialExperience.codeEntry.verifying', 'Verifying...')}</span>
              </>
            ) : (
              <>
                {error ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                <span>{t('sensorialExperience.codeEntry.submit', 'Unlock Experience')}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-500">
          {t(
            'sensorialExperience.codeEntry.hint',
            'Hint: The code can be found on the cork of your Das Duas Uma wine bottle.'
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeEntry
