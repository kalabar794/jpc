const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Testing actual admin functionality...');
  
  try {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/');
    await page.waitForTimeout(5000);
    
    // Check if login is visible
    const loginVisible = await page.locator('text=Login').isVisible().catch(() => false);
    const githubLoginVisible = await page.locator('text=Login with GitHub').isVisible().catch(() => false);
    
    console.log('Login options visible:', { loginVisible, githubLoginVisible });
    
    // Take screenshot
    await page.screenshot({ path: 'admin-real-test.png', fullPage: true });
    
    // Check for errors in page
    const errorText = await page.locator('text=/error|failed/i').count().catch(() => 0);
    console.log('Error messages found:', errorText);
    
    // Check page source for collections
    const content = await page.content();
    const hasCollections = {
      posts: content.includes('Blog Posts') || content.includes('posts'),
      projects: content.includes('Projects'),
      aiGallery: content.includes('AI Gallery'),
      photoGallery: content.includes('Photography'),
      settings: content.includes('Settings'),
      about: content.includes('About')
    };
    
    console.log('Collections in config:', hasCollections);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
  
  await browser.close();
  console.log('Screenshot saved as admin-real-test.png');
})();