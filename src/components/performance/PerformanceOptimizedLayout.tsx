'use client'

import { useEffect } from 'react'
import { optimizeRuntime, measurePerformance } from '@/lib/performance'

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode
  pageType?: 'homepage' | 'about' | 'blog' | 'projects' | 'contact' | 'resources'
}

export default function PerformanceOptimizedLayout({ 
  children, 
  pageType = 'homepage' 
}: PerformanceOptimizedLayoutProps) {
  useEffect(() => {
    const performanceMeasure = measurePerformance(`${pageType}-render`)
    performanceMeasure?.start()

    // Optimize runtime performance
    optimizeRuntime()

    // Measure page performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP for ${pageType}:`, entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          console.log(`FID for ${pageType}:`, (entry as any).processingStart - entry.startTime)
        }
        if (entry.entryType === 'layout-shift') {
          console.log(`CLS for ${pageType}:`, (entry as any).value)
        }
      })
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    // Clean up performance marks on unmount
    return () => {
      performanceMeasure?.end()
      observer.disconnect()
    }
  }, [pageType])

  return (
    <div className="performance-optimized-layout">
      {/* Critical above-the-fold content */}
      <style jsx>{`
        .performance-optimized-layout {
          /* Force hardware acceleration */
          transform: translateZ(0);
          /* Optimize font rendering */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          /* Optimize text rendering */
          text-rendering: optimizeLegibility;
        }
        
        /* Critical CSS for LCP optimization */
        .hero-section {
          contain: layout style paint;
          will-change: transform;
        }
        
        /* Optimize animations */
        .motion-element {
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        
        /* Optimize images */
        img {
          content-visibility: auto;
          contain-intrinsic-size: 300px 200px;
        }
      `}</style>
      
      {children}
    </div>
  )
}