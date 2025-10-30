import { pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

// Professional Info Pages Content
export const professionalInfoPages = pgTable('professional_info_pages', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(), // e.g., 'maintenance', 'safety', 'design'
  title: text('title').notNull(), // Hebrew title
  titleEn: text('title_en').notNull(), // English title
  description: text('description'), // Hebrew description
  descriptionEn: text('description_en'), // English description
  content: jsonb('content').notNull(), // Structured content with sections
  metaTitle: text('meta_title'), // SEO meta title
  metaTitleEn: text('meta_title_en'), // SEO meta title English
  metaDescription: text('meta_description'), // SEO meta description
  metaDescriptionEn: text('meta_description_en'), // SEO meta description English
  isActive: boolean('is_active').default(true),
  sortOrder: serial('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

// Content sections for each page
export const contentSections = pgTable('content_sections', {
  id: serial('id').primaryKey(),
  pageId: serial('page_id').references(() => professionalInfoPages.id),
  sectionType: text('section_type').notNull(), // 'hero', 'text', 'image', 'gallery', 'video', 'list', 'table'
  title: text('title'), // Hebrew title
  titleEn: text('title_en'), // English title
  content: jsonb('content').notNull(), // Flexible content structure
  sortOrder: serial('sort_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

// Media files for content
export const contentMedia = pgTable('content_media', {
  id: serial('id').primaryKey(),
  sectionId: serial('section_id').references(() => contentSections.id),
  mediaType: text('media_type').notNull(), // 'image', 'video', 'document'
  fileName: text('file_name').notNull(),
  originalName: text('original_name').notNull(),
  filePath: text('file_path').notNull(),
  fileSize: serial('file_size'),
  mimeType: text('mime_type').notNull(),
  altText: text('alt_text'), // Hebrew alt text
  altTextEn: text('alt_text_en'), // English alt text
  caption: text('caption'), // Hebrew caption
  captionEn: text('caption_en'), // English caption
  createdAt: timestamp('created_at').defaultNow()
})

// Categories for organizing content
export const contentCategories = pgTable('content_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // Hebrew name
  nameEn: text('name_en').notNull(), // English name
  slug: text('slug').notNull().unique(),
  description: text('description'), // Hebrew description
  descriptionEn: text('description_en'), // English description
  icon: text('icon'), // Icon class or URL
  color: text('color'), // Hex color code
  isActive: boolean('is_active').default(true),
  sortOrder: serial('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

// Tags for content
export const contentTags = pgTable('content_tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // Hebrew name
  nameEn: text('name_en').notNull(), // English name
  slug: text('slug').notNull().unique(),
  color: text('color'), // Hex color code
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow()
})

// Junction table for page-tag relationships
export const pageTags = pgTable('page_tags', {
  id: serial('id').primaryKey(),
  pageId: serial('page_id').references(() => professionalInfoPages.id),
  tagId: serial('tag_id').references(() => contentTags.id),
  createdAt: timestamp('created_at').defaultNow()
})

// Junction table for page-category relationships
export const pageCategories = pgTable('page_categories', {
  id: serial('id').primaryKey(),
  pageId: serial('page_id').references(() => professionalInfoPages.id),
  categoryId: serial('category_id').references(() => contentCategories.id),
  createdAt: timestamp('created_at').defaultNow()
})
