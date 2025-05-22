import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[#f0e4c7] py-4 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-xs text-slate-600">{t('footer.copyright')}</div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://theredcandyy.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-700 hover:text-slate-900 transition-colors"
            >
              Built by Alexandre Tavares
            </a>

            <Link
              to="/privacy"
              className="text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              Terms
            </Link>

            <Link
              to="/shipping"
              className="text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              Shipping
            </Link>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
