'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from '@/components/ui'

/**
 * Stunning hero section inspired by high-end portfolio sites
 * Features parallax scrolling, typewriter effects, and floating elements
 */
export default function HeroSection() {
  const [text, setText] = useState('')
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -400])
  const y3 = useTransform(scrollY, [0, 1000], [0, -100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 1.1])
  
  // Smooth spring physics
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 200, damping: 40 })
  
  // Typewriter effect
  const phrases = [
    'AI-Powered Marketing Excellence',
    'Data-Driven Creative Solutions', 
    'Automated Campaign Generation',
    'Intelligent Content Strategy'
  ]
  
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentText = phrases[currentPhrase]
    
    if (text.length < currentText.length) {
      timeout = setTimeout(() => {
        setText(currentText.slice(0, text.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setText('')
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
      }, 2000)
    }
    
    return () => clearTimeout(timeout)
  }, [text, currentPhrase, phrases])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800" />
        
        {/* Overlay gradients for depth */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/30 to-pink-500/40"
          style={{ y: springY1 }}
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating circle */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(2px)',
            y: springY1
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Medium floating shapes */}
        <motion.div
          className="absolute top-40 right-32 w-64 h-64"
          style={{ y: springY2 }}
          animate={{
            rotate: [0, -180, -360],
            y: [0, -30, 0]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-sm" />
        </motion.div>

        {/* Small floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              y: y3
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}

        {/* Particle system */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Dark overlay behind text for better readability */}
        <div className="absolute inset-0 -z-10 bg-black/20 blur-3xl scale-150" />

        {/* Main Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.4,
            type: "spring",
            stiffness: 100
          }}
        >
          <span className="block">AI Marketing</span>
          <motion.span 
            className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Specialist
          </motion.span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          className="text-xl md:text-2xl lg:text-4xl mb-8 min-h-[4rem] md:h-16 flex flex-col md:flex-row items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-white font-medium">Through </span>
          <motion.span
            className="ml-0 md:ml-2 text-white font-bold text-center md:text-left"
            key={currentPhrase}
          >
            {text}
            <motion.span
              className="inline-block w-1 h-6 md:h-8 bg-white ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed px-4 md:px-0 font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Leveraging cutting-edge AI technology to create data-driven marketing strategies 
          that deliver exceptional results and accelerate business growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              href="/projects"
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-4 text-lg shadow-2xl"
              motionProps={{
                whileHover: {
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
                }
              }}
            >
              <span>Explore My Work</span>
              <motion.svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              href="/contact"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-10 py-4 text-lg backdrop-blur-sm"
              motionProps={{
                whileHover: {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#1f2937"
                }
              }}
            >
              Start a Project
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <motion.div
          className="flex flex-col items-center text-white/80 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            whileHover={{ borderColor: "rgba(255,255,255,0.8)" }}
          >
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}