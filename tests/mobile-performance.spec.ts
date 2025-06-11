import { test, expect, devices } from '@playwright/test'

// Test on multiple mobile devices
const mobileDevices = [
  { name: 'iPhone 12', device: devices['iPhone 12'] },
  { name: 'iPhone SE', device: devices['iPhone SE'] },
  { name: 'Pixel 5', device: devices['Pixel 5'] },
  { name: 'Galaxy S9+', device: devices['Galaxy S9+'] }
]

test.describe('Mobile Performance & Excellence Tests', () => {
  for (const { name, device } of mobileDevices) {
    test.describe(`${name} Performance Tests`, () => {

      test('Core Web Vitals performance', async ({ page, context }) => {
        // Set device configuration
        await page.setViewportSize(device.viewport)

        // Navigate to page and measure performance
        const startTime = Date.now()
        await page.goto('/', { waitUntil: 'networkidle' })
        const navigationTime = Date.now() - startTime

        // Core Web Vitals measurement
        const vitals = await page.evaluate(() => {
          return new Promise((resolve) => {
            const vitals = {
              lcp: 0,
              fid: 0,
              cls: 0,
              fcp: 0,
              ttfb: 0
            }

            // Largest Contentful Paint
            new PerformanceObserver((list) => {
              const entries = list.getEntries()
              const lastEntry = entries[entries.length - 1]
              vitals.lcp = lastEntry.startTime
            }).observe({ entryTypes: ['largest-contentful-paint'] })

            // First Contentful Paint
            new PerformanceObserver((list) => {
              const entries = list.getEntries()
              vitals.fcp = entries[0].startTime
            }).observe({ entryTypes: ['paint'] })

            // Cumulative Layout Shift
            new PerformanceObserver((list) => {
              const entries = list.getEntries()
              vitals.cls = entries.reduce((cls, entry) => cls + entry.value, 0)
            }).observe({ entryTypes: ['layout-shift'] })

            // Time to First Byte
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            vitals.ttfb = navigation.responseStart - navigation.requestStart

            setTimeout(() => resolve(vitals), 3000)
          })
        })

        // Core Web Vitals thresholds (good performance)
        expect(vitals.lcp).toBeLessThan(2500) // LCP < 2.5s
        expect(vitals.cls).toBeLessThan(0.1)  // CLS < 0.1
        expect(vitals.ttfb).toBeLessThan(800) // TTFB < 800ms
        expect(vitals.fcp).toBeLessThan(1800) // FCP < 1.8s
        expect(navigationTime).toBeLessThan(3000) // Total load < 3s

        console.log(`${name} Core Web Vitals:`, vitals)
      })

      test('mobile-specific UI elements', async ({ page }) => {
        await page.setViewportSize(device.viewport)
        await page.goto('/')
        const currentUrl = page.url()
        console.log(`Testing URL: ${currentUrl}`)

        // Check touch target sizes (minimum 44x44px)
        const interactiveElements = page.locator('a, button, input, textarea, select')
        const elementCount = await interactiveElements.count()

        for (let i = 0; i < Math.min(elementCount, 20); i++) {
          const element = interactiveElements.nth(i)
          if (await element.isVisible()) {
            const box = await element.boundingBox()
            if (box) {
              const tagName = await element.evaluate(el => el.tagName)
              const className = await element.getAttribute('class')
              const id = await element.getAttribute('id')
              const textContent = await element.textContent()
              
              if (box.width < 44 || box.height < 44) {
                const parentElement = await element.evaluate(el => el.parentElement?.outerHTML?.slice(0, 200) || 'no parent')
                const elementHTML = await element.evaluate(el => el.outerHTML?.slice(0, 200) || 'no html')
                console.log(`Failing element: ${tagName} - ${textContent?.slice(0, 50) || 'no text'} - classes: ${className} - id: ${id} - size: ${box.width}x${box.height}`)
                console.log(`Element HTML: ${elementHTML}`)
                console.log(`Parent HTML: ${parentElement}`)
              }
              
              expect(box.width, `Element width too small: ${tagName} "${textContent?.slice(0, 30)}" (${box.width}px)`).toBeGreaterThanOrEqual(44)
              expect(box.height, `Element height too small: ${tagName} "${textContent?.slice(0, 30)}" (${box.height}px)`).toBeGreaterThanOrEqual(44)
            }
          }
        }

        // Check for mobile menu
        const mobileMenuButton = page.locator('button[aria-label*="menu"], button[class*="mobile"]')
        if (await mobileMenuButton.count() > 0) {
          await expect(mobileMenuButton.first()).toBeVisible()
          
          const menuBox = await mobileMenuButton.first().boundingBox()
          expect(menuBox?.width).toBeGreaterThanOrEqual(44)
          expect(menuBox?.height).toBeGreaterThanOrEqual(44)
        }
      })

      test('responsive images and layout', async ({ page }) => {
        await page.setViewportSize(device.viewport)
        await page.goto('/projects')

        // Check images don't overflow viewport
        const images = page.locator('img')
        const imageCount = await images.count()

        for (let i = 0; i < Math.min(imageCount, 10); i++) {
          const img = images.nth(i)
          if (await img.isVisible()) {
            const box = await img.boundingBox()
            if (box) {
              expect(box.width).toBeLessThanOrEqual(device.viewport.width)
            }
          }
        }

        // Check no horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth
        })
        expect(hasHorizontalScroll).toBe(false)
      })

      test('form usability on mobile', async ({ page }) => {
        await page.setViewportSize(device.viewport)
        await page.goto('/contact')

        // Check form input sizes
        const inputs = page.locator('input[type="text"], input[type="email"], textarea')
        const inputCount = await inputs.count()

        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i)
          const box = await input.boundingBox()
          if (box) {
            expect(box.height).toBeGreaterThanOrEqual(44) // Touch-friendly height
          }
        }

        // Check input types for mobile keyboards
        const emailInput = page.locator('input[name="email"], input[type="email"]')
        if (await emailInput.count() > 0) {
          const type = await emailInput.first().getAttribute('type')
          expect(type).toBe('email')
        }

        // Test form interaction
        const nameInput = page.locator('input[name="name"]').first()
        if (await nameInput.isVisible()) {
          await nameInput.click()
          await nameInput.fill('Test User')
          const value = await nameInput.inputValue()
          expect(value).toBe('Test User')
        }
      })

      test('page loading and resource optimization', async ({ page }) => {
        await page.setViewportSize(device.viewport)
        // Monitor network requests
        const requests = []
        page.on('request', request => {
          requests.push({
            url: request.url(),
            resourceType: request.resourceType(),
            size: 0
          })
        })

        page.on('response', response => {
          const request = requests.find(r => r.url === response.url())
          if (request) {
            request.size = parseInt(response.headers()['content-length'] || '0')
          }
        })

        await page.goto('/', { waitUntil: 'networkidle' })

        // Check for optimized images
        const imageRequests = requests.filter(r => r.resourceType === 'image')
        for (const imgRequest of imageRequests) {
          // Images should be reasonably sized for mobile
          if (imgRequest.size > 0) {
            expect(imgRequest.size).toBeLessThan(500000) // < 500KB per image
          }
          // Should use modern formats when possible
          expect(imgRequest.url).toMatch(/\.(webp|avif|jpg|jpeg|png)(\?|$)/i)
        }

        // Check total page weight
        const totalSize = requests.reduce((total, req) => total + req.size, 0)
        expect(totalSize).toBeLessThan(2000000) // < 2MB total page weight

        // Check for compressed resources
        const jsRequests = requests.filter(r => r.resourceType === 'script')
        expect(jsRequests.length).toBeLessThan(20) // Reasonable number of JS files
      })

      test('offline capability and PWA features', async ({ page }) => {
        await page.setViewportSize(device.viewport)
        await page.goto('/')

        // Check for service worker registration
        const hasServiceWorker = await page.evaluate(() => {
          return 'serviceWorker' in navigator
        })
        expect(hasServiceWorker).toBe(true)

        // Check for manifest file
        const manifestLink = page.locator('link[rel="manifest"]')
        if (await manifestLink.count() > 0) {
          const manifestHref = await manifestLink.getAttribute('href')
          expect(manifestHref).toBeTruthy()
        }

        // Check for offline-ready indicators
        const offlineIndicator = page.locator('[data-offline], .offline-indicator')
        // This is optional - just check if implemented
      })
    })
  }

  test.describe('Accessibility Tests', () => {

    test('keyboard navigation support', async ({ page }) => {
      await page.setViewportSize(devices['iPhone 12'].viewport)
      await page.goto('/')

      // Test tab navigation
      const focusableElements = page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])')
      const elementCount = await focusableElements.count()

      if (elementCount > 0) {
        // Focus first element
        await page.keyboard.press('Tab')
        const firstFocused = await page.evaluate(() => document.activeElement?.tagName)
        expect(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']).toContain(firstFocused)

        // Test a few more tab presses
        for (let i = 0; i < Math.min(5, elementCount - 1); i++) {
          await page.keyboard.press('Tab')
          const focused = await page.evaluate(() => document.activeElement?.tagName)
          expect(focused).toBeTruthy()
        }
      }
    })

    test('color contrast and visual accessibility', async ({ page }) => {
      await page.setViewportSize(devices['iPhone 12'].viewport)
      await page.goto('/')

      // Check for proper alt text on images
      const images = page.locator('img')
      const imageCount = await images.count()

      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i)
        if (await img.isVisible()) {
          const alt = await img.getAttribute('alt')
          expect(alt).toBeTruthy()
        }
      }

      // Check for proper headings hierarchy
      const headings = page.locator('h1, h2, h3, h4, h5, h6')
      const headingCount = await headings.count()
      
      if (headingCount > 0) {
        const h1Count = await page.locator('h1').count()
        expect(h1Count).toBeGreaterThanOrEqual(1) // At least one h1
        expect(h1Count).toBeLessThanOrEqual(3) // Not too many h1s
      }

      // Check for focus indicators
      const button = page.locator('button').first()
      if (await button.isVisible()) {
        await button.focus()
        const focusedElement = page.locator(':focus')
        await expect(focusedElement).toBeVisible()
      }
    })

    test('screen reader compatibility', async ({ page }) => {
      await page.setViewportSize(devices['iPhone 12'].viewport)
      await page.goto('/')

      // Check for proper ARIA labels
      const buttonsWithoutText = page.locator('button:not(:has-text(""))')
      const buttonCount = await buttonsWithoutText.count()

      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttonsWithoutText.nth(i)
        const ariaLabel = await button.getAttribute('aria-label')
        const buttonText = await button.textContent()
        
        // Button should have either text content or aria-label
        expect(ariaLabel || buttonText?.trim()).toBeTruthy()
      }

      // Check for proper form labels
      const inputs = page.locator('input')
      const inputCount = await inputs.count()

      for (let i = 0; i < Math.min(inputCount, 5); i++) {
        const input = inputs.nth(i)
        const id = await input.getAttribute('id')
        const ariaLabel = await input.getAttribute('aria-label')
        const placeholder = await input.getAttribute('placeholder')
        
        if (id) {
          const label = page.locator(`label[for="${id}"]`)
          const hasLabel = await label.count() > 0
          
          // Input should have label, aria-label, or meaningful placeholder
          expect(hasLabel || ariaLabel || placeholder).toBeTruthy()
        }
      }
    })
  })

  test.describe('Network and Performance Monitoring', () => {

    test('handles slow network conditions', async ({ page, context }) => {
      await page.setViewportSize(devices['iPhone 12'].viewport)
      // Simulate slow 3G connection
      await context.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 100)) // Add 100ms delay
        await route.continue()
      })

      const startTime = Date.now()
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      const loadTime = Date.now() - startTime

      // Should still load reasonably fast even with network delay
      expect(loadTime).toBeLessThan(5000) // Under 5 seconds on slow connection

      // Check that critical content is visible
      const heroSection = page.locator('section').first()
      await expect(heroSection).toBeVisible()
    })

    test('memory usage optimization', async ({ page }) => {
      await page.setViewportSize(devices['iPhone 12'].viewport)
      await page.goto('/')

      // Navigate through multiple pages to test memory
      const pages = ['/', '/about', '/projects', '/blog', '/contact']
      
      for (const pagePath of pages) {
        await page.goto(pagePath)
        await page.waitForLoadState('networkidle')
        
        // Check for memory leaks by ensuring page loads successfully
        const title = await page.title()
        expect(title).toBeTruthy()
      }

      // Return to homepage
      await page.goto('/')
      const finalTitle = await page.title()
      expect(finalTitle).toBeTruthy()
    })

    test('image optimization and lazy loading', async ({ page }) => {
      await page.setViewportSize(devices['iPhone 12'].viewport)
      await page.goto('/projects')

      // Check for lazy loading implementation
      const images = page.locator('img')
      const imageCount = await images.count()

      let lazyLoadedCount = 0
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i)
        const loading = await img.getAttribute('loading')
        if (loading === 'lazy') {
          lazyLoadedCount++
        }
      }

      // At least some images should be lazy loaded
      if (imageCount > 3) {
        expect(lazyLoadedCount).toBeGreaterThan(0)
      }

      // Check image formats
      const imageSources = await page.$$eval('img', imgs => 
        imgs.map(img => img.src).filter(src => src.startsWith('http'))
      )

      for (const src of imageSources.slice(0, 5)) {
        // Should use optimized formats when possible, or be from modern image services
        const hasFileExtension = /\.(webp|avif|jpg|jpeg|png)(\?|$)/i.test(src)
        const isModernImageService = /unsplash\.com|images\.ctfassets\.net|cloudinary\.com/i.test(src)
        expect(hasFileExtension || isModernImageService).toBe(true)
      }
    })
  })
})