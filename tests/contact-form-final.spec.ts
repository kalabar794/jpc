import { test, expect } from '@playwright/test';

test.describe('New Contact Form', () => {
  test('should display and function correctly', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Check form title is visible
    await expect(page.locator('h1:has-text("Get In Touch")')).toBeVisible();
    
    // Check all form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    
    // Check submit button
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible();
    
    // Test form interaction
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the new contact form');
    
    // Take screenshot of filled form
    await page.screenshot({ 
      path: 'test-results/contact-form-filled.png',
      fullPage: false 
    });
  });
  
  test('responsive design', async ({ page }) => {
    await page.goto('/contact');
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page.locator('h1:has-text("Get In Touch")')).toBeVisible();
    
    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await expect(page.locator('h1:has-text("Get In Touch")')).toBeVisible();
  });
});