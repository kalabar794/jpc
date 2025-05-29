import { test, expect } from '@playwright/test'

test('Blog categories updated: Case Studies removed and Tools & Reviews renamed', async ({ page }) => {
  await page.goto('https://stalwart-smakager-b57fc1.netlify.app/blog')
  await page.waitForLoadState('networkidle')
  
  // Take a screenshot to verify the changes
  await page.screenshot({ path: 'blog-categories-updated.png', fullPage: true })
  
  // Check that Case Studies category is removed
  const caseStudiesCategory = page.locator('text="Case Studies"')
  const hasCaseStudies = await caseStudiesCategory.count() > 0
  
  // Check that Tools & Reviews is renamed to just "Tools"
  const toolsReviewsCategory = page.locator('text="Tools & Reviews"')
  const hasToolsReviews = await toolsReviewsCategory.count() > 0
  
  const toolsCategory = page.locator('text="Tools"')
  const hasTools = await toolsCategory.count() > 0
  
  // Check that other categories are still present
  const aiMarketingCategory = page.locator('text="AI Marketing"')
  const hasAIMarketing = await aiMarketingCategory.count() > 0
  
  const automationCategory = page.locator('text="Marketing Automation"')
  const hasAutomation = await automationCategory.count() > 0
  
  const tutorialsCategory = page.locator('text="Tutorials"')
  const hasTutorials = await tutorialsCategory.count() > 0
  
  const industryCategory = page.locator('text="Industry Insights"')
  const hasIndustry = await industryCategory.count() > 0
  
  console.log('\n=== Blog Categories Check ===')
  console.log(`Case Studies: ${hasCaseStudies ? 'Still present ✗' : 'Removed ✓'}`)
  console.log(`Tools & Reviews: ${hasToolsReviews ? 'Still present ✗' : 'Removed ✓'}`)
  console.log(`Tools: ${hasTools ? 'Present ✓' : 'Missing ✗'}`)
  console.log(`AI Marketing: ${hasAIMarketing ? 'Present ✓' : 'Missing ✗'}`)
  console.log(`Marketing Automation: ${hasAutomation ? 'Present ✓' : 'Missing ✗'}`)
  console.log(`Tutorials: ${hasTutorials ? 'Present ✓' : 'Missing ✗'}`)
  console.log(`Industry Insights: ${hasIndustry ? 'Present ✓' : 'Missing ✗'}`)
  
  // Verify the changes
  await expect(caseStudiesCategory).not.toBeVisible()
  await expect(toolsReviewsCategory).not.toBeVisible()
  await expect(toolsCategory).toBeVisible()
  
  // Verify other categories are still there
  await expect(aiMarketingCategory).toBeVisible()
  await expect(automationCategory).toBeVisible()
  await expect(tutorialsCategory).toBeVisible()
  await expect(industryCategory).toBeVisible()
  
  console.log('\n🎉 Blog categories successfully updated!')
})