import { Router, Request, Response } from 'express'
import { authenticateToken, requireAdmin } from '../middleware/auth'
import { db } from '../database/connection'
import { contentSections } from '../database/contentSchema'
import { eq, and, asc } from 'drizzle-orm'
import type { ContentSection, ContentSectionResponse, ContentSectionsResponse } from '../types/content'

const router = Router()

// Get content sections for a page
router.get('/page/:pageId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageId } = req.params
    const pageIdNum = parseInt(pageId)

    if (isNaN(pageIdNum)) {
      const response: ContentSectionsResponse = {
        success: false,
        error: 'Invalid page ID'
      }
      res.status(400).json(response)
      return
    }

    const sections = await db
      .select()
      .from(contentSections)
      .where(and(
        eq(contentSections.pageId, pageIdNum),
        eq(contentSections.isActive, true)
      ))
      .orderBy(asc(contentSections.sortOrder))

    const response: ContentSectionsResponse = {
      success: true,
      data: sections as ContentSection[]
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching content sections:', error)
    const response: ContentSectionsResponse = {
      success: false,
      error: 'Failed to fetch content sections'
    }
    res.status(500).json(response)
    return
  }
})

// Get single content section
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const sectionId = parseInt(id)

    if (isNaN(sectionId)) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Invalid section ID'
      }
      res.status(400).json(response)
      return
    }

    const section = await db
      .select()
      .from(contentSections)
      .where(eq(contentSections.id, sectionId))
      .limit(1)

    if (!section[0]) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Section not found'
      }
      res.status(404).json(response)
      return
    }

    const response: ContentSectionResponse = {
      success: true,
      data: section[0] as ContentSection
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching content section:', error)
    const response: ContentSectionResponse = {
      success: false,
      error: 'Failed to fetch content section'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Create content section
router.post('/', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageId, sectionType, title, titleEn, content, sortOrder } = req.body

    if (!pageId || !sectionType || !content) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Missing required fields: pageId, sectionType, content'
      }
      res.status(400).json(response)
      return
    }

    const newSection = await db
      .insert(contentSections)
      .values({
        pageId,
        sectionType,
        title,
        titleEn,
        content,
        sortOrder: sortOrder || 0,
        isActive: true
      })
      .returning()

    const response: ContentSectionResponse = {
      success: true,
      data: newSection[0] as ContentSection
    }
    res.status(201).json(response)
  } catch (error) {
    console.error('Error creating content section:', error)
    const response: ContentSectionResponse = {
      success: false,
      error: 'Failed to create content section'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Update content section
router.put('/:id', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { sectionType, title, titleEn, content, sortOrder, isActive } = req.body

    const sectionId = parseInt(id)
    if (isNaN(sectionId)) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Invalid section ID'
      }
      res.status(400).json(response)
      return
    }

    const updatedSection = await db
      .update(contentSections)
      .set({
        sectionType,
        title,
        titleEn,
        content,
        sortOrder,
        isActive,
        updatedAt: new Date()
      })
      .where(eq(contentSections.id, sectionId))
      .returning()

    if (!updatedSection[0]) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Section not found'
      }
      res.status(404).json(response)
      return
    }

    const response: ContentSectionResponse = {
      success: true,
      data: updatedSection[0] as ContentSection
    }
    res.json(response)
  } catch (error) {
    console.error('Error updating content section:', error)
    const response: ContentSectionResponse = {
      success: false,
      error: 'Failed to update content section'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Delete content section
router.delete('/:id', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const sectionId = parseInt(id)

    if (isNaN(sectionId)) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Invalid section ID'
      }
      res.status(400).json(response)
      return
    }

    // Soft delete - set isActive to false
    const deletedSection = await db
      .update(contentSections)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(contentSections.id, sectionId))
      .returning()

    if (!deletedSection[0]) {
      const response: ContentSectionResponse = {
        success: false,
        error: 'Section not found'
      }
      res.status(404).json(response)
      return
    }

    const response: ContentSectionResponse = {
      success: true,
      data: deletedSection[0] as ContentSection
    }
    res.json(response)
  } catch (error) {
    console.error('Error deleting content section:', error)
    const response: ContentSectionResponse = {
      success: false,
      error: 'Failed to delete content section'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Reorder content sections
router.put('/reorder/:pageId', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageId } = req.params
    const { sectionIds } = req.body // Array of section IDs in new order

    const pageIdNum = parseInt(pageId)
    if (isNaN(pageIdNum)) {
      const response: ContentSectionsResponse = {
        success: false,
        error: 'Invalid page ID'
      }
      res.status(400).json(response)
      return
    }

    if (!Array.isArray(sectionIds)) {
      const response: ContentSectionsResponse = {
        success: false,
        error: 'sectionIds must be an array'
      }
      res.status(400).json(response)
      return
    }

    // Update sort order for each section
    for (let i = 0; i < sectionIds.length; i++) {
      await db
        .update(contentSections)
        .set({
          sortOrder: i,
          updatedAt: new Date()
        })
        .where(and(
          eq(contentSections.id, sectionIds[i]),
          eq(contentSections.pageId, pageIdNum)
        ))
    }

    const response: ContentSectionsResponse = {
      success: true,
      data: []
    }
    res.json(response)
  } catch (error) {
    console.error('Error reordering content sections:', error)
    const response: ContentSectionsResponse = {
      success: false,
      error: 'Failed to reorder content sections'
    }
    res.status(500).json(response)
    return
  }
})

export default router
