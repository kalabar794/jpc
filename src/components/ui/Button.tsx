'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  disabled?: boolean
  onClick?: () => void
  href?: string
  external?: boolean
  motionProps?: MotionProps
}

const buttonVariants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-glow',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-glow-purple',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
}

const defaultMotionProps: MotionProps = {
  whileHover: { 
    scale: 1.02,
    y: -2
  },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}

/**
 * Animated button component with multiple variants and hover effects
 * Follows design system from modern portfolio sites
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  href,
  external = false,
  motionProps = defaultMotionProps
}: ButtonProps) {
  const baseClasses = cn(
    'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    buttonVariants[variant],
    buttonSizes[size],
    className
  )

  const MotionComponent = motion.button

  if (href) {
    const LinkComponent = motion.a
    return (
      <LinkComponent
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        {...(disabled ? {} : motionProps)}
      >
        {children}
      </LinkComponent>
    )
  }

  return (
    <MotionComponent
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...(disabled ? {} : motionProps)}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * Icon button variant for compact actions
 */
export function IconButton({
  children,
  className = '',
  ...props
}: Omit<ButtonProps, 'size'>) {
  return (
    <Button
      {...props}
      className={cn('p-3 rounded-full', className)}
    >
      {children}
    </Button>
  )
}

/**
 * Floating action button with enhanced shadow
 */
export function FloatingButton({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        'shadow-2xl hover:shadow-3xl rounded-full',
        'fixed bottom-8 right-8 z-50',
        className
      )}
      motionProps={{
        whileHover: { 
          scale: 1.1,
          rotate: 5
        },
        whileTap: { scale: 0.9 },
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
    >
      {children}
    </Button>
  )
}