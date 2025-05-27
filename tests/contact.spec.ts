import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Contact/);
    
    // Check form fields
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check for validation messages (HTML5 validation)
    const nameInput = page.getByLabel(/name/i);
    const isNameInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isNameInvalid).toBe(true);
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('Test message');
    
    // Try to submit
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check email validation
    const emailInput = page.getByLabel(/email/i);
    const isEmailInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isEmailInvalid).toBe(true);
  });

  test('should fill and submit form successfully', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    await page.getByLabel(/message/i).fill('This is a test message for QA purposes.');
    
    // Submit form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Should show success message or redirect
    // Note: Actual behavior depends on form implementation
    // This test may need adjustment based on actual form behavior
  });

  test('should display contact information', async ({ page }) => {
    // Check for contact info section
    await expect(page.getByText(/get in touch/i)).toBeVisible();
    
    // Check for email or other contact methods
    const contactInfo = page.locator('text=@');
    const hasContactInfo = await contactInfo.count() > 0;
    expect(hasContactInfo).toBe(true);
  });
});