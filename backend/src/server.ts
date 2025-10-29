import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'

// Import routes
import professionalInfoRoutes from './routes/professionalInfoMock'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 9045

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use(limiter)

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3045',
  credentials: true,
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Compression and logging
app.use(compression())
app.use(morgan('combined'))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Health check route (no database dependency)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/professional-info', professionalInfoRoutes)

// Database-dependent routes (only load if database is available)
if (process.env.DATABASE_URL) {
  try {
    const authRoutes = require('./routes/auth').default
    const projectRoutes = require('./routes/projects').default
    const projectJsonbRoutes = require('./routes/projectJsonb').default
    const contactRoutes = require('./routes/contacts').default
    const adminRoutes = require('./routes/admin').default
    
    app.use('/api/auth', authRoutes)
    app.use('/api/projects', projectRoutes)
    app.use('/api/projects', projectJsonbRoutes)
    app.use('/api/contacts', contactRoutes)
    app.use('/api/admin', adminRoutes)
    app.use('/api/public/projects', projectRoutes)
  } catch (error) {
    console.log('Database routes not available:', error.message)
  }
}

// Serve static files - try frontend build first, then fallback to public
const fs = require('fs')

// Try multiple possible paths for frontend build (works in different environments)
const possibleFrontendPaths = [
  path.join(__dirname, '../../frontend/dist'),           // Local dev: backend/dist/src -> frontend/dist
  path.join(process.cwd(), 'frontend/dist'),            // Railway root: /app/frontend/dist
  path.join(process.cwd(), '../frontend/dist'),         // Alternative Railway path
  path.resolve(__dirname, '../../../frontend/dist'),    // Deep nesting fallback
]

// Try multiple possible paths for public directory
const possiblePublicPaths = [
  path.join(__dirname, '../public'),
  path.join(process.cwd(), 'backend/public'),
  path.join(process.cwd(), 'public'),
]

let frontendDistPath = null
let publicPath = null

// Find frontend build
for (const testPath of possibleFrontendPaths) {
  const indexPath = path.join(testPath, 'index.html')
  if (fs.existsSync(testPath) && fs.existsSync(indexPath)) {
    frontendDistPath = testPath
    console.log('✅ Found frontend build at:', frontendDistPath)
    break
  }
}

// Find public directory
for (const testPath of possiblePublicPaths) {
  const indexPath = path.join(testPath, 'index.html')
  if (fs.existsSync(testPath) && fs.existsSync(indexPath)) {
    publicPath = testPath
    console.log('✅ Found public directory at:', publicPath)
    break
  }
}

// Serve frontend build if found
if (frontendDistPath) {
  console.log('📦 Serving frontend from:', frontendDistPath)
  app.use(express.static(frontendDistPath))
  
  // Serve React app - catch-all handler for client-side routing
  app.get('*', (req, res) => {
    // Don't serve HTML for API routes
    if (req.path.startsWith('/api/')) {
      return notFound(req, res)
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'))
  })
} else if (publicPath) {
  // Fallback to public directory
  console.log('📦 Serving static files from:', publicPath)
  app.use(express.static(publicPath))
  
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return notFound(req, res)
    }
    res.sendFile(path.join(publicPath, 'index.html'))
  })
} else {
  console.log('⚠️  No frontend build found, serving API only')
  console.log('Search paths checked:', possibleFrontendPaths)
  console.log('Current working directory:', process.cwd())
  console.log('__dirname:', __dirname)
}

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`)
})

export default app
