'use client'

import { motion } from 'framer-motion'

export default function AIGalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            AI Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Creative AI-generated artwork and visual experiments
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-dark-surface rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-6xl mb-6">🎨</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Gallery Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            This gallery will showcase AI-generated images created with tools like Midjourney, DALL-E, and Stable Diffusion.
          </p>
        </motion.div>
      </div>
    </main>
  )
}