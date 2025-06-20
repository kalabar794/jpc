'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'page' | 'minimal'
  className?: string
  children?: React.ReactNode
}

export default function AnimatedBackground({ 
  variant = 'page', 
  className = '',
  children 
}: AnimatedBackgroundProps) {
  const { scrollY } = useScroll()
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -400])
  const y3 = useTransform(scrollY, [0, 1000], [0, -100])
  const scale = useTransform(scrollY, [0, 400], [1, 1.1])
  
  // Smooth spring physics
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 200, damping: 40 })

  const getBackgroundConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          gradient: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950',
          overlay: 'bg-gradient-to-tr from-transparent via-purple-800/20 to-indigo-900/25',
          showFloatingElements: true,
          showParticles: true,
          opacity: 0.8
        }
      case 'page':
        return {
          gradient: 'bg-gradient-to-br from-slate-900 via-purple-900/90 to-slate-950',
          overlay: 'bg-gradient-to-tr from-transparent via-purple-800/15 to-indigo-900/20',
          showFloatingElements: true,
          showParticles: false,
          opacity: 0.6
        }
      case 'minimal':
        return {
          gradient: 'bg-gradient-to-br from-slate-800/60 via-purple-800/50 to-slate-900/60',
          overlay: 'bg-gradient-to-tr from-transparent via-purple-700/10 to-indigo-800/15',
          showFloatingElements: false,
          showParticles: false,
          opacity: 0.4
        }
    }
  }

  const config = getBackgroundConfig()

  return (
    <div className={`relative ${className}`}>
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        {/* Main gradient background */}
        <div className={`absolute inset-0 ${config.gradient}`} />
        
        {/* Overlay gradients for depth */}
        <motion.div 
          className={`absolute inset-0 ${config.overlay}`}
          style={{ y: springY1 }}
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          className={`absolute inset-0 opacity-${Math.round(config.opacity * 100)}`}
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
      {config.showFloatingElements && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Large floating circle */}
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 md:w-96 md:h-96 rounded-full"
            style={{
              background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
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
            className="absolute top-40 right-32 w-48 h-48 md:w-64 md:h-64"
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
            <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/02 rounded-3xl backdrop-blur-sm" />
          </motion.div>

          {/* Small floating elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 md:w-6 md:h-6 bg-white/15 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                y: y3
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.15, 0.5, 0.15],
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
        </div>
      )}

      {/* Particle system */}
      {config.showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
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
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}