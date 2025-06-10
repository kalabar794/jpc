'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Post } from '@/lib/content'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui'

interface BlogPageClientProps {
  posts: Post[]
}

const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'ai-marketing', label: 'AI Marketing' },
  { value: 'automation', label: 'Marketing Automation' },
  { value: 'tutorials', label: 'Tutorials' },
  { value: 'industry-insights', label: 'Industry Insights' },
  { value: 'tools-reviews', label: 'Tools' }
]

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Filter posts based on category and search
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  // Parallax background
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300])

  return (
    <AnimatedBackground variant="page" className="min-h-screen">
      <main ref={containerRef} className="relative z-10">

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Blog
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gray-900 dark:text-white">AI Marketing</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Insights
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stay ahead of the curve with expert insights on AI marketing, automation strategies, 
            and the latest industry trends that drive business growth.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Post Count */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {filteredPosts.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              {filteredPosts.length === 1 ? 'Article' : 'Articles'}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && filteredPosts[0].featured && (
        <section className="relative px-6 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Article</h2>
            </motion.div>

            <motion.div
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <Link href={`/blog/${filteredPosts[0].slug}`}>
                <motion.div
                  className="relative bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Featured Post Image */}
                    <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
                      <motion.img
                        src={filteredPosts[0].heroImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>

                    {/* Featured Post Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          Featured
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(filteredPosts[0].date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {filteredPosts[0].title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {filteredPosts[0].excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {filteredPosts[0].tags?.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          {filteredPosts[0].readTime && (
                            <span>{filteredPosts[0].readTime} min read</span>
                          )}
                        </div>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                          Read Article
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredPosts.slice(filteredPosts[0]?.featured ? 1 : 0).map((post, index) => (
              <motion.div
                key={post.slug}
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
              >
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    className="h-full bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Post Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={post.heroImage || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded text-gray-700 capitalize">
                          {post.category.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Date & Read Time */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        {post.readTime && (
                          <>
                            <span>•</span>
                            <span>{post.readTime} min read</span>
                          </>
                        )}
                      </div>

                      {/* Post Title */}
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {post.title}
                      </h3>

                      {/* Post Excerpt */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                        Read More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                No Articles Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm 
                  ? `No articles match "${searchTerm}". Try a different search term.`
                  : "Try selecting a different category to see more articles."
                }
              </p>
              <div className="flex gap-4 justify-center">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => setActiveCategory('all')}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Show All Articles
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      </main>
    </AnimatedBackground>
  )
}