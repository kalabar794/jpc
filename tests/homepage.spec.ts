import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully with all key elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Jonathon/);
    
    // Check hero section
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('AI Marketing Specialist')).toBeVisible();
    
    // Check navigation
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /View Projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Get in Touch/i })).toBeVisible();
  });

  test('should display services section', async ({ page }) => {
    const servicesSection = page.locator('section').filter({ hasText: 'Transform Your Business' });
    await expect(servicesSection).toBeVisible();
    
    // Check service cards
    await expect(page.getByText('AI Marketing Strategy')).toBeVisible();
    await expect(page.getByText('Marketing Automation')).toBeVisible();
    await expect(page.getByText('Data Analytics')).toBeVisible();
  });

  test('should display featured projects', async ({ page }) => {
    const projectsSection = page.locator('section').filter({ hasText: 'Featured Work' });
    await expect(projectsSection).toBeVisible();
    
    // Check at least one project card is visible
    const projectCards = page.locator('article').filter({ hasText: /AI Marketing|Social Media/i });
    await expect(projectCards.first()).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Test Projects link
    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects/);
    
    // Go back and test Blog link
    await page.goto('/');
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog/);
    
    // Test About link
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('should handle responsive menu on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu button should be visible
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenuButton).toBeVisible();
    
    // Desktop nav should be hidden
    const desktopNav = page.locator('nav .hidden.md\\:flex');
    await expect(desktopNav).toBeHidden();
  });
});