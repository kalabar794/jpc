'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  hoverable?: boolean
  motionProps?: MotionProps
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
  secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300',
  success: 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  outline: 'border border-current text-gray-600 dark:text-gray-400'
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
}

const defaultMotionProps: MotionProps = {
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}

/**
 * Badge component for displaying labels, tags, and status indicators
 * Follows the design system with support for variants and animations
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  hoverable = false,
  motionProps
}: BadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200',
    badgeVariants[variant],
    badgeSizes[size],
    className
  )

  if (hoverable || motionProps) {
    return (
      <motion.span
        className={baseClasses}
        {...(motionProps || defaultMotionProps)}
      >
        {children}
      </motion.span>
    )
  }

  return (
    <span className={baseClasses}>
      {children}
    </span>
  )
}

/**
 * Badge group for displaying multiple badges together
 */
export function BadgeGroup({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children}
    </div>
  )
}

/**
 * Badge with dot indicator
 */
export function DotBadge({
  children,
  dotColor = 'bg-green-500',
  className = '',
  ...props
}: BadgeProps & { dotColor?: string }) {
  return (
    <Badge {...props} className={cn('flex items-center gap-1.5', className)}>
      <span className={cn('w-2 h-2 rounded-full animate-pulse', dotColor)} />
      {children}
    </Badge>
  )
}

/**
 * Badge with count
 */
export function CountBadge({
  count,
  max = 99,
  ...props
}: Omit<BadgeProps, 'children'> & { count: number; max?: number }) {
  const displayCount = count > max ? `${max}+` : count.toString()
  
  return (
    <Badge {...props} className={cn('min-w-[1.5rem] text-center', props.className)}>
      {displayCount}
    </Badge>
  )
}