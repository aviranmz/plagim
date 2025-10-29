import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import poolTracking from '../utils/poolTracking'

const PoolTypes: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const poolTypes = [
    {
      id: 'infinity',
      title: isRTL ? 'בריכות אינסוף' : 'Infinity Pools',
      titleEn: 'Infinity Pools',
      description: isRTL 
        ? 'בריכות אינסוף יוצרות אשליה של מים הנשפכים אל האופק'
        : 'Infinity pools create the illusion of water spilling into the horizon',
      descriptionEn: 'Infinity pools create the illusion of water spilling into the horizon',
      image: '/images/1-14.jpg',
      features: isRTL 
        ? ['מראה מרהיב', 'עיצוב מודרני', 'נוף פנורמי', 'חוויית יוקרה']
        : ['Stunning appearance', 'Modern design', 'Panoramic views', 'Luxury experience']
    },
    {
      id: 'home',
      title: isRTL ? 'בריכות ביתיות' : 'Home Pools',
      titleEn: 'Home Pools',
      description: isRTL 
        ? 'בריכות ביתיות מותאמות אישית לבית שלכם'
        : 'Custom home pools designed specifically for your house',
      descriptionEn: 'Custom home pools designed specifically for your house',
      image: '/images/2-20.jpg',
      features: isRTL 
        ? ['עיצוב מותאם', 'גודל אידיאלי', 'חיסכון במקום', 'עלות סבירה']
        : ['Custom design', 'Ideal size', 'Space efficient', 'Reasonable cost']
    },
    {
      id: 'fiberglass',
      title: isRTL ? 'בריכות פיברגלס' : 'Fiberglass Pools',
      titleEn: 'Fiberglass Pools',
      description: isRTL 
        ? 'בריכות פיברגלס חזקות ועמידות עם התקנה מהירה'
        : 'Strong and durable fiberglass pools with quick installation',
      descriptionEn: 'Strong and durable fiberglass pools with quick installation',
      image: '/images/8.jpg',
      features: isRTL 
        ? ['התקנה מהירה', 'עמידות גבוהה', 'תחזוקה קלה', 'עיצוב חלק']
        : ['Quick installation', 'High durability', 'Easy maintenance', 'Smooth design']
    },
    {
      id: 'concrete',
      title: isRTL ? 'בריכות בטון' : 'Concrete Pools',
      titleEn: 'Concrete Pools',
      description: isRTL 
        ? 'בריכות בטון מאפשרות עיצוב חופשי ומותאם אישית'
        : 'Concrete pools allow for free-form and custom design',
      descriptionEn: 'Concrete pools allow for free-form and custom design',
      image: '/images/1-h-1.jpg',
      features: isRTL 
        ? ['עיצוב חופשי', 'עמידות מקסימלית', 'גמישות בעיצוב', 'איכות גבוהה']
        : ['Free-form design', 'Maximum durability', 'Design flexibility', 'High quality']
    },
    {
      id: 'commercial',
      title: isRTL ? 'בריכות מסחריות' : 'Commercial Pools',
      titleEn: 'Commercial Pools',
      description: isRTL 
        ? 'בריכות מסחריות למלונות, מרכזי ספורט ומוסדות'
        : 'Commercial pools for hotels, sports centers and institutions',
      descriptionEn: 'Commercial pools for hotels, sports centers and institutions',
      image: '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg',
      features: isRTL 
        ? ['תקנים מחמירים', 'קיבולת גדולה', 'מערכות מתקדמות', 'תחזוקה מקצועית']
        : ['Strict standards', 'Large capacity', 'Advanced systems', 'Professional maintenance']
    },
    {
      id: 'spa',
      title: isRTL ? 'בריכות ספא וג\'קוזי' : 'Spa & Jacuzzi',
      titleEn: 'Spa & Jacuzzi',
      description: isRTL 
        ? 'בריכות ספא וג\'קוזי לחוויה מרגיעה ומפנקת'
        : 'Spa pools and jacuzzis for a relaxing and pampering experience',
      descriptionEn: 'Spa pools and jacuzzis for a relaxing and pampering experience',
      image: '/images/1-14.jpg',
      features: isRTL 
        ? ['חימום מים', 'מסז\'ים', 'אורות LED', 'חוויה מרגיעה']
        : ['Water heating', 'Massages', 'LED lights', 'Relaxing experience']
    }
  ]

  // Track page view
  React.useEffect(() => {
    poolTracking.trackServiceView('pool_types' as any)
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
              {isRTL ? 'סוגי בריכות שחייה' : 'Swimming Pool Types'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'גלה את סוגי הבריכות השונים וצא את המתאימה ביותר לבית שלך'
                : 'Discover different pool types and find the perfect one for your home'
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

      {/* Pool Types Grid */}
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
              {isRTL ? 'בחר את סוג הבריכה שלך' : 'Choose Your Pool Type'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'כל סוג בריכה מציע יתרונות ייחודיים וחוויית שחייה שונה'
                : 'Each pool type offers unique advantages and different swimming experiences'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poolTypes.map((poolType) => (
              <Link 
                key={poolType.id} 
                to={`/pool-types/${poolType.id}`}
                className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                onClick={() => poolTracking.trackServiceView('pool_types' as any)}
              >
                <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={poolType.image} 
                    alt={isRTL ? poolType.title : poolType.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{isRTL ? poolType.title : poolType.titleEn}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                    {isRTL ? poolType.description : poolType.descriptionEn}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {poolType.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 mr-2 rtl:ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{isRTL ? 'למידע נוסף' : 'Learn More'}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(/images/2-20.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury text-center text-white relative z-10">
          <h2 className="heading-section mb-8">
            {isRTL ? 'מוכנים לבחור את הבריכה שלכם?' : 'Ready to Choose Your Pool?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'צרו איתנו קשר לקבלת ייעוץ מקצועי וצעת מחיר מותאמת אישית'
              : 'Contact us for professional consultation and personalized quote'
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

export default PoolTypes
