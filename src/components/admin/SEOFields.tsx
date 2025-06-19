'use client'

import { useState, useEffect } from 'react'

interface SEOFieldsProps {
  data: {
    seo?: {
      title?: string
      description?: string
      keywords?: string[]
    }
    title?: string
    excerpt?: string
    slug?: string
  }
  onChange: (seo: any) => void
  type: 'post' | 'project'
}

export default function SEOFields({ data, onChange, type }: SEOFieldsProps) {
  const [seoData, setSeoData] = useState({
    title: data.seo?.title || '',
    description: data.seo?.description || '',
    keywords: data.seo?.keywords || []
  })

  // Auto-generate suggestions based on content
  useEffect(() => {
    if (!seoData.title && data.title) {
      setSeoData(prev => ({
        ...prev,
        title: `${data.title} | Jonathon's Portfolio`
      }))
    }
    if (!seoData.description && data.excerpt) {
      setSeoData(prev => ({
        ...prev,
        description: (data.excerpt || '').slice(0, 160)
      }))
    }
  }, [data.title, data.excerpt])

  useEffect(() => {
    onChange(seoData)
  }, [seoData])

  const titleLength = seoData.title.length
  const descriptionLength = seoData.description.length
  const titleOptimal = titleLength >= 30 && titleLength <= 60
  const descriptionOptimal = descriptionLength >= 120 && descriptionLength <= 160

  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
      
      <div className="space-y-4">
        {/* SEO Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO Title
          </label>
          <input
            type="text"
            value={seoData.title}
            onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${data.title || 'Page Title'} | Your Site Name`}
          />
          <div className="mt-1 flex justify-between">
            <p className="text-sm text-gray-500">
              Appears in search results and browser tabs
            </p>
            <p className={`text-sm ${titleOptimal ? 'text-green-600' : titleLength > 60 ? 'text-red-600' : 'text-yellow-600'}`}>
              {titleLength}/60 characters
            </p>
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Description
          </label>
          <textarea
            value={seoData.description}
            onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="A compelling description that summarizes your content and encourages clicks..."
          />
          <div className="mt-1 flex justify-between">
            <p className="text-sm text-gray-500">
              Shows below the title in search results
            </p>
            <p className={`text-sm ${descriptionOptimal ? 'text-green-600' : descriptionLength > 160 ? 'text-red-600' : 'text-yellow-600'}`}>
              {descriptionLength}/160 characters
            </p>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords (comma separated)
          </label>
          <input
            type="text"
            value={seoData.keywords.join(', ')}
            onChange={(e) => setSeoData({
              ...seoData,
              keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ai marketing, automation, web development"
          />
          <p className="mt-1 text-sm text-gray-500">
            Focus keywords for this {type === 'post' ? 'article' : 'project'}
          </p>
        </div>

        {/* SEO Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Search Result Preview</h4>
          <div className="bg-white p-4 rounded border">
            <h3 className="text-lg text-blue-600 hover:underline cursor-pointer">
              {seoData.title || data.title || 'Page Title'}
            </h3>
            <p className="text-sm text-green-700 mt-1">
              {typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com'}/{type === 'post' ? 'blog' : 'projects'}/{data.slug || 'page-url'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {seoData.description || data.excerpt || 'Page description will appear here...'}
            </p>
          </div>
        </div>

        {/* SEO Tips */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">SEO Best Practices:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include your primary keyword in the title and description</li>
            <li>• Keep titles between 30-60 characters for optimal display</li>
            <li>• Write descriptions between 120-160 characters</li>
            <li>• Use action words in descriptions to encourage clicks</li>
            <li>• Make each page&apos;s title and description unique</li>
          </ul>
        </div>
      </div>
    </div>
  )
}