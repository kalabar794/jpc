'use client'

import { motion } from 'framer-motion'
import { GalleryImage } from '@/lib/content'
import { AnimatedBackground } from '@/components/ui'

interface AIGalleryClientProps {
  images: GalleryImage[]
}

export default function AIGalleryClient({ images }: AIGalleryClientProps) {
  return (
    <AnimatedBackground variant="page" className="min-h-screen">
      <main className="relative z-10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 -z-10 bg-black/30 blur-3xl scale-150" />
          
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            <span className="text-white font-semibold">
              {images.length > 0 ? `${images.length} AI Artworks` : 'AI Gallery'}
            </span>
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-4 text-white">
            AI Gallery
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Creative AI-generated artwork and visual experiments
          </p>
        </motion.div>

        {images.length === 0 ? (
          <motion.div
            className="bg-white dark:bg-dark-surface rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              No AI Artworks Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Use the admin panel to add AI-generated images to this gallery.
            </p>
            <motion.a
              href="/admin/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Admin Panel
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {image.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {image.title}
                  </h3>
                  
                  {image.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {image.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {image.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  
                  {(image as any).prompt && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300">
                        View Prompt
                      </summary>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        {(image as any).prompt}
                      </p>
                    </details>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      </main>
    </AnimatedBackground>
  )
}