'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ContentEditor from '@/components/admin/ContentEditor'

function NewPageContent() {
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
    category: type === 'post' ? 'industry-insights' : 'ai-marketing',
    seo: {
      title: '',
      description: '',
      keywords: []
    }
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

          <ContentEditor
            formData={formData}
            setFormData={(data) => {
              // Auto-generate slug when title changes
              if (data.title !== formData.title && !formData.slug) {
                data.slug = generateSlug(data.title)
              }
              setFormData(data)
            }}
            type={type as 'post' | 'project'}
          />

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

export default function NewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <NewPageContent />
    </Suspense>
  )
}