import { test, expect } from '@playwright/test';

test.describe('Gallery Features', () => {
  test('AI Gallery has all features working', async ({ page }) => {
    // Navigate to AI Gallery
    await page.goto('/gallery/ai');
    
    // Wait for gallery to load
    await page.waitForLoadState('networkidle');
    
    // Check gallery title
    await expect(page.locator('h1')).toContainText('AI Gallery');
    
    // Check that images are loaded in the grid
    const galleryGrid = page.locator('div').filter({ hasText: /^AI Gallery/ }).last().locator('img');
    await expect(galleryGrid.first()).toBeVisible();
    
    // Check slideshow button is visible
    const slideshowButton = page.locator('button').filter({ hasText: 'Start Slideshow' });
    await expect(slideshowButton).toBeVisible();
    
    // Click on first image to open modal
    await galleryGrid.first().click();
    
    // Check modal is open
    await expect(page.locator('div[class*="fixed inset-0"]')).toBeVisible();
    
    // Check navigation buttons
    await expect(page.locator('button[aria-label*="left"], button:has(svg[class*="ArrowLeft"])').first()).toBeVisible();
    await expect(page.locator('button[aria-label*="right"], button:has(svg[class*="ArrowRight"])').first()).toBeVisible();
    
    // Check close button
    await expect(page.locator('button:has(svg[class*="X"])').first()).toBeVisible();
    
    // Check image info is displayed
    await expect(page.locator('h3').last()).toBeVisible(); // Title in modal
    
    // Close modal
    await page.locator('button:has(svg[class*="X"])').first().click();
    
    // Check modal is closed
    await expect(page.locator('div[class*="fixed inset-0"]')).not.toBeVisible();
    
    // Test slideshow
    await slideshowButton.click();
    
    // Check modal opens automatically
    await expect(page.locator('div[class*="fixed inset-0"]')).toBeVisible();
    
    // Check pause button is visible (slideshow is playing)
    await expect(page.locator('button:has(svg[class*="Pause"])').first()).toBeVisible();
  });

  test('Photography Gallery has all features working', async ({ page }) => {
    // Navigate to Photography Gallery
    await page.goto('/gallery/photography');
    
    // Wait for gallery to load
    await page.waitForLoadState('networkidle');
    
    // Check gallery title
    await expect(page.locator('h1')).toContainText('Photography');
    
    // Check that images are loaded in the grid
    const galleryGrid = page.locator('div').filter({ hasText: /^Photography/ }).last().locator('img');
    await expect(galleryGrid.first()).toBeVisible();
    
    // Check slideshow button
    const slideshowButton = page.locator('button').filter({ hasText: 'Start Slideshow' });
    await expect(slideshowButton).toBeVisible();
    
    // Test hover effect on image
    await galleryGrid.first().hover();
    
    // Click to open modal
    await galleryGrid.first().click();
    
    // Verify modal features
    await expect(page.locator('div[class*="fixed inset-0"]')).toBeVisible();
    
    // Navigate to next image
    await page.locator('button:has(svg[class*="ArrowRight"])').first().click();
    await page.waitForTimeout(500); // Wait for animation
    
    // Close modal
    await page.keyboard.press('Escape');
    
    // Verify modal closed
    await expect(page.locator('div[class*="fixed inset-0"]')).not.toBeVisible();
  });
});