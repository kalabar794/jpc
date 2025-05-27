import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test('should load without errors', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate to admin panel
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/');
    
    // Wait for the page to load
    await page.waitForTimeout(5000);
    
    // Check for the login button or CMS content
    const hasLoginButton = await page.locator('button:has-text("Login")').isVisible().catch(() => false);
    const hasGitHubButton = await page.locator('button:has-text("Login with GitHub")').isVisible().catch(() => false);
    const hasCMSContent = await page.locator('.nc-app-header').isVisible().catch(() => false);
    
    // At least one should be visible
    const isLoaded = hasLoginButton || hasGitHubButton || hasCMSContent;
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/admin-panel.png', fullPage: true });
    
    // Check for errors
    if (errors.length > 0) {
      console.log('Console errors found:', errors);
    }
    
    // Assert no critical errors
    const criticalErrors = errors.filter(e => 
      e.includes('Failed to load') || 
      e.includes('Error loading') ||
      e.includes('removeChild')
    );
    
    expect(criticalErrors).toHaveLength(0);
    expect(isLoaded).toBe(true);
  });
  
  test('should have correct collections configured', async ({ page }) => {
    // This test checks the configuration is loaded
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/');
    
    // Wait for potential redirect or load
    await page.waitForTimeout(3000);
    
    // Check page source for our collections
    const pageContent = await page.content();
    
    // Our collections should be in the config
    expect(pageContent).toContain('Kalabar794/jpc');
    expect(pageContent).toContain('Blog Posts');
    expect(pageContent).toContain('Projects');
    expect(pageContent).toContain('AI Gallery');
    expect(pageContent).toContain('Photography Gallery');
  });
});