import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Articles: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

  const articles = [
    {
      id: 1,
      title: isRTL ? 'איך לבחור בריכה מושלמת לבית' : 'How to Choose the Perfect Pool for Your Home',
      titleEn: 'How to Choose the Perfect Pool for Your Home',
      excerpt: isRTL ? 'מדריך מקיף לבחירת בריכה המתאימה לצרכים שלכם' : 'Comprehensive guide to choosing a pool that suits your needs',
      excerptEn: 'Comprehensive guide to choosing a pool that suits your needs',
      category: isRTL ? 'מדריכים' : 'Guides',
      categoryEn: 'Guides',
      date: '2024-01-15',
      readTime: isRTL ? '5 דקות קריאה' : '5 min read',
      image: '/images/1-14.jpg'
    },
    {
      id: 2,
      title: isRTL ? 'תחזוקת בריכה - המדריך המלא' : 'Pool Maintenance - Complete Guide',
      titleEn: 'Pool Maintenance - Complete Guide',
      excerpt: isRTL ? 'כל מה שצריך לדעת על תחזוקת בריכה נכונה' : 'Everything you need to know about proper pool maintenance',
      excerptEn: 'Everything you need to know about proper pool maintenance',
      category: isRTL ? 'תחזוקה' : 'Maintenance',
      categoryEn: 'Maintenance',
      date: '2024-01-10',
      readTime: isRTL ? '8 דקות קריאה' : '8 min read',
      image: '/images/2-20.jpg'
    },
    {
      id: 3,
      title: isRTL ? 'חימום בריכה - פתרונות חסכוניים' : 'Pool Heating - Cost-Effective Solutions',
      titleEn: 'Pool Heating - Cost-Effective Solutions',
      excerpt: isRTL ? 'דרכים חסכוניות לחמם את הבריכה שלכם' : 'Cost-effective ways to heat your pool',
      excerptEn: 'Cost-effective ways to heat your pool',
      category: isRTL ? 'טכנולוגיה' : 'Technology',
      categoryEn: 'Technology',
      date: '2024-01-05',
      readTime: isRTL ? '6 דקות קריאה' : '6 min read',
      image: '/images/8.jpg'
    },
    {
      id: 4,
      title: isRTL ? 'עיצוב סביבת הבריכה' : 'Pool Area Design',
      titleEn: 'Pool Area Design',
      excerpt: isRTL ? 'טיפים לעיצוב סביבת הבריכה המושלמת' : 'Tips for designing the perfect pool area',
      excerptEn: 'Tips for designing the perfect pool area',
      category: isRTL ? 'עיצוב' : 'Design',
      categoryEn: 'Design',
      date: '2024-01-01',
      readTime: isRTL ? '7 דקות קריאה' : '7 min read',
      image: '/images/1-h-1.jpg'
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
              {isRTL ? 'כתבות' : 'Articles'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'מאמרים מקצועיים וטיפים מבית פלגים'
                : 'Professional articles and tips from Plagim'
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

      {/* Articles Grid */}
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
              {isRTL ? 'כתבות אחרונות' : 'Latest Articles'}
            </h2>
            <p className="text-luxury max-w-4xl mx-auto">
              {isRTL 
                ? 'קראו את הכתבות המקצועיות שלנו וקבלו טיפים שימושיים'
                : 'Read our professional articles and get useful tips'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="card-luxury group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={article.image} 
                    alt={isRTL ? article.title : article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {isRTL ? article.category : article.categoryEn}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {isRTL ? article.title : article.titleEn}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                    {isRTL ? article.excerpt : article.excerptEn}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <Link 
                    to={`/articles/${article.id}`}
                    className="btn-primary w-full group-hover:bg-blue-700 transition-colors"
                  >
                    {isRTL ? 'קרא עוד' : 'Read More'}
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
            {isRTL ? 'רוצים עוד מידע?' : 'Want More Information?'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'צרו איתנו קשר לקבלת ייעוץ מקצועי ומידע נוסף'
              : 'Contact us for professional consultation and additional information'
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

export default Articles
