import { test, expect, devices } from '@playwright/test';

// Configure to run on iPhone 12
test.use(devices['iPhone 12']);

test.describe('Mobile Optimization', () => {
  test('site is mobile responsive', async ({ page }) => {
    await page.goto('/');
    
    // No horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    
    // Hero text is readable
    const heroTitle = page.locator('h1').first();
    const fontSize = await heroTitle.evaluate(el => 
      parseInt(window.getComputedStyle(el).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(32);
    
    // Buttons are tap-friendly
    const ctaButtons = page.locator('a[href="/projects"], a[href="/contact"]');
    const buttonCount = await ctaButtons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = ctaButtons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation is accessible
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Navigation links exist
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(3);
  });

  test('contact form is mobile optimized', async ({ page }) => {
    await page.goto('/contact');
    
    // Form inputs are appropriately sized
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    
    // Check heights
    const nameBox = await nameInput.boundingBox();
    const emailBox = await emailInput.boundingBox();
    const messageBox = await messageInput.boundingBox();
    
    expect(nameBox?.height).toBeGreaterThanOrEqual(40);
    expect(emailBox?.height).toBeGreaterThanOrEqual(40);
    expect(messageBox?.height).toBeGreaterThanOrEqual(80);
    
    // Email input has correct type
    const emailType = await emailInput.getAttribute('type');
    expect(emailType).toBe('email');
  });

  test('projects page displays well on mobile', async ({ page }) => {
    await page.goto('/projects');
    
    // Project cards are visible
    const projectCards = page.locator('a[href^="/projects/"]');
    const cardCount = await projectCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Cards don't overflow
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = projectCards.nth(i);
      const box = await card.boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(390);
      }
    }
  });

  test('performance is acceptable on mobile', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});