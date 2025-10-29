import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err)

  // Default error
  let status = 500
  let message = 'Internal server error'

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = 400
    message = err.message
  } else if (err.name === 'UnauthorizedError') {
    status = 401
    message = 'Unauthorized'
  } else if (err.name === 'ForbiddenError') {
    status = 403
    message = 'Forbidden'
  } else if (err.name === 'NotFoundError') {
    status = 404
    message = 'Not found'
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found`
  })
}
