const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    console.log(`[${msg.type()}]`, msg.text());
  });
  
  console.log('Testing admin panel locally...');
  
  // Test local version
  await page.goto('http://localhost:8081/admin/');
  await page.waitForTimeout(3000);
  
  // Check if config.yml loads
  const configResponse = await page.evaluate(async () => {
    try {
      const response = await fetch('/admin/config.yml');
      return {
        status: response.status,
        ok: response.ok,
        text: await response.text()
      };
    } catch (e) {
      return { error: e.message };
    }
  });
  
  console.log('Config.yml response:', configResponse.status);
  
  await page.screenshot({ path: 'admin-local-test.png' });
  console.log('Screenshot saved as admin-local-test.png');
  
  // Keep browser open for manual inspection
  console.log('\nBrowser will stay open for 10 seconds...');
  await page.waitForTimeout(10000);
  
  await browser.close();
})();