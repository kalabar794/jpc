'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxScrollProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

/**
 * Parallax scroll component that moves elements at different speeds
 * Creates depth and visual interest inspired by modern portfolio sites
 */
export default function ParallaxScroll({
  children,
  className = '',
  speed = 0.5,
  direction = 'up'
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? ['0%', `-${speed * 100}%`] : ['0%', `${speed * 100}%`]
  )

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parallax background component for hero sections
 */
export function ParallaxBackground({
  children,
  className = '',
  speed = 0.3
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000])

  return (
    <motion.div
      style={{ y }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parallax image component with built-in optimization
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.4
}: {
  src: string
  alt: string
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  )
}