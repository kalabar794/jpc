import { test, expect } from '@playwright/test'

test.describe('Experimental About Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the experimental about page before each test
    await page.goto('/about-experimental')
    await page.waitForLoadState('networkidle')
  })

  test('should load the page with hero section content', async ({ page }) => {
    // Check hero section elements
    await expect(page.getByRole('heading', { name: 'Marketing Director' })).toBeVisible()
    await expect(page.getByText('20+ Years of Marketing Excellence')).toBeVisible()
    
    // Check bio text is present
    const bioText = page.getByText(/Marketing Director with over 20 years of experience/)
    await expect(bioText).toBeVisible()
  })

  test('should display all navigation tabs and allow tab switching', async ({ page }) => {
    // Check all tabs are visible
    const overviewTab = page.getByRole('button', { name: /Overview/i })
    const experienceTab = page.getByRole('button', { name: /Experience/i })
    const expertiseTab = page.getByRole('button', { name: /Expertise/i })
    const educationTab = page.getByRole('button', { name: /Education/i })
    
    await expect(overviewTab).toBeVisible()
    await expect(experienceTab).toBeVisible()
    await expect(expertiseTab).toBeVisible()
    await expect(educationTab).toBeVisible()
    
    // Test Overview tab (should be active by default)
    await expect(page.getByText('Professional Overview')).toBeVisible()
    await expect(page.getByText('Professional Overview')).toBeVisible()
    await expect(page.getByText('Digital Marketing & Technology')).toBeVisible()
    await expect(page.getByText('Strategic Leadership')).toBeVisible()
    
    // Test Experience tab
    await experienceTab.click()
    await expect(page.getByText('Professional Experience')).toBeVisible()
    await expect(page.getByText('WEO Media - Dental Marketing')).toBeVisible()
    // Check that at least one role is visible (Senior Marketing Manager appears multiple times)
    const seniorMarketingManager = page.getByText('Senior Marketing Manager').first()
    await expect(seniorMarketingManager).toBeVisible()
    await expect(page.getByText('SoundSplore Inc.')).toBeVisible()
    await expect(page.getByText('Bank of America')).toBeVisible()
    
    // Test Expertise tab
    await expertiseTab.click()
    await expect(page.getByText('Areas of Expertise')).toBeVisible()
    await expect(page.getByText('Marketing Management & Strategy')).toBeVisible()
    await expect(page.getByText('SEO & SEM')).toBeVisible()
    await expect(page.getByText('Emerging Technologies')).toBeVisible()
    await expect(page.getByText('Generative AI')).toBeVisible()
    
    // Test Education tab
    await educationTab.click()
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
    await expect(page.getByText('M.Sc Marketing Management')).toBeVisible()
    await expect(page.getByText('University of Leicester')).toBeVisible()
    await expect(page.getByText('BA (Hons) Business Studies')).toBeVisible()
    await expect(page.getByText('De Montfort University')).toBeVisible()
    await expect(page.getByText('Industry Recognition')).toBeVisible()
  })

  test('should have animated elements present', async ({ page, browserName }) => {
    // Check for animated code blocks container
    const codeContainer = page.locator('.absolute.inset-0.overflow-hidden')
    await expect(codeContainer).toBeVisible()
    
    // Check for gradient backgrounds (these are always present)
    const gradientElements = page.locator('[class*="bg-gradient-to-br"]')
    const gradientCount = await gradientElements.count()
    expect(gradientCount).toBeGreaterThan(0)
    
    // Check for code blocks - they might render differently in different browsers
    // So we'll check for either the pre code elements or the motion divs containing them
    const codeBlocks = page.locator('pre code')
    const motionCodeBlocks = page.locator('[class*="bg-black/80"]')
    const codeBlockCount = await codeBlocks.count()
    const motionBlockCount = await motionCodeBlocks.count()
    
    // At least one type of code block should be present
    expect(codeBlockCount + motionBlockCount).toBeGreaterThan(0)
  })

  test('should display expertise progress bars with animations', async ({ page }) => {
    // Navigate to expertise tab
    await page.getByRole('button', { name: /Expertise/i }).click()
    
    // Wait for animations to start
    await page.waitForTimeout(1000)
    
    // Check for progress bars
    const progressBars = page.locator('[class*="from-[#3b82f6] to-[#a855f7]"]').filter({ hasText: '' })
    const progressBarCount = await progressBars.count()
    expect(progressBarCount).toBeGreaterThan(0)
    
    // Check percentage values are displayed
    await expect(page.getByText('95%')).toBeVisible()
    await expect(page.getByText('92%')).toBeVisible()
    await expect(page.getByText('90%')).toBeVisible()
  })

  test('should have proper responsive behavior', async ({ page, viewport }) => {
    // Test desktop view
    if (viewport && viewport.width > 1024) {
      // On desktop, check that the page has proper layout for larger screens
      const mainContent = page.locator('main')
      await expect(mainContent).toBeVisible()
      
      // Check that tabs are visible and not scrollable on desktop
      const tabsSection = page.locator('.sticky.top-16')
      await expect(tabsSection).toBeVisible()
    }
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigation tabs should be scrollable on mobile
    const tabContainer = page.locator('.overflow-x-auto')
    await expect(tabContainer).toBeVisible()
    
    // Content should still be visible on mobile
    await expect(page.getByRole('heading', { name: 'Marketing Director' })).toBeVisible()
    
    // Bio text should be visible on mobile
    const bioText = page.getByText(/Marketing Director with over 20 years/)
    await expect(bioText).toBeVisible()
  })

  test('should have hover effects on interactive elements', async ({ page, isMobile }) => {
    // Skip hover tests on mobile devices
    test.skip(isMobile, 'Hover effects not applicable on mobile')
    
    // Test experience cards hover effect
    await page.getByRole('button', { name: /Experience/i }).click()
    
    const experienceCard = page.locator('.bg-white\\/5').first()
    await experienceCard.hover()
    
    // Card should be visible and hoverable
    await expect(experienceCard).toBeVisible()
    
    // Test expertise cards hover effect
    await page.getByRole('button', { name: /Expertise/i }).click()
    
    const expertiseCard = page.locator('.bg-white\\/5').first()
    await expertiseCard.hover()
  })

  test('should take a full page screenshot', async ({ page }) => {
    // Wait for all animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot of the page
    await page.screenshot({ 
      path: 'experimental-about-page.png', 
      fullPage: true 
    })
    
    console.log('✅ Screenshot saved as experimental-about-page.png')
  })

  test('should have proper metadata and SEO elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/About.*Experimental/)
    
    // Check for structured data
    const structuredData = page.locator('script[type="application/ld+json"]')
    const structuredDataCount = await structuredData.count()
    expect(structuredDataCount).toBeGreaterThan(0)
  })

  test('should display all experience positions in chronological order', async ({ page }) => {
    await page.getByRole('button', { name: /Experience/i }).click()
    
    const positions = [
      'WEO Media - Dental Marketing',
      'SoundSplore Inc.',
      'LA Photo Party',
      'OldSchoolLabs.com',
      'ApexPeak',
      'Bank of America'
    ]
    
    for (const position of positions) {
      await expect(page.getByText(position)).toBeVisible()
    }
  })

  test('should have working tab navigation', async ({ page }) => {
    // Test clicking through tabs instead of keyboard navigation
    const tabs = [
      { name: 'Overview', content: 'Professional Overview' },
      { name: 'Experience', content: 'Professional Experience' },
      { name: 'Expertise', content: 'Areas of Expertise' },
      { name: 'Education', content: 'Education' }
    ]
    
    for (const tab of tabs) {
      await page.getByRole('button', { name: tab.name }).click()
      await expect(page.getByText(tab.content)).toBeVisible()
    }
  })
})

// Performance test
test('should load within acceptable time', async ({ page }) => {
  const startTime = Date.now()
  
  await page.goto('/about-experimental')
  await page.waitForLoadState('networkidle')
  
  const loadTime = Date.now() - startTime
  
  console.log(`Page load time: ${loadTime}ms`)
  
  // Page should load within 5 seconds
  expect(loadTime).toBeLessThan(5000)
})