import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: /toggle dark mode/i });
    await expect(themeToggle).toBeVisible();
    
    // Check initial state (should be light mode)
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
    
    // Click toggle to switch to dark mode
    await themeToggle.click();
    
    // Check dark mode is applied
    await expect(html).toHaveClass(/dark/);
    
    // Check background color changed
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(18, 18, 18)'); // dark-background color
    
    // Toggle back to light mode
    await themeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should persist theme preference on reload', async ({ page, context }) => {
    await page.goto('/');
    
    // Switch to dark mode
    const themeToggle = page.getByRole('button', { name: /toggle dark mode/i });
    await themeToggle.click();
    
    // Wait for theme to be applied
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Reload page
    await page.reload();
    
    // Check dark mode is still active
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Check localStorage
    const theme = await page.evaluate(() => localStorage.getItem('portfolio-theme'));
    expect(theme).toBe('dark');
  });

  test('should apply correct styles in dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Switch to dark mode
    const themeToggle = page.getByRole('button', { name: /toggle dark mode/i });
    await themeToggle.click();
    
    // Check text colors
    const heading = page.locator('h1').first();
    await expect(heading).toHaveCSS('color', 'rgb(255, 255, 255)'); // white text
    
    // Check navigation colors
    const navLinks = page.locator('nav a').first();
    await expect(navLinks).toHaveCSS('color', 'rgb(209, 213, 219)'); // gray-300
  });
});