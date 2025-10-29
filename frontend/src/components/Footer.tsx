import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-luxury">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">פ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">פלגים</h3>
                  <p className="text-neutral-400">{t('navigation.home')}</p>
                </div>
              </div>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                {t('footer.companyDescription')}
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="tel:073-7761900" className="text-primary-400 hover:text-primary-300 transition-colors">
                  📞 073-7761900
                </a>
                <a href="mailto:plagim1@gmail.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                  ✉️ plagim1@gmail.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('footer.quickLinks')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                    {t('navigation.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                    {t('navigation.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-neutral-300 hover:text-white transition-colors">
                    {t('navigation.projects')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                    {t('navigation.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-semibold mb-6">{t('footer.services')}</h4>
              <ul className="space-y-3">
                <li className="text-neutral-300">{t('footer.homePools')}</li>
                <li className="text-neutral-300">{t('footer.infinityPools')}</li>
                <li className="text-neutral-300">{t('footer.poolCovers')}</li>
                <li className="text-neutral-300">{t('footer.swimmingSystems')}</li>
                <li className="text-neutral-300">{t('footer.landscapeArchitecture')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                {t('footer.accessibility')}
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
