'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { GalleryImage } from '@/lib/content'
import { AnimatedBackground } from '@/components/ui'

interface PhotographyClientProps {
  images: GalleryImage[]
}

export default function PhotographyClient({ images }: PhotographyClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(images.map(img => img.category)))
  const filteredImages = selectedCategory 
    ? images.filter(img => img.category === selectedCategory)
    : images

  return (
    <AnimatedBackground variant="page" className="min-h-screen">
      <main className="relative z-10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
              {images.length > 0 ? `${images.length} Photos` : 'Photography'}
            </span>
          </motion.div>

          <h1 className="text-5xl font-bold gradient-text mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Photography
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Landscape, macro, travel, and architectural photography
          </p>
        </motion.div>

        {images.length === 0 ? (
          <motion.div
            className="bg-white dark:bg-dark-surface rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-6xl mb-6">📸</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              No Photos Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              Use the admin panel to add photos to this gallery.
            </p>
            <motion.a
              href="/admin/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
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
          <>
            {/* Category Filter */}
            {categories.length > 1 && (
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    !selectedCategory
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Photos
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
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

                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
                        {image.category}
                      </span>
                    </div>
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

                    {(image as any).location && (
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {(image as any).location}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {image.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        📷 {image.tool || 'Camera'}
                      </span>
                      <span>
                        {new Date(image.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {(image as any).settings && (
                      <details className="mt-4">
                        <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300">
                          Camera Settings
                        </summary>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          {(image as any).settings}
                        </p>
                      </details>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
      </main>
    </AnimatedBackground>
  )
}