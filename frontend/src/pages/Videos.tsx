import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Videos: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const videoCategories = [
    {
      id: 'construction',
      title: isRTL ? 'תהליך הבנייה' : 'Construction Process',
      description: isRTL ? 'סרטונים המתעדים את תהליך בניית הבריכה' : 'Videos documenting the pool construction process',
      thumbnail: '/images/1-14.jpg',
      videoCount: 12
    },
    {
      id: 'maintenance',
      title: isRTL ? 'תחזוקה ושירות' : 'Maintenance & Service',
      description: isRTL ? 'מדריכים לתחזוקה ושירות הבריכה' : 'Guides for pool maintenance and service',
      thumbnail: '/images/2-20.jpg',
      videoCount: 8
    },
    {
      id: 'projects',
      title: isRTL ? 'פרויקטים מושלמים' : 'Completed Projects',
      description: isRTL ? 'סרטונים של פרויקטים מושלמים' : 'Videos of completed projects',
      thumbnail: '/images/8.jpg',
      videoCount: 15
    },
    {
      id: 'tips',
      title: isRTL ? 'טיפים מקצועיים' : 'Professional Tips',
      description: isRTL ? 'טיפים מקצועיים מבית פלגים' : 'Professional tips from Plagim',
      thumbnail: '/images/1-h-1.jpg',
      videoCount: 6
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg)',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-cyan-700/70"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-5xl mx-auto animate-slide-up">
            <h1 className="heading-hero mb-8">
              {isRTL ? 'סרטונים' : 'Videos'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'צפו בסרטונים שלנו ותלמדו על תהליכי הבנייה והתחזוקה'
                : 'Watch our videos and learn about construction and maintenance processes'
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
        </div>
      </section>

      {/* Video Categories */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(/images/8.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-8">
              {isRTL ? 'קטגוריות סרטונים' : 'Video Categories'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'בחרו קטגוריה וצפו בסרטונים הרלוונטיים'
                : 'Choose a category and watch relevant videos'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoCategories.map((category) => (
              <div key={category.id} className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={category.thumbnail} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90">
                      {category.videoCount} {isRTL ? 'סרטונים' : 'videos'}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Link 
                    to={`/videos/${category.id}`}
                    className="btn-primary w-full group-hover:bg-blue-700 transition-colors"
                  >
                    {isRTL ? 'צפה בסרטונים' : 'Watch Videos'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/images/1-h-1.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury text-center text-white relative z-10">
          <h2 className="heading-section mb-8">
            {isRTL ? 'רוצים לראות עוד?' : 'Want to See More?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'צרו איתנו קשר לקבלת מידע נוסף וסרטונים נוספים'
              : 'Contact us for more information and additional videos'
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

export default Videos
