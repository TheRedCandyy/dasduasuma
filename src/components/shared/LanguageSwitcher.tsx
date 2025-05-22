import { useTranslation } from 'react-i18next'
import SoundToggle from './Sound'
import { useSoundStore } from '@/store/useSoundStore'

type Language = 'en' | 'pt'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language as Language

  const handleLanguageChange = (language: Language) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex space-x-1">
        <button
          className={`hover:cursor-pointer flex items-center p-1.5 rounded ${
            currentLanguage === 'en'
              ? 'bg-[#534c3e] text-white'
              : 'bg-white text-black border border-gray-300'
          }`}
          onClick={() => handleLanguageChange('en')}
          aria-label={t('language.en')}
          title={t('language.en')}
        >
          <span className="w-5 h-3.5 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
            <img
              src="/img/flags/en.svg"
              alt="English flag"
              className="w-full h-full object-cover"
            />
          </span>
        </button>
        <button
          className={`hover:cursor-pointer flex items-center p-1.5 rounded ${
            currentLanguage === 'pt'
              ? 'bg-[#534c3e] text-white'
              : 'bg-white text-black border border-gray-300'
          }`}
          onClick={() => handleLanguageChange('pt')}
          aria-label={t('language.pt')}
          title={t('language.pt')}
        >
          <span className="w-5 h-3.5 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
            <img
              src="/img/flags/pt.svg"
              alt="Portuguese flag"
              className="w-full h-full object-cover"
            />
          </span>
        </button>
      </div>

      <div className="ml-1 border-l pl-3 border-gray-300">
        <SoundToggle minimal={true} />
      </div>
    </div>
  )
}

export default LanguageSwitcher
