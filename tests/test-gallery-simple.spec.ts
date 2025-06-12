import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'http://localhost:3000'
});

test('Test Gallery - Basic functionality check', async ({ page }) => {
  // Navigate to the test gallery
  await page.goto('/gallery/test');
  await page.waitForLoadState('networkidle');
  
  // Take initial screenshot
  await page.screenshot({ 
    path: 'test-results/test-gallery-initial.png',
    fullPage: true 
  });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Check if we have the title
  const title = await page.textContent('h1');
  console.log('Page title:', title);
  
  // Look for any images
  const images = page.locator('img');
  const imageCount = await images.count();
  console.log('Found images:', imageCount);
  
  // Take another screenshot
  await page.screenshot({ 
    path: 'test-results/test-gallery-loaded-check.png',
    fullPage: true 
  });
});