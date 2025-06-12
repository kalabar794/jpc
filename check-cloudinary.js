const fs = require('fs');
const path = require('path');

console.log('=== Cloudinary Usage Check ===\n');

// Check all content files for image references
const contentDir = path.join(process.cwd(), 'content');

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      checkDirectory(filePath);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find all image references
      const imagePattern = /image:\s*["']?([^"'\n]+)["']?/g;
      const heroImagePattern = /heroImage:\s*["']?([^"'\n]+)["']?/g;
      
      const images = [];
      let match;
      
      while ((match = imagePattern.exec(content)) !== null) {
        images.push(match[1]);
      }
      
      while ((match = heroImagePattern.exec(content)) !== null) {
        images.push(match[1]);
      }
      
      if (images.length > 0) {
        console.log(`\n${filePath.replace(process.cwd(), '.')}:`);
        images.forEach(img => {
          const isCloudinary = img.includes('cloudinary.com');
          const isLocal = img.startsWith('/uploads');
          console.log(`  ${isCloudinary ? '✓ Cloudinary' : isLocal ? '✗ Local' : '? Unknown'}: ${img}`);
        });
      }
    }
  });
}

checkDirectory(contentDir);

// Check local uploads directory size
const uploadsDir = path.join(process.cwd(), 'public/uploads');
if (fs.existsSync(uploadsDir)) {
  console.log('\n\n=== Local Uploads Directory ===');
  
  function getDirectorySize(dir) {
    let size = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stat.size;
      }
    });
    
    return size;
  }
  
  const totalSize = getDirectorySize(uploadsDir);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
  // List large files
  console.log('\nLarge files (> 1MB):');
  
  function findLargeFiles(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findLargeFiles(filePath, path.join(basePath, file));
      } else if (stat.size > 1024 * 1024) {
        console.log(`  ${path.join(basePath, file)}: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
      }
    });
  }
  
  findLargeFiles(uploadsDir);
}

console.log('\n\nRecommendation: Upload new images through the CMS admin panel with Cloudinary enabled.');
console.log('This will automatically optimize images and serve them from a CDN.');