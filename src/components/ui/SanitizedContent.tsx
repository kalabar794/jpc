'use client'

import { useEffect, useState } from 'react'
import { sanitizeHTML, sanitizeContentHTML } from '@/lib/sanitize'

interface SanitizedContentProps {
  content: string
  className?: string
  replaceNewlines?: boolean
}

export default function SanitizedContent({ 
  content, 
  className = '',
  replaceNewlines = false 
}: SanitizedContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>('')

  useEffect(() => {
    const sanitized = replaceNewlines 
      ? sanitizeContentHTML(content)
      : sanitizeHTML(content)
    setSanitizedContent(sanitized)
  }, [content, replaceNewlines])

  // Server-side render - always sanitize for security
  if (typeof window === 'undefined') {
    const serverSanitized = replaceNewlines 
      ? sanitizeContentHTML(content)
      : sanitizeHTML(content)
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: serverSanitized }}
      />
    )
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}