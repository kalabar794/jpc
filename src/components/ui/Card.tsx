'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'elevated' | 'bordered'
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  motionProps?: MotionProps
}

const cardVariants = {
  default: 'bg-white dark:bg-dark-surface shadow-lg border border-gray-200 dark:border-gray-700',
  glass: 'glass border border-white/20 dark:border-white/10',
  elevated: 'bg-white dark:bg-dark-surface shadow-2xl border-0',
  bordered: 'bg-white dark:bg-dark-surface border-2 border-primary-200 dark:border-primary-800'
}

const defaultHoverProps: MotionProps = {
  whileHover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}

/**
 * Versatile card component with smooth hover animations
 * Perfect for project showcases, blog posts, and content containers
 */
export default function Card({
  children,
  className = '',
  variant = 'default',
  hoverable = false,
  clickable = false,
  onClick,
  motionProps
}: CardProps) {
  const baseClasses = cn(
    'rounded-xl overflow-hidden transition-all duration-300',
    cardVariants[variant],
    {
      'cursor-pointer': clickable || onClick,
      'hover:shadow-xl': hoverable && !motionProps
    },
    className
  )

  const shouldAnimate = hoverable || clickable || onClick || motionProps
  const finalMotionProps = motionProps || (shouldAnimate ? defaultHoverProps : {})

  if (shouldAnimate) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        {...finalMotionProps}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  )
}

/**
 * Card header component with consistent spacing
 */
export function CardHeader({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  )
}

/**
 * Card content area with proper padding
 */
export function CardContent({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-6 pb-6', className)}>
      {children}
    </div>
  )
}

/**
 * Card footer with top border
 */
export function CardFooter({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(
      'px-6 py-4 mt-auto',
      'border-t border-gray-200 dark:border-gray-700',
      'bg-gray-50 dark:bg-gray-800/50',
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Project card specifically designed for portfolio items
 */
export function ProjectCard({
  title,
  description,
  image,
  tags = [],
  href,
  className = ''
}: {
  title: string
  description: string
  image?: string
  tags?: string[]
  href?: string
  className?: string
}) {
  return (
    <Card
      hoverable
      clickable={!!href}
      onClick={href ? () => window.open(href, '_blank') : undefined}
      className={cn('group', className)}
      motionProps={{
        whileHover: {
          y: -12,
          rotateX: 5,
          rotateY: 5,
          scale: 1.02
        },
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {image && (
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <CardContent>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}