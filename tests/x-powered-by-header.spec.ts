import { test, expect } from '@playwright/test';

test.describe('X-Powered-By Header Security', () => {
  const pagesToTest = [
    '/',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/gallery/ai',
    '/gallery/photography',
  ];

  pagesToTest.forEach((path) => {
    test(`should not expose X-Powered-By header on ${path}`, async ({ page }) => {
      // Intercept the response to check headers
      const response = await page.goto(path);
      
      expect(response).toBeTruthy();
      
      // Get all headers
      const headers = response!.headers();
      
      // Check that X-Powered-By header is not present or is empty
      const xPoweredBy = headers['x-powered-by'];
      
      // The header should either not exist, be empty, or be the string "undefined"
      expect(xPoweredBy === undefined || xPoweredBy === '' || xPoweredBy === null || xPoweredBy === 'undefined').toBeTruthy();
      
      // Additional check: ensure the header is not in any case variation
      const headerKeys = Object.keys(headers);
      const hasPoweredByHeader = headerKeys.some(key => 
        key.toLowerCase() === 'x-powered-by' && headers[key] !== ''
      );
      
      expect(hasPoweredByHeader).toBeFalsy();
    });
  });

  test('API routes should not expose X-Powered-By header', async ({ request }) => {
    // Test the upload API endpoint
    const response = await request.get('/api/upload', {
      failOnStatusCode: false // Don't fail on 4xx/5xx status codes
    });
    
    const headers = response.headers();
    const xPoweredBy = headers['x-powered-by'];
    
    expect(xPoweredBy === undefined || xPoweredBy === '').toBeTruthy();
  });
});