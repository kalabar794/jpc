'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/providers/ThemeProvider'

interface NavigationProps {
  className?: string
}

const navigationItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'AI Gallery', href: '/gallery/ai' },
  { name: 'Photography', href: '/gallery/photography' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

/**
 * Beautiful sticky navigation with backdrop blur and smooth animations
 * Inspired by modern portfolio sites like Coinsetters and Saatify
 */
export default function Navigation({ className = '' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Close mobile menu when clicking on links
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'glass border-b border-white/20 dark:border-white/10 py-4' 
            : 'bg-transparent py-6',
          className
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link href="/">
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Logo Container with Glass Effect */}
                <div className="relative">
                  {/* Main Logo Container */}
                  <motion.div
                    className="relative px-8 py-4 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-2 border-blue-400/50 dark:border-blue-500/50 rounded-3xl shadow-2xl overflow-hidden"
                    style={{
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Inner gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3">
                      {/* Logo Icon */}
                      <div className="relative">
                        <svg width="40" height="40" viewBox="0 0 200 200">
                          <defs>
                            <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#60a5fa"/>
                              <stop offset="50%" stopColor="#a78bfa"/>
                              <stop offset="100%" stopColor="#67e8f9"/>
                            </linearGradient>
                          </defs>
                          <path
                            d="M 120 40 L 120 120 Q 120 160 80 160 Q 40 160 40 120 L 40 100 L 60 100 L 60 120 Q 60 140 80 140 Q 100 140 100 120 L 100 40 Z"
                            fill="url(#navLogoGradient)"
                          />
                        </svg>
                      </div>
                      
                      {/* Text */}
                      <div className="flex flex-col">
                        <span className="font-bold text-2xl leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                          JONATHON
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300 leading-tight">
                          AI Marketing Specialist
                        </span>
                      </div>
                    </div>
                    
                    {/* Small animated dots */}
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    <div className="absolute -left-2 bottom-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Animated gradient border effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className="relative text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors group cursor-pointer px-3 py-2 -m-2 rounded-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                  {item.name}
                  
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "calc(100% - 24px)" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Dark Mode Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle dark mode"
              >
                <motion.div
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] glass border-l border-white/20 dark:border-white/10 z-50 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6 pt-20">
                {/* Mobile Navigation Items */}
                <div className="space-y-6">
                  {navigationItems.map((item, index) => (
                    <Link key={item.name} href={item.href} onClick={closeMobileMenu}>
                      <motion.div
                        className="block text-2xl font-semibold text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer px-4 py-3 -mx-4 rounded-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ x: 10, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Mobile Menu Footer */}
                <motion.div
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="relative w-14 h-14 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border border-blue-400/50 dark:border-blue-500/50 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Glass effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
                      
                      <svg width="32" height="32" viewBox="0 0 200 200" className="relative z-10">
                        <defs>
                          <linearGradient id="mobileLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa"/>
                            <stop offset="50%" stopColor="#a78bfa"/>
                            <stop offset="100%" stopColor="#34d399"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 120 40 L 120 120 Q 120 160 80 160 Q 40 160 40 120 L 40 100 L 60 100 L 60 120 Q 60 140 80 140 Q 100 140 100 120 L 100 40 Z"
                          fill="url(#mobileLogoGradient)"
                        />
                      </svg>
                    </motion.div>
                    <div>
                      <div className="font-bold text-lg bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">JONATHON</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">AI Marketing Specialist</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}