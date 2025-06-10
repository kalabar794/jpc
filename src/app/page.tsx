'use client'

import { motion } from 'framer-motion'
import { HeroSection, FeaturedProjects, ServicesSection } from '@/components/sections'
import { JonathonLogo } from '@/components/ui/JonathonLogo'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />
      
      {/* Featured Projects */}
      <FeaturedProjects />
      
      {/* Services & Expertise */}
      <ServicesSection />

      {/* Development Approach */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Development Approach
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            How I build AI-powered tools using modern technology and AI-assisted development
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Modern Tech Stack", icon: "🚀", desc: "Next.js, TypeScript, AI APIs for scalable solutions" },
              { title: "AI-Assisted Development", icon: "🤖", desc: "Claude Code for rapid prototyping and iteration" },
              { title: "Performance First", icon: "⚡", desc: "Fast loading, optimized, user-centered design" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group"
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  y: -8, 
                  rotateX: 5,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              See Projects Built This Way
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Logo Showcase Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Brand Identity
          </motion.h2>
          <motion.p
            className="text-slate-300 text-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Crafted with AI-powered design and interactive technology
          </motion.p>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <JonathonLogo variant="hero" className="max-w-md" />
          </motion.div>
        </div>
      </section>
    </main>
  )
}