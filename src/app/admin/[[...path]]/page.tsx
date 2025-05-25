'use client'

import { useEffect } from 'react'

// This redirects to the TinaCMS admin interface
export default function AdminPage() {
  useEffect(() => {
    // Redirect to the TinaCMS admin interface
    window.location.href = '/admin/index.html'
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