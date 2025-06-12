const fs = require('fs');
const path = require('path');

// Configure your Cloudinary images here
// You can get these URLs from your Cloudinary console
const newImages = [
  {
    title: "Image 1",
    url: "https://res.cloudinary.com/dqltlwqi2/image/upload/v1234567890/portfolio/your-image-1.jpg",
    category: "landscape"
  },
  {
    title: "Image 2", 
    url: "https://res.cloudinary.com/dqltlwqi2/image/upload/v1234567890/portfolio/your-image-2.jpg",
    category: "landscape"
  },
  {
    title: "Image 3",
    url: "https://res.cloudinary.com/dqltlwqi2/image/upload/v1234567890/portfolio/your-image-3.jpg",
    category: "nature"
  },
  // Add more images here...
];

// Read current gallery
const galleryPath = path.join(__dirname, 'content/galleries/photography-gallery.md');
const content = fs.readFileSync(galleryPath, 'utf8');

// Parse frontmatter
const lines = content.split('\n');
let inFrontmatter = false;
let frontmatterLines = [];
let bodyLines = [];

for (const line of lines) {
  if (line === '---') {
    if (!inFrontmatter) {
      inFrontmatter = true;
      frontmatterLines.push(line);
    } else {
      inFrontmatter = false;
      frontmatterLines.push(line);
    }
  } else if (inFrontmatter) {
    frontmatterLines.push(line);
  } else {
    bodyLines.push(line);
  }
}

// Find where images section ends
let imagesEndIndex = frontmatterLines.length - 1;
for (let i = frontmatterLines.length - 1; i >= 0; i--) {
  if (frontmatterLines[i].includes('---')) {
    imagesEndIndex = i;
    break;
  }
}

// Generate new image entries
const newImageEntries = newImages.map(img => {
  const date = new Date().toISOString();
  return `  - featured: false
    date: ${date}
    title: ${img.title}
    image: ${img.url}
    category: ${img.category}`;
}).join('\n');

// Insert new images before the closing ---
frontmatterLines.splice(imagesEndIndex, 0, newImageEntries);

// Write back
const newContent = [...frontmatterLines, ...bodyLines].join('\n');
fs.writeFileSync(galleryPath, newContent);

console.log(`✅ Added ${newImages.length} images to photography gallery!`);
console.log('\nNext steps:');
console.log('1. Update the newImages array with your actual Cloudinary URLs');
console.log('2. Run: node add-cloudinary-images.js');
console.log('3. Commit and push the changes');