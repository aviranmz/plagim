import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import poolTracking from '../utils/poolTracking'
import type { ProfessionalInfoPage, ContentSection } from '../types/content'

const ProfessionalInfo: React.FC = () => {
  const { category } = useParams<{ category?: string }>()
  const { t, i18n } = useTranslation()
  const [page, setPage] = useState<ProfessionalInfoPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isRTL = i18n.language === 'he'

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true)
        const slug = category || 'maintenance'
        const response = await fetch(`/api/professional-info/${slug}`)
        const data = await response.json()
        
        if (data.success) {
          setPage(data.data)
        } else {
          setError(data.error || 'Failed to load page')
        }
      } catch (err) {
        setError('Failed to load page')
        console.error('Error fetching professional info page:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [category])

  // Track page view
  useEffect(() => {
    if (page) {
      poolTracking.trackServiceView('swimming_systems')
    }
  }, [page])

  const renderContentSection = (section: ContentSection) => {
    const { sectionType, content } = section
    const title = isRTL ? section.title : section.titleEn

    switch (sectionType) {
      case 'hero':
        return (
          <section key={section.id} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${content.heroImage || '/images/1-14.jpg'})`,
                backgroundAttachment: 'fixed'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-cyan-700/70"></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="relative z-10 container-luxury text-center text-white">
              <div className="max-w-5xl mx-auto animate-slide-up">
                <h1 className="heading-hero mb-8">
                  {isRTL ? content.heroTitle : content.heroTitleEn}
                </h1>
                <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                  {isRTL ? content.heroSubtitle : content.heroSubtitleEn}
                </p>
                {content.heroButtonText && (
                  <Link to={content.heroButtonLink || '/contact'} className="btn-luxury animate-glow">
                    {isRTL ? content.heroButtonText : content.heroButtonTextEn}
                  </Link>
                )}
              </div>
            </div>
          </section>
        )

      case 'text':
        return (
          <section key={section.id} className="section-spacing bg-white">
            <div className="container-luxury">
              <div className="max-w-4xl mx-auto">
                {title && (
                  <h2 className="heading-section mb-8 text-center">
                    {title}
                  </h2>
                )}
                <div className={`prose prose-lg max-w-none ${content.alignment === 'center' ? 'text-center' : content.alignment === 'right' ? 'text-right' : 'text-left'}`}>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {isRTL ? content.text : content.textEn}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )

      case 'image':
        return (
          <section key={section.id} className="section-spacing bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50">
            <div className="container-luxury">
              <div className={`max-w-4xl mx-auto ${content.imagePosition === 'center' ? 'text-center' : content.imagePosition === 'right' ? 'text-right' : 'text-left'}`}>
                {title && (
                  <h2 className="heading-section mb-8">
                    {title}
                  </h2>
                )}
                <div className="card-luxury">
                  <img 
                    src={content.image || '/images/2-20.jpg'} 
                    alt={isRTL ? content.imageAlt : content.imageAltEn || title || ''}
                    className="w-full h-96 object-cover rounded-2xl mb-4"
                  />
                  {content.imageCaption && (
                    <p className="text-neutral-600 text-center">
                      {isRTL ? content.imageCaption : content.imageCaptionEn}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )

      case 'gallery':
        return (
          <section key={section.id} className="section-spacing bg-white">
            <div className="container-luxury">
              {title && (
                <h2 className="heading-section mb-12 text-center">
                  {title}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.images?.map((image, index) => (
                  <div key={index} className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                      <img 
                        src={image.url} 
                        alt={isRTL ? image.alt : image.altEn || ''}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {image.caption && (
                      <p className="text-neutral-600 text-center">
                        {isRTL ? image.caption : image.captionEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'list':
        return (
          <section key={section.id} className="section-spacing bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50">
            <div className="container-luxury">
              <div className="max-w-4xl mx-auto">
                {title && (
                  <h2 className="heading-section mb-8 text-center">
                    {title}
                  </h2>
                )}
                <div className="card-luxury p-8">
                  <ul className={`space-y-4 ${content.listType === 'numbered' ? 'list-decimal list-inside' : content.listType === 'check' ? 'space-y-3' : 'list-disc list-inside'}`}>
                    {content.listItems?.map((item, index) => (
                      <li key={index} className="flex items-start text-lg text-neutral-600">
                        {content.listType === 'check' && (
                          <svg className="w-6 h-6 text-primary-500 mr-3 rtl:ml-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isRTL ? item.text : item.textEn}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )

      case 'cta':
        return (
          <section key={section.id} className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url(${content.ctaBackgroundImage || '/images/8.jpg'})`,
                backgroundAttachment: 'fixed'
              }}
            ></div>
            <div className="container-luxury text-center text-white relative z-10">
              <h2 className="heading-section mb-8">
                {isRTL ? content.ctaTitle : content.ctaTitleEn}
              </h2>
              <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                {isRTL ? content.ctaDescription : content.ctaDescriptionEn}
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link to={content.ctaButtonLink || '/contact'} className="btn-luxury animate-glow">
                  {isRTL ? content.ctaButtonText : content.ctaButtonTextEn}
                </Link>
                <a href="tel:073-7761900" className="btn-secondary">
                  {t('cta.callUs')}
                </a>
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-neutral-600">
            {isRTL ? 'טוען...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isRTL ? 'שגיאה' : 'Error'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <Link to="/professional-info" className="btn-primary">
            {isRTL ? 'חזור למידע מקצועי' : 'Back to Professional Info'}
          </Link>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isRTL ? 'דף לא נמצא' : 'Page Not Found'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {isRTL ? 'הדף המבוקש לא נמצא' : 'The requested page was not found'}
          </p>
          <Link to="/professional-info" className="btn-primary">
            {isRTL ? 'חזור למידע מקצועי' : 'Back to Professional Info'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {page.content?.map((section) => renderContentSection(section))}
    </div>
  )
}

export default ProfessionalInfo
