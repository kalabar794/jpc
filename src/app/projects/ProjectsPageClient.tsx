'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Project } from '@/lib/content'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui'

interface ProjectsPageClientProps {
  projects: Project[]
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

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
              {projects.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              {projects.length === 1 ? 'Project' : 'Projects'}
            </span>
          </motion.div>
        </div>
      </section>


      {/* Projects - Vertically Stacked Cards with Gradient Overlays */}
      <section className="relative px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col gap-12"
            layout
          >
            {projects.map((project, index) => (
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
                    className="relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                    whileHover={{ 
                      scale: 1.02,
                      rotateX: 5,
                      rotateY: 5,
                      z: 50
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
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <motion.img
                        src={project.heroImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-primary-500 to-secondary-500'} opacity-80`}
                        whileHover={{ opacity: 0.9 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-8 right-8 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center"
                      animate={hoveredProject === project.slug ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      } : {}}
                      transition={{ duration: 1 }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>

                    {/* Project Category Badge */}
                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full text-white capitalize">
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                      {/* Tech Stack */}
                      <motion.div
                        className="flex flex-wrap gap-3 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      >
                        {project.techStack.slice(0, 4).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 text-sm font-medium bg-white/20 rounded-full backdrop-blur-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-4 py-2 text-sm font-medium bg-white/20 rounded-full backdrop-blur-sm">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </motion.div>

                      {/* Project Title */}
                      <motion.h3
                        className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Project Description */}
                      <motion.p
                        className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      >
                        {project.excerpt}
                      </motion.p>

                      {/* Project Metrics */}
                      {project.metrics && (
                        <motion.div
                          className="grid grid-cols-3 gap-8 mb-8 max-w-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                        >
                          {Object.entries(project.metrics)
                            .filter(([key, value]) => value)
                            .slice(0, 3)
                            .map(([key, value], metricIndex) => (
                              <motion.div
                                key={key}
                                className="text-center"
                                whileHover={{ scale: 1.05 }}
                              >
                                <motion.div
                                  className="text-3xl font-bold mb-1"
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.2 + 0.7 + metricIndex * 0.1,
                                    type: "spring",
                                    stiffness: 200
                                  }}
                                >
                                  {value}
                                </motion.div>
                                <div className="text-sm text-gray-300 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                              </motion.div>
                            ))}
                        </motion.div>
                      )}

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                      >
                        <span className="inline-flex items-center text-white font-medium text-lg group-hover:gap-4 transition-all">
                          View Project Details
                          <motion.svg 
                            className="w-5 h-5 ml-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </span>
                      </motion.div>
                    </div>

                    {/* Hover Border Effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/50 rounded-3xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {projects.length === 0 && (
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
                Check back soon for new projects.
              </p>
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