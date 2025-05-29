import { test, expect } from '@playwright/test'

test('Photography page now has animated background like home page', async ({ page }) => {
  // Test photography page
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/gallery/photography')
  await page.waitForLoadState('networkidle')
  
  // Take a screenshot to see the result
  await page.screenshot({ path: 'photography-page-fixed.png', fullPage: true })
  
  // Check for animated background elements
  const gradientBg = page.locator('[class*="gradient"], [style*="gradient"]')
  const hasGradient = await gradientBg.count() > 0
  
  const floatingElements = page.locator('[class*="absolute"][class*="rounded-full"]')
  const hasFloatingElements = await floatingElements.count() > 0
  
  const blurElements = page.locator('[class*="backdrop-blur"]')
  const hasBlur = await blurElements.count() > 0
  
  console.log('\n=== Photography Page Background Check ===')
  console.log(`✓ Gradient backgrounds: ${hasGradient}`)
  console.log(`✓ Floating elements: ${hasFloatingElements}`) 
  console.log(`✓ Backdrop blur effects: ${hasBlur}`)
  
  // Should have animated background elements now
  expect(hasGradient).toBeTruthy()
  expect(hasFloatingElements || hasBlur).toBeTruthy()
  
  // Also test AI gallery page
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/gallery/ai')
  await page.waitForLoadState('networkidle')
  
  const aiGradients = await page.locator('[class*="gradient"]').count()
  console.log(`✓ AI Gallery gradients: ${aiGradients}`)
  expect(aiGradients).toBeGreaterThan(0)
  
  console.log('\n🎉 Gallery pages now have animated backgrounds!')
})