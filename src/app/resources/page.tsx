'use client'

import { generateServicePageMetadata } from '@/lib/metadata'
import StructuredData, { generateSoftwareStructuredData } from '@/components/seo/StructuredData'
import { AnimatedBackground } from '@/components/ui'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { performantAnimations } from '@/lib/performance'

// Metadata will be handled by parent layout

const resources = [
  {
    title: 'AI Marketing ROI Calculator',
    description: 'Calculate potential returns from AI marketing investments with industry benchmarks.',
    href: '/resources/roi-calculator',
    category: 'Tools',
    icon: '📊',
    tags: ['ROI', 'Calculator', 'Analytics'],
    featured: true
  },
  {
    title: 'Campaign Performance Audit',
    description: 'Free 25-point checklist to optimize your marketing campaigns with AI insights.',
    href: '/resources/campaign-audit',
    category: 'Checklists',
    icon: '✅',
    tags: ['Audit', 'Checklist', 'Optimization'],
    featured: true
  },
  {
    title: 'AI Marketing Strategy Template',
    description: 'Complete framework for developing your AI-powered marketing strategy.',
    href: '/resources/strategy-template',
    category: 'Templates',
    icon: '📋',
    tags: ['Strategy', 'Planning', 'Framework'],
    featured: true
  },
  {
    title: 'ChatGPT Marketing Prompts Library',
    description: 'Over 100 proven prompts for content creation, strategy, and automation.',
    href: '/resources/chatgpt-prompts',
    category: 'Guides',
    icon: '🤖',
    tags: ['ChatGPT', 'Prompts', 'Content'],
    featured: false
  },
  {
    title: 'Marketing Automation Playbook',
    description: 'Step-by-step guide to implementing AI-powered marketing automation.',
    href: '/resources/automation-playbook',
    category: 'Guides',
    icon: '⚡',
    tags: ['Automation', 'Implementation', 'Workflows'],
    featured: false
  },
  {
    title: 'AI Tools Comparison Guide',
    description: 'Comprehensive comparison of AI marketing tools with recommendations.',
    href: '/resources/ai-tools-guide',
    category: 'Guides',
    icon: '🔍',
    tags: ['Tools', 'Comparison', 'Reviews'],
    featured: false
  }
]

const categories = ['All', 'Tools', 'Templates', 'Checklists', 'Guides']

export default function ResourcesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpc-kappa.vercel.app'
  const structuredData = generateSoftwareStructuredData(
    'AI Marketing Resource Hub',
    'Comprehensive collection of AI marketing tools, templates, and guides',
    `${siteUrl}/resources`,
    'BusinessApplication'
  )

  return (
    <>
      <StructuredData data={structuredData} />
      
      <AnimatedBackground variant="page" className="min-h-screen">
        <main className="relative z-10">
          {/* Header Section */}
          <section className="relative pt-32 pb-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6"
                {...performantAnimations.reduced}
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                Free Resources
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                {...performantAnimations.standard}
              >
                <span className="text-gray-900 dark:text-white">AI Marketing</span>
                <br />
                <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                  Resource Hub
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
                {...performantAnimations.standard}
              >
                Free tools, templates, and guides to supercharge your AI-powered marketing strategy. 
                Everything you need to get started with AI marketing automation.
              </motion.p>
            </div>
          </section>

          {/* Featured Resources */}
          <section className="relative px-6 pb-12">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                Featured Resources
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {resources.filter(resource => resource.featured).map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={resource.href}>
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="text-4xl mb-4">{resource.icon}</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {resource.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium">
                          Access Resource
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* All Resources */}
          <section className="relative px-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                All Resources
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                    className="group"
                  >
                    <Link href={resource.href}>
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{resource.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-1">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {resource.description}
                            </p>
                            <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                              {resource.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20 px-6 bg-gradient-to-br from-primary-500 to-secondary-500">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Need Custom AI Marketing Strategy?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Get personalized recommendations and implementation support.
                </p>
                <motion.a
                  href="/contact"
                  className="bg-white text-primary-600 font-bold px-8 py-4 rounded-lg inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>
      </AnimatedBackground>
    </>
  )
}