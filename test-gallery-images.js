const { getAllGalleryImages } = require('./src/lib/content');

console.log('Testing getAllGalleryImages...\n');

try {
  const allImages = getAllGalleryImages();
  console.log('Total images found:', allImages.length);
  console.log('\nImages by category:');
  
  const categories = {};
  allImages.forEach(img => {
    if (!categories[img.category]) {
      categories[img.category] = [];
    }
    categories[img.category].push(img);
  });
  
  Object.entries(categories).forEach(([category, images]) => {
    console.log(`\n${category}: ${images.length} images`);
    images.forEach(img => {
      console.log(`  - ${img.title} (${img.imageUrl})`);
    });
  });
  
  console.log('\nPhotography images (non-AI Art):');
  const photoImages = allImages.filter(img => img.category !== 'AI Art');
  console.log('Count:', photoImages.length);
  photoImages.forEach(img => {
    console.log(`  - ${img.title} (category: ${img.category}, url: ${img.imageUrl})`);
  });
  
} catch (error) {
  console.error('Error:', error);
}