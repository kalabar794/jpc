import { test, expect } from '@playwright/test'

test.describe('Experimental About Page - Updated', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about-experimental')
    await page.waitForLoadState('networkidle')
  })

  test('should load the page with hero section content', async ({ page }) => {
    // Check hero section elements
    await expect(page.getByRole('heading', { name: 'Jonathon Carter' })).toBeVisible()
    await expect(page.getByText('AI Marketing Professional with 20+ years')).toBeVisible()
    await expect(page.getByText('Remote / Global')).toBeVisible()
    
    // Check profile image
    const profileImage = page.locator('img[alt="Jonathon Carter - AI Marketing Professional"]')
    await expect(profileImage).toBeVisible()
  })

  test('should have accessibility features', async ({ page }) => {
    // Check ARIA labels
    await expect(page.getByLabel('Scroll to about section')).toBeVisible()
    await expect(page.getByLabel('Page scroll progress')).toBeVisible()
    
    // Check progressbar roles
    const progressBars = page.locator('[role="progressbar"]')
    const count = await progressBars.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display about section with animated counters', async ({ page }) => {
    // Scroll to about section
    await page.getByLabel('Scroll to about section').click()
    await page.waitForTimeout(1000)
    
    // Check section heading
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
    
    // Check counter values (they should be visible even if animation is disabled)
    await expect(page.getByText('20+')).toBeVisible()
    await expect(page.getByText('Years Experience')).toBeVisible()
    await expect(page.getByText('9+')).toBeVisible()
    await expect(page.getByText('Industries')).toBeVisible()
    await expect(page.getByText('100+')).toBeVisible()
    await expect(page.getByText('Campaigns')).toBeVisible()
  })

  test('should display skills with progress bars', async ({ page }) => {
    // Check skills section
    await expect(page.getByText('Skills & Expertise')).toBeVisible()
    
    // Check skill bars are present
    const skillBars = [
      'Digital Marketing Strategy',
      'SEO/SEM & Analytics',
      'AI & Marketing Automation',
      'Content Marketing',
      'Brand Management',
      'Team Leadership'
    ]
    
    for (const skill of skillBars) {
      await expect(page.getByText(skill).first()).toBeVisible()
    }
  })

  test('should display experience timeline', async ({ page }) => {
    // Check experience section
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
    
    // Check companies are visible
    const companies = [
      'WEO Media - Dental Marketing',
      'SoundSplore Inc.',
      'LA Photo Party',
      'OldSchoolLabs.com',
      'ApexPeak',
      'Bank of America'
    ]
    
    for (const company of companies) {
      await expect(page.getByText(company).first()).toBeVisible()
    }
  })

  test('should display featured projects', async ({ page }) => {
    // Check projects section
    await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible()
    
    // Check project cards
    await expect(page.getByText('CompetitorScope')).toBeVisible()
    await expect(page.getByText('AI Landing Page Generator')).toBeVisible()
    await expect(page.getByText('SEO PowerPack Pro')).toBeVisible()
    
    // Check View Project buttons
    const viewProjectButtons = page.getByText('View Project')
    const count = await viewProjectButtons.count()
    expect(count).toBe(3)
  })

  test('should have contact section with accessible buttons', async ({ page }) => {
    // Check contact section
    await expect(page.getByRole('heading', { name: "Let's Work Together" })).toBeVisible()
    
    // Check buttons have ARIA labels
    await expect(page.getByLabel('Send email to get in touch')).toBeVisible()
    await expect(page.getByLabel('Visit GitHub profile')).toBeVisible()
    await expect(page.getByLabel('Visit LinkedIn profile')).toBeVisible()
  })

  test('should handle prefers-reduced-motion', async ({ page, context }) => {
    // Enable reduced motion
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
    })
    
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Check that animations are disabled
    const animatedElements = page.locator('.animate-float, .animate-pulse, .animate-bounce')
    const count = await animatedElements.count()
    expect(count).toBe(0)
  })

  test('should have proper responsive behavior', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Content should still be visible on mobile
    await expect(page.getByRole('heading', { name: 'Jonathon Carter' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
    
    // Test on desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Content should be visible on desktop
    await expect(page.getByRole('heading', { name: 'Jonathon Carter' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible()
  })

  test('should take a full page screenshot', async ({ page }) => {
    await page.waitForTimeout(2000) // Wait for animations
    await page.screenshot({ 
      path: 'experimental-about-page-updated.png', 
      fullPage: true 
    })
    console.log('✅ Screenshot saved as experimental-about-page-updated.png')
  })
})

test('should load within acceptable time', async ({ page }) => {
  const startTime = Date.now()
  await page.goto('/about-experimental')
  await page.waitForLoadState('networkidle')
  const loadTime = Date.now() - startTime
  
  expect(loadTime).toBeLessThan(5000) // Page should load in under 5 seconds
  console.log(`Page load time: ${loadTime}ms`)
})