import express from 'express'
import { eq, count, sql } from 'drizzle-orm'
import { db } from '../database'
import { projects, contacts, users } from '../database/schema'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get dashboard statistics
router.get('/stats', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    // Get project statistics
    const projectStats = await db.select({
      total: count(projects.id),
      pending: sql<number>`count(case when ${projects.status} = 'pending' then 1 end)`,
      inProgress: sql<number>`count(case when ${projects.status} = 'in_progress' then 1 end)`,
      completed: sql<number>`count(case when ${projects.status} = 'completed' then 1 end)`,
      cancelled: sql<number>`count(case when ${projects.status} = 'cancelled' then 1 end)`,
      public: sql<number>`count(case when ${projects.isPublic} = true then 1 end)`,
      featured: sql<number>`count(case when ${projects.featured} = true then 1 end)`
    }).from(projects)

    // Get contact statistics
    const contactStats = await db.select({
      total: count(contacts.id),
      new: sql<number>`count(case when ${contacts.status} = 'new' then 1 end)`,
      contacted: sql<number>`count(case when ${contacts.status} = 'contacted' then 1 end)`,
      qualified: sql<number>`count(case when ${contacts.status} = 'qualified' then 1 end)`,
      converted: sql<number>`count(case when ${contacts.status} = 'converted' then 1 end)`
    }).from(contacts)

    // Get recent projects (last 5)
    const recentProjects = await db.select({
      id: projects.id,
      title: projects.title,
      clientName: projects.clientName,
      status: projects.status,
      createdAt: projects.createdAt
    })
    .from(projects)
    .orderBy(sql`${projects.createdAt} DESC`)
    .limit(5)

    // Get recent contacts (last 5)
    const recentContacts = await db.select({
      id: contacts.id,
      name: contacts.name,
      email: contacts.email,
      poolType: contacts.poolType,
      status: contacts.status,
      createdAt: contacts.createdAt
    })
    .from(contacts)
    .orderBy(sql`${contacts.createdAt} DESC`)
    .limit(5)

    // Get projects by type
    const projectsByType = await db.select({
      poolType: projects.poolType,
      count: count(projects.id)
    })
    .from(projects)
    .groupBy(projects.poolType)
    .orderBy(sql`count(${projects.id}) DESC`)

    // Get monthly project creation stats (last 12 months)
    const monthlyStats = await db.select({
      month: sql<string>`to_char(${projects.createdAt}, 'YYYY-MM')`,
      count: count(projects.id)
    })
    .from(projects)
    .where(sql`${projects.createdAt} >= NOW() - INTERVAL '12 months'`)
    .groupBy(sql`to_char(${projects.createdAt}, 'YYYY-MM')`)
    .orderBy(sql`to_char(${projects.createdAt}, 'YYYY-MM')`)

    res.json({
      projects: projectStats[0],
      contacts: contactStats[0],
      recentProjects,
      recentContacts,
      projectsByType,
      monthlyStats
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user management data
router.get('/users', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt
    })
    .from(users)
    .orderBy(users.createdAt)

    res.json(allUsers)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new admin user
router.post('/users', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const { email, password, name, role = 'admin' } = req.body

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, password, and name are required' })
      return
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters' })
      return
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (existingUser.length > 0) {
      res.status(400).json({ error: 'User with this email already exists' })
      return
    }

    // Hash password
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      role
    }).returning()

    // Remove password from response
    const newUserData = newUser[0]
    if (!newUserData) {
      res.status(500).json({ error: 'Failed to create user' })
      return
    }
    
    const { password: _, ...userResponse } = newUserData

    res.status(201).json(userResponse)
  } catch (error) {
    console.error('Create user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user
router.put('/users/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const userId = parseInt(req.params.id)
    const { email, name, role, isActive } = req.body

    const updateData: any = {
      updatedAt: new Date()
    }

    if (email) updateData.email = email
    if (name) updateData.name = name
    if (role) updateData.role = role
    if (typeof isActive === 'boolean') updateData.isActive = isActive

    const updatedUser = await db.update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning()

    if (updatedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Remove password from response
    const { password: _, ...userResponse } = updatedUser[0]

    res.json(userResponse)
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
