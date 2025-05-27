import { test, expect } from '@playwright/test';

test.describe('Projects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should load projects page with all projects', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Projects/);
    
    // Check heading
    await expect(page.locator('h1')).toContainText('AI-Powered');
    
    // Check project cards are displayed
    const projects = page.locator('article');
    await expect(projects).toHaveCount(2); // Based on current content
    
    // Check specific projects
    await expect(page.getByText('AI Marketing Campaign Generator')).toBeVisible();
    await expect(page.getByText('Social Media Analytics Dashboard')).toBeVisible();
  });

  test('should navigate to individual project', async ({ page }) => {
    // Click on first project
    await page.getByRole('link', { name: 'AI Marketing Campaign Generator' }).click();
    
    // Check URL changed
    await expect(page).toHaveURL(/\/projects\/ai-marketing-generator/);
    
    // Check project details are displayed
    await expect(page.locator('h1')).toContainText('AI Marketing Campaign Generator');
  });

  test('should display project metadata', async ({ page }) => {
    const firstProject = page.locator('article').first();
    
    // Check category badge
    await expect(firstProject.locator('span').filter({ hasText: /AI Tools|Analytics/i })).toBeVisible();
    
    // Check excerpt
    await expect(firstProject.locator('p')).toBeVisible();
    
    // Check "View Project" link
    await expect(firstProject.getByText('View Project')).toBeVisible();
  });

  test('should show featured badge on featured projects', async ({ page }) => {
    // Look for featured badge
    const featuredBadge = page.locator('text=Featured').first();
    
    // At least one project should be featured
    await expect(featuredBadge).toBeVisible();
  });
});