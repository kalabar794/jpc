import { test, expect } from '@playwright/test';

test.describe('Gallery Slideshow Debug', () => {
  test('should debug slideshow button behavior', async ({ page }) => {
    // Log console messages
    page.on('console', msg => console.log('Browser console:', msg.type(), msg.text()));
    
    // Log network errors
    page.on('pageerror', err => console.log('Page error:', err));
    
    // Navigate to the test gallery page
    await page.goto('/gallery/test');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/slideshow-debug-initial.png', fullPage: true });
    
    // Check what's on the page
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    
    // Check for any buttons on the page
    const buttons = await page.getByRole('button').all();
    console.log('Number of buttons found:', buttons.length);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const isVisible = await buttons[i].isVisible();
      console.log(`Button ${i + 1}: "${text}" - Visible: ${isVisible}`);
    }
    
    // Look for slideshow button specifically
    const slideshowButtons = await page.locator('button:has-text("Slideshow")').all();
    console.log('Slideshow buttons found:', slideshowButtons.length);
    
    // Try to find the button with different selectors
    const button1 = await page.locator('button:has-text("Start")').count();
    const button2 = await page.locator('button:has(svg.lucide-play)').count();
    const button3 = await page.locator('button').filter({ hasText: /slideshow/i }).count();
    
    console.log('Button with "Start" text:', button1);
    console.log('Button with play icon:', button2);
    console.log('Button with "slideshow" text:', button3);
    
    // Check the page content
    const heroSection = await page.locator('.relative.py-20.px-4.text-center').count();
    console.log('Hero section found:', heroSection > 0);
    
    // Check for gallery title
    const title = await page.locator('h1').textContent();
    console.log('Gallery title:', title);
    
    // If we find the slideshow button, try clicking it
    const slideshowButton = page.locator('button').filter({ hasText: /slideshow/i }).first();
    if (await slideshowButton.count() > 0) {
      console.log('Found slideshow button, clicking...');
      
      const beforeText = await slideshowButton.textContent();
      console.log('Button text before click:', beforeText);
      
      await slideshowButton.click();
      await page.waitForTimeout(1000);
      
      const afterText = await slideshowButton.textContent();
      console.log('Button text after click:', afterText);
      
      // Check if button state changed
      const hasPlayIcon = await slideshowButton.locator('svg.lucide-play').count() > 0;
      const hasPauseIcon = await slideshowButton.locator('svg.lucide-pause').count() > 0;
      
      console.log('Has play icon:', hasPlayIcon);
      console.log('Has pause icon:', hasPauseIcon);
      
      await page.screenshot({ path: 'test-results/slideshow-debug-after-click.png', fullPage: true });
    } else {
      console.log('Slideshow button not found!');
    }
  });
});