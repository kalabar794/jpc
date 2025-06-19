import { test, expect } from '@playwright/test';

test.describe('Gallery Complete Features', () => {
  test('AI Gallery - all features working', async ({ page }) => {
    await page.goto('/gallery/ai');
    await page.waitForLoadState('networkidle');
    
    // Wait for gallery to fully load
    await page.waitForTimeout(2000);
    
    // Check page title
    await expect(page.locator('h1:has-text("AI Gallery")')).toBeVisible();
    
    // Check images are loaded
    const images = page.locator('img[alt]');
    await expect(images).toHaveCount(26);
    
    // Click first image to open modal
    await images.first().click({ force: true });
    
    // Check modal is visible
    const modal = page.locator('div.fixed.inset-0.z-50');
    await expect(modal).toBeVisible();
    
    // Check modal has image
    const modalImage = modal.locator('img');
    await expect(modalImage).toBeVisible();
    
    // Check navigation buttons
    await expect(modal.locator('button:has(svg)')).toHaveCount(3); // Left, Right, Close
    
    // Navigate to next image
    await modal.locator('button:has(svg)').nth(1).click(); // Right arrow
    await page.waitForTimeout(500);
    
    // Close modal
    await modal.locator('button:has(svg)').last().click(); // Close button
    await expect(modal).not.toBeVisible();
  });

  test('Photography Gallery - all features working', async ({ page }) => {
    await page.goto('/gallery/photography');
    await page.waitForLoadState('networkidle');
    
    // Wait for gallery to fully load
    await page.waitForTimeout(2000);
    
    // Check page title
    await expect(page.locator('h1:has-text("Photography")')).toBeVisible();
    
    // Check images are loaded
    const images = page.locator('img[alt]');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
    
    // Click to open modal
    await images.first().click({ force: true });
    
    // Verify modal
    const modal = page.locator('div.fixed.inset-0.z-50');
    await expect(modal).toBeVisible();
    
    // Check image info is displayed
    const imageTitle = modal.locator('h3');
    await expect(imageTitle).toBeVisible();
    
    // Close modal with close button
    await modal.locator('button:has(svg)').last().click();
    await expect(modal).not.toBeVisible();
  });
});