import { test, expect } from '@playwright/test'

test('Debug admin panel', async ({ page }) => {
  // Navigate to admin panel
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/')
  
  // Wait for page to load
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(5000)
  
  // Take a screenshot
  await page.screenshot({ path: 'admin-debug.png', fullPage: true })
  
  // Get page content to debug
  const pageContent = await page.content()
  console.log('Page title:', await page.title())
  console.log('URL:', page.url())
  
  // Look for any visible text
  const allText = await page.locator('body').textContent()
  console.log('Page text (first 500 chars):', allText?.substring(0, 500))
  
  // Check for specific CMS elements
  const cmsElements = await page.locator('[class*="cms"], [id*="cms"], [data-*="cms"]').count()
  console.log('CMS elements found:', cmsElements)
  
  // Check for collection-related elements
  const collectionElements = await page.locator('[class*="collection"], [id*="collection"]').count()
  console.log('Collection elements found:', collectionElements)
  
  // Check if we see any buttons or links
  const buttons = await page.locator('button, a').count()
  console.log('Buttons/links found:', buttons)
  
  // Look for About Page specifically
  const aboutPage = await page.locator('text="About Page"').count()
  console.log('About Page mentions:', aboutPage)
})