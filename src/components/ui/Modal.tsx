'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'
import * as variants from '../animations/variants'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl mx-4'
}

/**
 * Beautiful modal component with smooth animations
 * Perfect for image galleries, forms, and detailed content
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true
}: ModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            {...variants.modalBackdrop}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className={cn(
                'bg-white dark:bg-dark-surface rounded-xl shadow-2xl',
                'border border-gray-200 dark:border-gray-700',
                'w-full relative max-h-[90vh] overflow-hidden',
                modalSizes[size],
                className
              )}
              {...variants.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * Modal header component
 */
export function ModalHeader({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(
      'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Modal body component
 */
export function ModalBody({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  )
}

/**
 * Modal footer component
 */
export function ModalFooter({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(
      'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
      'bg-gray-50 dark:bg-gray-800/50',
      className
    )}>
      {children}
    </div>
  )
}

/**
 * Image modal specifically for gallery lightboxes
 */
export function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  title,
  description
}: {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  title?: string
  description?: string
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      className="bg-black border-0"
      showCloseButton={false}
    >
      <div className="relative h-full flex items-center justify-center p-8">
        {/* Close button overlay */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <motion.img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image info */}
        {(title || description) && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
            {description && <p className="text-gray-300">{description}</p>}
          </motion.div>
        )}
      </div>
    </Modal>
  )
}