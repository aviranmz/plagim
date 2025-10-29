import express from 'express'
import { eq, desc, and, like, or } from 'drizzle-orm'
import { db } from '../database'
import { contacts, users } from '../database/schema'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Submit contact form (public)
router.post('/', async (req, res): Promise<void> => {
  try {
    const { name, email, phone, poolType, message } = req.body

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' })
      return
    }

    const newContact = await db.insert(contacts).values({
      name,
      email,
      phone,
      poolType,
      message
    }).returning()

    const contact = newContact[0]
    if (!contact) {
      res.status(500).json({ error: 'Failed to create contact' })
      return
    }
    
    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: contact.id
    })
  } catch (error) {
    console.error('Submit contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all contacts (admin only)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const offset = (Number(page) - 1) * Number(limit)

    let whereConditions = []
    
    if (status) {
      whereConditions.push(eq(contacts.status, status as string))
    }
    
    if (search) {
      whereConditions.push(
        or(
          like(contacts.name, `%${search}%`),
          like(contacts.email, `%${search}%`),
          like(contacts.message, `%${search}%`)
        )
      )
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined

    const allContacts = await db.select({
      id: contacts.id,
      name: contacts.name,
      email: contacts.email,
      phone: contacts.phone,
      poolType: contacts.poolType,
      message: contacts.message,
      status: contacts.status,
      notes: contacts.notes,
      createdAt: contacts.createdAt,
      updatedAt: contacts.updatedAt,
      assignedUser: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(contacts)
    .leftJoin(users, eq(contacts.assignedTo, users.id))
    .where(whereClause)
    .orderBy(desc(contacts.createdAt))
    .limit(Number(limit))
    .offset(offset)

    // Get total count
    const totalCount = await db.select({ count: contacts.id })
      .from(contacts)
      .where(whereClause)

    res.json({
      contacts: allContacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount.length,
        pages: Math.ceil(totalCount.length / Number(limit))
      }
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single contact
router.get('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const contactId = parseInt(req.params.id)
    if (isNaN(contactId)) {
      res.status(400).json({ error: 'Invalid contact ID' })
      return
    }
    
    const contact = await db.select({
      id: contacts.id,
      name: contacts.name,
      email: contacts.email,
      phone: contacts.phone,
      poolType: contacts.poolType,
      message: contacts.message,
      status: contacts.status,
      notes: contacts.notes,
      createdAt: contacts.createdAt,
      updatedAt: contacts.updatedAt,
      assignedUser: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(contacts)
    .leftJoin(users, eq(contacts.assignedTo, users.id))
    .where(eq(contacts.id, contactId))
    .limit(1)

    if (contact.length === 0) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    const foundContact = contact[0]
    if (!foundContact) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    res.json(foundContact)
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update contact
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const contactId = parseInt(req.params.id)
    if (isNaN(contactId)) {
      res.status(400).json({ error: 'Invalid contact ID' })
      return
    }
    const updateData = req.body

    // Remove fields that shouldn't be updated directly
    delete updateData.id
    delete updateData.createdAt

    updateData.updatedAt = new Date()

    const updatedContact = await db.update(contacts)
      .set(updateData)
      .where(eq(contacts.id, contactId))
      .returning()

    if (updatedContact.length === 0) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    const foundContact = updatedContact[0]
    if (!foundContact) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    res.json(foundContact)
  } catch (error) {
    console.error('Update contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete contact
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const contactId = parseInt(req.params.id)
    if (isNaN(contactId)) {
      res.status(400).json({ error: 'Invalid contact ID' })
      return
    }

    const deletedContact = await db.delete(contacts)
      .where(eq(contacts.id, contactId))
      .returning()

    if (deletedContact.length === 0) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    res.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Assign contact to user
router.post('/:id/assign', authenticateToken, requireAdmin, async (req: AuthRequest, res): Promise<void> => {
  try {
    const contactId = parseInt(req.params.id)
    if (isNaN(contactId)) {
      res.status(400).json({ error: 'Invalid contact ID' })
      return
    }
    const { assignedTo } = req.body

    const updatedContact = await db.update(contacts)
      .set({ 
        assignedTo,
        updatedAt: new Date()
      })
      .where(eq(contacts.id, contactId))
      .returning()

    if (updatedContact.length === 0) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    const foundContact = updatedContact[0]
    if (!foundContact) {
      res.status(404).json({ error: 'Contact not found' })
      return
    }

    res.json(foundContact)
  } catch (error) {
    console.error('Assign contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
