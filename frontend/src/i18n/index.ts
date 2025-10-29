import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Hebrew translations
const heTranslations = {
  "navigation": {
    "home": "בית",
    "about": "אודות",
    "projects": "פרויקטים",
    "contact": "צור קשר",
    "getQuote": "קבל הצעת מחיר"
  },
  "hero": {
    "title": "בריכות שחייה",
    "subtitle": "מעוצבות בהתאמה אישית",
    "description": "חברת פלגים מתמחה בבניית בריכות שחייה ביתיות מעוצבות מכל סוגי החומרים. מקצוענות, בטיחות ולווי אישי הן התוכנות שחרטנו על דגלנו.",
    "getQuote": "קבל הצעת מחיר",
    "viewProjects": "צפה בפרויקטים"
  },
  "about": {
    "title": "אודות פלגים",
    "subtitle": "פלגים בריכות שחייה - חלום שהופך למציאות",
    "description": "חברת \"פלגים\" הוקמה בשנת 1996 על ידי אבנר צדוק ומציעה שרותי תכנון, הקמה ותחזוקה של בריכות שחייה ביתיות ופרטיות בכל רחבי הארץ.",
    "story": "מאז הקמתה, החברה גדלה בהתמדה מדי שנה ולאחרונה החלה לפתח ולשווק טכנולוגיה יחודית בארץ ובחו\"ל.",
    "values": "מראשית דרכה חרטה על דגלה מקצוענות, לווי אישי לאורך כל שלבי התכנון וההקמה, שימוש בטכנולוגיה ירוקה החוסכת אנרגיה ומים, שימוש בחומרים ידידותיים לסביבה ולאדם.",
    "yearsExperience": "שנות ניסיון",
    "whyChooseUs": "למה לבחור בפלגים?",
    "whyDescription": "מקצוענות, בטיחות ולווי אישי הן התוכנות שחרטנו על דגלנו, משלב התכנית של הקמת בריכת שחיה ועד השלב של פרטי העיצוב הקטנים העושים את שלמותה.",
    "professionalism": "מקצוענות מוכחת",
    "professionalismDesc": "מעל 25 שנות ניסיון בבניית בריכות שחייה ביתיות ופרטיות בכל רחבי הארץ.",
    "personalService": "לווי אישי",
    "personalServiceDesc": "ליווי אישי לאורך כל שלבי התכנון וההקמה, מהרעיון הראשוני ועד לפרטי העיצוב הקטנים.",
    "greenTechnology": "טכנולוגיה ירוקה",
    "greenTechnologyDesc": "שימוש בטכנולוגיה ירוקה החוסכת אנרגיה ומים, ובחומרים ידידותיים לסביבה ולאדם."
  },
  "services": {
    "title": "השירותים שלנו",
    "subtitle": "אנו בפלגים מקימים בריכות שחיה על-ידי שימוש בבנייה ירוקה, חיסכון באנרגיה והקפדה על הסטנדרטים הגבוהים ביותר.",
    "homePools": "בריכות שחייה ביתיות",
    "homePoolsDesc": "בריכות מעוצבות מכל סוגי החומרים",
    "infinityPools": "בריכות גלישה",
    "infinityPoolsDesc": "בריכות גלישה ללא קצה ובתועשת",
    "poolCovers": "כיסויים לבריכות",
    "poolCoversDesc": "כיסוי תריס חשמלי לבריכה",
    "swimmingSystems": "מערכות שחייה",
    "swimmingSystemsDesc": "מערכות שחייה נגד הזרם בינדר"
  },
  "projects": {
    "title": "הפרויקטים שלנו",
    "subtitle": "התרשמו ממגוון רחב של בריכות שחייה העשויות מחומרים שונים כגון: בריכות בטון, בריכות מתועשת ועוד...",
    "viewMore": "צפה בכל הפרויקטים",
    "wantToSeeMore": "רוצים לראות עוד פרויקטים?",
    "wantToSeeMoreDesc": "צרו איתנו קשר לקבלת גלריה מלאה של הפרויקטים שלנו"
  },
  "contact": {
    "title": "צור קשר",
    "subtitle": "מוכנים להתחיל את הפרויקט שלכם? צרו איתנו קשר עוד היום לקבלת ייעוץ מקצועי והצעת מחיר מותאמת אישית",
    "sendMessage": "שלחו לנו הודעה",
    "fullName": "שם מלא",
    "phone": "טלפון",
    "email": "אימייל",
    "poolType": "סוג הבריכה המבוקשת",
    "message": "הודעה",
    "submit": "שלח הודעה",
    "contactInfo": "פרטי התקשרות",
    "phoneLabel": "טלפון",
    "phoneNumber": "073-7761900",
    "phoneHours": "שעות פעילות: א-ה 8:00-18:00",
    "emailLabel": "אימייל",
    "emailAddress": "plagim1@gmail.com",
    "emailResponse": "נענה תוך 24 שעות",
    "addressLabel": "כתובת המשרד",
    "address": "רחוב היער 1, כפר האורנים 7313400",
    "mailingAddress": "כתובת למשלוח דואר: הפסגה 17, כפר האורנים",
    "customerService": "שירות לקוחות",
    "customerServiceDesc": "צוות השירות שלנו זמין לעזור לכם בכל שאלה או בקשה. אנו מתחייבים לספק שירות מקצועי ואדיב.",
    "callNow": "התקשר עכשיו",
    "sendEmail": "שלח אימייל"
  },
  "footer": {
    "companyDescription": "חברת פלגים מתמחה בבניית בריכות שחייה ביתיות מעוצבות מכל סוגי החומרים. מקצוענות, בטיחות ולווי אישי הן התוכנות שחרטנו על דגלנו.",
    "quickLinks": "קישורים מהירים",
    "services": "שירותים",
    "homePools": "בריכות שחייה ביתיות",
    "infinityPools": "בריכות גלישה",
    "poolCovers": "כיסויים לבריכות",
    "swimmingSystems": "מערכות שחייה נגד הזרם",
    "landscapeArchitecture": "אדריכלות נוף",
    "copyright": "כל הזכויות שמורות פלגים 2024 ©",
    "accessibility": "הצהרת נגישות",
    "terms": "תנאי שימוש",
    "privacy": "מדיניות פרטיות"
  },
  "cta": {
    "readyToStart": "מוכנים להתחיל את הפרויקט שלכם?",
    "readyToStartDesc": "צרו איתנו קשר עוד היום לקבלת ייעוץ מקצועי והצעת מחיר מותאמת אישית",
    "contactUs": "צור קשר",
    "callUs": "📞 073-7761900"
  },
  "poolTypes": {
    "home": "בריכה ביתית",
    "infinity": "בריכת גלישה",
    "fiberglass": "בריכת פיברגלס",
    "concrete": "בריכת בטון",
    "commercial": "בריכה מסחרית",
    "spa": "בריכה עם ספא"
  },
  "common": {
    "loading": "טוען...",
    "error": "שגיאה",
    "success": "הצלחה",
    "cancel": "ביטול",
    "save": "שמור",
    "edit": "ערוך",
    "delete": "מחק",
    "close": "סגור",
    "back": "חזרה",
    "next": "הבא",
    "previous": "הקודם",
    "search": "חיפוש",
    "filter": "מסנן",
    "clear": "נקה",
    "submit": "שלח",
    "required": "נדרש",
    "viewMore": "צפה עוד"
  }
}

