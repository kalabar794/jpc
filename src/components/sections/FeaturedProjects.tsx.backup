'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Button } from '@/components/ui'
import { Project } from '@/lib/content'

// Sample project data - matches our Project interface
const featuredProjects: Project[] = [
  {
    title: "AI Marketing Campaign Generator",
    slug: "ai-marketing-generator",
    date: "2024-03-15",
    featured: true,
    status: "published",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
    excerpt: "Revolutionary platform that creates complete marketing campaigns using GPT-4 and custom algorithms. Increased client ROI by 400% through personalized content generation.",
    content: "",
    techStack: ["AI", "Marketing Automation", "GPT-4", "Analytics"],
    metrics: { roi: "400%", custom1Label: "Campaigns", custom1Value: "50+", custom2Label: "Time Saved", custom2Value: "80%" },
    category: "ai-marketing",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Smart Social Media Analyzer",
    slug: "social-media-analyzer",
    date: "2024-02-20",
    featured: true,
    status: "published",
    heroImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
    excerpt: "AI-powered social media analytics tool that predicts viral content and optimizes posting schedules. Boosted engagement rates by 350% across all platforms.",
    content: "",
    techStack: ["Social Media", "Predictive AI", "Analytics", "Automation"],
    metrics: { engagement: "350%", custom1Label: "Reach", custom1Value: "2M+", custom2Label: "Clients", custom2Value: "25+" },
    category: "ai-marketing",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Automated Content Pipeline",
    slug: "content-pipeline",
    date: "2024-01-10",
    featured: true,
    status: "published",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    excerpt: "End-to-end content creation system that generates, optimizes, and distributes content across multiple channels. Reduced content production time by 90%.",
    content: "",
    techStack: ["Content Creation", "Automation", "Multi-channel", "Optimization"],
    metrics: { efficiency: "90%", custom1Label: "Content", custom1Value: "1000+", custom2Label: "Channels", custom2Value: "15+" },
    category: "automation",
    color: "from-green-500 to-blue-600"
  }
]

/**
 * Stunning featured projects section with asymmetric grid and 3D effects
 * Inspired by Saatify and high-end portfolio sites
 */
interface FeaturedProjectsProps {
  projects?: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Use passed projects or fallback to sample data
  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 3) : featuredProjects
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 bg-gray-50 dark:bg-gray-900/50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-accent-500/20 to-primary-500/20 rounded-full blur-2xl"
          style={{ y: y2 }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-primary-500 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Featured Work
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-900 dark:text-white">Projects That</span>
            <br />
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Deliver Results
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore innovative AI-powered solutions that have transformed businesses 
            and generated exceptional ROI for clients worldwide.
          </motion.p>
        </motion.div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {displayProjects.map((project, index) => {
            const isLarge = index === 0
            const gridClass = isLarge 
              ? "lg:col-span-7 lg:row-span-2" 
              : index === 1 
                ? "lg:col-span-5" 
                : "lg:col-span-5"

            return (
              <motion.div
                key={project.slug || index}
                className={`group relative ${gridClass}`}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div
                  className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden cursor-pointer"
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
                  {/* Project Image */}
                  <div className="absolute inset-0">
                    <motion.img
                      src={project.heroImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center"
                    animate={hoveredProject === index ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    } : {}}
                    transition={{ duration: 1 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    >
                      {project.techStack?.slice(0, 3).map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full backdrop-blur-sm"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                          transition={{ duration: 0.2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className={`font-bold mb-3 leading-tight ${isLarge ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    >
                      {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className={`text-gray-200 mb-6 leading-relaxed ${isLarge ? 'text-lg' : 'text-base'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    >
                      {project.excerpt}
                    </motion.p>

                    {/* Metrics */}
                    <motion.div
                      className="grid grid-cols-3 gap-2 md:gap-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                      {project.metrics && [
                        { label: project.metrics.roi ? 'ROI' : project.metrics.custom1Label, value: project.metrics.roi || project.metrics.custom1Value },
                        { label: project.metrics.engagement ? 'Engagement' : project.metrics.custom2Label, value: project.metrics.engagement || project.metrics.custom2Value },
                        { label: project.metrics.efficiency ? 'Efficiency' : 'Results', value: project.metrics.efficiency || '100%' }
                      ].filter(m => m.value).slice(0, 3).map((metric, metricIndex) => (
                        <motion.div
                          key={metricIndex}
                          className="text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.div
                            className="text-lg md:text-2xl font-bold"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.2 + 0.7 + metricIndex * 0.1,
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            {metric.value}
                          </motion.div>
                          <div className="text-xs text-gray-300 truncate px-1">{metric.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                    >
                      <motion.button
                        className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Case Study
                        <motion.svg 
                          className="w-4 h-4 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/50 rounded-2xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <Button
              href="/projects"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold px-10 py-4 text-lg shadow-2xl"
              motionProps={{
                whileHover: {
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                  scale: 1.05
                },
                whileTap: { scale: 0.95 }
              }}
            >
              <span>View All Projects</span>
              <motion.svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 5, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Button>
          </motion.div>
          
          <motion.p
            className="text-gray-500 dark:text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Discover more innovative solutions in my complete portfolio
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}