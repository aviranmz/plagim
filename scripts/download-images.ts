#!/usr/bin/env node

/**
 * Image Download Script for Plagim Website
 * Downloads images from the existing Plagim website (https://www.plagim.co.il/)
 * and organizes them for use in the new system
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { URL } from 'url'

// Configuration
const BASE_URL = 'https://www.plagim.co.il'
const DOWNLOAD_DIR = './downloaded-images'
const CATEGORIES = {
  'home-pools': 'בריכות שחיה ביתיות',
  'infinity-pools': 'בריכות גלישה',
  'commercial-pools': 'מסחריים',
  'fiberglass-pools': 'בריכות פיברגלס',
  'concrete-pools': 'בריכות בטון',
  'pool-covers': 'כיסויים לבריכות שחיה',
  'swimming-systems': 'מערכות שחייה נגד הזרם',
  'company': 'חברה',
  'projects': 'פרויקטים'
}

// Image URLs found on the existing website (these would need to be updated with actual URLs)
const IMAGE_URLS = {
  'home-pools': [
    '/images/pools/home-pool-1.jpg',
    '/images/pools/home-pool-2.jpg',
    '/images/pools/home-pool-3.jpg'
  ],
  'infinity-pools': [
    '/images/pools/infinity-pool-1.jpg',
    '/images/pools/infinity-pool-2.jpg'
  ],
  'commercial-pools': [
    '/images/pools/commercial-pool-1.jpg'
  ],
  'fiberglass-pools': [
    '/images/pools/fiberglass-pool-1.jpg',
    '/images/pools/fiberglass-pool-2.jpg'
  ],
  'concrete-pools': [
    '/images/pools/concrete-pool-1.jpg',
    '/images/pools/concrete-pool-2.jpg'
  ],
  'pool-covers': [
    '/images/covers/pool-cover-1.jpg',
    '/images/covers/pool-cover-2.jpg'
  ],
  'swimming-systems': [
    '/images/systems/swimming-system-1.jpg'
  ],
  'company': [
    '/images/company/logo.png',
    '/images/company/office.jpg',
    '/images/company/team.jpg'
  ],
  'projects': [
    '/images/projects/project-1.jpg',
    '/images/projects/project-2.jpg',
    '/images/projects/project-3.jpg'
  ]
}

// Utility function to download a file
function downloadFile(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`✅ Downloaded: ${path.basename(filePath)}`)
          resolve()
        })
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          downloadFile(redirectUrl, filePath).then(resolve).catch(reject)
        } else {
          reject(new Error(`Redirect without location header: ${response.statusCode}`))
        }
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`))
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}) // Delete the file on error
      reject(err)
    })
  })
}

// Create directory structure
function createDirectories() {
  console.log('📁 Creating directory structure...')
  
  // Create main download directory
  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })
  }
  
  // Create category directories
  Object.keys(CATEGORIES).forEach(category => {
    const categoryDir = path.join(DOWNLOAD_DIR, category)
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }
  })
  
  console.log('✅ Directory structure created')
}

// Download images for a specific category
async function downloadCategoryImages(category: string, urls: string[]) {
  console.log(`\n📸 Downloading ${CATEGORIES[category]} images...`)
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
    const fileName = path.basename(url) || `image-${i + 1}.jpg`
    const filePath = path.join(DOWNLOAD_DIR, category, fileName)
    
    try {
      await downloadFile(fullUrl, filePath)
    } catch (error) {
      console.error(`❌ Failed to download ${fullUrl}:`, error.message)
    }
  }
}

// Generate image metadata file
function generateMetadata() {
  console.log('\n📋 Generating image metadata...')
  
  const metadata = {
    downloadedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    categories: CATEGORIES,
    images: {}
  }
  
  // Scan downloaded images and create metadata
  Object.keys(CATEGORIES).forEach(category => {
    const categoryDir = path.join(DOWNLOAD_DIR, category)
    if (fs.existsSync(categoryDir)) {
      const files = fs.readdirSync(categoryDir)
      metadata.images[category] = files.map(file => ({
        fileName: file,
        path: `./downloaded-images/${category}/${file}`,
        category: category,
        categoryName: CATEGORIES[category]
      }))
    }
  })
  
  const metadataPath = path.join(DOWNLOAD_DIR, 'metadata.json')
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
  
  console.log('✅ Metadata generated:', metadataPath)
}

// Main execution
async function main() {
  console.log('🚀 Starting Plagim image download process...')
  console.log(`📡 Source: ${BASE_URL}`)
  console.log(`📁 Destination: ${DOWNLOAD_DIR}`)
  
  try {
    // Create directory structure
    createDirectories()
    
    // Download images for each category
    for (const [category, urls] of Object.entries(IMAGE_URLS)) {
      await downloadCategoryImages(category, urls)
    }
    
    // Generate metadata
    generateMetadata()
    
    console.log('\n🎉 Image download process completed!')
    console.log(`📁 Images saved to: ${path.resolve(DOWNLOAD_DIR)}`)
    console.log('📋 Check metadata.json for image information')
    
  } catch (error) {
    console.error('❌ Error during download process:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}

export { downloadFile, createDirectories, downloadCategoryImages, generateMetadata }
