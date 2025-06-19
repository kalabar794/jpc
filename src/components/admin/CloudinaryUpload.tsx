'use client'

import { useState } from 'react'
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'

interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

interface CloudinaryUploadProps {
  onUploadComplete?: (url: string) => void
  accept?: string
}

export default function CloudinaryUpload({ 
  onUploadComplete, 
  accept = "image/*" 
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    // Upload file
    setUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_UPLOAD_SECRET_KEY || ''}`
        }
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setUploadResult({ success: true, url: result.url })
        if (onUploadComplete) {
          onUploadComplete(result.url)
        }
      } else {
        setUploadResult({ success: false, error: result.error || 'Upload failed' })
      }
    } catch (error) {
      setUploadResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      })
    } finally {
      setUploading(false)
    }
  }

  const reset = () => {
    setUploadResult(null)
    setPreview(null)
  }

  return (
    <div className="w-full">
      {!uploadResult && (
        <div className="relative">
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`
            border-2 border-dashed rounded-lg p-8 text-center
            ${uploading ? 'border-gray-300 bg-gray-50' : 'border-gray-400 hover:border-gray-600'}
            transition-colors
          `}>
            {preview ? (
              <div className="space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-48 mx-auto rounded"
                />
                {uploading && (
                  <div className="text-sm text-gray-600">Uploading...</div>
                )}
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  {uploading ? 'Uploading...' : 'Click or drag file to upload'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports: Images, Videos, Documents
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {uploadResult && (
        <div className={`
          rounded-lg p-4 
          ${uploadResult.success ? 'bg-green-50' : 'bg-red-50'}
        `}>
          <div className="flex items-start space-x-3">
            {uploadResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${
                uploadResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {uploadResult.success ? 'Upload successful!' : 'Upload failed'}
              </p>
              {uploadResult.url && (
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    value={uploadResult.url}
                    readOnly
                    className="w-full px-3 py-2 text-sm border rounded"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={uploadResult.url} 
                    alt="Uploaded" 
                    className="max-h-32 rounded"
                  />
                </div>
              )}
              {uploadResult.error && (
                <p className="text-sm text-red-600 mt-1">{uploadResult.error}</p>
              )}
            </div>
            <button
              onClick={reset}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}