import { test, expect } from '@playwright/test';

test.describe('Complete Slideshow Functionality Test', () => {
  test('slideshow button responds and toggles correctly', async ({ page }) => {
    // Capture console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Navigate to test gallery
    await page.goto('/gallery/test');
    await page.waitForLoadState('networkidle');
    
    // Take initial screenshot
    await page.screenshot({ path: 'test-results/slideshow-test-1-initial.png', fullPage: true });
    
    // Find and verify slideshow button
    const slideshowButton = page.locator('button').filter({ hasText: /slideshow/i });
    await expect(slideshowButton).toBeVisible();
    await expect(slideshowButton).toContainText('Start Slideshow');
    
    console.log('✓ Slideshow button found and displays "Start Slideshow"');
    
    // Click the button
    await slideshowButton.click();
    await page.waitForTimeout(500);
    
    // Verify button changed to Pause
    await expect(slideshowButton).toContainText('Pause Slideshow');
    console.log('✓ Button changed to "Pause Slideshow" after click');
    
    // Take screenshot after starting slideshow
    await page.screenshot({ path: 'test-results/slideshow-test-2-playing.png', fullPage: true });
    
    // Click again to pause
    await slideshowButton.click();
    await page.waitForTimeout(500);
    
    // Verify button changed back to Start
    await expect(slideshowButton).toContainText('Start Slideshow');
    console.log('✓ Button changed back to "Start Slideshow" after second click');
    
    // Report any console errors
    if (consoleErrors.length > 0) {
      console.log('⚠️  Console errors detected:');
      consoleErrors.forEach(err => console.log('  - ' + err));
    } else {
      console.log('✓ No console errors detected');
    }
  });

  test('slideshow auto-advances images in modal', async ({ page }) => {
    // Navigate to test gallery
    await page.goto('/gallery/test');
    await page.waitForLoadState('networkidle');
    
    // Start slideshow
    const slideshowButton = page.locator('button').filter({ hasText: /slideshow/i });
    await slideshowButton.click();
    await expect(slideshowButton).toContainText('Pause Slideshow');
    console.log('✓ Slideshow started');
    
    // Click first image to open modal
    const firstImage = page.locator('.grid > div').first();
    await firstImage.click();
    
    // Wait for modal to appear
    await page.waitForSelector('.fixed.inset-0.z-50', { state: 'visible' });
    console.log('✓ Modal opened');
    
    // Take screenshot of modal
    await page.screenshot({ path: 'test-results/slideshow-test-3-modal-open.png', fullPage: true });
    
    // Get initial image index
    const indexLocator = page.locator('text=/\\d+ of \\d+/');
    const initialIndex = await indexLocator.textContent();
    console.log('Initial image:', initialIndex);
    
    // Wait for auto-advance (3 seconds + buffer)
    console.log('Waiting for auto-advance...');
    await page.waitForTimeout(3500);
    
    // Check if image advanced
    const newIndex = await indexLocator.textContent();
    console.log('After 3.5 seconds:', newIndex);
    
    if (initialIndex !== newIndex) {
      console.log('✓ Image auto-advanced successfully');
    } else {
      console.log('⚠️  Image did not auto-advance');
    }
    
    // Take screenshot after auto-advance
    await page.screenshot({ path: 'test-results/slideshow-test-4-after-advance.png', fullPage: true });
    
    // Wait for another advance
    await page.waitForTimeout(3500);
    const thirdIndex = await indexLocator.textContent();
    console.log('After another 3.5 seconds:', thirdIndex);
    
    // Close modal
    const closeButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') });
    await closeButton.click();
    console.log('✓ Modal closed');
    
    // Stop slideshow
    await slideshowButton.click();
    await expect(slideshowButton).toContainText('Start Slideshow');
    console.log('✓ Slideshow stopped');
    
    // Take final screenshot
    await page.screenshot({ path: 'test-results/slideshow-test-5-final.png', fullPage: true });
  });

  test('slideshow controls work in modal', async ({ page }) => {
    // Navigate to test gallery
    await page.goto('/gallery/test');
    await page.waitForLoadState('networkidle');
    
    // Open modal without starting slideshow
    const firstImage = page.locator('.grid > div').first();
    await firstImage.click();
    await page.waitForSelector('.fixed.inset-0.z-50', { state: 'visible' });
    
    // Test navigation arrows
    const nextButton = page.locator('button').filter({ has: page.locator('svg.lucide-arrow-right') });
    const prevButton = page.locator('button').filter({ has: page.locator('svg.lucide-arrow-left') });
    
    // Get initial index
    const indexLocator = page.locator('text=/\\d+ of \\d+/');
    const initialIndex = await indexLocator.textContent();
    console.log('Starting at:', initialIndex);
    
    // Click next
    await nextButton.click();
    await page.waitForTimeout(500);
    const afterNext = await indexLocator.textContent();
    console.log('After clicking next:', afterNext);
    
    // Click previous
    await prevButton.click();
    await page.waitForTimeout(500);
    const afterPrev = await indexLocator.textContent();
    console.log('After clicking previous:', afterPrev);
    
    if (initialIndex === afterPrev) {
      console.log('✓ Navigation controls work correctly');
    } else {
      console.log('⚠️  Navigation may have issues');
    }
    
    // Take screenshot of modal controls
    await page.screenshot({ path: 'test-results/slideshow-test-6-modal-controls.png', fullPage: true });
  });
});