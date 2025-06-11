/**
 * Performance optimization utilities for achieving 90+ PageSpeed scores
 */

import { Metadata } from 'next'

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Critical styles for LCP optimization */
  .hero-critical {
    display: block;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .nav-critical {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9);
  }
  
  .content-critical {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
`

// Preload critical resources
export function generatePreloadLinks(resources: string[]): Record<string, any> {
  return resources.reduce((acc, resource) => {
    const key = `preload-${resource.replace(/[^a-zA-Z0-9]/g, '-')}`
    acc[key] = {
      rel: 'preload',
      href: resource,
      as: resource.endsWith('.woff2') ? 'font' : 
          resource.endsWith('.css') ? 'style' : 
          resource.endsWith('.js') ? 'script' : 'fetch',
      crossOrigin: resource.endsWith('.woff2') ? 'anonymous' : undefined
    }
    return acc
  }, {} as Record<string, any>)
}

// Font optimization
export const fontOptimization = {
  preload: [
    '/fonts/inter-var.woff2',
    '/fonts/inter-latin.woff2'
  ],
  display: 'swap' as const,
  fallback: 'system-ui, -apple-system, sans-serif'
}

// Image optimization helpers
export function getOptimizedImageProps(src: string, alt: string, priority = false) {
  return {
    src,
    alt,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    fetchPriority: priority ? 'high' as const : 'auto' as const,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }
}

// Animation performance optimization
export const performantAnimations = {
  // Reduced motion variants for better performance
  reduced: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 }
  },
  
  // Standard animations with hardware acceleration
  standard: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { 
      duration: 0.4, 
      ease: 'easeOut',
      // Force hardware acceleration
      transform: { type: 'spring', stiffness: 100 }
    }
  },
  
  // Stagger for lists (optimized)
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.05, // Reduced from typical 0.1
        delayChildren: 0.1
      }
    }
  }
}

// Code splitting helpers
export function loadComponentDynamically<T = any>(
  importFn: () => Promise<{ default: T }>,
  options: {
    loading?: React.ComponentType
    ssr?: boolean
  } = {}
) {
  return {
    importFn,
    options: {
      loading: options.loading,
      ssr: options.ssr ?? false
    }
  }
}

// Resource hints for better loading
export function generateResourceHints(): Record<string, any> {
  return {
    'dns-prefetch-google-fonts': {
      rel: 'dns-prefetch',
      href: '//fonts.googleapis.com'
    },
    'dns-prefetch-gstatic': {
      rel: 'dns-prefetch', 
      href: '//fonts.gstatic.com'
    },
    'preconnect-google-fonts': {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous'
    },
    'preconnect-gstatic': {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    }
  }
}

// Bundle size optimization
export const bundleOptimization = {
  // Tree shake unused utilities
  treeshake: true,
  
  // Minimize re-renders
  memo: {
    enabled: true,
    strict: true
  },
  
  // Code splitting strategy
  chunks: {
    vendor: ['react', 'react-dom', 'next'],
    common: ['framer-motion'],
    pages: ['dynamic']
  }
}

// Performance monitoring
export function measurePerformance(name: string) {
  if (typeof window === 'undefined') return

  return {
    start: () => performance.mark(`${name}-start`),
    end: () => {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name)[0]
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
      }
      
      // Clean up marks
      performance.clearMarks(`${name}-start`)
      performance.clearMarks(`${name}-end`)
      performance.clearMeasures(name)
      
      return measure?.duration
    }
  }
}

// Lazy loading intersection observer
export function createLazyLoader(threshold = 0.1) {
  if (typeof window === 'undefined') return null

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          const src = element.dataset.src
          const srcset = element.dataset.srcset
          
          if (src) {
            if (element.tagName === 'IMG') {
              (element as HTMLImageElement).src = src
            } else {
              element.style.backgroundImage = `url(${src})`
            }
          }
          
          if (srcset && element.tagName === 'IMG') {
            (element as HTMLImageElement).srcset = srcset
          }
          
          element.classList.add('loaded')
          element.removeAttribute('data-src')
          element.removeAttribute('data-srcset')
        }
      })
    },
    {
      threshold,
      rootMargin: '50px 0px' // Start loading 50px before element enters viewport
    }
  )
}

// SEO Performance optimization
export const seoPerformance = {
  // Critical keywords for AI marketing consultant ranking
  primaryKeywords: [
    'AI marketing consultant',
    'AI marketing strategy', 
    'marketing automation expert',
    'AI-powered marketing campaigns'
  ],
  
  // Semantic keywords for context
  semanticKeywords: [
    'machine learning marketing',
    'ChatGPT marketing',
    'AI marketing ROI',
    'predictive marketing analytics',
    'marketing AI implementation',
    'automated marketing workflows'
  ],
  
  // Page-specific optimization
  pageOptimization: {
    homepage: {
      title: 'AI Marketing Consultant | Expert AI Marketing Strategy & Automation',
      description: 'Transform your business with expert AI marketing consulting. Proven strategies, automation workflows, and ChatGPT marketing that deliver measurable ROI. Get started today.',
      keywords: ['AI marketing consultant', 'AI marketing strategy', 'marketing automation expert']
    },
    about: {
      title: 'About Jonathon | AI Marketing Consultant & Automation Expert',
      description: 'Meet Jonathon, a leading AI marketing consultant specializing in automation strategies that drive growth. Discover how AI-powered marketing can transform your business.',
      keywords: ['AI marketing expert', 'marketing automation consultant', 'AI marketing specialist']
    },
    blog: {
      title: 'AI Marketing Blog | Expert Insights & Strategies | AI Marketing Consultant',
      description: 'Expert AI marketing insights, ChatGPT prompts, automation strategies, and industry trends. Learn from a certified AI marketing consultant.',
      keywords: ['AI marketing blog', 'ChatGPT marketing', 'AI marketing trends']
    }
  }
}

// Runtime performance optimization
export function optimizeRuntime() {
  if (typeof window === 'undefined') return

  // Optimize font loading
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.href = '/fonts/inter-var.woff2'
  fontLink.as = 'font'
  fontLink.type = 'font/woff2'
  fontLink.crossOrigin = 'anonymous'
  document.head.appendChild(fontLink)

  // Optimize third-party scripts
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Load non-critical scripts during idle time
      const scripts = document.querySelectorAll('script[data-lazy]')
      scripts.forEach(script => {
        const newScript = document.createElement('script')
        newScript.src = script.getAttribute('data-src') || ''
        newScript.async = true
        document.head.appendChild(newScript)
      })
    })
  }
}