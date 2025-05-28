const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Testing Admin Panel Config...');
  
  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  try {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/');
    await page.waitForTimeout(5000);
    
    // Check if config loaded
    const hasCollections = await page.locator('text=/Blog Posts|Projects|AI Gallery|Photography|About Page|Settings/').count();
    console.log(`Collections found: ${hasCollections}`);
    
    // List all visible collections
    const collections = await page.locator('[role="main"] a, [role="main"] button, .nc-entryListing-cardLink').allTextContents();
    console.log('Visible collections:', collections.filter(text => text.trim()));
    
    // Check for errors
    if (errors.length > 0) {
      console.log('\n❌ Console errors:');
      errors.forEach(err => console.log('  -', err));
    }
    
    // Take screenshot
    await page.screenshot({ path: 'admin-collections.png', fullPage: true });
    console.log('\nScreenshot saved as admin-collections.png');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
  
  await browser.close();
})();