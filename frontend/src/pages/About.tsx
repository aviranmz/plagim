import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const About: React.FC = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'he'

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
              {isRTL ? 'אודות פלגים' : 'About Plagim'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'חברת "פלגים" הוקמה בשנת 1996 על ידי אבנר צדוק ומציעה שרותי תכנון, הקמה ותחזוקה של בריכות שחייה ביתיות ופרטיות בכל רחבי הארץ'
                : 'Plagim was founded in 1996 by Avner Tzadok and offers planning, construction and maintenance services for home and private swimming pools throughout the country'
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

      {/* Company Story */}
      <section className="section-spacing bg-gradient-to-b from-gray-50 to-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-section mb-8">
                {isRTL ? 'הסיפור שלנו' : 'Our Story'}
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  {isRTL 
                    ? 'מאז הקמתה, החברה גדלה בהתמדה מדי שנה ולאחרונה החלה לפתח ולשווק טכנולוגיה יחודית בארץ ובחו"ל.'
                    : 'Since its establishment, the company has grown steadily every year and recently began developing and marketing unique technology in Israel and abroad.'
                  }
                </p>
                <p>
                  {isRTL 
                    ? 'מראשית דרכה חרטה על דגלה מקצוענות, לווי אישי לאורך כל שלבי התכנון וההקמה, שימוש בטכנולוגיה ירוקה החוסכת אנרגיה ומים, שימוש בחומרים ידידותיים לסביבה ולאדם. כל זאת תוך הקפדה על הסטנדרטים הגבוהים ביותר.'
                    : 'From the beginning, it has been committed to professionalism, personal accompaniment throughout all stages of planning and construction, use of green technology that saves energy and water, use of environmentally and human-friendly materials. All this while maintaining the highest standards.'
                  }
                </p>
                <p>
                  {isRTL 
                    ? '"פלגים" מאמינה כי שווק והתקנה של המוצרים האיכותיים והמתקדמים ביותר בארה"ב ואירופה מעניקים ללקוחותיה הנאה מרבית מבריכות השחייה לשנים רבות.'
                    : 'Plagim believes that marketing and installation of the highest quality and most advanced products from the USA and Europe provides its customers with maximum enjoyment from swimming pools for many years.'
                  }
                </p>
              </div>
            </div>
            <div className="card-luxury">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
                  <div className="text-lg text-neutral-700">
                    {isRTL ? 'שנות ניסיון' : 'Years of Experience'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(/images/8.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-8">
              {isRTL ? 'היתרונות שלנו' : 'Our Advantages'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-luxury text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isRTL ? 'טכנולוגיה ירוקה' : 'Green Technology'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL 
                  ? 'שימוש בטכנולוגיה החוסכת אנרגיה ומים'
                  : 'Use of technology that saves energy and water'
                }
              </p>
            </div>

            <div className="card-luxury text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isRTL ? 'ייעוץ וליווי אישי' : 'Personal Consultation & Support'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL 
                  ? 'ליווי אישי לאורך כל שלבי התכנון וההקמה'
                  : 'Personal accompaniment throughout all stages of planning and construction'
                }
              </p>
            </div>

            <div className="card-luxury text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isRTL ? 'מערכות מתקדמות' : 'Advanced Systems'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL 
                  ? 'המוצרים האיכותיים והמתקדמים ביותר מארה"ב ואירופה'
                  : 'The highest quality and most advanced products from the USA and Europe'
                }
              </p>
            </div>

            <div className="card-luxury text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isRTL ? 'שירות מקצועי' : 'Professional Service'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL 
                  ? 'הקפדה על הסטנדרטים הגבוהים ביותר'
                  : 'Maintaining the highest standards'
                }
              </p>
            </div>

            <div className="card-luxury text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isRTL ? 'הדרכות תפעול ותחזוקה' : 'Operation & Maintenance Training'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL 
                  ? 'הדרכה מקצועית לתפעול ותחזוקה שוטפת'
                  : 'Professional training for operation and ongoing maintenance'
                }
              </p>
            </div>

            <div className="card-luxury text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isRTL ? 'שירותים נוספים' : 'Additional Services'}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL 
                  ? 'ג\'קוזי, בריכות נוי, מזרקות וספא במגוון עיצובים'
                  : 'Jacuzzis, ornamental pools, fountains and spas in various designs'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="card-luxury">
              <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/avner-tzadok.jpg" 
                  alt={isRTL ? 'אבנר צדוק' : 'Avner Tzadok'}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {isRTL ? 'אבנר צדוק' : 'Avner Tzadok'}
                  </h3>
                  <p className="text-lg opacity-90">
                    {isRTL ? 'המנכ"ל והבעלים' : 'CEO and Owner'}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="heading-section mb-8">
                {isRTL ? 'אבנר צדוק המנכ"ל והבעלים' : 'Avner Tzadok CEO and Owner'}
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  {isRTL 
                    ? 'אבנר צדוק, 42, נשוי ואב לשלושה, תושב כפר האורנים, הקים את חברת "פלגים" ב-1996 כשהיה רק בן 24. מאז חלפו הרבה מים בהרבה בריכות, והיום זו אחת החברות הוותיקות והאמינות בשוק הבריכות הפרטיות.'
                    : 'Avner Tzadok, 42, married and father of three, resident of Kfar HaOranim, founded Plagim in 1996 when he was only 24 years old. Since then, a lot of water has passed through many pools, and today it is one of the veteran and reliable companies in the private pool market.'
                  }
                </p>
                <p>
                  {isRTL 
                    ? 'אבנר צדוק החל את דרכו בשוק העבודה ללא כיוון ברור, כמו חיילים משוחררים רבים. בעבודתו הראשונה עסק בנגרות, שם גילה את עולם היצירה והעיצוב. העבודה הבאה שהזדמנה לו הייתה כאיש אחזקה בפארק המים בשפיים. כך הכיר את השלווה שבמים ונחשף לרזי המקצוע.'
                    : 'Avner Tzadok began his career in the job market without a clear direction, like many discharged soldiers. His first job was in carpentry, where he discovered the world of creation and design. The next job that came his way was as a maintenance man at the water park in Shefayim. This is how he got to know the tranquility of water and was exposed to the secrets of the profession.'
                  }
                </p>
                <p>
                  {isRTL 
                    ? 'אבל הייחוד האמיתי של צדוק הוא היחס האישי ותשומת הלב לפרטים. מאז שהקים את "פלגים" עבד צדוק עם מאות לקוחות בליווי אישי וצמוד משלב התכנון הראשוני ועד לתחזוקה השוטפת של הבריכה לאחר הקמתה.'
                    : 'But Tzadok\'s real uniqueness is his personal approach and attention to detail. Since founding Plagim, Tzadok has worked with hundreds of customers with personal and close accompaniment from the initial planning stage to the ongoing maintenance of the pool after its construction.'
                  }
                </p>
                <blockquote className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg italic text-blue-800">
                  {isRTL 
                    ? '"אני אוהב לעבוד עם אנשים, לתרגם את החלומות שלהם והרצונות שלהם לחוויות מוחשיות"'
                    : '"I love working with people, translating their dreams and desires into tangible experiences"'
                  }
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
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
            {isRTL ? 'צרו איתנו קשר' : 'Contact Us'}
          </h2>
          <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            {isRTL 
              ? 'מוכנים להתחיל את פרויקט הבריכה שלכם? צרו איתנו קשר לקבלת ייעוץ מקצועי'
              : 'Ready to start your pool project? Contact us for professional consultation'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card-glass text-center">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {isRTL ? 'טלפון' : 'Phone'}
              </h3>
              <p className="text-gray-700">073-7761900</p>
            </div>
            <div className="card-glass text-center">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {isRTL ? 'אימייל' : 'Email'}
              </h3>
              <p className="text-gray-700">plagim1@gmail.com</p>
            </div>
            <div className="card-glass text-center">
              <div className="w-12 h-12 pool-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {isRTL ? 'כתובת' : 'Address'}
              </h3>
              <p className="text-gray-700">
                {isRTL ? 'רחוב היער 1, כפר האורנים' : 'Forest Street 1, Kfar HaOranim'}
              </p>
            </div>
          </div>
          
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

export default About
