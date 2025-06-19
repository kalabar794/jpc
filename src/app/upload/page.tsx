'use client'

import { useState, useEffect } from 'react'
import CloudinaryUpload from '@/components/admin/CloudinaryUpload'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Simple check - redirect if no upload key is configured
    if (!process.env.NEXT_PUBLIC_UPLOAD_SECRET_KEY) {
      router.push('/')
    }
  }, [router])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  const handleUploadComplete = (url: string) => {
    setUploadedUrls(prev => [...prev, url])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cloudinary Direct Upload Tool
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
            <CloudinaryUpload onUploadComplete={handleUploadComplete} />
          </div>

          {uploadedUrls.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
              <h2 className="text-xl font-semibold mb-4">Uploaded Files ({uploadedUrls.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uploadedUrls.map((url, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={url} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <input
                      type="text"
                      value={url}
                      readOnly
                      className="w-full px-3 py-2 text-sm border rounded bg-gray-50"
                      onClick={(e) => e.currentTarget.select()}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}