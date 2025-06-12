import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'http://localhost:3000'
});

test.describe('Gallery Gap Fix Verification', () => {
  test('Verify seamless grid with no gaps and all 27 images loading', async ({ page }) => {
    // Navigate to the test gallery
    await page.goto('/gallery/test');
    await page.waitForLoadState('networkidle');
    
    // Wait for the gallery grid to be visible
    const galleryGrid = page.locator('.grid');
    await expect(galleryGrid).toBeVisible();
    
    // Wait for all images to load
    await page.waitForSelector('img[alt]', { state: 'visible' });
    await page.waitForTimeout(2000); // Allow time for all images to fully load
    
    // Count all images to verify 27 are present
    const images = page.locator('.grid img');
    const imageCount = await images.count();
    console.log(`Total images found: ${imageCount}`);
    expect(imageCount).toBe(27);
    
    // Verify grid has no gaps (gap-0 class)
    const gridClasses = await galleryGrid.getAttribute('class');
    expect(gridClasses).toContain('gap-0');
    console.log('Grid classes:', gridClasses);
    
    // Check that images are positioned seamlessly
    const imageContainers = page.locator('.grid > div');
    const containerCount = await imageContainers.count();
    expect(containerCount).toBe(27);
    
    // Verify no padding or margins on image containers
    for (let i = 0; i < Math.min(5, containerCount); i++) {
      const container = imageContainers.nth(i);
      const padding = await container.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          paddingTop: styles.paddingTop,
          paddingRight: styles.paddingRight,
          paddingBottom: styles.paddingBottom,
          paddingLeft: styles.paddingLeft,
          marginTop: styles.marginTop,
          marginRight: styles.marginRight,
          marginBottom: styles.marginBottom,
          marginLeft: styles.marginLeft
        };
      });
      
      // All padding and margin values should be 0px
      expect(padding.paddingTop).toBe('0px');
      expect(padding.paddingRight).toBe('0px');
      expect(padding.paddingBottom).toBe('0px');
      expect(padding.paddingLeft).toBe('0px');
      expect(padding.marginTop).toBe('0px');
      expect(padding.marginRight).toBe('0px');
      expect(padding.marginBottom).toBe('0px');
      expect(padding.marginLeft).toBe('0px');
    }
    
    // Take full page screenshot showing the seamless grid
    await page.screenshot({ 
      path: 'test-results/gallery-seamless-grid-verification.png',
      fullPage: true 
    });
    
    // Take viewport screenshot focusing on the grid
    await page.screenshot({ 
      path: 'test-results/gallery-grid-closeup.png',
      fullPage: false 
    });
    
    // Scroll to middle of gallery and take another screenshot
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/gallery-seamless-grid-middle.png',
      fullPage: false 
    });
    
    // Scroll to bottom to ensure all images are loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/gallery-seamless-grid-bottom.png',
      fullPage: false 
    });
    
    // Verify all images have loaded successfully (no broken images)
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('.grid img'));
      return imgs.filter(img => !img.complete || img.naturalHeight === 0).length;
    });
    expect(brokenImages).toBe(0);
    console.log('All images loaded successfully!');
    
    // Log grid dimensions for verification
    const gridDimensions = await galleryGrid.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      return {
        width: rect.width,
        height: rect.height,
        columns: styles.gridTemplateColumns,
        gap: styles.gap
      };
    });
    console.log('Grid dimensions:', gridDimensions);
  });
});