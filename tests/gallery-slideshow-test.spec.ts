import { test, expect } from '@playwright/test';

test.describe('Gallery Slideshow Implementation', () => {
  test('AI Gallery has working slideshow', async ({ page }) => {
    await page.goto('/gallery/ai');
    
    // Wait for gallery to load
    await page.waitForSelector('.grid');
    
    // Scroll down a bit to see the slideshow button
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(1000);
    
    // Check slideshow button exists - it contains both artwork count and "Start Slideshow" text
    const slideshowButton = page.locator('button:has-text("Start Slideshow")');
    await expect(slideshowButton).toBeVisible();
    
    // Click slideshow button
    await slideshowButton.click();
    
    // Verify button text changes
    await expect(slideshowButton).toContainText('Pause Slideshow');
    
    // Verify modal opens
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // Verify slideshow controls in modal
    const modalPlayButton = page.locator('.fixed.inset-0.z-50').getByRole('button').first();
    await expect(modalPlayButton).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/ai-gallery-slideshow.png', fullPage: true });
  });
  
  test('Photography Gallery has working slideshow', async ({ page }) => {
    await page.goto('/gallery/photography');
    
    // Wait for gallery to load
    await page.waitForSelector('.grid');
    
    // Scroll down a bit to see the slideshow button
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(1000);
    
    // Check slideshow button exists - it contains both artwork count and "Start Slideshow" text
    const slideshowButton = page.locator('button:has-text("Start Slideshow")');
    await expect(slideshowButton).toBeVisible();
    
    // Click slideshow button
    await slideshowButton.click();
    
    // Verify button text changes
    await expect(slideshowButton).toContainText('Pause Slideshow');
    
    // Verify modal opens
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/photography-gallery-slideshow.png', fullPage: true });
  });
});