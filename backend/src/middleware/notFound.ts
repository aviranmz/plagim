import { Request, Response } from 'express'

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found`
  })
}
