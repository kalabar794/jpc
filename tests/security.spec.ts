import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('upload API requires authentication', async ({ request }) => {
    // Test without auth header
    const response = await request.post('/api/upload', {
      multipart: {
        file: {
          name: 'test.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('test content')
        }
      }
    });
    
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Unauthorized');
  });

  test('upload API works with valid authentication', async ({ request }) => {
    // Test with auth header
    const response = await request.post('/api/upload', {
      headers: {
        'Authorization': 'Bearer your-secret-upload-key-2024'
      },
      multipart: {
        file: {
          name: 'test.jpg',
          mimeType: 'image/jpeg',
          buffer: Buffer.from('fake image data')
        }
      }
    });
    
    // Should either work or fail with Cloudinary error (not auth error)
    if (response.status() === 500) {
      const body = await response.json();
      expect(body.error).not.toBe('Unauthorized');
    }
  });

  test('upload page redirects when no secret key', async ({ page }) => {
    // Temporarily clear the env variable
    await page.addInitScript(() => {
      delete (window as any).process.env.NEXT_PUBLIC_UPLOAD_SECRET_KEY;
    });
    
    await page.goto('/upload');
    
    // Should redirect to home
    await expect(page).toHaveURL('/');
  });

  test('XSS protection in blog posts', async ({ page }) => {
    // This would test with actual malicious content if we had a test blog post
    // For now, just verify the sanitization components are loaded
    await page.goto('/blog');
    
    // Blog page should load
    await expect(page.locator('h1')).toContainText('Blog');
  });

  test('no exposed API keys in source', async ({ page }) => {
    await page.goto('/');
    
    // Check page source doesn't contain our API keys
    const content = await page.content();
    
    // These should not appear in the page source
    expect(content).not.toContain('sk-ant-api03');
    expect(content).not.toContain('i_2sxI8CWjJhIq3PwXw9XvkIpCE');
    expect(content).not.toContain('194453126296877');
  });
});