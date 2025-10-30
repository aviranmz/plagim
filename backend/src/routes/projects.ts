import express from 'express'
import { eq, desc, and, like, or } from 'drizzle-orm'
import { db } from '../database'
import { projects, projectUpdates, users } from '../database/schema'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all projects (admin only)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const offset = (Number(page) - 1) * Number(limit)

    const whereConditions: any[] = []
    
    if (status) {
      whereConditions.push(eq(projects.status, status as string))
    }
    
    if (search) {
      whereConditions.push(
        or(
          like(projects.title, `%${search}%`),
          like(projects.clientName, `%${search}%`),
          like(projects.clientEmail, `%${search}%`)
        )
      )
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined

    const allProjects = await db.select({
      id: projects.id,
      title: projects.title,
      clientName: projects.clientName,
      clientEmail: projects.clientEmail,
      status: projects.status,
      poolType: projects.poolType,
      budget: projects.budget,
      location: projects.location,
      startDate: projects.startDate,
      completionDate: projects.completionDate,
      isPublic: projects.isPublic,
      featured: projects.featured,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      creator: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(projects)
    .leftJoin(users, eq(projects.createdBy, users.id))
    .where(whereClause)
    .orderBy(desc(projects.updatedAt))
    .limit(Number(limit))
    .offset(offset)

    // Get total count
    const totalCount = await db.select({ count: projects.id })
      .from(projects)
      .where(whereClause)

    res.json({
      projects: allProjects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount.length,
        pages: Math.ceil(totalCount.length / Number(limit))
      }
    })
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single project
router.get('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    
    const project = await db.select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      clientName: projects.clientName,
      clientEmail: projects.clientEmail,
      clientPhone: projects.clientPhone,
      status: projects.status,
      poolType: projects.poolType,
      poolSize: projects.poolSize,
      budget: projects.budget,
      location: projects.location,
      startDate: projects.startDate,
      completionDate: projects.completionDate,
      specifications: projects.specifications,
      images: projects.images,
      documents: projects.documents,
      notes: projects.notes,
      slug: projects.slug,
      isPublic: projects.isPublic,
      featured: projects.featured,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      creator: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(projects)
    .leftJoin(users, eq(projects.createdBy, users.id))
    .where(eq(projects.id, projectId))
    .limit(1)

    if (project.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Get project updates
    const updates = await db.select({
      id: projectUpdates.id,
      title: projectUpdates.title,
      description: projectUpdates.description,
      status: projectUpdates.status,
      images: projectUpdates.images,
      createdAt: projectUpdates.createdAt,
      creator: {
        id: users.id,
        name: users.name
      }
    })
    .from(projectUpdates)
    .leftJoin(users, eq(projectUpdates.createdBy, users.id))
    .where(eq(projectUpdates.projectId, projectId))
    .orderBy(desc(projectUpdates.createdAt))

    res.json({
      ...project[0],
      updates
    })
  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new project
router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const {
      title,
      description,
      clientName,
      clientEmail,
      clientPhone,
      poolType,
      poolSize,
      budget,
      location,
      specifications,
      images,
      documents,
      notes
    } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const newProject = await db.insert(projects).values({
      title,
      description,
      clientName,
      clientEmail,
      clientPhone,
      poolType,
      poolSize,
      budget,
      location,
      specifications,
      images,
      documents,
      notes,
      slug,
      createdBy: req.user!.id
    }).returning()

    res.status(201).json(newProject[0])
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update project
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    const updateData = req.body

    // Remove fields that shouldn't be updated directly
    delete updateData.id
    delete updateData.createdAt
    delete updateData.createdBy

    // Update slug if title changed
    if (updateData.title) {
      updateData.slug = updateData.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    updateData.updatedAt = new Date()

    const updatedProject = await db.update(projects)
      .set(updateData)
      .where(eq(projects.id, projectId))
      .returning()

    if (updatedProject.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(updatedProject[0])
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete project
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)

    // Delete project updates first
    await db.delete(projectUpdates).where(eq(projectUpdates.projectId, projectId))

    // Delete project
    const deletedProject = await db.delete(projects)
      .where(eq(projects.id, projectId))
      .returning()

    if (deletedProject.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add project update
router.post('/:id/updates', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const projectId = parseInt(req.params.id)
    const { title, description, status, images } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const newUpdate = await db.insert(projectUpdates).values({
      projectId,
      title,
      description,
      status,
      images,
      createdBy: req.user!.id
    }).returning()

    // Update project status if provided
    if (status) {
      await db.update(projects)
        .set({ 
          status,
          updatedAt: new Date()
        })
        .where(eq(projects.id, projectId))
    }

    res.status(201).json(newUpdate[0])
  } catch (error) {
    console.error('Add project update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get public projects (for frontend)
router.get('/public/list', async (req, res): Promise<void> => {
  try {
    const { limit = 6, featured } = req.query

    const whereConditions = [eq(projects.isPublic, true)]
    
    if (featured === 'true') {
      whereConditions.push(eq(projects.featured, true))
    }

    const publicProjects = await db.select({
      id: projects.id,
      title: projects.title,
      description: projects.description,
      poolType: projects.poolType,
      poolSize: projects.poolSize,
      location: projects.location,
      images: projects.images,
      slug: projects.slug,
      createdAt: projects.createdAt
    })
    .from(projects)
    .where(and(...whereConditions))
    .orderBy(desc(projects.featured), desc(projects.createdAt))
    .limit(Number(limit))

    res.json(publicProjects)
  } catch (error) {
    console.error('Get public projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
