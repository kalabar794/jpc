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


      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}