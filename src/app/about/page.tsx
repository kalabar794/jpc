'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  const expertise = [
    'Marketing Management & Strategy',
    'Team Leadership',
    'Social Media Management',
    'SEO & SEM',
    'Email Marketing',
    'Trade Shows/Events',
    'Emerging AI Technologies',
    'Competitive Analysis',
    'Content Marketing/Development',
    'PR',
    'eCommerce',
    'B2B/B2C',
    'Marketing Research',
    'Mobile Apps',
    'Traditional Marketing',
    'Conversion Optimization'
  ]

  const industries = [
    'Financial Services',
    'FinTech',
    'Consumer Packaged Goods',
    'Internet',
    'Music',
    'Computer Software',
    'E-Commerce',
    'Health & Wellness',
    'Marketing Agency'
  ]

  const experience = [
    {
      company: 'WEO Media - Dental Marketing',
      role: 'Senior Marketing Manager',
      description: 'Led digital marketing strategies for dental practices, optimizing marketing ROI through data-driven decisions'
    },
    {
      company: 'SoundSplore Inc.',
      role: 'Marketing Director',
      description: 'Directed marketing initiatives for music technology startup'
    },
    {
      company: 'LA Photo Party',
      role: 'Marketing Manager',
      description: 'Managed event marketing strategy and brand development'
    }
  ]

  return (
    <main className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
            About Me
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Jonathon Carter</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Marketing Director | 20+ Years of Experience | Digital Marketing Strategist | 
            Driving Business Growth & User Engagement | Master's in Marketing Management
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 mb-16 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Transforming Businesses Through Strategic Marketing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Jonathon is a Los Angeles-based Marketing Director with over 20 years of experience in digital marketing strategy. 
            With a Master's in Marketing Management, he specializes in driving business growth and optimizing user engagement 
            across multiple platforms and industries. His expertise spans from traditional marketing to cutting-edge AI technologies, 
            helping businesses achieve measurable results and sustainable growth.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Areas of Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {expertise.map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 text-center shadow-sm border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
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
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Industry Experience
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <motion.span
                key={industry}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {industry}
              </motion.span>
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
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Recent Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <motion.div
                key={job.company}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {job.role}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                  {job.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {job.description}
                </p>
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
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-2">Master's in Marketing Management</h3>
              <p className="opacity-90">University of Leicester, UK</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl p-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-2">Bachelor's (Hons.) Business Studies</h3>
              <p className="opacity-90">De Montfort University, Leicester, UK</p>
            </motion.div>
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
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your marketing strategy with data-driven insights and innovative solutions?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </main>
  )
}