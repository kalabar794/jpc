const fs = require('fs');
const path = require('path');
const https = require('https');

// QUICK SETUP - Just paste your Cloudinary folder URLs here
// You can get these from Cloudinary console - right click on images and "Copy URL"
const CLOUDINARY_URLS = [
  // Paste your URLs here, one per line
  // "https://res.cloudinary.com/dqltlwqi2/image/upload/v.../portfolio/image1.jpg",
  // "https://res.cloudinary.com/dqltlwqi2/image/upload/v.../portfolio/image2.jpg",
  // "https://res.cloudinary.com/dqltlwqi2/image/upload/v.../portfolio/image3.jpg",
];

// Or use the Cloudinary API to list all images (requires API secret)
async function fetchCloudinaryImages() {
  // If you want automatic fetching, you'll need:
  // 1. npm install cloudinary
  // 2. Set up API credentials
  // For now, just use the manual URL list above
  return CLOUDINARY_URLS;
}

async function syncGallery() {
  const galleryPath = path.join(__dirname, 'content/galleries/photography-gallery.md');
  
  // Read current gallery
  const currentContent = fs.readFileSync(galleryPath, 'utf8');
  const existingUrls = [...currentContent.matchAll(/image:\s*(.+)/g)].map(m => m[1].trim());
  
  console.log(`Found ${existingUrls.length} existing images`);
  
  // Get Cloudinary URLs
  const cloudinaryUrls = CLOUDINARY_URLS.length > 0 ? CLOUDINARY_URLS : await fetchCloudinaryImages();
  
  // Filter out already added images
  const newUrls = cloudinaryUrls.filter(url => !existingUrls.includes(url));
  
  if (newUrls.length === 0) {
    console.log('No new images to add');
    return;
  }
  
  console.log(`Adding ${newUrls.length} new images...`);
  
  // Generate YAML for new images
  const newImagesYaml = newUrls.map((url, index) => {
    // Extract filename for title
    const filename = url.split('/').pop().split('.')[0].replace(/-|_/g, ' ');
    const title = filename.charAt(0).toUpperCase() + filename.slice(1);
    
    return `  - featured: false
    date: ${new Date().toISOString()}
    title: "${title}"
    image: ${url}
    category: landscape`;
  }).join('\n');
  
  // Insert before the final ---
  const lines = currentContent.split('\n');
  const lastDashIndex = lines.lastIndexOf('---');
  lines.splice(lastDashIndex, 0, newImagesYaml);
  
  // Write back
  fs.writeFileSync(galleryPath, lines.join('\n'));
  
  console.log('✅ Gallery updated successfully!');
  console.log('\nNext: git add -A && git commit -m "Add Cloudinary images" && git push');
}

// Quick instructions
console.log(`
QUICK GALLERY SYNC
==================

Option 1: Manual URL List (Easiest)
1. Go to Cloudinary console
2. Select all images you want
3. Right-click → "Copy URL" 
4. Paste URLs in CLOUDINARY_URLS array above
5. Run: node sync-cloudinary-folder.js

Option 2: Batch Export from Cloudinary
1. In Cloudinary, select folder
2. Actions → Export → URL list
3. Paste URLs in the array

The script will:
- Add all new images at once
- Skip duplicates
- Auto-generate titles from filenames
- Set default category to landscape
`);

// Run if URLs are provided
if (CLOUDINARY_URLS.length > 0) {
  syncGallery().catch(console.error);
} else {
  console.log('⚠️  Add your Cloudinary URLs to CLOUDINARY_URLS array first!');
}