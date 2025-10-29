import React from 'react'
import { useTranslation } from 'react-i18next'

const Accessibility: React.FC = () => {
  const { i18n } = useTranslation()
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
              {isRTL ? 'הצהרת נגישות' : 'Accessibility Statement'}
            </h1>
            <p className="text-luxury mb-12 max-w-4xl mx-auto text-white font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
              {isRTL 
                ? 'מחויבותנו לנגישות ולשוויון הזדמנויות'
                : 'Our commitment to accessibility and equal opportunities'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(/images/2-20.jpg)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        
        <div className="container-luxury relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="card-luxury p-8 shadow-xl">
              <h2 className="heading-section mb-8">
                {isRTL ? 'הצהרת נגישות לאתר פלגים' : 'Plagim Website Accessibility Statement'}
              </h2>
              
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  {isRTL 
                    ? 'חברת פלגים מחויבת לספק שירותים נגישים לכל הלקוחות, כולל אנשים עם מוגבלויות. אנו פועלים בהתאם לחוק שוויון זכויות לאנשים עם מוגבלויות, התשנ"ח-1998.'
                    : 'Plagim is committed to providing accessible services to all customers, including people with disabilities. We operate in accordance with the Equal Rights for People with Disabilities Law, 1998.'
                  }
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {isRTL ? 'נגישות האתר' : 'Website Accessibility'}
                </h3>
                
                <p>
                  {isRTL 
                    ? 'אתר זה פותח בהתאם לתקן WCAG 2.1 ברמה AA. האתר כולל:'
                    : 'This website was developed in accordance with WCAG 2.1 Level AA standard. The website includes:'
                  }
                </p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    {isRTL 
                      ? 'תמיכה בקוראי מסך וטכנולוגיות מסייעות'
                      : 'Support for screen readers and assistive technologies'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'ניווט באמצעות מקלדת'
                      : 'Keyboard navigation'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'ניגודיות צבעים מותאמת'
                      : 'Adapted color contrast'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'גופנים ברורים וקריאים'
                      : 'Clear and readable fonts'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'תיאורי תמונות (alt text)'
                      : 'Image descriptions (alt text)'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'תמיכה בשפות עברית ואנגלית'
                      : 'Support for Hebrew and English languages'
                    }
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {isRTL ? 'דיווח על בעיות נגישות' : 'Reporting Accessibility Issues'}
                </h3>
                
                <p>
                  {isRTL 
                    ? 'אם נתקלתם בבעיה נגישות באתר, אנא צרו איתנו קשר:'
                    : 'If you encounter an accessibility issue on the website, please contact us:'
                  }
                </p>
                
                <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg">
                  <div className="space-y-2">
                    <p><strong>{isRTL ? 'טלפון:' : 'Phone:'}</strong> 073-7761900</p>
                    <p><strong>{isRTL ? 'אימייל:' : 'Email:'}</strong> plagim1@gmail.com</p>
                    <p><strong>{isRTL ? 'כתובת:' : 'Address:'}</strong> {isRTL ? 'רחוב היער 1, כפר האורנים' : 'Forest Street 1, Kfar HaOranim'}</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {isRTL ? 'נגישות פיזית' : 'Physical Accessibility'}
                </h3>
                
                <p>
                  {isRTL 
                    ? 'משרדנו נגיש לאנשים עם מוגבלויות. המשרד כולל:'
                    : 'Our office is accessible to people with disabilities. The office includes:'
                  }
                </p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    {isRTL 
                      ? 'כניסה נגישה ללא מדרגות'
                      : 'Accessible entrance without stairs'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'שירותים נגישים'
                      : 'Accessible restrooms'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'מקומות חניה נגישים'
                      : 'Accessible parking spaces'
                    }
                  </li>
                  <li>
                    {isRTL 
                      ? 'מעליות נגישות'
                      : 'Accessible elevators'
                    }
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {isRTL ? 'התחייבותנו' : 'Our Commitment'}
                </h3>
                
                <p>
                  {isRTL 
                    ? 'אנו מתחייבים להמשיך ולשפר את הנגישות של השירותים שלנו. אנו עובדים באופן מתמיד על שיפור האתר והשירותים כדי להבטיח שכל הלקוחות יוכלו להשתמש בהם בקלות ובנוחות.'
                    : 'We are committed to continuing to improve the accessibility of our services. We work continuously on improving the website and services to ensure that all customers can use them easily and comfortably.'
                  }
                </p>
                
                <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg mt-8">
                  <p className="text-green-800 font-medium">
                    {isRTL 
                      ? 'תאריך עדכון אחרון: ינואר 2024'
                      : 'Last updated: January 2024'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Accessibility
