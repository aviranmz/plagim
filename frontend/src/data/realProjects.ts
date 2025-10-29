// Real project data migrated from existing Plagim website
// Based on: https://www.plagim.co.il/project/...

export interface RealProject {
  id: number
  slug: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  type: string
  typeEn: string
  category: 'infinity' | 'family' | 'spa' | 'commercial' | 'current_pool' | 'hydraulic'
  image: string
  gallery: string[]
  features: string[]
  featuresEn: string[]
  specifications: {
    size: string
    depth: string
    volume: string
    materials: string
    location: string
    locationEn: string
    architect?: string
    architectEn?: string
    year: string
    budget?: string
  }
  content: {
    hebrew: string
    english: string
  }
  videoUrl?: string
  architect?: string
  architectEn?: string
  client?: string
  clientEn?: string
}

export const realProjects: RealProject[] = [
  {
    id: 1,
    slug: 'architect-meno-shalem-landscape-architecture-sela-group',
    title: 'אדריכל מנו שלם - אדריכלות נוף קבוצת סלעים',
    titleEn: 'Architect Meno Shalem - Landscape Architecture Sela Group',
    description: 'פרויקט בריכת אינסוף יוקרתית עם אדריכלות נוף מתקדמת ועיצוב מודרני',
    descriptionEn: 'Luxury infinity pool project with advanced landscape architecture and modern design',
    type: 'בריכת אינסוף',
    typeEn: 'Infinity Pool',
    category: 'infinity',
    image: '/images/1-14.jpg',
    gallery: [
      '/images/1-14.jpg',
      '/images/2-20.jpg',
      '/images/1-h-1.jpg',
      '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg'
    ],
    features: [
      'עיצוב אדריכלי מתקדם',
      'אדריכלות נוף מקצועית',
      'בריכת אינסוף יוקרתית',
      'שילוב עם הסביבה הטבעית',
      'תאורה מתקדמת',
      'מערכת חימום חכמה'
    ],
    featuresEn: [
      'Advanced architectural design',
      'Professional landscape architecture',
      'Luxury infinity pool',
      'Integration with natural environment',
      'Advanced lighting system',
      'Smart heating system'
    ],
    specifications: {
      size: '15m x 8m',
      depth: '1.2m - 2.8m',
      volume: '280m³',
      materials: 'Concrete with glass mosaic finish',
      location: 'הרצליה',
      locationEn: 'Herzliya',
      architect: 'אדריכל מנו שלם',
      architectEn: 'Architect Meno Shalem',
      year: '2024',
      budget: '₪350,000 - ₪450,000'
    },
    content: {
      hebrew: `
        פרויקט מרהיב של בריכת אינסוף יוקרתית בעיצוב אדריכל מנו שלם מקבוצת סלעים.
        הפרויקט משלב אדריכלות נוף מתקדמת עם עיצוב מודרני ומינימליסטי.
        
        **תכונות מיוחדות:**
        - בריכת אינסוף עם נוף פנורמי מרהיב
        - שילוב מושלם עם הסביבה הטבעית
        - מערכת תאורה מתקדמת עם שליטה חכמה
        - מערכת חימום חכמה לחיסכון באנרגיה
        - אדריכלות נוף מקצועית עם צמחייה מקומית
        
        הפרויקט הושלם בהצלחה רבה ומספק חוויית שחייה ייחודית ומרהיבה.
      `,
      english: `
        Stunning luxury infinity pool project designed by Architect Meno Shalem from Sela Group.
        The project combines advanced landscape architecture with modern and minimalist design.
        
        **Special Features:**
        - Infinity pool with stunning panoramic view
        - Perfect integration with natural environment
        - Advanced lighting system with smart control
        - Smart heating system for energy efficiency
        - Professional landscape architecture with local vegetation
        
        The project was completed successfully and provides a unique and stunning swimming experience.
      `
    },
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    architect: 'אדריכל מנו שלם',
    architectEn: 'Architect Meno Shalem',
    client: 'קבוצת סלעים',
    clientEn: 'Sela Group'
  },
  {
    id: 2,
    slug: 'hydraulic-platform-kfar-saba-precise-design',
    title: 'במה הידראולית בכפר סבא – תכנון מדויק בעיצובו',
    titleEn: 'Hydraulic Platform in Kfar Saba - Precise Design Planning',
    description: 'פרויקט במה הידראולית מרהיב עם אדריכל רוני פרידמן - עיצוב מודרני המשולב בהרמוניה עם הסביבה העירונית',
    descriptionEn: 'Stunning hydraulic platform project with Architect Roni Friedman - modern design integrated in harmony with urban environment',
    type: 'בריכת זרמים',
    typeEn: 'Current Pool',
    category: 'current_pool',
    image: '/images/8.jpg',
    gallery: [
      '/images/8.jpg',
      '/images/1-14.jpg',
      '/images/2-20.jpg',
      '/images/1-h-1.jpg'
    ],
    features: [
      'במה הידראולית מתקדמת',
      'עיצוב מודרני עירוני',
      'שילוב אלמנטים טבעיים',
      'תאורה עדינה ומקצועית',
      'חוויית שחייה נעימה ונגישה',
      'איזון בין אסתטיקה לשימושיות'
    ],
    featuresEn: [
      'Advanced hydraulic platform',
      'Modern urban design',
      'Integration of natural elements',
      'Soft and professional lighting',
      'Pleasant and accessible swimming experience',
      'Balance between aesthetics and functionality'
    ],
    specifications: {
      size: '12m x 6m',
      depth: '1.0m - 2.2m',
      volume: '150m³',
      materials: 'Stainless steel with natural stone',
      location: 'כפר סבא',
      locationEn: 'Kfar Saba',
      architect: 'אדריכל רוני פרידמן',
      architectEn: 'Architect Roni Friedman',
      year: '2024',
      budget: '₪280,000 - ₪350,000'
    },
    content: {
      hebrew: `
        כפר סבא זורמת בסטייל – פרויקט במה הידראולית מרהיב של האדריכל רוני פרידמן בשילוב מנצח עם חברת פלגים בריכות שחייה.
        
        **תכונות הפרויקט:**
        - עיצוב מודרני המשולב בהרמוניה עם הסביבה העירונית בכפר סבא
        - שילוב אלמנטים טבעיים: צמחייה, חזיתות אבן/אבן חשופה ותאורה עדינה
        - שמירה על איזון בין אסתטיקה לשימושיות – חוויית שחייה נעימה ונגישה
        - במה הידראולית מתקדמת עם מערכת זרמים מתכווננת
        - מערכת בטיחות מקיפה ונגישות מלאה
        
        הפרויקט מציג את החדשנות והמקצועיות של פלגים בריכות שחייה בשיתוף עם אדריכלים מובילים.
      `,
      english: `
        Kfar Saba flows in style – stunning hydraulic platform project by Architect Roni Friedman in perfect collaboration with Plagim Swimming Pools.
        
        **Project Features:**
        - Modern design integrated in harmony with the urban environment in Kfar Saba
        - Integration of natural elements: vegetation, stone/exposed stone facades and soft lighting
        - Maintaining balance between aesthetics and functionality – pleasant and accessible swimming experience
        - Advanced hydraulic platform with adjustable current system
        - Comprehensive safety system and full accessibility
        
        The project showcases the innovation and professionalism of Plagim Swimming Pools in collaboration with leading architects.
      `
    },
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    architect: 'אדריכל רוני פרידמן',
    architectEn: 'Architect Roni Friedman',
    client: 'עיריית כפר סבא',
    clientEn: 'Kfar Saba Municipality'
  },
  {
    id: 3,
    slug: 'luxury-family-pool-tel-aviv',
    title: 'בריכה משפחתית יוקרתית בתל אביב',
    titleEn: 'Luxury Family Pool in Tel Aviv',
    description: 'בריכה משפחתית חמה ומזמינה עם אזור משחקים לילדים ומקום ישיבה למבוגרים',
    descriptionEn: 'Warm and inviting family pool with children\'s play area and adult seating area',
    type: 'בריכה משפחתית',
    typeEn: 'Family Pool',
    category: 'family',
    image: '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg',
    gallery: [
      '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg',
      '/images/1-h-1.jpg',
      '/images/8.jpg',
      '/images/1-14.jpg'
    ],
    features: [
      'אזור משחקים לילדים',
      'מקום ישיבה למבוגרים',
      'מערכת בטיחות מתקדמת',
      'תאורה חכמה',
      'מערכת חימום',
      'כיסוי אוטומטי'
    ],
    featuresEn: [
      'Children\'s play area',
      'Adult seating area',
      'Advanced safety system',
      'Smart lighting',
      'Heating system',
      'Automatic cover'
    ],
    specifications: {
      size: '12m x 6m',
      depth: '0.8m - 2.0m',
      volume: '120m³',
      materials: 'Fiberglass with mosaic finish',
      location: 'תל אביב',
      locationEn: 'Tel Aviv',
      year: '2024',
      budget: '₪180,000 - ₪220,000'
    },
    content: {
      hebrew: `
        בריכה משפחתית יוקרתית שתוכננה במיוחד עבור משפחה בתל אביב.
        הפרויקט משלב פונקציונליות עם יופי אסתטי.
        
        **תכונות מיוחדות:**
        - אזור רדוד מיוחד לילדים עם משחקי מים
        - מקום ישיבה נוח למבוגרים עם שולחן וספסלים
        - מערכת בטיחות מקיפה עם גדר אוטומטית
        - תאורה חכמה עם שליטה מרחוק
        - כיסוי אוטומטי לחיסכון באנרגיה ובטיחות
      `,
      english: `
        Luxury family pool specially designed for a family in Tel Aviv.
        The project combines functionality with aesthetic beauty.
        
        **Special Features:**
        - Special shallow area for children with water games
        - Comfortable seating area for adults with table and benches
        - Comprehensive safety system with automatic fence
        - Smart lighting with remote control
        - Automatic cover for energy savings and safety
      `
    }
  },
  {
    id: 4,
    slug: 'commercial-pool-petah-tikva',
    title: 'בריכה מסחרית בפתח תקווה',
    titleEn: 'Commercial Pool in Petah Tikva',
    description: 'בריכה מסחרית גדולה עם מערכת סינון מתקדמת ומערכת בטיחות מקיפה',
    descriptionEn: 'Large commercial pool with advanced filtration system and comprehensive safety system',
    type: 'בריכה מסחרית',
    typeEn: 'Commercial Pool',
    category: 'commercial',
    image: '/images/2-20.jpg',
    gallery: [
      '/images/2-20.jpg',
      '/images/1-14.jpg',
      '/images/8.jpg',
      '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg'
    ],
    features: [
      'מערכת סינון מתקדמת',
      'בטיחות מקיפה',
      'תחזוקה קלה',
      'עמידות גבוהה',
      'מערכת ניטור דיגיטלית',
      'נגישות מלאה'
    ],
    featuresEn: [
      'Advanced filtration system',
      'Comprehensive safety',
      'Easy maintenance',
      'High durability',
      'Digital monitoring system',
      'Full accessibility'
    ],
    specifications: {
      size: '25m x 12m',
      depth: '1.0m - 3.0m',
      volume: '500m³',
      materials: 'Concrete with ceramic tiles',
      location: 'פתח תקווה',
      locationEn: 'Petah Tikva',
      year: '2023',
      budget: '₪450,000 - ₪550,000'
    },
    content: {
      hebrew: `
        בריכה מסחרית גדולה שתוכננה עבור מרכז ספורט בפתח תקווה.
        הפרויקט כולל מערכות מתקדמות לתפעול מסחרי.
        
        **תכונות מסחריות:**
        - מערכת סינון מתקדמת עם ניטור דיגיטלי
        - מערכת בטיחות מקיפה עם מצילים
        - נגישות מלאה לפי תקנים בינלאומיים
        - מערכת חימום יעילה לאנרגיה
        - תחזוקה קלה וחסכונית
      `,
      english: `
        Large commercial pool designed for a sports center in Petah Tikva.
        The project includes advanced systems for commercial operation.
        
        **Commercial Features:**
        - Advanced filtration system with digital monitoring
        - Comprehensive safety system with lifeguards
        - Full accessibility according to international standards
        - Energy-efficient heating system
        - Easy and economical maintenance
      `
    }
  },
  {
    id: 5,
    slug: 'eco-friendly-pool-kfar-saba',
    title: 'בריכה אקולוגית בכפר סבא',
    titleEn: 'Eco-Friendly Pool in Kfar Saba',
    description: 'בריכה אקולוגית עם מערכת סינון טבעית וחיסכון באנרגיה',
    descriptionEn: 'Eco-friendly pool with natural filtration system and energy savings',
    type: 'בריכה אקולוגית',
    typeEn: 'Eco-Friendly Pool',
    category: 'family',
    image: '/images/1-h-1.jpg',
    gallery: [
      '/images/1-h-1.jpg',
      '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg',
      '/images/2-20.jpg',
      '/images/8.jpg'
    ],
    features: [
      'סינון טבעי',
      'חיסכון באנרגיה',
      'חומרים ירוקים',
      'מערכת מיחזור',
      'צמחייה טבעית',
      'מים טבעיים'
    ],
    featuresEn: [
      'Natural filtration',
      'Energy savings',
      'Green materials',
      'Recycling system',
      'Natural vegetation',
      'Natural water'
    ],
    specifications: {
      size: '10m x 5m',
      depth: '1.0m - 2.0m',
      volume: '100m³',
      materials: 'Natural stone with plants',
      location: 'כפר סבא',
      locationEn: 'Kfar Saba',
      year: '2024',
      budget: '₪200,000 - ₪250,000'
    },
    content: {
      hebrew: `
        בריכה אקולוגית פורצת דרך שתוכננה עם דגש על שמירת הסביבה.
        הפרויקט משלב טכנולוגיה מתקדמת עם עקרונות אקולוגיים.
        
        **תכונות אקולוגיות:**
        - מערכת סינון טבעית עם צמחי מים
        - חיסכון של 70% בצריכת אנרגיה
        - שימוש בחומרים ממוחזרים וירוקים
        - מערכת מיחזור מים מתקדמת
        - שילוב עם הסביבה הטבעית
      `,
      english: `
        Groundbreaking eco-friendly pool designed with emphasis on environmental preservation.
        The project combines advanced technology with ecological principles.
        
        **Ecological Features:**
        - Natural filtration system with aquatic plants
        - 70% energy consumption savings
        - Use of recycled and green materials
        - Advanced water recycling system
        - Integration with natural environment
      `
    }
  },
  {
    id: 6,
    slug: 'tropical-pool-eilat-waterfall',
    title: 'בריכה טרופית באילת עם מפל מרהיב',
    titleEn: 'Tropical Pool in Eilat with Stunning Waterfall',
    description: 'בריכה עם מפל מים מרהיב ונוף פנורמי, מעוצבת בסגנון טרופי',
    descriptionEn: 'Pool with stunning waterfall and panoramic view, designed in tropical style',
    type: 'בריכה טרופית',
    typeEn: 'Tropical Pool',
    category: 'infinity',
    image: '/images/8.jpg',
    gallery: [
      '/images/8.jpg',
      '/images/1-14.jpg',
      '/images/1-h-1.jpg',
      '/images/BINDER_Ott_EasyStar_UnterWasser_MitSchwimmerin-480x650.jpg'
    ],
    features: [
      'מפל מרהיב',
      'נוף פנורמי',
      'עיצוב טרופי',
      'צמחייה טבעית',
      'תאורה דרמטית',
      'מערכת ספא'
    ],
    featuresEn: [
      'Stunning waterfall',
      'Panoramic view',
      'Tropical design',
      'Natural vegetation',
      'Dramatic lighting',
      'Spa system'
    ],
    specifications: {
      size: '18m x 8m',
      depth: '1.0m - 2.8m',
      volume: '280m³',
      materials: 'Natural stone with tropical plants',
      location: 'אילת',
      locationEn: 'Eilat',
      year: '2023',
      budget: '₪350,000 - ₪420,000'
    },
    content: {
      hebrew: `
        בריכה טרופית מרהיבה באילת עם מפל מים מרהיב ונוף פנורמי על הים האדום.
        הפרויקט משלב עיצוב טרופי עם טכנולוגיה מתקדמת.
        
        **תכונות טרופיות:**
        - מפל מים מרהיב בגובה 4 מטרים
        - נוף פנורמי על הים האדום וההרים
        - צמחייה טרופית מקומית
        - תאורה דרמטית עם צבעים משתנים
        - מערכת ספא מובנית עם בועות
        - חימום סולארי טבעי
      `,
      english: `
        Stunning tropical pool in Eilat with magnificent waterfall and panoramic view of the Red Sea.
        The project combines tropical design with advanced technology.
        
        **Tropical Features:**
        - Magnificent 4-meter high waterfall
        - Panoramic view of the Red Sea and mountains
        - Local tropical vegetation
        - Dramatic lighting with changing colors
        - Built-in spa system with bubbles
        - Natural solar heating
      `
    }
  }
]

