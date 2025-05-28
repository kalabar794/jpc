import { test, expect } from '@playwright/test'

test.describe('Quick CMS Collection Check', () => {
  test('Verify collections are visible', async ({ page }) => {
    // Go directly to admin without waiting for auth
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/#/collections')
    
    // Take a screenshot to see what's available
    await page.screenshot({ path: 'cms-collections.png', fullPage: true })
    
    // Log what we can find
    const pageContent = await page.textContent('body')
    console.log('\n=== CMS Collections Found ===')
    
    // Check for each expected collection
    const collections = [
      'About Page',
      'Blog Posts', 
      'Projects',
      'AI Gallery',
      'Photography Gallery',
      'Settings'
    ]
    
    for (const collection of collections) {
      const found = pageContent?.includes(collection)
      console.log(`${found ? '✅' : '❌'} ${collection}`)
    }
    
    console.log('\n=== Page URL ===')
    console.log(page.url())
    
    // If we're not authenticated, we'll see the login page
    if (page.url().includes('login') || pageContent?.includes('Login')) {
      console.log('\n⚠️  Authentication required - need to use existing logged-in session')
    }
  })
})