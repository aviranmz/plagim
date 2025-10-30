import { Router, Request, Response } from 'express'
import { authenticateToken, requireAdmin } from '../middleware/auth'
import { db } from '../database/connection'
import { professionalInfoPages, contentSections } from '../database/contentSchema'
import { eq, and, asc } from 'drizzle-orm'
import type { ProfessionalInfoPage, ContentSection, ProfessionalInfoPageResponse, ProfessionalInfoPagesResponse } from '../types/content'

const router = Router()

// Get all professional info pages
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const pages = await db
      .select()
      .from(professionalInfoPages)
      .where(eq(professionalInfoPages.isActive, true))
      .orderBy(asc(professionalInfoPages.sortOrder))

    const response: ProfessionalInfoPagesResponse = {
      success: true,
      data: pages as ProfessionalInfoPage[]
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching professional info pages:', error)
    const response: ProfessionalInfoPagesResponse = {
      success: false,
      error: 'Failed to fetch professional info pages'
    }
    res.status(500).json(response)
    return
  }
})

// Get professional info page by slug
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params
    const slugParam = typeof slug === 'string' ? slug : ''

    const page = await db
      .select()
      .from(professionalInfoPages)
      .where(and(
        eq(professionalInfoPages.slug, slugParam),
        eq(professionalInfoPages.isActive, true)
      ))
      .limit(1)

    if (!page[0]) {
      const response: ProfessionalInfoPageResponse = {
        success: false,
        error: 'Page not found'
      }
      res.status(404).json(response)
      return
    }

    // Get content sections for this page
    const sections = await db
      .select()
      .from(contentSections)
      .where(and(
        eq(contentSections.pageId, page[0].id),
        eq(contentSections.isActive, true)
      ))
      .orderBy(asc(contentSections.sortOrder))

    const pageData: ProfessionalInfoPage = {
      ...page[0],
      content: sections as ContentSection[]
    }

    const response: ProfessionalInfoPageResponse = {
      success: true,
      data: pageData
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching professional info page:', error)
    const response: ProfessionalInfoPageResponse = {
      success: false,
      error: 'Failed to fetch professional info page'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Create professional info page
router.post('/', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, title, titleEn, description, descriptionEn, content, metaTitle, metaTitleEn, metaDescription, metaDescriptionEn } = req.body

    if (!slug || !title || !titleEn) {
      const response: ProfessionalInfoPageResponse = {
        success: false,
        error: 'Missing required fields: slug, title, titleEn'
      }
      res.status(400).json(response)
      return
    }

    const newPage = await db
      .insert(professionalInfoPages)
      .values({
        slug,
        title,
        titleEn,
        description,
        descriptionEn,
        content: content || [],
        metaTitle,
        metaTitleEn,
        metaDescription,
        metaDescriptionEn,
        isActive: true,
        sortOrder: 0
      })
      .returning()

    const response: ProfessionalInfoPageResponse = {
      success: true,
      data: newPage[0] as ProfessionalInfoPage
    }
    res.status(201).json(response)
  } catch (error) {
    console.error('Error creating professional info page:', error)
    const response: ProfessionalInfoPageResponse = {
      success: false,
      error: 'Failed to create professional info page'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Update professional info page
router.put('/:id', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { slug, title, titleEn, description, descriptionEn, content, metaTitle, metaTitleEn, metaDescription, metaDescriptionEn, isActive, sortOrder } = req.body

    const pageId = parseInt(id)
    if (isNaN(pageId)) {
      const response: ProfessionalInfoPageResponse = {
        success: false,
        error: 'Invalid page ID'
      }
      res.status(400).json(response)
      return
    }

    const updatedPage = await db
      .update(professionalInfoPages)
      .set({
        slug,
        title,
        titleEn,
        description,
        descriptionEn,
        content: content || [],
        metaTitle,
        metaTitleEn,
        metaDescription,
        metaDescriptionEn,
        isActive,
        sortOrder,
        updatedAt: new Date()
      })
      .where(eq(professionalInfoPages.id, pageId))
      .returning()

    if (!updatedPage[0]) {
      const response: ProfessionalInfoPageResponse = {
        success: false,
        error: 'Page not found'
      }
      res.status(404).json(response)
      return
    }

    const response: ProfessionalInfoPageResponse = {
      success: true,
      data: updatedPage[0] as ProfessionalInfoPage
    }
    res.json(response)
  } catch (error) {
    console.error('Error updating professional info page:', error)
    const response: ProfessionalInfoPageResponse = {
      success: false,
      error: 'Failed to update professional info page'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Delete professional info page
router.delete('/:id', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const pageId = parseInt(id)

    if (isNaN(pageId)) {
      const response: ProfessionalInfoPageResponse = {
        success: false,
        error: 'Invalid page ID'
      }
      res.status(400).json(response)
      return
    }

    // Soft delete - set isActive to false
    const deletedPage = await db
      .update(professionalInfoPages)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(professionalInfoPages.id, pageId))
      .returning()

    if (!deletedPage[0]) {
      const response: ProfessionalInfoPageResponse = {
        success: false,
        error: 'Page not found'
      }
      res.status(404).json(response)
      return
    }

    const response: ProfessionalInfoPageResponse = {
      success: true,
      data: deletedPage[0] as ProfessionalInfoPage
    }
    res.json(response)
  } catch (error) {
    console.error('Error deleting professional info page:', error)
    const response: ProfessionalInfoPageResponse = {
      success: false,
      error: 'Failed to delete professional info page'
    }
    res.status(500).json(response)
    return
  }
})

// Admin routes - Get all pages (including inactive)
router.get('/admin/all', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const pages = await db
      .select()
      .from(professionalInfoPages)
      .orderBy(asc(professionalInfoPages.sortOrder))

    const response: ProfessionalInfoPagesResponse = {
      success: true,
      data: pages as ProfessionalInfoPage[]
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching all professional info pages:', error)
    const response: ProfessionalInfoPagesResponse = {
      success: false,
      error: 'Failed to fetch professional info pages'
    }
    res.status(500).json(response)
    return
  }
})

export default router
