import { test, expect } from '@playwright/test'

test.describe('CMS Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin panel
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/admin/')
    
    // Wait for CMS to load
    await page.waitForLoadState('networkidle')
    
    // Wait a bit more for CMS to fully initialize
    await page.waitForTimeout(3000)
  })

  test('About Page appears as separate collection in admin', async ({ page }) => {
    // Wait for the collections to load
    await page.waitForSelector('[data-testid="collection-list"], .collection-list, nav')
    
    // Look for About Page collection
    const aboutCollection = page.locator('text="About Page"').first()
    await expect(aboutCollection).toBeVisible()
    
    // Verify it's not under Settings
    const settingsSection = page.locator('text="Settings"')
    if (await settingsSection.isVisible()) {
      // If Settings exists, About Page should not be nested under it
      const settingsContainer = settingsSection.locator('..')
      const aboutInSettings = settingsContainer.locator('text="About Page"')
      await expect(aboutInSettings).not.toBeVisible()
    }
  })

  test('About Page CMS editing functionality', async ({ page }) => {
    // Click on About Page collection
    await page.click('text="About Page"')
    
    // Wait for the About Page entry to load
    await page.waitForSelector('text="About Page Content"', { timeout: 10000 })
    
    // Click on the About Page Content entry
    await page.click('text="About Page Content"')
    
    // Wait for the editor to load
    await page.waitForSelector('.cms-editor, [data-testid="editor"]', { timeout: 10000 })
    
    // Check for title field
    const titleField = page.locator('input[placeholder*="title"], input[name="title"], label:has-text("Title") + input')
    await expect(titleField).toBeVisible()
    
    // Check for body/content field
    const bodyField = page.locator('textarea, .rich-text-editor, .markdown-editor')
    await expect(bodyField).toBeVisible()
    
    // Verify we can edit the title
    await titleField.fill('Test About Title')
    await expect(titleField).toHaveValue('Test About Title')
    
    // Reset the title
    await titleField.fill('About Jonathon')
  })

  test('Gallery AI collection exists and is editable', async ({ page }) => {
    // Look for AI Gallery collection
    const galleryCollection = page.locator('text="AI Gallery"').first()
    await expect(galleryCollection).toBeVisible()
    
    // Click on gallery collection
    await galleryCollection.click()
    
    // Look for "New" or "Create" button to add gallery items
    const newButton = page.locator('button:has-text("New"), button:has-text("Create"), .new-button')
    await expect(newButton.first()).toBeVisible()
  })

  test('Gallery Photography collection exists and is editable', async ({ page }) => {
    // Look for Photography Gallery collection
    const photographyCollection = page.locator('text="Photography Gallery"').first()
    await expect(photographyCollection).toBeVisible()
    
    // Click on photography collection
    await photographyCollection.click()
    
    // Look for "New" or "Create" button
    const newButton = page.locator('button:has-text("New"), button:has-text("Create"), .new-button')
    await expect(newButton.first()).toBeVisible()
  })

  test('Blog collection exists and allows post creation', async ({ page }) => {
    // Look for Blog Posts collection
    const blogCollection = page.locator('text="Blog Posts"').first()
    await expect(blogCollection).toBeVisible()
    
    // Click on blog collection
    await blogCollection.click()
    
    // Look for "New" or "Create" button
    const newButton = page.locator('button:has-text("New"), button:has-text("Create"), .new-button')
    await expect(newButton.first()).toBeVisible()
    
    // Click new button to test creation flow
    await newButton.first().click()
    
    // Wait for editor to load
    await page.waitForSelector('.cms-editor, [data-testid="editor"]', { timeout: 10000 })
    
    // Check for required fields (title, content)
    const titleField = page.locator('input[placeholder*="title"], input[name="title"], label:has-text("Title") + input')
    await expect(titleField).toBeVisible()
    
    const bodyField = page.locator('textarea, .rich-text-editor, .markdown-editor')
    await expect(bodyField).toBeVisible()
  })

  test('Projects collection exists and allows project creation', async ({ page }) => {
    // Look for Projects collection
    const projectsCollection = page.locator('text="Projects"').first()
    await expect(projectsCollection).toBeVisible()
    
    // Click on projects collection
    await projectsCollection.click()
    
    // Look for "New" or "Create" button
    const newButton = page.locator('button:has-text("New"), button:has-text("Create"), .new-button')
    await expect(newButton.first()).toBeVisible()
    
    // Click new button to test creation flow
    await newButton.first().click()
    
    // Wait for editor to load
    await page.waitForSelector('.cms-editor, [data-testid="editor"]', { timeout: 10000 })
    
    // Check for required fields
    const titleField = page.locator('input[placeholder*="title"], input[name="title"], label:has-text("Title") + input')
    await expect(titleField).toBeVisible()
    
    const descriptionField = page.locator('textarea[placeholder*="description"], input[name="description"], label:has-text("Description") + input, label:has-text("Description") + textarea')
    await expect(descriptionField).toBeVisible()
  })

  test('Site Settings collection exists (excluding social media)', async ({ page }) => {
    // Look for Settings collection
    const settingsCollection = page.locator('text="Settings"').first()
    await expect(settingsCollection).toBeVisible()
    
    // Click on settings collection
    await settingsCollection.click()
    
    // Look for site settings entry
    const settingsEntry = page.locator('text="Site Settings"').first()
    await expect(settingsEntry).toBeVisible()
    
    // Click on settings entry
    await settingsEntry.click()
    
    // Wait for editor to load
    await page.waitForSelector('.cms-editor, [data-testid="editor"]', { timeout: 10000 })
    
    // Check for basic site settings fields (excluding social media)
    const titleField = page.locator('input[placeholder*="title"], input[name="title"], label:has-text("Site Title") + input, label:has-text("Title") + input')
    await expect(titleField).toBeVisible()
    
    const descriptionField = page.locator('textarea[placeholder*="description"], input[name="description"], label:has-text("Description") + input, label:has-text("Description") + textarea')
    await expect(descriptionField).toBeVisible()
    
    // Verify social media fields are NOT present (as requested to exclude them)
    const socialMediaField = page.locator('label:has-text("Social"), input[name*="social"], input[name*="twitter"], input[name*="facebook"], input[name*="instagram"]')
    await expect(socialMediaField.first()).not.toBeVisible()
  })
})

