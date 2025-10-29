import express from 'express'
import { eq, sql } from 'drizzle-orm'
import { db } from '../database'
import { projects, projectUpdates } from '../database/schema'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth'
import { 
  ProjectDataManager, 
  ProjectQueryHelpers, 
  ProjectValidation 
} from '../utils/projectData'
import type { 
  PoolSpecifications, 
  ProjectImages, 
  ProjectDocuments, 
  ProjectNotes 
} from '../types/project'

const router = express.Router()

// Update project specifications
router.put('/:id/specifications', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const specifications = req.body

    if (!ProjectValidation.validateSpecifications(specifications)) {
      res.status(400).json({ error: 'Invalid specifications format' })
      return
    }

    const updatedProject = await db.update(projects)
      .set({ 
        specifications,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    if (updatedProject.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    res.json({ 
      success: true, 
      specifications: updatedProject[0].specifications 
    })
  } catch (error) {
    console.error('Update specifications error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add image to project gallery
router.post('/:id/images/gallery', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const { url, alt, caption, category } = req.body

    if (!url) {
      res.status(400).json({ error: 'Image URL is required' })
      return
    }

    const project = await db.select({ images: projects.images })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const newImage = {
      id: `img_${Date.now()}`,
      url,
      alt: alt || '',
      caption: caption || '',
      category: (category || 'gallery') as 'overview' | 'construction' | 'finished' | 'detail' | 'before' | 'after',
      order: 0,
      uploadedAt: new Date().toISOString(),
      uploadedBy: req.user!.id
    }

    const updatedImages = ProjectDataManager.addImageToGallery(project[0].images as ProjectImages | null, newImage)

    const updatedProject = await db.update(projects)
      .set({ 
        images: updatedImages,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    res.status(201).json({ 
      success: true, 
      image: newImage,
      images: updatedProject[0].images 
    })
  } catch (error) {
    console.error('Add image error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Remove image from project gallery
router.delete('/:id/images/gallery/:imageId', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const imageId = req.params.imageId

    const project = await db.select({ images: projects.images })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const updatedImages = ProjectDataManager.removeImageFromGallery(project[0].images as ProjectImages | null, imageId)

    const updatedProject = await db.update(projects)
      .set({ 
        images: updatedImages,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    res.json({ 
      success: true, 
      images: updatedProject[0].images 
    })
  } catch (error) {
    console.error('Remove image error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add project milestone
router.post('/:id/milestones', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const { title, description, plannedDate, priority } = req.body

    if (!title || !plannedDate) {
      res.status(400).json({ error: 'Title and planned date are required' })
      return
    }

    const project = await db.select({ notes: projects.notes })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const newMilestone = {
      id: `milestone_${Date.now()}`,
      title,
      description: description || '',
      plannedDate,
      priority: priority || 'medium',
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      createdBy: req.user!.id
    }

    const updatedNotes = ProjectDataManager.addMilestone(project[0].notes as ProjectNotes | null, newMilestone)

    const updatedProject = await db.update(projects)
      .set({ 
        notes: updatedNotes,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    res.status(201).json({ 
      success: true, 
      milestone: newMilestone,
      notes: updatedProject[0].notes 
    })
  } catch (error) {
    console.error('Add milestone error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update milestone status
router.put('/:id/milestones/:milestoneId', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const milestoneId = req.params.milestoneId
    const { status, actualDate } = req.body

    if (!status) {
      res.status(400).json({ error: 'Status is required' })
      return
    }

    const project = await db.select({ notes: projects.notes })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const updatedNotes = ProjectDataManager.updateMilestoneStatus(
      project[0].notes as ProjectNotes | null, 
      milestoneId, 
      status, 
      actualDate
    )

    if (!updatedNotes) {
      res.status(404).json({ error: 'Milestone not found' })
      return
    }

    const updatedProject = await db.update(projects)
      .set({ 
        notes: updatedNotes,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    res.json({ 
      success: true, 
      notes: updatedProject[0].notes 
    })
  } catch (error) {
    console.error('Update milestone error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add project issue
router.post('/:id/issues', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const { title, description, priority, category } = req.body

    if (!title) {
      res.status(400).json({ error: 'Title is required' })
      return
    }

    const project = await db.select({ notes: projects.notes })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const newIssue = {
      id: `issue_${Date.now()}`,
      title,
      description: description || '',
      severity: (priority || 'medium') as 'low' | 'medium' | 'high' | 'critical',
      status: 'open' as const,
      reportedAt: new Date().toISOString(),
      reportedBy: req.user!.id,
      category: category || 'general',
      tags: []
    }

    const updatedNotes = ProjectDataManager.addIssue(project[0].notes as ProjectNotes | null, newIssue)

    const updatedProject = await db.update(projects)
      .set({ 
        notes: updatedNotes,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    res.status(201).json({ 
      success: true, 
      issue: newIssue,
      notes: updatedProject[0].notes 
    })
  } catch (error) {
    console.error('Add issue error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Resolve project issue
router.put('/:id/issues/:issueId/resolve', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }
    
    const issueId = req.params.issueId
    const { resolution } = req.body

    if (!resolution) {
      res.status(400).json({ error: 'Resolution is required' })
      return
    }

    const project = await db.select({ notes: projects.notes })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const updatedNotes = ProjectDataManager.resolveIssue(
      project[0].notes as ProjectNotes | null, 
      issueId, 
      resolution, 
      req.user!.id
    )

    if (!updatedNotes) {
      res.status(404).json({ error: 'Issue not found' })
      return
    }

    const updatedProject = await db.update(projects)
      .set({ 
        notes: updatedNotes,
        updatedAt: new Date()
      })
      .where(eq(projects.id, projectId))
      .returning()

    res.json({ 
      success: true, 
      notes: updatedProject[0].notes 
    })
  } catch (error) {
    console.error('Resolve issue error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get project analytics
router.get('/:id/analytics', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    if (isNaN(projectId)) {
      res.status(400).json({ error: 'Invalid project ID' })
      return
    }

    const project = await db.select({ 
      notes: projects.notes,
      specifications: projects.specifications,
      images: projects.images
    })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1)

    if (project.length === 0) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    const projectData = project[0]
    if (!projectData) {
      res.status(404).json({ error: 'Project not found' })
      return
    }
    
    const analytics = {
      progressPercentage: ProjectQueryHelpers.getProgressPercentage(projectData.notes as ProjectNotes | null),
      activeIssuesCount: ProjectQueryHelpers.getActiveIssuesCount(projectData.notes as ProjectNotes | null),
      upcomingMilestones: ProjectQueryHelpers.getUpcomingMilestones(projectData.notes as ProjectNotes | null, 7),
      totalImages: (projectData.images as ProjectImages | null)?.gallery?.length || 0,
      hasWaterFeatures: ProjectQueryHelpers.hasWaterFeature(projectData.specifications as PoolSpecifications | null, 'waterfall') ||
                       ProjectQueryHelpers.hasWaterFeature(projectData.specifications as PoolSpecifications | null, 'fountain') ||
                       ProjectQueryHelpers.hasWaterFeature(projectData.specifications as PoolSpecifications | null, 'spa')
    }

    res.json(analytics)
  } catch (error) {
    console.error('Get analytics error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Search projects by JSONB criteria
router.post('/search', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const { poolType, equipment, waterFeatures, hasIssues, progressRange } = req.body

    let whereConditions = []

    // Search by pool type in specifications
    if (poolType) {
      whereConditions.push(
        sql`${projects.specifications}->>'materials'->>'poolShell' ILIKE ${`%${poolType}%`}`
      )
    }

    // Search by equipment in specifications
    if (equipment) {
      whereConditions.push(
        sql`${projects.specifications}->'equipment' ? ${equipment}`
      )
    }

    // Search by water features
    if (waterFeatures) {
      whereConditions.push(
        sql`${projects.specifications}->'waterFeatures' ? ${waterFeatures}`
      )
    }

    // Search projects with active issues
    if (hasIssues) {
      whereConditions.push(
        sql`${projects.notes}->'issues' @> '[{"status": "open"}]'::jsonb OR ${projects.notes}->'issues' @> '[{"status": "in_progress"}]'::jsonb`
      )
    }

    // Search by progress range
    if (progressRange?.min !== undefined && progressRange?.max !== undefined) {
      // This would require a more complex query using the view or custom function
      whereConditions.push(
        sql`EXISTS (
          SELECT 1 FROM (
            SELECT 
              CASE 
                WHEN ${projects.notes}->'milestones' IS NULL THEN 0
                ELSE (
                  SELECT COUNT(*) FILTER (WHERE value->>'status' = 'completed')
                  FROM jsonb_array_elements(${projects.notes}->'milestones')
                ) * 100.0 / NULLIF(
                  (SELECT COUNT(*) FROM jsonb_array_elements(${projects.notes}->'milestones')),
                  0
                )
              END as progress
          ) progress_calc
          WHERE progress_calc.progress BETWEEN ${progressRange.min} AND ${progressRange.max}
        )`
      )
    }

    const searchResults = await db.select({
      id: projects.id,
      title: projects.title,
      status: projects.status,
      poolType: projects.poolType,
      specifications: projects.specifications,
      notes: projects.notes,
      createdAt: projects.createdAt
    })
    .from(projects)
    .where(whereConditions.length > 0 ? sql`${sql.join(whereConditions, sql` AND `)}` : undefined)
    .limit(50)

    res.json(searchResults)
  } catch (error) {
    console.error('Search projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router