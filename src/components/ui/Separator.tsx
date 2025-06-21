'use client'

import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'dashed' | 'dotted' | 'gradient' | 'fade'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
  motionProps?: MotionProps
}

const separatorVariants = {
  default: 'bg-gray-200 dark:bg-gray-700',
  dashed: 'border-dashed border-gray-300 dark:border-gray-600',
  dotted: 'border-dotted border-gray-300 dark:border-gray-600',
  gradient: 'bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent',
  fade: 'bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent'
}

const separatorSizes = {
  horizontal: {
    sm: 'h-px',
    md: 'h-0.5',
    lg: 'h-1'
  },
  vertical: {
    sm: 'w-px',
    md: 'w-0.5',
    lg: 'w-1'
  }
}

const defaultMotionProps: MotionProps = {
  initial: { scaleX: 0, opacity: 0 },
  animate: { scaleX: 1, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
}

/**
 * Separator component for dividing content sections
 * Supports horizontal and vertical orientations with various styles
 */
export default function Separator({
  orientation = 'horizontal',
  variant = 'default',
  size = 'sm',
  className = '',
  animated = false,
  motionProps
}: SeparatorProps) {
  const isHorizontal = orientation === 'horizontal'
  const isDashedOrDotted = variant === 'dashed' || variant === 'dotted'
  
  const baseClasses = cn(
    'transition-all duration-300',
    {
      'w-full': isHorizontal,
      'h-full min-h-[1px]': !isHorizontal,
      'border-t': isHorizontal && isDashedOrDotted,
      'border-l': !isHorizontal && isDashedOrDotted,
    },
    !isDashedOrDotted && separatorVariants[variant],
    isDashedOrDotted && separatorVariants[variant],
    isHorizontal ? separatorSizes.horizontal[size] : separatorSizes.vertical[size],
    className
  )

  if (animated || motionProps) {
    return (
      <motion.div
        className={baseClasses}
        {...(motionProps || defaultMotionProps)}
        style={{ transformOrigin: isHorizontal ? 'left' : 'top' }}
      />
    )
  }

  return <div className={baseClasses} />
}

/**
 * Separator with text/content in the middle
 */
export function SeparatorWithContent({
  children,
  className = '',
  separatorClassName = '',
  variant = 'default',
  size = 'sm'
}: {
  children: React.ReactNode
  className?: string
  separatorClassName?: string
  variant?: SeparatorProps['variant']
  size?: SeparatorProps['size']
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Separator 
        className={cn('flex-1', separatorClassName)} 
        variant={variant}
        size={size}
      />
      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
        {children}
      </div>
      <Separator 
        className={cn('flex-1', separatorClassName)} 
        variant={variant}
        size={size}
      />
    </div>
  )
}

/**
 * Decorative separator with ornamental elements
 */
export function DecorativeSeparator({
  className = '',
  icon,
  variant = 'fade'
}: {
  className?: string
  icon?: React.ReactNode
  variant?: SeparatorProps['variant']
}) {
  return (
    <div className={cn('relative flex items-center justify-center py-8', className)}>
      <Separator variant={variant} className="absolute inset-0 top-1/2 -translate-y-1/2" />
      <div className="relative z-10 bg-white dark:bg-dark-background px-4">
        {icon || (
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
            <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full" />
            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Section separator with spacing
 */
export function SectionSeparator({
  spacing = 'md',
  className = '',
  ...props
}: SeparatorProps & {
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const spacingClasses = {
    sm: 'my-4',
    md: 'my-8',
    lg: 'my-12',
    xl: 'my-16'
  }

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      <Separator {...props} />
    </div>
  )
}