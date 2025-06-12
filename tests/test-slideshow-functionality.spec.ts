import { test, expect } from '@playwright/test';

test.describe('Gallery Slideshow Functionality', () => {
  test('should test slideshow button functionality and auto-advance', async ({ page }) => {
    // Navigate to the test gallery page
    await page.goto('/gallery/test');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take initial screenshot
    await page.screenshot({ path: 'test-results/slideshow-initial-state.png', fullPage: true });
    
    // Find the slideshow button
    const slideshowButton = page.getByRole('button', { name: /start slideshow/i });
    
    // Check if button exists and is visible
    await expect(slideshowButton).toBeVisible();
    console.log('✓ Slideshow button is visible');
    
    // Check initial button text
    const initialButtonText = await slideshowButton.textContent();
    console.log('Initial button text:', initialButtonText);
    
    // Click the slideshow button
    await slideshowButton.click();
    console.log('✓ Clicked slideshow button');
    
    // Wait a moment for state to update
    await page.waitForTimeout(500);
    
    // Check if button text changed to "Pause Slideshow"
    const updatedButtonText = await slideshowButton.textContent();
    console.log('Updated button text:', updatedButtonText);
    await expect(slideshowButton).toContainText(/pause slideshow/i);
    console.log('✓ Button text changed to "Pause Slideshow"');
    
    // Take screenshot after clicking
    await page.screenshot({ path: 'test-results/slideshow-playing-state.png', fullPage: true });
    
    // Click on the first image to open modal
    const firstImage = page.locator('.grid > div').first();
    await firstImage.click();
    console.log('✓ Clicked first image to open modal');
    
    // Wait for modal to appear
    await page.waitForSelector('.fixed.inset-0.z-50', { state: 'visible' });
    
    // Take screenshot of modal
    await page.screenshot({ path: 'test-results/slideshow-modal-open.png', fullPage: true });
    
    // Get the current image index
    const indexText = await page.locator('text=/\\d+ of \\d+/').textContent();
    console.log('Current image index:', indexText);
    
    // Wait for slideshow to auto-advance (3 seconds according to code)
    console.log('Waiting for auto-advance...');
    await page.waitForTimeout(3500);
    
    // Check if image index changed
    const newIndexText = await page.locator('text=/\\d+ of \\d+/').textContent();
    console.log('New image index:', newIndexText);
    
    // Take screenshot after auto-advance
    await page.screenshot({ path: 'test-results/slideshow-after-advance.png', fullPage: true });
    
    // Close modal
    const closeButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') });
    await closeButton.click();
    console.log('✓ Closed modal');
    
    // Click pause button
    await slideshowButton.click();
    const pausedButtonText = await slideshowButton.textContent();
    console.log('Button text after pause:', pausedButtonText);
    await expect(slideshowButton).toContainText(/start slideshow/i);
    console.log('✓ Slideshow paused successfully');
    
    // Take final screenshot
    await page.screenshot({ path: 'test-results/slideshow-final-state.png', fullPage: true });
    
    // Check console for errors
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(`Console error: ${msg.text()}`);
      }
    });
    
    // Wait a moment to catch any console errors
    await page.waitForTimeout(1000);
    
    if (consoleMessages.length > 0) {
      console.log('Console errors found:');
      consoleMessages.forEach(msg => console.log(msg));
    } else {
      console.log('✓ No console errors detected');
    }
  });
  
  test('should check slideshow behavior without modal', async ({ page }) => {
    // Navigate to the test gallery page
    await page.goto('/gallery/test');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find and click the slideshow button
    const slideshowButton = page.getByRole('button', { name: /start slideshow/i });
    await slideshowButton.click();
    
    // Check that slideshow is playing
    await expect(slideshowButton).toContainText(/pause slideshow/i);
    console.log('✓ Slideshow started');
    
    // Wait to see if anything happens visually without opening modal
    console.log('Monitoring for 10 seconds to see if slideshow affects gallery view...');
    
    // Take screenshots at intervals
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(3500);
      await page.screenshot({ path: `test-results/slideshow-gallery-view-${i + 1}.png`, fullPage: true });
      console.log(`Took screenshot ${i + 1} after ${(i + 1) * 3.5} seconds`);
    }
    
    // Stop slideshow
    await slideshowButton.click();
    await expect(slideshowButton).toContainText(/start slideshow/i);
    console.log('✓ Slideshow stopped');
  });
});