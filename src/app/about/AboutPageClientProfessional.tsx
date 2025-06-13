'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedBackground } from '@/components/ui'
import Image from 'next/image'

interface AboutPageClientProps {
  aboutData?: any
}

export default function AboutPageClient({ aboutData }: AboutPageClientProps) {
  const [activeTab, setActiveTab] = useState('experience')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const data = aboutData || {}
  const expertise = data.expertise || []
  const industries = data.industries || []
  const experience = data.experience || []
  const education = data.education || []

  return (
    <AnimatedBackground variant="hero">
      <main ref={containerRef} className="min-h-screen pt-16">
        {/* Hero Section - Clean and Professional */}
        <section className="relative z-10 px-6 py-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              {data.heroTitle || data.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              {data.heroSubtitle}
            </p>
            
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              {data.bio}
            </p>
          </motion.div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-20 z-30 bg-white/10 backdrop-blur-md border-y border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {['experience', 'expertise', 'education'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-2 font-medium transition-all ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-white'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-12 text-white">Professional Experience</h2>
                
                <div className="space-y-8">
                  {experience.map((job: any, index: number) => (
                    <motion.div
                      key={job.company}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {job.role}
                          </h3>
                          <p className="text-xl text-white/80">
                            {job.company}
                          </p>
                        </div>
                        <p className="text-white/60 mt-2 md:mt-0">
                          {job.description.split('•')[1]?.trim() || job.description}
                        </p>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {job.description.split('•')[0]?.trim()}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Industries Section */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold mb-8 text-white">Industry Experience</h3>
                  <div className="flex flex-wrap gap-3">
                    {industries.map((industry: any, index: number) => (
                      <motion.span
                        key={industry.name}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white/90 border border-white/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {industry.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Expertise Tab */}
            {activeTab === 'expertise' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-12 text-white">Areas of Expertise</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {expertise.map((skill: any, index: number) => (
                    <motion.div
                      key={skill.name}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {skill.name}
                      </h4>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-white h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '90%' }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Skills from main content */}
                <div className="mt-12 prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
                </div>
              </motion.div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-12 text-white">Education</h2>
                
                <div className="space-y-6">
                  {education.map((edu: any, index: number) => (
                    <motion.div
                      key={edu.institution}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-xl text-white/80">
                        {edu.institution}
                      </p>
                      {edu.dates && (
                        <p className="text-white/60 mt-2">{edu.dates}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Let's Work Together
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Ready to elevate your marketing strategy?
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </AnimatedBackground>
  )
}