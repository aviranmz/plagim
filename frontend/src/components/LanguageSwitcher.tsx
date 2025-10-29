import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    
    // Update document direction and language
    document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = lng
  }

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => changeLanguage('he')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          i18n.language === 'he'
            ? 'bg-primary-500 text-white'
            : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        עברית
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          i18n.language === 'en'
            ? 'bg-primary-500 text-white'
            : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        English
      </button>
    </div>
  )
}

export default LanguageSwitcher
