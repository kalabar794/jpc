'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminRefreshPage() {
  useEffect(() => {
    // Clear all TinaCMS related data from localStorage and sessionStorage
    const keysToRemove: string[] = []
    
    // Find all TinaCMS related keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('tina') || key.includes('tinacms') || key.includes('graphql'))) {
        keysToRemove.push(key)
      }
    }
    
    // Remove them
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
    
    // Clear all cookies related to TinaCMS
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TinaCMS Cache Cleared
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
            <p className="text-lg mb-6">
              All TinaCMS cache has been cleared from your browser.
            </p>
            
            <div className="space-y-4 text-left">
              <h2 className="font-semibold text-xl mb-2">Next Steps:</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Close all TinaCMS admin tabs</li>
                <li>Open a new incognito/private browser window</li>
                <li>Go to <a href="/admin" className="text-blue-600 hover:underline">/admin</a></li>
                <li>Log in again if needed</li>
                <li>The schema should now be updated with text fields for images</li>
              </ol>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> You should now see "Image URL" text fields instead of file upload buttons in the gallery creation form.
              </p>
            </div>
          </div>
          
          <a
            href="/admin"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-xl transition-shadow"
          >
            Open TinaCMS Admin
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </main>
  )
}