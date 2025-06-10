'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  height?: string
}

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, width = "w-[360px] lg:w-[900px]", height = "h-[40px]", ...props }, ref) => {
    return (
      <div 
        className="fixed md:absolute animate-slide-up top-0 left-1/2 right-1/2 z-50" 
        ref={ref} 
        {...props}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className={cn("relative overflow-hidden rounded-b-2xl", width, height)}>
            <div className="pointer-events-none absolute bottom-0 z-10 h-full w-[900px] overflow-hidden border border-[#f5f5f51a] rounded-b-2xl">
              <div className="glass-effect h-full w-full" />
            </div>
            <svg>
              <defs>
                <filter id="fractal-noise-glass">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.12 0.12"
                    numOctaves="1"
                    result="warp"
                  />
                  <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="G"
                    scale="30"
                    in="SourceGraphic"
                    in2="warp"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    )
  }
)
Glass.displayName = "Glass"

interface LogoProps {
  variant?: 'navigation' | 'hero' | 'showcase' | 'icon'
  className?: string
  showSubtitle?: boolean
}

const JonathonLogo: React.FC<LogoProps> = ({ 
  variant = 'navigation', 
  className = '', 
  showSubtitle = true 
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant === 'showcase' || variant === 'hero') {
      const handleMouseMove = (e: MouseEvent) => {
        if (logoRef.current) {
          const rect = logoRef.current.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width
          const y = (e.clientY - rect.top) / rect.height
          setMousePos({ x, y })
        }
      }

      if (logoRef.current) {
        logoRef.current.addEventListener('mousemove', handleMouseMove)
      }

      return () => {
        if (logoRef.current) {
          logoRef.current.removeEventListener('mousemove', handleMouseMove)
        }
      }
    }
  }, [variant])

  // Icon variant - just the J symbol
  if (variant === 'icon') {
    return (
      <motion.div
        className={cn("relative", className)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="32" height="32" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
          <path
            d="M 120 40 L 120 120 Q 120 160 80 160 Q 40 160 40 120 L 40 100 L 60 100 L 60 120 Q 60 140 80 140 Q 100 140 100 120 L 100 40 Z"
            fill="url(#iconGradient)"
          />
        </svg>
      </motion.div>
    )
  }

  // Navigation variant - clean and compact
  if (variant === 'navigation') {
    return (
      <motion.div
        className={cn("flex items-center space-x-2 group", className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg width="24" height="24" viewBox="0 0 200 200" className="text-white">
            <path
              d="M 120 40 L 120 120 Q 120 160 80 160 Q 40 160 40 120 L 40 100 L 60 100 L 60 120 Q 60 140 80 140 Q 100 140 100 120 L 100 40 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
        <span className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
          Jonathon
        </span>
      </motion.div>
    )
  }

  // Hero variant - medium size with some effects
  if (variant === 'hero') {
    return (
      <div className={cn("relative", className)} ref={logoRef}>
        <style jsx>{`
          .floating-particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
          }
        `}</style>

        <motion.div
          className="relative backdrop-blur-md bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border border-slate-700/50 rounded-2xl p-6 shadow-xl"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(59, 130, 246, 0.1), transparent 50%)`,
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-3">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              JONATHON
            </motion.h1>
            
            {showSubtitle && (
              <motion.div
                className="text-base md:text-lg text-slate-300 font-medium tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                AI Marketing Specialist
              </motion.div>
            )}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="floating-particle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  // Showcase variant - full effects
  return (
    <div className={cn("relative", className)} ref={logoRef}>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes slide-up {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .glass-effect {
          background: rgba(0, 0, 0, 0.2);
          background: repeating-radial-gradient(
            circle at 50% 50%,
            rgb(255 255 255 / 0),
            rgba(255, 255, 255, 0.2) 10px,
            rgb(255 255 255) 31px
          );
          filter: url(#fractal-noise-glass);
          background-size: 6px 6px;
          backdrop-filter: blur(0px);
        }
        .neural-network {
          position: absolute;
          inset: 0;
          opacity: 0.3;
        }
        .neural-node {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .neural-connection {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          transform-origin: left center;
          animation: pulse 3s infinite;
        }
      `}</style>

      {/* Neural Network Background */}
      <div className="neural-network">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`node-${i}`}
            className="neural-node"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 20}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`connection-${i}`}
            className="neural-connection"
            style={{
              left: `${25 + (i % 3) * 25}%`,
              top: `${25 + Math.floor(i / 3) * 25}%`,
              width: `${30 + Math.random() * 20}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <motion.div
        className="relative backdrop-blur-md bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(59, 130, 246, 0.1), transparent 50%)`,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Glass className="absolute -top-4 left-1/2 transform -translate-x-1/2" width="w-32" height="h-8" />
        
        {/* Full Wordmark */}
        <div className="text-center space-y-4 mt-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            JONATHON
          </motion.h1>
          
          {showSubtitle && (
            <motion.div
              className="text-lg md:text-xl text-slate-300 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              AI Marketing Specialist
            </motion.div>
          )}

          <motion.div
            className="flex items-center justify-center space-x-2 text-sm text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Automation</span>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <span>Data-Driven</span>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <span>Innovation</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Icon Version (smaller, standalone J) */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 backdrop-blur-sm bg-slate-900/60 border border-slate-700/50 rounded-xl flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="32" height="32" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="iconGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
          <path
            d="M 120 40 L 120 120 Q 120 160 80 160 Q 40 160 40 120 L 40 100 L 60 100 L 60 120 Q 60 140 80 140 Q 100 140 100 120 L 100 40 Z"
            fill="url(#iconGradient2)"
          />
        </svg>
      </motion.div>
    </div>
  )
}

// Full showcase component
const JonathonAILogo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <JonathonLogo variant="showcase" className="w-full" />
        
        {/* Additional branding elements */}
        <motion.div
          className="mt-8 text-center text-slate-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Powered by cutting-edge AI technology
        </motion.div>
      </div>
    </div>
  )
}

export { JonathonLogo, JonathonAILogo }
export default JonathonLogo