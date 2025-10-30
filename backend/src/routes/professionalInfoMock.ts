import { Router, Request, Response } from 'express'

const router = Router()

// Mock data for testing
const mockPages = [
  {
    id: 1,
    slug: 'maintenance',
    title: 'תחזוקת בריכה',
    titleEn: 'Pool Maintenance',
    description: 'מדריכים מקצועיים לתחזוקת בריכה נכונה',
    descriptionEn: 'Professional guides for proper pool maintenance',
    content: [],
    isActive: true,
    sortOrder: 1
  },
  {
    id: 2,
    slug: 'safety',
    title: 'בטיחות בבריכה',
    titleEn: 'Pool Safety',
    description: 'כללי בטיחות חשובים לבריכות שחייה',
    descriptionEn: 'Important safety rules for swimming pools',
    content: [],
    isActive: true,
    sortOrder: 2
  }
]

// Get all professional info pages
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = {
      success: true,
      data: mockPages
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching professional info pages:', error)
    const response = {
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
    const page = mockPages.find(p => p.slug === slug)

    if (!page) {
      const response = {
        success: false,
        error: 'Page not found'
      }
      res.status(404).json(response)
      return
    }

    const response = {
      success: true,
      data: page
    }
    res.json(response)
  } catch (error) {
    console.error('Error fetching professional info page:', error)
    const response = {
      success: false,
      error: 'Failed to fetch professional info page'
    }
    res.status(500).json(response)
    return
  }
})

export default router
