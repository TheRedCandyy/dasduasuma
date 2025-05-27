import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Settings } from 'lucide-react'
import LanguageModal from './LanguageModal'

const LanguageSwitcher = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-2 text-slate-700 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
          aria-label={t('language.moreOptions', 'Language & Sound Options')}
          title={t('language.moreOptions', 'Language & Sound Options')}
        >
          <Settings size={18} />
        </button>
      </div>

      <LanguageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default LanguageSwitcher
