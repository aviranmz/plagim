import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import poolTracking from '../utils/poolTracking'
import { professionalInfo } from '../data/realProjects'

const ProfessionalInfo: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { category } = useParams<{ category?: string }>()
  const isRTL = i18n.language === 'he'

  // Filter content by category if specified
  const filteredContent = category 
    ? professionalInfo.filter(item => item.category === category)
    : professionalInfo

  // Track page view
  React.useEffect(() => {
    poolTracking.trackServiceView('professional_info' as any)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/1-14.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-cyan-700/70"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-5xl mx-auto animate-slide-up">
            <h1 className="heading-hero mb-8">
              {isRTL ? 'מידע מקצועי' : 'Professional Information'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'מדריכים מקצועיים, טיפים ומידע חשוב לבריכות שחייה'
                : 'Professional guides, tips and important information for swimming pools'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="section-spacing bg-gradient-to-b from-gray-50 to-white">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-8">
              {isRTL ? 'קטגוריות מידע' : 'Information Categories'}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {[
              { key: 'maintenance', label: isRTL ? 'תחזוקה' : 'Maintenance', image: '/images/1-14.jpg' },
              { key: 'safety', label: isRTL ? 'בטיחות' : 'Safety', image: '/images/2-20.jpg' },
              { key: 'design', label: isRTL ? 'עיצוב' : 'Design', image: '/images/1-h-1.jpg' },
              { key: 'technical_info', label: isRTL ? 'מידע טכני' : 'Technical Info', image: '/images/8.jpg' },
              { key: 'videos', label: isRTL ? 'סרטונים' : 'Videos', image: '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg' },
              { key: 'articles', label: isRTL ? 'כתבות' : 'Articles', image: '/images/1-14.jpg' }
            ].map((category) => (
              <Link
                key={category.key}
                to={`/professional-info/${category.key}`}
                className="card-luxury text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                onClick={() => poolTracking.trackServiceView('professional_info' as any)}
              >
                <div className="relative h-24 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={category.image} 
                    alt={category.label}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-8">
              {isRTL ? 'תוכן מקצועי' : 'Professional Content'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'מדריכים מפורטים וטיפים מקצועיים מבית פלגים בריכות שחייה'
                : 'Detailed guides and professional tips from Plagim Swimming Pools'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <div key={item.id} className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {isRTL 
                        ? (item.category === 'maintenance' ? 'תחזוקה' :
                           item.category === 'safety' ? 'בטיחות' :
                           item.category === 'design' ? 'עיצוב' :
                           item.category === 'technical_info' ? 'מידע טכני' :
                           item.category === 'videos' ? 'סרטונים' : 'כתבות')
                        : (item.category === 'maintenance' ? 'Maintenance' :
                           item.category === 'safety' ? 'Safety' :
                           item.category === 'design' ? 'Design' :
                           item.category === 'technical_info' ? 'Technical Info' :
                           item.category === 'videos' ? 'Videos' : 'Articles')
                      }
                    </span>
                    {item.featured && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        {isRTL ? 'מומלץ' : 'Featured'}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="heading-modern text-gray-900 group-hover:text-blue-600 transition-colors">
                    {isRTL ? item.title : item.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-modern text-gray-700 leading-relaxed">
                    {isRTL ? item.description : item.descriptionEn}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {(isRTL ? item.tags : item.tagsEn).slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    {new Date(item.publishDate).toLocaleDateString(isRTL ? 'he-IL' : 'en-US')}
                  </div>

                  {/* Read More Button */}
                  <div className="pt-4">
                    <button 
                      className="btn-primary w-full group-hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        // Track content view
                        poolTracking.trackServiceView('professional_info' as any)
                        // Here you would navigate to the full content or open a modal
                        console.log('View content:', item.slug)
                      }}
                    >
                      {isRTL ? 'קרא עוד' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(/images/2-20.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury text-center text-white relative z-10">
          <h2 className="heading-section mb-8">
            {isRTL ? 'צריכים עזרה מקצועית?' : 'Need Professional Help?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            {isRTL 
              ? 'צרו איתנו קשר לקבלת ייעוץ מקצועי ופתרונות מותאמים אישית'
              : 'Contact us for professional consultation and personalized solutions'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/contact" className="btn-luxury animate-glow">
              {t('cta.contactUs')}
            </Link>
            <a href="tel:073-7761900" className="btn-secondary">
              {t('cta.callUs')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfessionalInfo
