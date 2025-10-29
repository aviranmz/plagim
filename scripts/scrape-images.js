#!/usr/bin/env node

/**
 * Plagim Website Image Scraper
 * Scrapes images from https://www.plagim.co.il/ and downloads them
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// Configuration
const BASE_URL = 'https://www.plagim.co.il'
const DOWNLOAD_DIR = './downloaded-images'

// Create directory if it doesn't exist
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })
}

// Function to download a file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filePath)
    
    protocol.get(url, (response) => {
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

// Function to scrape the website and find images
function scrapeWebsite() {
  return new Promise((resolve, reject) => {
    https.get(BASE_URL, (response) => {
      let data = ''
      
      response.on('data', (chunk) => {
        data += chunk
      })
      
      response.on('end', () => {
        // Extract image URLs from HTML
        const imageUrls = []
        
        // Look for img tags
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi
        let match
        
        while ((match = imgRegex.exec(data)) !== null) {
          let imageUrl = match[1]
          
          // Convert relative URLs to absolute
          if (imageUrl.startsWith('/')) {
            imageUrl = BASE_URL + imageUrl
          } else if (!imageUrl.startsWith('http')) {
            imageUrl = BASE_URL + '/' + imageUrl
          }
          
          // Filter out common non-content images
          if (!imageUrl.includes('logo') && 
              !imageUrl.includes('icon') && 
              !imageUrl.includes('sprite') &&
              !imageUrl.includes('placeholder') &&
              (imageUrl.includes('.jpg') || imageUrl.includes('.jpeg') || imageUrl.includes('.png') || imageUrl.includes('.webp'))) {
            imageUrls.push(imageUrl)
          }
        }
        
        // Remove duplicates
        const uniqueUrls = [...new Set(imageUrls)]
        console.log(`📸 Found ${uniqueUrls.length} images to download`)
        
        resolve(uniqueUrls)
      })
    }).on('error', reject)
  })
}

// Main function
async function main() {
  console.log('🚀 Starting Plagim image scraping...')
  console.log(`📡 Scraping: ${BASE_URL}`)
  console.log(`📁 Saving to: ${DOWNLOAD_DIR}`)
  
  try {
    // Scrape the website
    const imageUrls = await scrapeWebsite()
    
    // Download each image
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i]
      const fileName = path.basename(url) || `image-${i + 1}.jpg`
      const filePath = path.join(DOWNLOAD_DIR, fileName)
      
      try {
        await downloadFile(url, filePath)
      } catch (error) {
        console.error(`❌ Failed to download ${url}:`, error.message)
      }
    }
    
    console.log('\n🎉 Image scraping completed!')
    console.log(`📁 Images saved to: ${path.resolve(DOWNLOAD_DIR)}`)
    
  } catch (error) {
    console.error('❌ Error during scraping:', error)
  }
}

// Run the script
main()
