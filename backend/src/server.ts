import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

// Debug route to check if images directory exists
app.get('/api/debug/static-files', (req, res) => {
  const possibleFrontendPaths = [
    path.join(__dirname, '../../frontend/dist'),
    path.join(process.cwd(), 'frontend/dist'),
    path.join(process.cwd(), '../frontend/dist'),
    path.resolve(__dirname, '../../../frontend/dist'),
  ]
  
  const possiblePublicPaths = [
    path.join(__dirname, '../public'),
    path.join(process.cwd(), 'backend/public'),
    path.join(process.cwd(), 'public'),
  ]
  
  let foundFrontendPath = null
  let foundPublicPath = null
  
  for (const testPath of possibleFrontendPaths) {
    if (fs.existsSync(testPath)) {
      foundFrontendPath = testPath
      break
    }
  }
  
  for (const testPath of possiblePublicPaths) {
    if (fs.existsSync(testPath)) {
      foundPublicPath = testPath
      break
    }
  }
  
  const debugInfo: any = {
    frontendDistPath: foundFrontendPath,
    publicPath: foundPublicPath,
    cwd: process.cwd(),
    __dirname,
    frontendExists: foundFrontendPath ? fs.existsSync(foundFrontendPath) : false,
    publicExists: foundPublicPath ? fs.existsSync(foundPublicPath) : false,
  }
  
  if (foundFrontendPath && fs.existsSync(foundFrontendPath)) {
    const imagesPath = path.join(foundFrontendPath, 'images')
    debugInfo.imagesPath = imagesPath
    debugInfo.imagesExists = fs.existsSync(imagesPath)
    if (fs.existsSync(imagesPath)) {
      debugInfo.imageFiles = fs.readdirSync(imagesPath).slice(0, 10)
    }
    debugInfo.allFiles = fs.readdirSync(foundFrontendPath)
  }
  
  res.json(debugInfo)
})

// API routes
app.use('/api/professional-info', professionalInfoRoutes)

// Database-dependent routes (only load if database is available)
if (process.env.DATABASE_URL) {
  // Use dynamic imports for routes that depend on database
  Promise.all([
    import('./routes/auth'),
    import('./routes/projects'),
    import('./routes/projectJsonb'),
    import('./routes/contacts'),
    import('./routes/admin')
  ])
    .then(([authModule, projectsModule, projectJsonbModule, contactsModule, adminModule]) => {
      app.use('/api/auth', authModule.default)
      app.use('/api/projects', projectsModule.default)
      app.use('/api/projects', projectJsonbModule.default)
      app.use('/api/contacts', contactsModule.default)
      app.use('/api/admin', adminModule.default)
      app.use('/api/public/projects', projectsModule.default)
    })
    .catch((error) => {
      console.log('Database routes not available:', error.message)
    })
}

// Serve static files - try frontend build first, then fallback to public

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
  
  // Check if images folder exists, if not, try to serve from source
  const imagesDistPath = path.join(frontendDistPath, 'images')
  const possibleImagePaths = [
    imagesDistPath,
    path.join(process.cwd(), 'frontend/public/images'),
    path.join(__dirname, '../../frontend/public/images'),
    path.join(process.cwd(), 'public/images'),
  ]
  
  let imagesPath = null
  for (const testPath of possibleImagePaths) {
    if (fs.existsSync(testPath) && fs.readdirSync(testPath).length > 0) {
      imagesPath = testPath
      console.log('✅ Found images at:', imagesPath)
      break
    }
  }
  
  // Serve static files with proper configuration
  app.use(express.static(frontendDistPath, {
    maxAge: '1y', // Cache static assets for 1 year
    etag: true,
    lastModified: true,
    index: false, // Don't serve index.html for directories, only explicit requests
  }))
  
  // Serve images from wherever they're found
  if (imagesPath) {
    console.log('📸 Serving images from:', imagesPath)
    app.use('/images', express.static(imagesPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true,
    }))
  } else {
    console.log('⚠️  Images folder not found in any of these locations:', possibleImagePaths)
  }
  
  // Serve React app - catch-all handler for client-side routing
  // This should be last, AFTER static file serving
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next()
    }
    // Skip static asset requests (they should be handled by express.static above)
    // If they reach here, they don't exist - pass to 404 handler
    if (req.path.startsWith('/assets/') || 
        req.path.startsWith('/images/') || 
        req.path.startsWith('/vite.svg') ||
        req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return next() // This will trigger 404 from notFound middleware
    }
    // Serve index.html for all other routes (React Router)
    res.sendFile(path.join(frontendDistPath, 'index.html'))
  })
} else if (publicPath) {
  // Fallback to public directory
  console.log('📦 Serving static files from:', publicPath)
  app.use(express.static(publicPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
  }))
  
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next()
    }
    if (req.path.startsWith('/images/') || req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/)) {
      return next()
    }
    res.sendFile(path.join(publicPath, 'index.html'))
  })
} else {
  console.log('⚠️  No frontend build found, serving API only')
  console.log('Search paths checked:', possibleFrontendPaths)
  console.log('Current working directory:', process.cwd())
  console.log('__dirname:', __dirname)
  
  // Fallback: serve a simple message for root route
  app.get('/', (req, res) => {
    res.json({
      message: 'Plagim Backend API',
      status: 'running',
      frontend: 'Frontend build not found - check Railway build logs',
      api: {
        health: '/health',
        professionalInfo: '/api/professional-info'
      }
    })
  })
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
