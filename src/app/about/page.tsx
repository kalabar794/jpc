'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getAboutContentSync } from '@/lib/content'

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load about content
    try {
      const content = getAboutContentSync()
      if (content) {
        setAboutData(content)
      }
    } catch (error) {
      console.error('Failed to load about content:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fallback data if CMS content not available
  const fallbackData = {
    title: "About Jonathon",
    heroTitle: "Jonathon Carter",
    heroSubtitle: "Marketing Director • 20+ Years of Experience • Digital Marketing Strategist",
    bio: "Jonathon is a Los Angeles-based Marketing Director with over 20 years of experience in digital marketing strategy. With a Master's in Marketing Management, he specializes in driving business growth and optimizing user engagement across multiple platforms and industries.",
    expertise: [
      { name: 'Marketing Management & Strategy', gradient: 'from-blue-500 to-purple-500' },
      { name: 'Team Leadership', gradient: 'from-green-500 to-teal-500' },
      { name: 'Social Media Management', gradient: 'from-pink-500 to-rose-500' },
      { name: 'SEO & SEM', gradient: 'from-yellow-500 to-orange-500' },
      { name: 'Email Marketing', gradient: 'from-purple-500 to-pink-500' },
      { name: 'Trade Shows/Events', gradient: 'from-indigo-500 to-blue-500' },
      { name: 'Emerging AI Technologies', gradient: 'from-cyan-500 to-blue-500' },
      { name: 'Competitive Analysis', gradient: 'from-red-500 to-pink-500' },
      { name: 'Content Marketing/Development', gradient: 'from-green-500 to-emerald-500' },
      { name: 'PR', gradient: 'from-violet-500 to-purple-500' },
      { name: 'eCommerce', gradient: 'from-orange-500 to-red-500' },
      { name: 'B2B/B2C', gradient: 'from-blue-500 to-indigo-500' },
      { name: 'Marketing Research', gradient: 'from-teal-500 to-cyan-500' },
      { name: 'Mobile Apps', gradient: 'from-pink-500 to-purple-500' },
      { name: 'Traditional Marketing', gradient: 'from-amber-500 to-orange-500' },
      { name: 'Conversion Optimization', gradient: 'from-emerald-500 to-green-500' }
    ],
    industries: [
      { name: 'Financial Services', gradient: 'from-blue-600 to-indigo-600' },
      { name: 'FinTech', gradient: 'from-purple-600 to-pink-600' },
      { name: 'Consumer Packaged Goods', gradient: 'from-green-600 to-teal-600' },
      { name: 'Internet', gradient: 'from-cyan-600 to-blue-600' },
      { name: 'Music', gradient: 'from-pink-600 to-rose-600' },
      { name: 'Computer Software', gradient: 'from-indigo-600 to-purple-600' },
      { name: 'E-Commerce', gradient: 'from-orange-600 to-red-600' },
      { name: 'Health & Wellness', gradient: 'from-emerald-600 to-green-600' },
      { name: 'Marketing Agency', gradient: 'from-violet-600 to-indigo-600' }
    ],
    experience: [
      {
        company: 'WEO Media - Dental Marketing',
        role: 'Senior Marketing Manager',
        description: 'Led digital marketing strategies for dental practices, optimizing marketing ROI through data-driven decisions',
        gradient: 'from-blue-500 to-purple-500',
        icon: '🦷'
      },
      {
        company: 'SoundSplore Inc.',
        role: 'Marketing Director',
        description: 'Directed marketing initiatives for music technology startup',
        gradient: 'from-pink-500 to-rose-500',
        icon: '🎵'
      },
      {
        company: 'LA Photo Party',
        role: 'Marketing Manager',
        description: 'Managed event marketing strategy and brand development',
        gradient: 'from-yellow-500 to-orange-500',
        icon: '📸'
      }
    ],
    education: [
      {
        degree: 'Master\'s in Marketing Management',
        institution: 'University of Leicester, UK',
        icon: '🎓',
        gradient: 'from-purple-600 to-blue-600'
      },
      {
        degree: 'Bachelor\'s (Hons.) Business Studies',
        institution: 'De Montfort University, Leicester, UK',
        icon: '📚',
        gradient: 'from-pink-600 to-orange-600'
      }
    ]
  }

  // Use CMS data if available, otherwise fallback
  const data = aboutData || fallbackData
  const expertise = data.expertise || fallbackData.expertise
  const industries = data.industries || fallbackData.industries
  const experience = data.experience || fallbackData.experience
  const education = data.education || fallbackData.education

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 mb-6"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 animate-pulse" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                {aboutData ? 'CMS Content Loaded' : 'Fallback Content'}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%">
                {data.heroTitle || data.title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {data.heroSubtitle}
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-16 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            <h2 className="text-3xl font-bold mb-6 relative z-10">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
              {data.content ? (
                <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br />') }} />
              ) : (
                <p>{data.bio}</p>
              )}
            </div>
          </motion.div>

          {/* Expertise Grid */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Areas of Expertise
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {expertise.map((skill: any, index: number) => (
                <motion.div
                  key={skill.name}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-3 text-center shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industry Experience */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Industry Experience
              </span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry: any, index: number) => (
                <motion.div
                  key={industry.name}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity`} />
                  <span className={`relative px-6 py-3 bg-gradient-to-r ${industry.gradient} text-white rounded-full text-sm font-medium block hover:shadow-xl transition-all cursor-default transform group-hover:scale-110`}>
                    {industry.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Recent Experience
              </span>
            </h2>
            <div className="space-y-6">
              {experience.map((job: any, index: number) => (
                <motion.div
                  key={job.company}
                  className="relative group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${job.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{job.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">
                          <span className={`bg-gradient-to-r ${job.gradient} bg-clip-text text-transparent`}>
                            {job.role}
                          </span>
                        </h3>
                        <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                          {job.company}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {job.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu: any, index: number) => (
                <motion.div
                  key={edu.degree}
                  className="relative group overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient}`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient}/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500`} />
                  <div className="relative p-6 text-white">
                    <div className="text-4xl mb-3">{edu.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <p className="opacity-90">{edu.institution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-gradient bg-300%">
                Let's Work Together
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to transform your marketing strategy with data-driven insights and innovative solutions?
            </p>
            <motion.a
              href="/contact"
              className="relative inline-flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <span className="relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold py-4 px-8 rounded-lg">
                Get In Touch
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </main>
  )
}