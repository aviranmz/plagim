import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  // Close mobile menu when clicking on navigation links
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }
  
  // Determine if current language is RTL
  const isRTL = i18n.language === 'he'
  
  // Company name and tagline based on language
  const companyName = isRTL ? 'פלגים' : 'Plagim'
  const tagline = isRTL ? 'בריכות שחייה' : 'Swimming Pools'
  const logoLetter = isRTL ? 'פ' : 'P'

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-luxury">
        <div className={`flex justify-between items-center py-4 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Logo */}
          <Link to="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-3'} space-x-3`}>
            <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">{logoLetter}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">{companyName}</h1>
              <p className="text-sm text-neutral-600">{tagline}</p>
            </div>
          </Link>

              {/* Desktop Navigation */}
              <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-8'} space-x-8`}>
                <Link to="/" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {t('navigation.home')}
                </Link>
                <Link to="/about" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {t('navigation.about')}
                </Link>
                <Link to="/projects" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {t('navigation.projects')}
                </Link>
                <Link to="/pool-types" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'סוגי בריכות' : 'Pool Types'}
                </Link>
                <Link to="/home-pools" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'בריכות שחיה ביתיות' : 'Home Swimming Pools'}
                </Link>
                <Link to="/architects" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'אדריכלים ופיקוח בנייה' : 'Architects & Supervision'}
                </Link>
                <Link to="/videos" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'סרטונים' : 'Videos'}
                </Link>
                <Link to="/professional-info" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'מידע מקצועי' : 'Professional Info'}
                </Link>
                <Link to="/articles" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'כתבות' : 'Articles'}
                </Link>
                <Link to="/accessibility" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {isRTL ? 'הצהרת נגישות' : 'Accessibility'}
                </Link>
                <Link to="/contact" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  {t('navigation.contact')}
                </Link>
                <LanguageSwitcher />
                <button className="btn-primary">
                  {t('navigation.getQuote')}
                </button>
              </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-neutral-200">
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {t('navigation.home')}
                  </Link>
                  <Link to="/about" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {t('navigation.about')}
                  </Link>
                  <Link to="/projects" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {t('navigation.projects')}
                  </Link>
                  <Link to="/pool-types" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'סוגי בריכות' : 'Pool Types'}
                  </Link>
                  <Link to="/home-pools" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'בריכות שחיה ביתיות' : 'Home Swimming Pools'}
                  </Link>
                  <Link to="/architects" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'אדריכלים ופיקוח בנייה' : 'Architects & Supervision'}
                  </Link>
                  <Link to="/videos" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'סרטונים' : 'Videos'}
                  </Link>
                  <Link to="/professional-info" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'מידע מקצועי' : 'Professional Info'}
                  </Link>
                  <Link to="/articles" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'כתבות' : 'Articles'}
                  </Link>
                  <Link to="/accessibility" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {isRTL ? 'הצהרת נגישות' : 'Accessibility'}
                  </Link>
                  <Link to="/contact" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors" onClick={handleLinkClick}>
                    {t('navigation.contact')}
                  </Link>
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  <button className="btn-primary w-full mt-4">
                    {t('navigation.getQuote')}
                  </button>
                </nav>
              </div>
            )}
      </div>
    </header>
  )
}

export default Header
