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
import professionalInfoRoutes from './routes/professionalInfoMock.js'

// Import middleware
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'

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
  
  // Check backend public folder contents
  if (foundPublicPath && fs.existsSync(foundPublicPath)) {
    debugInfo.backendPublicFiles = fs.readdirSync(foundPublicPath)
    const backendImagesPath = path.join(foundPublicPath, 'images')
    if (fs.existsSync(backendImagesPath)) {
      debugInfo.backendImagesExists = true
      debugInfo.backendImageFiles = fs.readdirSync(backendImagesPath).slice(0, 10)
    } else {
      debugInfo.backendImagesExists = false
    }
  }
  
  res.json(debugInfo)
})

// API routes - register these BEFORE static file serving
app.use('/api/professional-info', professionalInfoRoutes)

// Test route to verify routing works
app.get('/test-images', (req, res) => {
  res.json({ message: 'Image route test', timestamp: new Date().toISOString() })
})

// Test route to verify image pattern matching
app.get('/test-image-pattern', (req, res) => {
  res.json({ message: 'Image pattern test', timestamp: new Date().toISOString() })
})

// Test route to serve an image directly
app.get('/test-image', (req, res) => {
  res.json({ message: 'Test image route working', timestamp: new Date().toISOString() })
})

// Direct image serving route (available regardless of frontend setup)
app.get('/images/*', (req, res, _next) => {
  console.log('🎯 Image route hit!', req.path)
  const imagePath = req.path.replace('/images/', '')
  const possiblePaths = [
    path.join(process.cwd(), 'public/images', imagePath), // Railway: /app/backend/public/images
    path.join(__dirname, '../public/images', imagePath),  // Railway: /app/backend/src/../public/images
    path.join(process.cwd(), 'backend/public/images', imagePath), // Fallback
    path.join(process.cwd(), 'frontend/public/images', imagePath),
    path.join(process.cwd(), 'frontend/dist/images', imagePath),
    path.join(__dirname, '../../frontend/public/images', imagePath),
    path.join(__dirname, '../../../frontend/public/images', imagePath),
  ]
  
  console.log(`🔍 Looking for image: ${imagePath}`)
  console.log(`🔍 Checking paths:`, possiblePaths)
  
  for (const fullPath of possiblePaths) {
    console.log(`🔍 Checking: ${fullPath} - exists: ${fs.existsSync(fullPath)}`)
    if (fs.existsSync(fullPath)) {
      console.log(`✅ Found image at: ${fullPath}`)
      return res.sendFile(fullPath)
    }
  }
  
  console.log(`❌ Image not found: ${imagePath}`)
  res.status(404).json({ error: `Image ${imagePath} not found`, checkedPaths: possiblePaths })
})

// Database-dependent routes (only load if database is available)
if (process.env.DATABASE_URL) {
  // Use dynamic imports for routes that depend on database
  Promise.all([
    import('./routes/auth.js'),
    import('./routes/projects.js'),
    import('./routes/projectJsonb.js'),
    import('./routes/contacts.js'),
    import('./routes/admin.js')
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
      const msg = error instanceof Error ? error.message : String(error)
      console.log('Database routes not available:', msg)
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
  
  // Check if images folder exists, if not, try to copy from source
  const frontendImagesDistPath = path.join(frontendDistPath, 'images')
  const imagesSourcePaths = [
    path.join(process.cwd(), 'frontend/public/images'),
    path.join(__dirname, '../../frontend/public/images'),
    path.join(process.cwd(), '../frontend/public/images'),
  ]
  
  // If images don't exist in dist, try to copy them from source
  if (!fs.existsSync(frontendImagesDistPath)) {
    console.log('⚠️  Images folder not found in dist, attempting to copy from source...')
    for (const sourcePath of imagesSourcePaths) {
      if (fs.existsSync(sourcePath) && fs.readdirSync(sourcePath).length > 0) {
        try {
          if (!fs.existsSync(frontendImagesDistPath)) {
            fs.mkdirSync(frontendImagesDistPath, { recursive: true })
          }
          const files = fs.readdirSync(sourcePath)
          files.forEach(file => {
            const srcFile = path.join(sourcePath, file)
            const destFile = path.join(frontendImagesDistPath, file)
            if (!fs.existsSync(destFile)) {
              fs.copyFileSync(srcFile, destFile)
            }
          })
          console.log(`✅ Copied ${files.length} images from ${sourcePath} to ${frontendImagesDistPath}`)
          break
        } catch (error) {
          console.log(`❌ Failed to copy images from ${sourcePath}:`, error.message)
        }
      }
    }
  }
  
  // Check multiple possible paths for serving images
  const possibleImagePaths = [
    path.join(process.cwd(), 'backend/public/images'), // Railway build copies images here
    path.join(process.cwd(), 'public/images'),
    frontendImagesDistPath,
    ...imagesSourcePaths,
  ]
  
  let imagesPath = null
  for (const testPath of possibleImagePaths) {
    if (fs.existsSync(testPath) && fs.readdirSync(testPath).length > 0) {
      imagesPath = testPath
      console.log('✅ Found images at:', imagesPath)
      break
    }
  }
  
  // Remove images from frontend dist so express.static doesn't serve them
  // We'll serve images from backend/public/images instead
  if (fs.existsSync(frontendImagesDistPath)) {
    console.log('🗑️  Removing images from frontend dist to prevent express.static conflicts')
    fs.rmSync(frontendImagesDistPath, { recursive: true, force: true })
  }
  
  // Serve images, preferring backend/public/images on Railway
  const imageRootCandidates = [
    path.join(process.cwd(), 'backend/public/images'), // Railway/Nixpacks: /app/backend/public/images
    path.join(process.cwd(), 'public/images'),         // Fallback
  ]
  // Mount all discovered image roots under /images (first-match wins)
  const imageRootsToMount = imageRootCandidates.filter((p) => fs.existsSync(p))
  if (imageRootsToMount.length > 0) {
    imageRootsToMount.forEach((root) => {
      console.log('📸 Mounting /images from:', root)
      app.use('/images', express.static(root, {
        maxAge: '1y',
        etag: true,
        lastModified: true,
        fallthrough: true,
      }))
    })
  } else {
    console.log('⚠️  No images directory found at any known location')
  }
  
  // Serve static files with proper configuration
  app.use(express.static(frontendDistPath, {
    maxAge: '1y', // Cache static assets for 1 year
    etag: true,
    lastModified: true,
    index: false, // Don't serve index.html for directories, only explicit requests
  }))

  // Note: Catch-all route moved to the end of the file
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

// Catch-all route for React app (must be last)
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next()
  }
  // Skip test routes
  if (req.path.startsWith('/test-')) {
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
  
  // Try to serve React app if frontend is available
  const possibleFrontendPaths = [
    path.join(__dirname, '../../frontend/dist'),
    path.join(process.cwd(), 'frontend/dist'),
    path.join(process.cwd(), '../frontend/dist'),
    path.resolve(__dirname, '../../../frontend/dist'),
  ]
  
  for (const testPath of possibleFrontendPaths) {
    const indexPath = path.join(testPath, 'index.html')
    if (fs.existsSync(testPath) && fs.existsSync(indexPath)) {
      return res.sendFile(indexPath)
    }
  }
  
  // If no frontend found, pass to 404 handler
  next()
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`)
  console.log(`🖼️  Images available at: http://localhost:${PORT}/images/`)
})

export default app
