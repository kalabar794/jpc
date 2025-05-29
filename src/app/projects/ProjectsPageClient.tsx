'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Project } from '@/lib/content'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui'

interface ProjectsPageClientProps {
  projects: Project[]
}

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'ai-marketing', label: 'AI Marketing' },
  { value: 'automation', label: 'Marketing Automation' },
  { value: 'analytics', label: 'Analytics & Data' },
  { value: 'creative', label: 'Creative & Design' },
  { value: 'web-development', label: 'Web Development' }
]

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  // Parallax background
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300])

  return (
    <AnimatedBackground variant="page" className="min-h-screen">
      <main ref={containerRef} className="relative z-10">

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-2 h-2 bg-primary-500 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Portfolio
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gray-900 dark:text-white">My</span>
            <br />
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore my portfolio of AI-powered marketing solutions, innovative automation tools, 
            and creative projects that drive real business results.
          </motion.p>

          {/* Project Count */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              {filteredProjects.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="relative px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                className="group"
                onMouseEnter={() => setHoveredProject(project.slug)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={`/projects/${project.slug}`}>
                  <motion.div
                    className="relative h-full bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                    whileHover={{ 
                      y: -12,
                      rotateX: 5,
                      rotateY: 5,
                      scale: 1.02
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={project.heroImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-primary-500 to-secondary-500'} opacity-0`}
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Project Category */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700 capitalize">
                          {project.category.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Hover Icon */}
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                        {project.excerpt}
                      </p>

                      {/* Project Metrics */}
                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                          {Object.entries(project.metrics)
                            .filter(([key, value]) => value)
                            .slice(0, 3)
                            .map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                  {value}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                  {key}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Hover Border Effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-primary-500/50 rounded-2xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                No Projects Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Try selecting a different category to see more projects.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Show All Projects
              </button>
            </motion.div>
          )}
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing together with AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-white text-primary-600 font-bold px-8 py-4 rounded-lg inline-flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
              <motion.a
                href="/about"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg inline-flex items-center justify-center hover:bg-white hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </AnimatedBackground>
  )
}