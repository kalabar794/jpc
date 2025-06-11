import { test, expect } from '@playwright/test'

const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Projects', url: '/projects' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact', url: '/contact' },
  { name: 'AI Gallery', url: '/gallery/ai' },
  { name: 'Photography', url: '/gallery/photography' },
  { name: 'Resources', url: '/resources' }
]

test.describe('Performance Audit - Performance Standards Achievement', () => {
  for (const page of pages) {
    test.describe(`${page.name} Performance`, () => {
      
      test('Core Web Vitals in "Good" range', async ({ page: playwright }) => {
        await playwright.goto(page.url, { waitUntil: 'networkidle' })
        
        // Measure Core Web Vitals
        const vitals = await playwright.evaluate(() => {
          return new Promise<{
            lcp: number
            fid: number
            cls: number
            fcp: number
            ttfb: number
          }>((resolve) => {
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
              vitals.cls = entries.reduce((cls, entry: any) => cls + entry.value, 0)
            }).observe({ entryTypes: ['layout-shift'] })

            // Time to First Byte
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            vitals.ttfb = navigation.responseStart - navigation.requestStart

            setTimeout(() => resolve(vitals), 4000)
          })
        })

        console.log(`${page.name} Core Web Vitals:`, vitals)

        // "Good" thresholds according to Google
        expect(vitals.lcp, `LCP should be < 2.5s (got ${vitals.lcp}ms)`).toBeLessThan(2500)
        expect(vitals.cls, `CLS should be < 0.1 (got ${vitals.cls})`).toBeLessThan(0.1)
        expect(vitals.ttfb, `TTFB should be < 800ms (got ${vitals.ttfb}ms)`).toBeLessThan(800)
        expect(vitals.fcp, `FCP should be < 1.8s (got ${vitals.fcp}ms)`).toBeLessThan(1800)
      })

      test('Sub-2 second load time', async ({ page: playwright }) => {
        const startTime = Date.now()
        await playwright.goto(page.url, { waitUntil: 'domcontentloaded' })
        const loadTime = Date.now() - startTime
        
        console.log(`${page.name} load time: ${loadTime}ms`)
        expect(loadTime, `Load time should be < 2000ms (got ${loadTime}ms)`).toBeLessThan(2000)
        
        // Also check when page is fully loaded
        const startTime2 = Date.now()
        await playwright.goto(page.url, { waitUntil: 'networkidle' })
        const fullLoadTime = Date.now() - startTime2
        
        console.log(`${page.name} full load time: ${fullLoadTime}ms`)
        expect(fullLoadTime, `Full load time should be < 2500ms (got ${fullLoadTime}ms)`).toBeLessThan(2500)
      })

      test('Resource optimization audit', async ({ page: playwright }) => {
        const resources: Array<{
          url: string
          type: string
          size: number
          duration: number
        }> = []

        playwright.on('response', response => {
          const request = response.request()
          const size = parseInt(response.headers()['content-length'] || '0')
          
          resources.push({
            url: request.url(),
            type: request.resourceType(),
            size: size,
            duration: response.timing().responseEnd
          })
        })

        await playwright.goto(page.url, { waitUntil: 'networkidle' })

        // Analyze resource performance
        const scripts = resources.filter(r => r.type === 'script')
        const stylesheets = resources.filter(r => r.type === 'stylesheet')
        const images = resources.filter(r => r.type === 'image')
        const totalSize = resources.reduce((sum, r) => sum + r.size, 0)

        console.log(`${page.name} Resource Analysis:`)
        console.log(`- Total resources: ${resources.length}`)
        console.log(`- Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
        console.log(`- Scripts: ${scripts.length} (${(scripts.reduce((sum, r) => sum + r.size, 0) / 1024).toFixed(2)} KB)`)
        console.log(`- Stylesheets: ${stylesheets.length} (${(stylesheets.reduce((sum, r) => sum + r.size, 0) / 1024).toFixed(2)} KB)`)
        console.log(`- Images: ${images.length} (${(images.reduce((sum, r) => sum + r.size, 0) / 1024).toFixed(2)} KB)`)

        // Performance thresholds
        expect(totalSize, 'Total page size should be < 3MB').toBeLessThan(3 * 1024 * 1024)
        expect(scripts.length, 'Should have reasonable number of scripts').toBeLessThan(30)
        expect(images.filter(img => img.size > 500000).length, 'No images should be > 500KB').toBe(0)
      })

      test('Image optimization check', async ({ page: playwright }) => {
        await playwright.goto(page.url, { waitUntil: 'networkidle' })

        // Check for lazy loading
        const lazyImages = await playwright.$$eval('img[loading="lazy"]', imgs => imgs.length)
        const totalImages = await playwright.$$eval('img', imgs => imgs.length)
        
        if (totalImages > 0) {
          const lazyPercentage = (lazyImages / totalImages) * 100
          console.log(`${page.name} Image Optimization:`)
          console.log(`- Total images: ${totalImages}`)
          console.log(`- Lazy loaded: ${lazyImages} (${lazyPercentage.toFixed(1)}%)`)
          
          // Most images should be lazy loaded (except above the fold)
          expect(lazyPercentage, 'At least 50% of images should be lazy loaded').toBeGreaterThan(50)
        }

        // Check for next/image usage
        const nextImages = await playwright.$$eval('img[data-nimg]', imgs => imgs.length)
        console.log(`- Next.js optimized images: ${nextImages}`)
      })

      test('SEO performance indicators', async ({ page: playwright }) => {
        await playwright.goto(page.url, { waitUntil: 'networkidle' })

        // Check meta tags
        const title = await playwright.$eval('title', el => el.textContent)
        const description = await playwright.$eval('meta[name="description"]', el => el.getAttribute('content'))
        const keywords = await playwright.$eval('meta[name="keywords"]', el => el.getAttribute('content')).catch(() => null)
        
        // Check for AI marketing consultant related terms
        const aiMarketingTerms = [
          'AI marketing consultant',
          'AI marketing strategy', 
          'marketing automation',
          'AI-powered marketing',
          'machine learning marketing'
        ]

        const pageText = await playwright.textContent('body')
        const foundTerms = aiMarketingTerms.filter(term => 
          title?.toLowerCase().includes(term.toLowerCase()) ||
          description?.toLowerCase().includes(term.toLowerCase()) ||
          pageText?.toLowerCase().includes(term.toLowerCase())
        )

        console.log(`${page.name} SEO Analysis:`)
        console.log(`- Title: ${title}`)
        console.log(`- Description length: ${description?.length || 0}`)
        console.log(`- AI Marketing terms found: ${foundTerms.length}/${aiMarketingTerms.length}`)
        console.log(`- Terms: ${foundTerms.join(', ')}`)

        // SEO requirements
        expect(title, 'Page should have title').toBeTruthy()
        expect(title?.length || 0, 'Title should be 30-60 characters').toBeGreaterThan(30)
        expect(title?.length || 0, 'Title should be 30-60 characters').toBeLessThan(60)
        expect(description, 'Page should have meta description').toBeTruthy()
        expect(description?.length || 0, 'Description should be 120-160 characters').toBeGreaterThan(120)
        expect(description?.length || 0, 'Description should be 120-160 characters').toBeLessThan(160)
        
        // Should have relevant AI marketing terms
        expect(foundTerms.length, 'Should contain relevant AI marketing terms').toBeGreaterThan(0)
      })

      test('PageSpeed simulation score', async ({ page: playwright }) => {
        await playwright.goto(page.url, { waitUntil: 'networkidle' })

        // Simulate PageSpeed-like metrics
        const metrics = await playwright.evaluate(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          const paintEntries = performance.getEntriesByType('paint')
          
          return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            loadComplete: navigation.loadEventEnd - navigation.navigationStart,
            firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            resourceCount: performance.getEntriesByType('resource').length,
            transferSize: performance.getEntriesByType('navigation')[0].transferSize || 0
          }
        })

        // Calculate a simplified PageSpeed-like score (0-100)
        let score = 100

        // Penalize slow metrics
        if (metrics.firstContentfulPaint > 1800) score -= 15
        if (metrics.domContentLoaded > 2000) score -= 15
        if (metrics.loadComplete > 3000) score -= 15
        if (metrics.resourceCount > 50) score -= 10
        if (metrics.transferSize > 2000000) score -= 10

        console.log(`${page.name} PageSpeed Simulation:`)
        console.log(`- FCP: ${metrics.firstContentfulPaint.toFixed(0)}ms`)
        console.log(`- DCL: ${metrics.domContentLoaded.toFixed(0)}ms`)
        console.log(`- Load: ${metrics.loadComplete.toFixed(0)}ms`)
        console.log(`- Resources: ${metrics.resourceCount}`)
        console.log(`- Transfer size: ${(metrics.transferSize / 1024).toFixed(0)}KB`)
        console.log(`- Estimated score: ${score}/100`)

        // Target 90+ score
        expect(score, `PageSpeed score should be 90+ (got ${score})`).toBeGreaterThanOrEqual(90)
      })
    })
  }

  test('Overall performance benchmark', async ({ page }) => {
    const results: Array<{
      page: string
      lcp: number
      cls: number
      fcp: number
      loadTime: number
    }> = []

    for (const testPage of pages.slice(0, 5)) { // Test first 5 pages
      await page.goto(testPage.url, { waitUntil: 'networkidle' })
      
      const startTime = Date.now()
      await page.reload({ waitUntil: 'domcontentloaded' })
      const loadTime = Date.now() - startTime

      const vitals = await page.evaluate(() => {
        return new Promise<{ lcp: number; cls: number; fcp: number }>((resolve) => {
          const metrics = { lcp: 0, cls: 0, fcp: 0 }

          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            metrics.lcp = entries[entries.length - 1]?.startTime || 0
          }).observe({ entryTypes: ['largest-contentful-paint'] })

          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            metrics.cls = entries.reduce((sum, entry: any) => sum + entry.value, 0)
          }).observe({ entryTypes: ['layout-shift'] })

          const paintEntries = performance.getEntriesByType('paint')
          metrics.fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0

          setTimeout(() => resolve(metrics), 2000)
        })
      })

      results.push({
        page: testPage.name,
        lcp: vitals.lcp,
        cls: vitals.cls,
        fcp: vitals.fcp,
        loadTime
      })
    }

    console.log('\n=== OVERALL PERFORMANCE BENCHMARK ===')
    results.forEach(result => {
      console.log(`${result.page}:`)
      console.log(`  LCP: ${result.lcp.toFixed(0)}ms`)
      console.log(`  CLS: ${result.cls.toFixed(3)}`)
      console.log(`  FCP: ${result.fcp.toFixed(0)}ms`)
      console.log(`  Load: ${result.loadTime}ms`)
    })

    // Calculate averages
    const avgLcp = results.reduce((sum, r) => sum + r.lcp, 0) / results.length
    const avgCls = results.reduce((sum, r) => sum + r.cls, 0) / results.length
    const avgFcp = results.reduce((sum, r) => sum + r.fcp, 0) / results.length
    const avgLoad = results.reduce((sum, r) => sum + r.loadTime, 0) / results.length

    console.log(`\nAVERAGES:`)
    console.log(`  LCP: ${avgLcp.toFixed(0)}ms`)
    console.log(`  CLS: ${avgCls.toFixed(3)}`)
    console.log(`  FCP: ${avgFcp.toFixed(0)}ms`)
    console.log(`  Load: ${avgLoad.toFixed(0)}ms`)

    // Overall performance goals
    expect(avgLcp, 'Average LCP should be < 2.5s').toBeLessThan(2500)
    expect(avgCls, 'Average CLS should be < 0.1').toBeLessThan(0.1)
    expect(avgFcp, 'Average FCP should be < 1.8s').toBeLessThan(1800)
    expect(avgLoad, 'Average load time should be < 2s').toBeLessThan(2000)
  })
})