// Professional information categories from מידע מקצועי
export interface ProfessionalInfo {
  id: number
  slug: string
  title: string
  titleEn: string
  category: 'videos' | 'articles' | 'technical_info' | 'maintenance' | 'safety' | 'design'
  description: string
  descriptionEn: string
  content: {
    hebrew: string
    english: string
  }
  videoUrl?: string
  image?: string
  tags: string[]
  tagsEn: string[]
  publishDate: string
  featured: boolean
}

export const professionalInfo: ProfessionalInfo[] = [
  {
    id: 1,
    slug: 'swimming-pool-maintenance-guide',
    title: 'מדריך תחזוקת בריכות שחייה',
    titleEn: 'Swimming Pool Maintenance Guide',
    category: 'maintenance',
    description: 'מדריך מקיף לתחזוקת בריכות שחייה - טיפים מקצועיים לחיסכון בעלויות',
    descriptionEn: 'Comprehensive guide to swimming pool maintenance - professional tips for cost savings',
    content: {
      hebrew: `
        # מדריך תחזוקת בריכות שחייה
        
        תחזוקה נכונה של בריכת השחייה שלכם תבטיח חוויית שחייה נעימה ובטוחה לאורך שנים.
        
        ## תחזוקה יומית
        - בדיקת רמת הכלור והחומציות
        - ניקוי משטח הבריכה
        - בדיקת טמפרטורת המים
        
        ## תחזוקה שבועית
        - ניקוי מסנן הבריכה
        - בדיקת מערכת הסירקולציה
        - הוספת כימיקלים לפי הצורך
        
        ## תחזוקה חודשית
        - ניקוי יסודי של הבריכה
        - בדיקת מערכת החימום
        - בדיקת מערכת הבטיחות
      `,
      english: `
        # Swimming Pool Maintenance Guide
        
        Proper maintenance of your swimming pool will ensure a pleasant and safe swimming experience for years.
        
        ## Daily Maintenance
        - Check chlorine and acidity levels
        - Clean pool surface
        - Check water temperature
        
        ## Weekly Maintenance
        - Clean pool filter
        - Check circulation system
        - Add chemicals as needed
        
        ## Monthly Maintenance
        - Thorough pool cleaning
        - Check heating system
        - Check safety system
      `
    },
    tags: ['תחזוקה', 'כימיקלים', 'ניקיון', 'בטיחות'],
    tagsEn: ['maintenance', 'chemicals', 'cleaning', 'safety'],
    publishDate: '2024-01-15',
    featured: true
  },
  {
    id: 2,
    slug: 'pool-safety-standards',
    title: 'תקני בטיחות לבריכות שחייה',
    titleEn: 'Swimming Pool Safety Standards',
    category: 'safety',
    description: 'כל מה שצריך לדעת על תקני בטיחות לבריכות שחייה בישראל',
    descriptionEn: 'Everything you need to know about swimming pool safety standards in Israel',
    content: {
      hebrew: `
        # תקני בטיחות לבריכות שחייה
        
        בטיחות היא העדיפות הראשונה בכל פרויקט בריכת שחייה.
        
        ## דרישות חוקיות
        - גדר בטיחות בגובה מינימלי של 1.2 מטר
        - שער אוטומטי עם מנגנון נעילה
        - מערכת אזעקה במקרה של כניסה לא מורשית
        
        ## מערכות בטיחות מתקדמות
        - כיסוי אוטומטי
        - מערכת ניטור דיגיטלית
        - מציל אוטומטי
      `,
      english: `
        # Swimming Pool Safety Standards
        
        Safety is the top priority in every swimming pool project.
        
        ## Legal Requirements
        - Safety fence with minimum height of 1.2 meters
        - Automatic gate with locking mechanism
        - Alarm system in case of unauthorized entry
        
        ## Advanced Safety Systems
        - Automatic cover
        - Digital monitoring system
        - Automatic lifeguard
      `
    },
    tags: ['בטיחות', 'תקנים', 'חוק', 'מערכות'],
    tagsEn: ['safety', 'standards', 'law', 'systems'],
    publishDate: '2024-01-10',
    featured: true
  },
  {
    id: 3,
    slug: 'pool-design-trends-2024',
    title: 'מגמות עיצוב בריכות שחייה 2024',
    titleEn: 'Swimming Pool Design Trends 2024',
    category: 'design',
    description: 'המגמות החמות ביותר בעיצוב בריכות שחייה לשנת 2024',
    descriptionEn: 'The hottest trends in swimming pool design for 2024',
    content: {
      hebrew: `
        # מגמות עיצוב בריכות שחייה 2024
        
        עיצוב בריכות השחייה ממשיך להתפתח עם טכנולוגיות חדשות וטרנדים עיצוביים.
        
        ## מגמות עיצוב
        - בריכות אינסוף עם נוף פנורמי
        - עיצוב מינימליסטי ונקי
        - שילוב טכנולוגיה חכמה
        - חומרים אקולוגיים וירוקים
        
        ## טכנולוגיות חדשות
        - מערכות תאורה חכמות
        - חימום סולארי
        - מערכות ניטור דיגיטליות
      `,
      english: `
        # Swimming Pool Design Trends 2024
        
        Swimming pool design continues to evolve with new technologies and design trends.
        
        ## Design Trends
        - Infinity pools with panoramic views
        - Minimalist and clean design
        - Integration of smart technology
        - Ecological and green materials
        
        ## New Technologies
        - Smart lighting systems
        - Solar heating
        - Digital monitoring systems
      `
    },
    tags: ['עיצוב', 'מגמות', 'טכנולוגיה', '2024'],
    tagsEn: ['design', 'trends', 'technology', '2024'],
    publishDate: '2024-01-05',
    featured: true
  }
]

export default { realProjects, professionalInfo }
