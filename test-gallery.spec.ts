import { test, expect } from '@playwright/test';

test('test gallery page should load successfully', async ({ page }) => {
  // Navigate to the test gallery
  await page.goto('http://localhost:3000/gallery/test');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check that we're not on a 404 page
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check for 404 indicators
  const body = await page.locator('body').textContent();
  const has404 = body?.includes('404') || body?.includes('Page not found');
  
  // Assert the page loaded successfully
  expect(title).toContain('Test Gallery');
  expect(has404).toBe(false);
  
  // Check if the gallery components are present
  const galleryTitle = await page.locator('h1').textContent();
  expect(galleryTitle).toContain('AI Gallery Test');
  
  // Take a screenshot for verification
  await page.screenshot({ path: 'test-gallery-screenshot.png' });
});