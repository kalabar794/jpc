'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'post'
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    heroImage: '',
    excerpt: '',
    content: '',
    description: '',
    techStack: [] as string[],
    date: new Date().toISOString(),
    featured: false,
    category: type === 'post' ? 'industry-insights' : 'ai-marketing'
  })
  const [saving, setSaving] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert('Title and slug are required')
      return
    }

    setSaving(true)
    try {
      const response = await fetch(`/api/content/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type
        })
      })
      
      if (response.ok) {
        router.push('/simple-admin')
      } else {
        alert('Failed to create content')
      }
    } catch (error) {
      console.error('Error creating content:', error)
      alert('Error creating content')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              New {type === 'post' ? 'Blog Post' : 'Project'}
            </h1>
            <button
              onClick={() => router.push('/simple-admin')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  })
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image URL
              </label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                placeholder="Upload at /upload and paste Cloudinary URL here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload images at <a href="/upload" target="_blank" className="text-blue-600 hover:underline">/upload</a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={type === 'post' ? formData.content : formData.description}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [type === 'post' ? 'content' : 'description']: e.target.value 
                })}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Write in Markdown format..."
              />
            </div>

            {type === 'project' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => router.push('/simple-admin')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}