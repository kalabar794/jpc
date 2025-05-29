import { test, expect } from '@playwright/test'

test.describe('Animated Backgrounds Consistency', () => {
  const pages = [
    { name: 'About', url: '/about' },
    { name: 'Projects', url: '/projects' },
    { name: 'Contact', url: '/contact' },
    { name: 'Blog', url: '/blog' }
  ]

  for (const page of pages) {
    test(`${page.name} page has animated background`, async ({ page: browserPage }) => {
      await browserPage.goto(`https://stalwart-smakager-b57fc1.netlify.app${page.url}`)
      
      // Wait for page to load
      await browserPage.waitForLoadState('networkidle')
      
      // Take a screenshot
      await browserPage.screenshot({ 
        path: `${page.name.toLowerCase()}-animated-bg.png`, 
        fullPage: true 
      })
      
      // Check for animated background elements
      // Look for gradient backgrounds
      const gradientBg = browserPage.locator('[class*="gradient"], [style*="gradient"]')
      const hasGradient = await gradientBg.count() > 0
      
      // Look for floating elements (typical of our animated backgrounds)
      const floatingElements = browserPage.locator('[class*="absolute"][class*="rounded-full"], [style*="border-radius"]')
      const hasFloatingElements = await floatingElements.count() > 0
      
      // Check for backdrop blur effects
      const blurElements = browserPage.locator('[class*="backdrop-blur"], [style*="backdrop-filter"]')
      const hasBlur = await blurElements.count() > 0
      
      console.log(`\n=== ${page.name} Page Background Analysis ===`)
      console.log(`Gradient backgrounds: ${hasGradient}`)
      console.log(`Floating elements: ${hasFloatingElements}`)
      console.log(`Backdrop blur effects: ${hasBlur}`)
      
      // At least one of these should be present for animated backgrounds
      expect(hasGradient || hasFloatingElements || hasBlur).toBeTruthy()
    })
  }

  test('Pages load quickly with animated backgrounds', async ({ page }) => {
    for (const pageInfo of pages) {
      console.log(`\nTesting ${pageInfo.name} page performance...`)
      
      const startTime = Date.now()
      await page.goto(`https://stalwart-smakager-b57fc1.netlify.app${pageInfo.url}`)
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      console.log(`${pageInfo.name} page loaded in ${loadTime}ms`)
      
      // Pages should load within reasonable time even with animations
      expect(loadTime).toBeLessThan(10000) // 10 seconds max
    }
  })

  test('Home page and other pages have similar visual consistency', async ({ page }) => {
    // Check home page
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/')
    await page.waitForLoadState('networkidle')
    
    const homeGradients = await page.locator('[class*="gradient"]').count()
    console.log(`Home page gradients: ${homeGradients}`)
    
    // Check about page for comparison
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/about')
    await page.waitForLoadState('networkidle')
    
    const aboutGradients = await page.locator('[class*="gradient"]').count()
    console.log(`About page gradients: ${aboutGradients}`)
    
    // Both should have gradient elements (indicating consistent styling)
    expect(homeGradients).toBeGreaterThan(0)
    expect(aboutGradients).toBeGreaterThan(0)
  })
})