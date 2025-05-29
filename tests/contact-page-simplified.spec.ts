import { test, expect } from '@playwright/test'

test('Contact page has contact information section removed', async ({ page }) => {
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/contact')
  await page.waitForLoadState('networkidle')
  
  // Take a screenshot to see the simplified layout
  await page.screenshot({ path: 'contact-page-simplified.png', fullPage: true })
  
  // Check that contact information section is removed
  const contactInfoHeading = page.locator('text="Contact Information"')
  const emailInfo = page.locator('text="jonathon@example.com"')
  const phoneInfo = page.locator('text="+1 (555) 123-4567"')
  const locationInfo = page.locator('text="San Francisco, CA"')
  const availabilityStatus = page.locator('text="Currently Available"')
  
  console.log('\n=== Contact Page Content Check ===')
  console.log(`Contact Information heading: ${await contactInfoHeading.count() === 0 ? 'Removed ✓' : 'Still present ✗'}`)
  console.log(`Email info: ${await emailInfo.count() === 0 ? 'Removed ✓' : 'Still present ✗'}`)
  console.log(`Phone info: ${await phoneInfo.count() === 0 ? 'Removed ✓' : 'Still present ✗'}`)
  console.log(`Location info: ${await locationInfo.count() === 0 ? 'Removed ✓' : 'Still present ✗'}`)
  console.log(`Availability status: ${await availabilityStatus.count() === 0 ? 'Removed ✓' : 'Still present ✗'}`)
  
  // Verify the sections are removed
  await expect(contactInfoHeading).not.toBeVisible()
  await expect(emailInfo).not.toBeVisible()
  await expect(phoneInfo).not.toBeVisible()
  await expect(locationInfo).not.toBeVisible()
  await expect(availabilityStatus).not.toBeVisible()
  
  // Verify the contact form is still present and centered
  const contactForm = page.locator('form')
  const sendMessageHeading = page.locator('text="Send a Message"')
  
  await expect(contactForm).toBeVisible()
  await expect(sendMessageHeading).toBeVisible()
  
  console.log(`Contact form: Present ✓`)
  console.log(`Send Message heading: Present ✓`)
  
  console.log('\n🎉 Contact page successfully simplified!')
})