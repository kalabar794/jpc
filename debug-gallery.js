const fs = require('fs');
const path = require('path');

console.log('=== GALLERY DEBUG ===\n');

// Check photography gallery file
const photoGalleryPath = path.join(process.cwd(), 'content/galleries/photography-gallery.md');
console.log('Photography Gallery Path:', photoGalleryPath);
console.log('File exists:', fs.existsSync(photoGalleryPath));

if (fs.existsSync(photoGalleryPath)) {
  const content = fs.readFileSync(photoGalleryPath, 'utf8');
  console.log('\nFile Content:');
  console.log(content);
  console.log('\n--- END OF FILE ---\n');
}

// Check uploads directory
const uploadsPath = path.join(process.cwd(), 'public/uploads/gallery/photography');
console.log('Uploads Directory:', uploadsPath);
console.log('Directory exists:', fs.existsSync(uploadsPath));

if (fs.existsSync(uploadsPath)) {
  const files = fs.readdirSync(uploadsPath);
  console.log('\nUploaded Images:');
  files.forEach(file => {
    console.log(`- ${file}`);
  });
}

// Check if there's a git conflict or multiple versions
const gitPath = path.join(process.cwd(), '.git');
if (fs.existsSync(gitPath)) {
  console.log('\n\nGit repository found.');
  
  // Check for any .orig files (merge conflicts)
  const walkDir = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        walkDir(filePath, fileList);
      } else if (file.endsWith('.orig') || file.endsWith('.md~')) {
        fileList.push(filePath);
      }
    });
    return fileList;
  };
  
  const conflictFiles = walkDir(process.cwd());
  if (conflictFiles.length > 0) {
    console.log('\nPotential conflict files found:');
    conflictFiles.forEach(file => console.log(`- ${file}`));
  }
}