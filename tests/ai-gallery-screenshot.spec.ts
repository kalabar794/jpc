import { test } from '@playwright/test';

test('AI gallery screenshot', async ({ page }) => {
  // Navigate to the AI gallery page
  await page.goto('/gallery/ai');
  
  // Wait for the gallery grid to load
  await page.waitForSelector('.grid', { timeout: 10000 });
  
  // Wait for images to load
  await page.waitForLoadState('networkidle');
  
  // Wait a bit more to ensure all animations are complete
  await page.waitForTimeout(2000);
  
  // Take a screenshot of the full page
  await page.screenshot({ 
    path: 'ai-gallery-screenshot.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved as ai-gallery-screenshot.png');
});