import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the raw data
const rawData = await fs.readFile(path.join(__dirname, 'data/deep-analysis/latest.json'), 'utf8');
const results = JSON.parse(rawData);

console.log('Checking data:');
for (const [id, comp] of Object.entries(results)) {
  if (comp.metrics?.blogs?.totalPosts > 0) {
    console.log(`${comp.name}: ${comp.metrics.blogs.totalPosts} blog posts`);
  }
}

// Check what the API would return
const matrix = {
  timestamp: new Date().toISOString(),
  competitors: {}
};

for (const [id, data] of Object.entries(results)) {
  if (data.metrics) {
    const blogPosts = data.metrics.blogs?.totalPosts;
    console.log(`\nProcessing ${data.name}:`);
    console.log(`  Raw totalPosts: ${blogPosts}`);
    console.log(`  Type: ${typeof blogPosts}`);
    console.log(`  After || 0: ${blogPosts || 0}`);
    
    matrix.competitors[id] = {
      name: data.name,
      blogPosts: data.metrics.blogs?.totalPosts || 0,
      actualBlogPosts: data.metrics.blogs?.totalPosts
    };
  }
}

console.log('\nFinal matrix blog counts:');
for (const [id, comp] of Object.entries(matrix.competitors)) {
  console.log(`${comp.name}: blogPosts=${comp.blogPosts}, actual=${comp.actualBlogPosts}`);
}