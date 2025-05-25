'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover3D?: boolean
}

/**
 * Sample AnimatedCard component demonstrating advanced hover effects
 * Perfect example of the animation system working together
 */
export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover3D = true
}: AnimatedCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white dark:bg-dark-surface rounded-xl shadow-lg',
        'border border-gray-200 dark:border-gray-700',
        'overflow-hidden cursor-pointer group',
        className
      )}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
      whileHover={hover3D ? {
        y: -15,
        rotateX: 8,
        rotateY: 5,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
      } : {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {/* Gradient overlay that appears on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating elements for extra visual interest */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          className="w-3 h-3 bg-primary-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content with subtle animation */}
      <motion.div
        className="relative z-10 p-6"
        whileHover={{ z: 20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Bottom border that animates on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

/**
 * Demonstration card with sample content
 */
export function SampleAnimatedCard({ 
  index = 0 
}: { 
  index?: number 
}) {
  return (
    <AnimatedCard delay={index * 0.1} className="max-w-sm">
      <div className="space-y-4">
        {/* Sample icon */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>

        {/* Sample content */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Animated Component {index + 1}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This card demonstrates the power of our animation system with 3D transforms, 
            hover effects, and smooth transitions.
          </p>
        </div>

        {/* Sample tags */}
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
            Framer Motion
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full">
            3D Effects
          </span>
        </div>
      </div>
    </AnimatedCard>
  )
}