// English translations
const enTranslations = {
  "navigation": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "contact": "Contact",
    "getQuote": "Get Quote"
  },
  "hero": {
    "title": "Swimming Pools",
    "subtitle": "Custom Designed",
    "description": "Plagim specializes in building custom-designed home swimming pools from all types of materials. Professionalism, safety, and personal service are the principles we have engraved on our banner.",
    "getQuote": "Get Quote",
    "viewProjects": "View Projects"
  },
  "about": {
    "title": "About Plagim",
    "subtitle": "Plagim Swimming Pools - Dreams Become Reality",
    "description": "Plagim company was established in 1996 by Avner Tzadok and offers planning, construction and maintenance services for home and private swimming pools throughout the country.",
    "story": "Since its establishment, the company has grown steadily every year and recently began developing and marketing unique technology in Israel and abroad.",
    "values": "From the beginning, it has engraved on its banner professionalism, personal accompaniment throughout all stages of planning and construction, use of green technology that saves energy and water, use of environmentally and human-friendly materials.",
    "yearsExperience": "Years of Experience",
    "whyChooseUs": "Why Choose Plagim?",
    "whyDescription": "Professionalism, safety and personal service are the principles we have engraved on our banner, from the planning stage of building a swimming pool to the stage of the small design details that make it complete.",
    "professionalism": "Proven Professionalism",
    "professionalismDesc": "Over 25 years of experience in building home and private swimming pools throughout the country.",
    "personalService": "Personal Service",
    "personalServiceDesc": "Personal accompaniment throughout all stages of planning and construction, from the initial idea to the smallest design details.",
    "greenTechnology": "Green Technology",
    "greenTechnologyDesc": "Use of green technology that saves energy and water, and environmentally and human-friendly materials."
  },
  "services": {
    "title": "Our Services",
    "subtitle": "We at Plagim build swimming pools using green construction, energy saving and adherence to the highest standards.",
    "homePools": "Home Swimming Pools",
    "homePoolsDesc": "Pools designed from all types of materials",
    "infinityPools": "Infinity Pools",
    "infinityPoolsDesc": "Infinity pools without edge and manufactured",
    "poolCovers": "Pool Covers",
    "poolCoversDesc": "Electric shutter cover for pool",
    "swimmingSystems": "Swimming Systems",
    "swimmingSystemsDesc": "Swimming systems against the current Binder"
  },
  "projects": {
    "title": "Our Projects",
    "subtitle": "Be impressed by a wide variety of swimming pools made from different materials such as: concrete pools, manufactured pools and more...",
    "viewMore": "View All Projects",
    "wantToSeeMore": "Want to see more projects?",
    "wantToSeeMoreDesc": "Contact us to get a full gallery of our projects"
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "Ready to start your project? Contact us today for professional consultation and personalized quote",
    "sendMessage": "Send us a message",
    "fullName": "Full Name",
    "phone": "Phone",
    "email": "Email",
    "poolType": "Requested Pool Type",
    "message": "Message",
    "submit": "Send Message",
    "contactInfo": "Contact Information",
    "phoneLabel": "Phone",
    "phoneNumber": "073-7761900",
    "phoneHours": "Business Hours: Sun-Thu 8:00-18:00",
    "emailLabel": "Email",
    "emailAddress": "plagim1@gmail.com",
    "emailResponse": "Answered within 24 hours",
    "addressLabel": "Office Address",
    "address": "HaYaar 1, Kfar HaOranim 7313400",
    "mailingAddress": "Mailing Address: HaPsaga 17, Kfar HaOranim",
    "customerService": "Customer Service",
    "customerServiceDesc": "Our service team is available to help you with any question or request. We are committed to providing professional and courteous service.",
    "callNow": "Call Now",
    "sendEmail": "Send Email"
  },
  "footer": {
    "companyDescription": "Plagim company specializes in building custom-designed home swimming pools from all types of materials. Professionalism, safety and personal service are the principles we have engraved on our banner.",
    "quickLinks": "Quick Links",
    "services": "Services",
    "homePools": "Home Swimming Pools",
    "infinityPools": "Infinity Pools",
    "poolCovers": "Pool Covers",
    "swimmingSystems": "Swimming Systems Against Current",
    "landscapeArchitecture": "Landscape Architecture",
    "copyright": "All rights reserved Plagim 2024 ©",
    "accessibility": "Accessibility Statement",
    "terms": "Terms of Use",
    "privacy": "Privacy Policy"
  },
  "cta": {
    "readyToStart": "Ready to start your project?",
    "readyToStartDesc": "Contact us today for professional consultation and personalized quote",
    "contactUs": "Contact Us",
    "callUs": "📞 073-7761900"
  },
  "poolTypes": {
    "home": "Home Pool",
    "infinity": "Infinity Pool",
    "fiberglass": "Fiberglass Pool",
    "concrete": "Concrete Pool",
    "commercial": "Commercial Pool",
    "spa": "Pool with Spa"
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "cancel": "Cancel",
    "save": "Save",
    "edit": "Edit",
    "delete": "Delete",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "search": "Search",
    "filter": "Filter",
    "clear": "Clear",
    "submit": "Submit",
    "required": "Required",
    "viewMore": "View More"
  }
}

const resources = {
  he: {
    translation: heTranslations
  },
  en: {
    translation: enTranslations
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'he', // Hebrew as default language
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Language configuration
    supportedLngs: ['he', 'en'],
    
    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],
  })

export default i18n
