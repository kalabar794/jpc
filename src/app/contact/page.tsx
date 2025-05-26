'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
  const contactOptions = [
    {
      icon: '📧',
      title: 'Email Me',
      description: 'For project inquiries and proposals',
      action: 'jonathon@example.com',
      link: 'mailto:jonathon@example.com',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: '📅',
      title: 'Schedule a Call',
      description: 'Book a free 30-minute consultation',
      action: 'View Calendar',
      link: '#',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: '💬',
      title: 'Quick Question?',
      description: 'Response within 24 hours',
      action: 'Send Message',
      link: '#',
      color: 'from-pink-500 to-red-600'
    }
  ]

  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business with AI-powered marketing? 
            Let's discuss how I can help you achieve exceptional results.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactOptions.map((option, index) => (
            <motion.a
              key={option.title}
              href={option.link}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 p-8 text-center hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Background Gradient on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              {/* Icon */}
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {option.icon}
              </motion.div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {option.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {option.description}
              </p>
              
              {/* Action */}
              <div className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${option.color} bg-clip-text text-transparent`}>
                {option.action}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Availability Status */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-bold text-lg">Currently Available</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              I'm currently accepting new projects for Q1 2025. Whether you need AI-powered marketing automation, 
              data-driven strategies, or creative solutions, I'm here to help transform your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">Response Time:</span> Within 24 hours
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">Project Start:</span> 2-3 weeks
              </div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -right-4 w-40 h-40 bg-white rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            Prefer a different method? Feel free to reach out through any channel that works best for you.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Based in [Your Location] • Working with clients globally
          </p>
        </motion.div>
      </div>
    </main>
  )
}