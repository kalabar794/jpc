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

  // Server-side render with HTML (content is already sanitized from marked)
  if (typeof window === 'undefined') {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
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