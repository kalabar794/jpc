import DOMPurify from 'dompurify'

export function sanitizeHTML(html: string): string {
  // Only run on client side
  if (typeof window === 'undefined') {
    return html
  }
  
  // Configure DOMPurify to allow certain tags and attributes
  const config = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'a', 'ul', 'ol', 'li', 'b', 'i', 'pre', 'code', 'hr',
      'div', 'span', 'img'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id', 'src', 'alt', 'width', 'height'],
    ALLOW_DATA_ATTR: false
  }
  
  return DOMPurify.sanitize(html, config)
}

export function sanitizeContentHTML(content: string): string {
  // Replace newlines with <br /> tags
  const htmlContent = content.replace(/\n/g, '<br />')
  return sanitizeHTML(htmlContent)
}