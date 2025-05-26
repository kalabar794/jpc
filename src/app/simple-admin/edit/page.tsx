'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ContentEditor from '@/components/admin/ContentEditor'

function EditPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')
  
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (type && slug) {
      fetchContent()
    }
  }, [type, slug])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${type}/${slug}`)
      const data = await response.json()
      setFormData(data)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/content/${type}/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        router.push('/simple-admin')
      } else {
        alert('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Edit {type === 'post' ? 'Blog Post' : 'Project'}
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
            setFormData={setFormData}
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
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <EditPageContent />
    </Suspense>
  )
}