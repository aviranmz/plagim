-- Migration: Create content management tables
-- Description: Creates tables for managing professional info pages and content sections

-- Professional Info Pages Content
CREATE TABLE IF NOT EXISTS professional_info_pages (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description TEXT,
  description_en TEXT,
  content JSONB NOT NULL DEFAULT '[]',
  meta_title TEXT,
  meta_title_en TEXT,
  meta_description TEXT,
  meta_description_en TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Content sections for each page
CREATE TABLE IF NOT EXISTS content_sections (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES professional_info_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  title TEXT,
  title_en TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media files for content
CREATE TABLE IF NOT EXISTS content_media (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES content_sections(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  alt_text_en TEXT,
  caption TEXT,
  caption_en TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories for organizing content
CREATE TABLE IF NOT EXISTS content_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  description_en TEXT,
  icon TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tags for content
CREATE TABLE IF NOT EXISTS content_tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Junction table for page-tag relationships
CREATE TABLE IF NOT EXISTS page_tags (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES professional_info_pages(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES content_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page_id, tag_id)
);

-- Junction table for page-category relationships
CREATE TABLE IF NOT EXISTS page_categories (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES professional_info_pages(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES content_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page_id, category_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_professional_info_pages_slug ON professional_info_pages(slug);
CREATE INDEX IF NOT EXISTS idx_professional_info_pages_active ON professional_info_pages(is_active);
CREATE INDEX IF NOT EXISTS idx_professional_info_pages_sort ON professional_info_pages(sort_order);

CREATE INDEX IF NOT EXISTS idx_content_sections_page_id ON content_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_content_sections_active ON content_sections(is_active);
CREATE INDEX IF NOT EXISTS idx_content_sections_sort ON content_sections(sort_order);

CREATE INDEX IF NOT EXISTS idx_content_media_section_id ON content_media(section_id);
CREATE INDEX IF NOT EXISTS idx_content_media_type ON content_media(media_type);

CREATE INDEX IF NOT EXISTS idx_content_categories_slug ON content_categories(slug);
CREATE INDEX IF NOT EXISTS idx_content_categories_active ON content_categories(is_active);

CREATE INDEX IF NOT EXISTS idx_content_tags_slug ON content_tags(slug);
CREATE INDEX IF NOT EXISTS idx_content_tags_active ON content_tags(is_active);

-- Insert default professional info pages
INSERT INTO professional_info_pages (slug, title, title_en, description, description_en, content, is_active, sort_order) VALUES
('maintenance', 'תחזוקת בריכה', 'Pool Maintenance', 'מדריכים מקצועיים לתחזוקת בריכה נכונה', 'Professional guides for proper pool maintenance', '[]', TRUE, 1),
('safety', 'בטיחות בבריכה', 'Pool Safety', 'כללי בטיחות חשובים לבריכות שחייה', 'Important safety rules for swimming pools', '[]', TRUE, 2),
('design', 'עיצוב בריכות', 'Pool Design', 'טיפים לעיצוב בריכה מושלמת', 'Tips for designing the perfect pool', '[]', TRUE, 3),
('technical_info', 'מידע טכני', 'Technical Information', 'מידע טכני מפורט על מערכות בריכה', 'Detailed technical information about pool systems', '[]', TRUE, 4),
('videos', 'סרטונים מקצועיים', 'Professional Videos', 'סרטונים הדרכה מקצועיים', 'Professional instructional videos', '[]', TRUE, 5),
('articles', 'מאמרים מקצועיים', 'Professional Articles', 'מאמרים מקצועיים מבית פלגים', 'Professional articles from Plagim', '[]', TRUE, 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert default content categories
INSERT INTO content_categories (name, name_en, slug, description, description_en, icon, color, is_active, sort_order) VALUES
('תחזוקה', 'Maintenance', 'maintenance', 'מדריכי תחזוקה', 'Maintenance guides', '🔧', '#3B82F6', TRUE, 1),
('בטיחות', 'Safety', 'safety', 'כללי בטיחות', 'Safety rules', '🛡️', '#EF4444', TRUE, 2),
('עיצוב', 'Design', 'design', 'טיפי עיצוב', 'Design tips', '🎨', '#8B5CF6', TRUE, 3),
('טכנולוגיה', 'Technology', 'technology', 'מידע טכני', 'Technical information', '⚙️', '#10B981', TRUE, 4),
('וידאו', 'Video', 'video', 'סרטוני הדרכה', 'Instructional videos', '🎥', '#F59E0B', TRUE, 5),
('מאמרים', 'Articles', 'articles', 'מאמרים מקצועיים', 'Professional articles', '📝', '#6B7280', TRUE, 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert default content tags
INSERT INTO content_tags (name, name_en, slug, color, is_active) VALUES
('בריכות ביתיות', 'Home Pools', 'home-pools', '#3B82F6', TRUE),
('בריכות מסחריות', 'Commercial Pools', 'commercial-pools', '#8B5CF6', TRUE),
('מערכות סינון', 'Filtration Systems', 'filtration', '#10B981', TRUE),
('חימום מים', 'Water Heating', 'heating', '#F59E0B', TRUE),
('כימיקלים', 'Chemicals', 'chemicals', '#EF4444', TRUE),
('ציוד בטיחות', 'Safety Equipment', 'safety-equipment', '#6B7280', TRUE),
('עיצוב נוף', 'Landscape Design', 'landscape', '#059669', TRUE),
('תחזוקה שוטפת', 'Regular Maintenance', 'regular-maintenance', '#0D9488', TRUE)
ON CONFLICT (slug) DO NOTHING;
