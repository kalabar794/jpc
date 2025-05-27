const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  console.log('Testing admin panel on Netlify...');
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/');
  
  // Wait for page to load
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: 'admin-netlify-test.png', fullPage: true });
  
  // Check for errors
  if (errors.length > 0) {
    console.log('\n❌ Console errors found:');
    errors.forEach(err => console.log('  -', err));
  } else {
    console.log('\n✅ No console errors');
  }
  
  // Check what's visible
  const hasLoginButton = await page.locator('button:has-text("Login")').isVisible().catch(() => false);
  const hasGitHubButton = await page.locator('button:has-text("Login with GitHub")').isVisible().catch(() => false);
  const hasErrorMessage = await page.locator('text=/Error|Failed/i').isVisible().catch(() => false);
  
  console.log('\nPage state:');
  console.log('- Login button visible:', hasLoginButton);
  console.log('- GitHub button visible:', hasGitHubButton);
  console.log('- Error message visible:', hasErrorMessage);
  
  // Get page content for debugging
  const bodyText = await page.locator('body').innerText().catch(() => '');
  if (bodyText.includes('Error') || bodyText.includes('Failed')) {
    console.log('\n❌ Error content found:');
    console.log(bodyText.substring(0, 500));
  }
  
  await browser.close();
  
  console.log('\nScreenshot saved as admin-netlify-test.png');
})();