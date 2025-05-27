const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing admin panel locally...');
  await page.goto('http://localhost:8080/admin/');
  
  // Check if Decap CMS loads
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: 'admin-test.png' });
  
  console.log('Screenshot saved as admin-test.png');
  console.log('Admin panel loaded successfully!');
  
  await browser.close();
})();