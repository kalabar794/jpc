import { test } from '@playwright/test';

test('Check galleries', async ({ page }) => {
  // Check AI Gallery
  await page.goto('/gallery/ai');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'test-results/ai-gallery-check.png', fullPage: true });
  
  // Check Photography Gallery
  await page.goto('/gallery/photography');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'test-results/photography-gallery-check.png', fullPage: true });
  
  // Keep browser open for inspection
  await page.waitForTimeout(30000);
});