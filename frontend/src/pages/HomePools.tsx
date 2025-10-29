import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HomePools: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const poolTypes = [
    {
      id: 'infinity',
      title: isRTL ? 'בריכות גלישה' : 'Infinity Pools',
      titleEn: 'Infinity Pools',
      description: isRTL ? 'בריכות גלישה ללא קצה עם נוף מרהיב' : 'Edgeless pools with stunning views',
      image: '/images/1-14.jpg',
      features: isRTL ? [
        'גלישה ללא קצה',
        'נוף פנורמי',
        'עיצוב מודרני',
        'מערכות סינון מתקדמות'
      ] : [
        'Edgeless overflow',
        'Panoramic views',
        'Modern design',
        'Advanced filtration'
      ]
    },
    {
      id: 'family',
      title: isRTL ? 'בריכות משפחתיות' : 'Family Pools',
      titleEn: 'Family Pools',
      description: isRTL ? 'בריכות אידיאליות למשפחות עם אזורי רחצה מגוונים' : 'Ideal pools for families with diverse swimming areas',
      image: '/images/2-20.jpg',
      features: isRTL ? [
        'אזור רדוד לילדים',
        'ג\'טים לעיסוי',
        'מערכת חימום',
        'כיסוי בטיחות'
      ] : [
        'Shallow area for children',
        'Massage jets',
        'Heating system',
        'Safety cover'
      ]
    },
    {
      id: 'commercial',
      title: isRTL ? 'בריכות מסחריות' : 'Commercial Pools',
      titleEn: 'Commercial Pools',
      description: isRTL ? 'בריכות למרכזי כושר, מלונות ומוסדות' : 'Pools for fitness centers, hotels and institutions',
      image: '/images/8.jpg',
      features: isRTL ? [
        'גודל חצי אולימפי',
        'מערכות חיטוי מתקדמות',
        'בקרת טמפרטורה',
        'עמידות גבוהה'
      ] : [
        'Semi-Olympic size',
        'Advanced disinfection',
        'Temperature control',
        'High durability'
      ]
    },
    {
      id: 'spa',
      title: isRTL ? 'בריכות ספא' : 'Spa Pools',
      titleEn: 'Spa Pools',
      description: isRTL ? 'בריכות טיפוליות עם מערכות עיסוי וטיפוח' : 'Therapeutic pools with massage and wellness systems',
      image: '/images/1-h-1.jpg',
      features: isRTL ? [
        'מערכות עיסוי',
        'חימום מים',
        'תאורה תת-מימית',
        'אזור ישיבה'
      ] : [
        'Massage systems',
        'Water heating',
        'Underwater lighting',
        'Seating area'
      ]
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
              {isRTL ? 'בריכות שחייה ביתיות' : 'Home Swimming Pools'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'מגוון רחב של בריכות שחייה ביתיות המותאמות לצרכים שלכם'
                : 'Wide variety of home swimming pools tailored to your needs'
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

      {/* Pool Types */}
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
              {isRTL ? 'סוגי בריכות' : 'Pool Types'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'בחרו את סוג הבריכה המתאים ביותר לצרכים שלכם'
                : 'Choose the pool type that best suits your needs'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {poolTypes.map((pool) => (
              <div key={pool.id} className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={pool.image} 
                    alt={pool.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{pool.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {pool.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">
                      {isRTL ? 'מאפיינים:' : 'Features:'}
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {pool.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-primary-500 mr-2 rtl:ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to={`/pool-types/${pool.id}`}
                    className="btn-primary w-full group-hover:bg-blue-700 transition-colors"
                  >
                    {isRTL ? 'למידע נוסף' : 'Learn More'}
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
            {isRTL ? 'מוכנים להתחיל?' : 'Ready to Start?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'צרו איתנו קשר לקבלת ייעוץ מקצועי ותכנון הבריכה המושלמת'
              : 'Contact us for professional consultation and perfect pool planning'
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

export default HomePools
