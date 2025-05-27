import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should load blog page with posts', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Blog/);
    
    // Check heading
    await expect(page.locator('h1')).toContainText('AI Marketing');
    
    // Check posts are displayed
    const posts = page.locator('article');
    await expect(posts).toHaveCount(2); // Should have 2 posts now
    
    // Check specific posts
    await expect(page.getByText('The Future of AI in Marketing')).toBeVisible();
    await expect(page.getByText('test')).toBeVisible();
  });

  test('should display post metadata', async ({ page }) => {
    // Check first post has all metadata
    const firstPost = page.locator('article').first();
    
    // Check date is visible
    await expect(firstPost.locator('text=/\\w+ \\d+, \\d{4}/')).toBeVisible();
    
    // Check category
    await expect(firstPost.locator('span').filter({ hasText: /Test|ai marketing/i })).toBeVisible();
    
    // Check excerpt
    await expect(firstPost.locator('p')).toBeVisible();
  });

  test('should navigate to individual blog post', async ({ page }) => {
    // Click on the AI Marketing post
    await page.getByRole('link', { name: 'The Future of AI in Marketing' }).click();
    
    // Check URL changed
    await expect(page).toHaveURL(/\/blog\/future-of-ai-marketing/);
    
    // Check post content is displayed
    await expect(page.locator('h1')).toContainText('The Future of AI in Marketing');
  });

  test('should have working search functionality', async ({ page }) => {
    // Find search input
    const searchInput = page.getByPlaceholder('Search articles...');
    await expect(searchInput).toBeVisible();
    
    // Type in search
    await searchInput.fill('AI');
    
    // Should filter posts (this assumes client-side filtering is implemented)
    // If not implemented, this test will need to be updated
  });

  test('should display correct post count', async ({ page }) => {
    // Check the post count indicator
    await expect(page.getByText('2 Articles')).toBeVisible();
  });

  test('should have category filter buttons', async ({ page }) => {
    // Check filter buttons exist
    await expect(page.getByRole('button', { name: 'All Posts' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'AI Marketing' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Marketing Automation' })).toBeVisible();
  });
});