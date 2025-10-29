// Content structure interfaces for professional info pages

export interface ContentSection {
  id?: number
  pageId?: number
  sectionType: 'hero' | 'text' | 'image' | 'gallery' | 'video' | 'list' | 'table' | 'cta'
  title?: string
  titleEn?: string
  content: SectionContent
  sortOrder?: number
  isActive?: boolean
}

export interface SectionContent {
  // Hero section
  heroImage?: string
  heroTitle?: string
  heroTitleEn?: string
  heroSubtitle?: string
  heroSubtitleEn?: string
  heroButtonText?: string
  heroButtonTextEn?: string
  heroButtonLink?: string
  
  // Text section
  text?: string
  textEn?: string
  alignment?: 'left' | 'center' | 'right'
  
  // Image section
  image?: string
  imageAlt?: string
  imageAltEn?: string
  imageCaption?: string
  imageCaptionEn?: string
  imagePosition?: 'left' | 'right' | 'center'
  
  // Gallery section
  images?: GalleryImage[]
  
  // Video section
  videoUrl?: string
  videoThumbnail?: string
  videoTitle?: string
  videoTitleEn?: string
  videoDescription?: string
  videoDescriptionEn?: string
  
  // List section
  listItems?: ListItem[]
  listType?: 'bullet' | 'numbered' | 'check'
  
  // Table section
  tableHeaders?: TableHeader[]
  tableRows?: TableRow[]
  
  // CTA section
  ctaTitle?: string
  ctaTitleEn?: string
  ctaDescription?: string
  ctaDescriptionEn?: string
  ctaButtonText?: string
  ctaButtonTextEn?: string
  ctaButtonLink?: string
  ctaBackgroundImage?: string
}

export interface GalleryImage {
  id?: number
  url: string
  alt?: string
  altEn?: string
  caption?: string
  captionEn?: string
  sortOrder?: number
}

export interface ListItem {
  id?: number
  text: string
  textEn: string
  icon?: string
  sortOrder?: number
}

export interface TableHeader {
  id?: number
  text: string
  textEn: string
  sortOrder?: number
}

export interface TableRow {
  id?: number
  cells: TableCell[]
  sortOrder?: number
}

export interface TableCell {
  id?: number
  text: string
  textEn: string
  sortOrder?: number
}

export interface ProfessionalInfoPage {
  id?: number
  slug: string
  title: string
  titleEn: string
  description?: string
  descriptionEn?: string
  content: ContentSection[]
  metaTitle?: string
  metaTitleEn?: string
  metaDescription?: string
  metaDescriptionEn?: string
  isActive?: boolean
  sortOrder?: number
  categories?: ContentCategory[]
  tags?: ContentTag[]
}

export interface ContentCategory {
  id?: number
  name: string
  nameEn: string
  slug: string
  description?: string
  descriptionEn?: string
  icon?: string
  color?: string
  isActive?: boolean
  sortOrder?: number
}

export interface ContentTag {
  id?: number
  name: string
  nameEn: string
  slug: string
  color?: string
  isActive?: boolean
}

// API Response interfaces
export interface ProfessionalInfoPageResponse {
  success: boolean
  data?: ProfessionalInfoPage
  error?: string
}

export interface ProfessionalInfoPagesResponse {
  success: boolean
  data?: ProfessionalInfoPage[]
  error?: string
}

export interface ContentSectionResponse {
  success: boolean
  data?: ContentSection
  error?: string
}

export interface ContentSectionsResponse {
  success: boolean
  data?: ContentSection[]
  error?: string
}
