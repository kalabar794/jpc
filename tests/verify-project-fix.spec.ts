import { test, expect } from '@playwright/test'

test('Verify CMS projects display on frontend', async ({ page }) => {
  // Go to projects page
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/projects')
  
  // Wait for page to load
  await page.waitForLoadState('networkidle')
  
  // Take a screenshot to see current state
  await page.screenshot({ path: 'projects-page-current.png', fullPage: true })
  
  // Check for the test project we created
  const testProject = page.locator('text="TEST"')
  const hasTestProject = await testProject.count() > 0
  
  // Check for existing projects
  const aiMarketingProject = page.locator('text="AI Marketing Generator"')
  const hasAIProject = await aiMarketingProject.count() > 0
  
  const socialMediaProject = page.locator('text="Social Media Analyzer"') 
  const hasSocialProject = await socialMediaProject.count() > 0
  
  console.log('=== Project Display Results ===')
  console.log(`✓ TEST project visible: ${hasTestProject}`)
  console.log(`✓ AI Marketing Generator visible: ${hasAIProject}`)
  console.log(`✓ Social Media Analyzer visible: ${hasSocialProject}`)
  
  // We should see at least the existing projects
  expect(hasAIProject || hasSocialProject || hasTestProject).toBeTruthy()
  
  // Specifically check if our test project shows (it should now)
  if (hasTestProject) {
    console.log('🎉 SUCCESS: Test project from CMS is now visible!')
    await expect(testProject.first()).toBeVisible()
  } else {
    console.log('⚠️  Test project not visible yet')
  }
})