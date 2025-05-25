'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import * as variants from './variants'

interface AnimatedWrapperProps {
  children: ReactNode
  variant?: keyof typeof variants
  className?: string
  delay?: number
  once?: boolean
  amount?: number
  custom?: MotionProps
}

/**
 * Versatile animated wrapper component that applies predefined animation variants
 * or accepts custom motion properties
 */
export default function AnimatedWrapper({
  children,
  variant = 'fadeInUp',
  className = '',
  delay = 0,
  once = true,
  amount = 0.1,
  custom
}: AnimatedWrapperProps) {
  // Use custom props if provided, otherwise use predefined variant
  const selectedVariant = variants[variant] as any
  const motionProps = custom || {
    ...selectedVariant,
    transition: {
      ...selectedVariant.transition,
      delay
    }
  }

  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      exit="exit"
      viewport={{ once, amount }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

/**
 * Wrapper for staggered animations of child elements
 */
export function StaggeredWrapper({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0.2
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}) {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Individual item for staggered animations
 */
export function StaggeredItem({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={variants.staggerItem}
    >
      {children}
    </motion.div>
  )
}