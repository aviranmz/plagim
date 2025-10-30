import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.join(__dirname, '../public/images')
const dest = path.join(__dirname, '../dist/images')

try {
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    
    const files = fs.readdirSync(src)
    files.forEach(file => {
      const srcFile = path.join(src, file)
      const destFile = path.join(dest, file)
      fs.copyFileSync(srcFile, destFile)
    })
    
    console.log(`✅ Copied ${files.length} images to dist/images/`)
  } else {
    console.log('⚠️  public/images folder not found')
  }
} catch (error) {
  console.error('❌ Error copying images:', error.message)
  process.exit(1)
}

