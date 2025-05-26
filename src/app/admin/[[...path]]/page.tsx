'use client'

import { useEffect } from 'react'

// This redirects to the TinaCMS admin interface
export default function AdminPage() {
  useEffect(() => {
    // Clear all caches before redirecting
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name))
      })
    }
    
    // Add timestamp to force fresh load
    const timestamp = new Date().getTime()
    window.location.href = `/admin/index.html?v=${timestamp}`
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Redirecting to TinaCMS Admin...</p>
      </div>
    </div>
  )
}