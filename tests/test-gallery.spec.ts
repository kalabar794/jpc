import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'http://localhost:3000'
});

test.describe('Test Gallery Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery/test');
    await page.waitForLoadState('networkidle');
  });

  test('Gallery loads correctly with AI images', async ({ page }) => {
    // Wait for gallery grid container
    await expect(page.locator('.grid')).toBeVisible();
    
    // Wait for images to load
    await page.waitForSelector('img[alt]', { state: 'visible' });
    
    // Take screenshot of loaded gallery
    await page.screenshot({ 
      path: 'test-results/test-gallery-loaded.png',
      fullPage: true 
    });
    
    // Verify images are present
    const images = page.locator('.grid img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });

  test('Images maintain original aspect ratios', async ({ page }) => {
    // Wait for images to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Give time for layout to settle
    
    // Get all image containers
    const imageContainers = page.locator('.grid > div');
    const containerCount = await imageContainers.count();
    
    // Check a few images for aspect ratio preservation
    for (let i = 0; i < Math.min(3, containerCount); i++) {
      const container = imageContainers.nth(i);
      const img = container.locator('img');
      
      // Get natural dimensions
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
      const naturalRatio = naturalWidth / naturalHeight;
      
      // Get displayed dimensions
      const displayedWidth = await img.evaluate((el: HTMLImageElement) => el.clientWidth);
      const displayedHeight = await img.evaluate((el: HTMLImageElement) => el.clientHeight);
      const displayedRatio = displayedWidth / displayedHeight;
      
      // Allow small difference due to rounding
      expect(Math.abs(naturalRatio - displayedRatio)).toBeLessThan(0.1);
    }
    
    // Take screenshot showing various aspect ratios
    await page.screenshot({ 
      path: 'test-results/test-gallery-aspect-ratios.png',
      fullPage: true 
    });
  });

  test('Hover effects work correctly', async ({ page }) => {
    // Get first image container card
    const firstCard = page.locator('.grid > div').first().locator('.group');
    
    // Take screenshot before hover
    await page.screenshot({ 
      path: 'test-results/test-gallery-before-hover.png',
      clip: await firstCard.boundingBox() || undefined
    });
    
    // Hover over the image
    await firstCard.hover();
    await page.waitForTimeout(500); // Wait for transition
    
    // Take screenshot during hover
    await page.screenshot({ 
      path: 'test-results/test-gallery-during-hover.png',
      clip: await firstCard.boundingBox() || undefined
    });
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);
  });

  test('Full-screen modal viewer opens on click', async ({ page }) => {
    // Click on the first image card
    const firstCard = page.locator('.grid > div').first().locator('.group');
    await firstCard.click();
    
    // Wait for modal to appear (using the actual modal structure)
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // Wait for image in modal to load
    await page.waitForSelector('.fixed.inset-0.z-50 img', { state: 'visible' });
    await page.waitForTimeout(1000); // Give time for animation
    
    // Take screenshot of opened modal
    await page.screenshot({ 
      path: 'test-results/test-gallery-modal-open.png',
      fullPage: true 
    });
    
    // Verify modal image is displayed
    const modalImage = page.locator('.fixed.inset-0.z-50 img');
    await expect(modalImage).toBeVisible();
  });

  test('Modal navigation buttons work', async ({ page }) => {
    // Click on the first image to open modal
    const firstCard = page.locator('.grid > div').first().locator('.group');
    await firstCard.click();
    
    // Wait for modal
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    await page.waitForTimeout(1000);
    
    // Take screenshot of first image in modal
    await page.screenshot({ 
      path: 'test-results/test-gallery-modal-first-image.png',
      fullPage: true 
    });
    
    // Click next button (ArrowRight icon button)
    const nextButton = page.locator('button').filter({ has: page.locator('svg.lucide-arrow-right') });
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await page.waitForTimeout(500); // Wait for transition
    
    // Take screenshot of second image
    await page.screenshot({ 
      path: 'test-results/test-gallery-modal-second-image.png',
      fullPage: true 
    });
    
    // Click previous button (ArrowLeft icon button)
    const prevButton = page.locator('button').filter({ has: page.locator('svg.lucide-arrow-left') });
    await expect(prevButton).toBeVisible();
    await prevButton.click();
    await page.waitForTimeout(500);
    
    // Take screenshot after going back
    await page.screenshot({ 
      path: 'test-results/test-gallery-modal-previous-image.png',
      fullPage: true 
    });
    
    // Close modal (X button)
    const closeButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') });
    await closeButton.click();
    
    // Verify modal is closed
    await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
  });

  test('Multiple screenshots showing full functionality', async ({ page }) => {
    // 1. Gallery overview
    await page.screenshot({ 
      path: 'test-results/test-gallery-overview.png',
      fullPage: true 
    });
    
    // 2. Scroll down to show more images
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'test-results/test-gallery-scrolled.png',
      fullPage: true 
    });
    
    // 3. Click on a middle image
    const middleCard = page.locator('.grid > div').nth(3).locator('.group');
    await middleCard.click();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/test-gallery-modal-middle-image.png',
      fullPage: true 
    });
    
    // 4. Test keyboard navigation (ESC to close)
    await page.keyboard.press('Escape');
    await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
    
    // 5. Final gallery view
    await page.screenshot({ 
      path: 'test-results/test-gallery-final-view.png',
      fullPage: true 
    });
  });
});