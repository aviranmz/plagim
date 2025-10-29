-- Migration: Add JSONB columns and indexes for flexible pool content
-- This migration ensures proper setup of JSONB columns with GIN indexes for performance

-- Add indexes for JSONB columns in projects table for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_specifications_gin ON projects USING GIN (specifications);
CREATE INDEX IF NOT EXISTS idx_projects_images_gin ON projects USING GIN (images);
CREATE INDEX IF NOT EXISTS idx_projects_documents_gin ON projects USING GIN (documents);
CREATE INDEX IF NOT EXISTS idx_projects_notes_gin ON projects USING GIN (notes);

-- Add indexes for JSONB columns in project_updates table
CREATE INDEX IF NOT EXISTS idx_project_updates_images_gin ON project_updates USING GIN (images);

-- Add indexes for JSONB columns in contacts table
CREATE INDEX IF NOT EXISTS idx_contacts_notes_gin ON contacts USING GIN (notes);

-- Add specific indexes for common JSONB queries
-- For searching within specifications
CREATE INDEX IF NOT EXISTS idx_projects_specifications_materials ON projects USING GIN ((specifications->'materials'));
CREATE INDEX IF NOT EXISTS idx_projects_specifications_equipment ON projects USING GIN ((specifications->'equipment'));

-- For searching within images
CREATE INDEX IF NOT EXISTS idx_projects_images_gallery ON projects USING GIN ((images->'gallery'));
CREATE INDEX IF NOT EXISTS idx_projects_images_progress ON projects USING GIN ((images->'progress'));

-- For searching within documents
CREATE INDEX IF NOT EXISTS idx_projects_documents_contracts ON projects USING GIN ((documents->'contracts'));
CREATE INDEX IF NOT EXISTS idx_projects_documents_permits ON projects USING GIN ((documents->'permits'));

-- For searching within notes
CREATE INDEX IF NOT EXISTS idx_projects_notes_internal ON projects USING GIN ((notes->'internal'));
CREATE INDEX IF NOT EXISTS idx_projects_notes_communication ON projects USING GIN ((notes->'communication'));
CREATE INDEX IF NOT EXISTS idx_projects_notes_milestones ON projects USING GIN ((notes->'milestones'));
CREATE INDEX IF NOT EXISTS idx_projects_notes_issues ON projects USING GIN ((notes->'issues'));

-- Add comments to document the JSONB structure
COMMENT ON COLUMN projects.specifications IS 'Pool specifications including dimensions, materials, equipment, water features, safety, and environmental features';
COMMENT ON COLUMN projects.images IS 'Project images including gallery, before/after, progress photos, and plans';
COMMENT ON COLUMN projects.documents IS 'Project documents including contracts, permits, technical docs, and financial records';
COMMENT ON COLUMN projects.notes IS 'Project notes including internal notes, communication log, milestones, and issues';

COMMENT ON COLUMN project_updates.images IS 'Update images with metadata';
COMMENT ON COLUMN contacts.notes IS 'Contact notes including qualification, communication history, and follow-ups';

-- Create a function to validate JSONB structure (optional)
CREATE OR REPLACE FUNCTION validate_pool_specifications(specs JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  -- Basic validation - can be extended
  IF specs IS NULL THEN
    RETURN TRUE; -- NULL is allowed
  END IF;
  
  -- Check if it's a valid JSON object
  IF jsonb_typeof(specs) != 'object' THEN
    RETURN FALSE;
  END IF;
  
  -- Add more specific validations as needed
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Add check constraints for JSONB validation (optional)
-- ALTER TABLE projects ADD CONSTRAINT check_specifications_valid 
--   CHECK (validate_pool_specifications(specifications));

-- Create a view for easier querying of project details
CREATE OR REPLACE VIEW project_details AS
SELECT 
  p.*,
  u.name as creator_name,
  u.email as creator_email,
  -- Extract common fields from JSONB for easier querying
  p.specifications->>'dimensions' as pool_dimensions,
  p.specifications->'materials'->>'poolShell' as pool_shell_material,
  p.specifications->'materials'->>'finish' as pool_finish,
  p.images->'gallery' as gallery_images,
  p.documents->'contracts' as contract_documents,
  p.notes->'milestones' as project_milestones
FROM projects p
LEFT JOIN users u ON p.created_by = u.id;

-- Grant permissions
GRANT SELECT ON project_details TO PUBLIC;