test.describe('Content Display Tests', () => {
  test('About page displays CMS content correctly', async ({ page }) => {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/about')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check that content is displayed
    await expect(page.locator('h1').first()).toBeVisible()
    
    // Check for About page specific content
    const aboutContent = page.locator('text="About"').first()
    await expect(aboutContent).toBeVisible()
  })

  test('Gallery AI page displays correctly', async ({ page }) => {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/gallery/ai')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check for page title
    await expect(page.locator('h1:has-text("AI Gallery")')).toBeVisible()
    
    // Check for either gallery grid (if images exist) or empty state message
    const galleryGrid = page.locator('.grid')
    const emptyState = page.locator('text="No AI Artworks Yet"')
    
    const hasGrid = await galleryGrid.count() > 0
    const hasEmptyState = await emptyState.count() > 0
    
    expect(hasGrid || hasEmptyState).toBeTruthy()
  })

  test('Gallery Photography page displays correctly', async ({ page }) => {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/gallery/photography')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check for page title
    await expect(page.locator('h1:has-text("Photography")')).toBeVisible()
    
    // Check for either gallery grid (if images exist) or empty state message
    const galleryGrid = page.locator('.grid')
    const emptyState = page.locator('text="No Photos Yet"')
    
    const hasGrid = await galleryGrid.count() > 0
    const hasEmptyState = await emptyState.count() > 0
    
    expect(hasGrid || hasEmptyState).toBeTruthy()
  })

  test('Blog page displays correctly', async ({ page }) => {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/blog')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check for blog posts or "no posts" message
    const blogContent = page.locator('h1').first()
    await expect(blogContent).toBeVisible()
  })

  test('Projects page displays correctly', async ({ page }) => {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/projects')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check for projects content
    const projectsContent = page.locator('h1').first()
    await expect(projectsContent).toBeVisible()
  })

  test('Site settings are reflected in metadata', async ({ page }) => {
    await page.goto('https://stalwart-smakager-b57fc1.netlify.app/')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check that title reflects CMS settings (either old or new format)
    const title = await page.title()
    expect(title).toMatch(/Jonathon.*(?:AI|Marketing)/)
    
    // Check that meta description exists and contains relevant content
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content')
    expect(metaDescription).toMatch(/marketing|AI|automation/i)
    
    // Check Open Graph title exists
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content')
    expect(ogTitle).toMatch(/Jonathon/)
    
    // Check Open Graph description exists
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content')
    expect(ogDescription).toMatch(/marketing|AI|automation/i)
    
    // Check site name exists
    const siteName = await page.getAttribute('meta[property="og:site_name"]', 'content')
    expect(siteName).toMatch(/Jonathon/)
  })
})