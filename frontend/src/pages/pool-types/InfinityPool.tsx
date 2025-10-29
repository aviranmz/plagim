import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import poolTracking from '../../utils/poolTracking'

const InfinityPool: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  // Track page view
  React.useEffect(() => {
    poolTracking.trackServiceView('infinity_pools')
  }, [])

  const features = isRTL 
    ? [
        'מראה מרהיב עם אשליית אינסוף',
        'עיצוב מודרני ואלגנטי',
        'נוף פנורמי מרהיב',
        'חוויית יוקרה ייחודית',
        'מתאים לבתים עם נוף יפה',
        'עיצוב מותאם אישית'
      ]
    : [
        'Stunning appearance with infinity illusion',
        'Modern and elegant design',
        'Breathtaking panoramic views',
        'Unique luxury experience',
        'Perfect for homes with beautiful views',
        'Custom design options'
      ]

  const specifications = [
    {
      title: isRTL ? 'גודל מינימלי' : 'Minimum Size',
      value: isRTL ? '8x4 מטר' : '8x4 meters'
    },
    {
      title: isRTL ? 'עומק' : 'Depth',
      value: isRTL ? '1.2-2.0 מטר' : '1.2-2.0 meters'
    },
    {
      title: isRTL ? 'חומרים' : 'Materials',
      value: isRTL ? 'בטון מזוין או פיברגלס' : 'Reinforced concrete or fiberglass'
    },
    {
      title: isRTL ? 'מערכת סינון' : 'Filtration System',
      value: isRTL ? 'מערכת מתקדמת עם סקימר' : 'Advanced system with skimmer'
    },
    {
      title: isRTL ? 'תחזוקה' : 'Maintenance',
      value: isRTL ? 'תחזוקה שוטפת מקצועית' : 'Regular professional maintenance'
    },
    {
      title: isRTL ? 'עלות' : 'Cost',
      value: isRTL ? 'מ-150,000 ש"ח' : 'From 150,000 NIS'
    }
  ]

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
              {isRTL ? 'בריכות אינסוף' : 'Infinity Pools'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'בריכות אינסוף יוצרות אשליה מרהיבה של מים הנשפכים אל האופק, ומעניקות חוויית יוקרה ייחודית'
                : 'Infinity pools create a stunning illusion of water spilling into the horizon, providing a unique luxury experience'
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

      {/* Features Section */}
      <section className="section-spacing bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section mb-8">
                {isRTL ? 'מאפיינים מיוחדים' : 'Special Features'}
              </h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 pool-gradient rounded-full flex items-center justify-center mr-4 rtl:ml-4 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg text-neutral-600 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-luxury">
              <img 
                src="/images/2-20.jpg" 
                alt={isRTL ? 'בריכת אינסוף' : 'Infinity Pool'}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-8">
              {isRTL ? 'מפרט טכני' : 'Technical Specifications'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'פרטים טכניים חשובים לבריכות אינסוף'
                : 'Important technical details for infinity pools'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="card-luxury text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{spec.title}</h3>
                <p className="text-lg text-primary-600 font-medium">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-spacing bg-white">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-8">
              {isRTL ? 'גלריית תמונות' : 'Photo Gallery'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'דוגמאות לבריכות אינסוף שביצענו'
                : 'Examples of infinity pools we have built'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['/images/1-14.jpg', '/images/2-20.jpg', '/images/8.jpg'].map((image, index) => (
              <div key={index} className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <img 
                    src={image} 
                    alt={`${isRTL ? 'בריכת אינסוף' : 'Infinity Pool'} ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
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
            {isRTL ? 'רוצים בריכת אינסוף?' : 'Want an Infinity Pool?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'צרו איתנו קשר לקבלת ייעוץ מקצועי וצעת מחיר לבריכת האינסוף שלכם'
              : 'Contact us for professional consultation and quote for your infinity pool'
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

export default InfinityPool
