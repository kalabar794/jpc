'use client'

import { useState, useEffect } from 'react'

interface OpenGraphFieldsProps {
  data: {
    og?: {
      title?: string
      description?: string
      image?: string
      type?: string
    }
    title?: string
    excerpt?: string
    heroImage?: string
  }
  onChange: (og: any) => void
  type: 'post' | 'project'
}

export default function OpenGraphFields({ data, onChange, type }: OpenGraphFieldsProps) {
  const [ogData, setOgData] = useState({
    title: data.og?.title || '',
    description: data.og?.description || '',
    image: data.og?.image || '',
    type: data.og?.type || (type === 'post' ? 'article' : 'website')
  })

  // Auto-fill from main content if empty
  useEffect(() => {
    if (!ogData.title && data.title) {
      setOgData(prev => ({ ...prev, title: data.title }))
    }
    if (!ogData.description && data.excerpt) {
      setOgData(prev => ({ ...prev, description: data.excerpt }))
    }
    if (!ogData.image && data.heroImage) {
      setOgData(prev => ({ ...prev, image: data.heroImage }))
    }
  }, [data.title, data.excerpt, data.heroImage])

  useEffect(() => {
    onChange(ogData)
  }, [ogData])

  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">Social Media Preview</h3>
      
      <div className="space-y-4">
        {/* OG Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Title
          </label>
          <input
            type="text"
            value={ogData.title}
            onChange={(e) => setOgData({ ...ogData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={data.title || 'Social media title'}
          />
          <p className="mt-1 text-sm text-gray-500">
            Title shown when shared on social media (defaults to page title)
          </p>
        </div>

        {/* OG Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Description
          </label>
          <textarea
            value={ogData.description}
            onChange={(e) => setOgData({ ...ogData, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description for social media shares"
          />
          <p className="mt-1 text-sm text-gray-500">
            Description shown on social media (defaults to excerpt)
          </p>
        </div>

        {/* OG Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Share Image URL
          </label>
          <input
            type="text"
            value={ogData.image}
            onChange={(e) => setOgData({ ...ogData, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://... (recommended: 1200x630px)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Image shown when shared (defaults to hero image). Ideal size: 1200x630px
          </p>
        </div>

        {/* Social Preview */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Social Media Preview</h4>
          
          {/* Facebook/LinkedIn Preview */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-xs text-gray-500 mb-2">Facebook/LinkedIn Preview</p>
            <div className="bg-white border rounded-lg overflow-hidden">
              {ogData.image && (
                <div className="aspect-[1200/630] bg-gray-200 relative">
                  <img 
                    src={ogData.image} 
                    alt="Preview" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">
                  {ogData.title || data.title || 'Page Title'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {ogData.description || data.excerpt || 'Page description...'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {typeof window !== 'undefined' ? window.location.hostname : 'yoursite.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Twitter Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Twitter/X Preview</p>
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="flex">
                {ogData.image && (
                  <div className="w-1/3 aspect-square bg-gray-200 flex-shrink-0">
                    <img 
                      src={ogData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3 flex-1">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
                    {ogData.title || data.title || 'Page Title'}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {ogData.description || data.excerpt || 'Page description...'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {typeof window !== 'undefined' ? window.location.hostname : 'yoursite.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}