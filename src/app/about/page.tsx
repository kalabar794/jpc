'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            About Jonathon
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI & Marketing Expert passionate about innovation
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-dark-surface rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-6xl mb-6">👨‍💼</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            About Section Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            This page will feature a detailed bio, professional timeline, expertise, and services.
          </p>
        </motion.div>
      </div>
    </main>
  )
}