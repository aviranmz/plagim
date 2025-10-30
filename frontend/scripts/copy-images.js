import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.join(__dirname, '../public/images')
const dest = path.join(__dirname, '../dist/images')
const backendDest = path.join(__dirname, '../../backend/public/images')

try {
  if (fs.existsSync(src)) {
    const files = fs.readdirSync(src)
    
    // Copy to frontend dist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    
    files.forEach(file => {
      const srcFile = path.join(src, file)
      const destFile = path.join(dest, file)
      fs.copyFileSync(srcFile, destFile)
    })
    
    console.log(`✅ Copied ${files.length} images to dist/images/`)
    
    // Also copy to backend public folder for Railway
    if (!fs.existsSync(backendDest)) {
      fs.mkdirSync(backendDest, { recursive: true })
    }
    
    files.forEach(file => {
      const srcFile = path.join(src, file)
      const backendDestFile = path.join(backendDest, file)
      fs.copyFileSync(srcFile, backendDestFile)
    })
    
    console.log(`✅ Copied ${files.length} images to backend/public/images/`)
  } else {
    console.log('⚠️  public/images folder not found')
  }
} catch (error) {
  console.error('❌ Error copying images:', error.message)
  process.exit(1)
}

