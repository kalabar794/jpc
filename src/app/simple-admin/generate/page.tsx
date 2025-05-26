'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ContentEditor from '@/components/admin/ContentEditor'

export default function GeneratePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    heroImage: '',
    excerpt: '',
    content: '',
    description: '',
    techStack: [] as string[],
    tags: [] as string[],
    date: new Date().toISOString(),
    featured: false,
    category: 'industry-insights',
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  })
  const [generatedMarkdown, setGeneratedMarkdown] = useState('')
  const [showMarkdown, setShowMarkdown] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const generateMarkdown = () => {
    const { content, description, ...frontmatter } = formData
    const mainContent = content || description || ''
    
    // Build frontmatter
    let markdown = '---\n'
    Object.entries(frontmatter).forEach(([key, value]) => {
      if (value && (!Array.isArray(value) || value.length > 0)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          markdown += `${key}:\n`
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue) {
              if (Array.isArray(subValue)) {
                markdown += `  ${subKey}:\n`
                subValue.forEach(item => {
                  markdown += `    - ${item}\n`
                })
              } else {
                markdown += `  ${subKey}: ${subValue}\n`
              }
            }
          })
        } else if (Array.isArray(value)) {
          markdown += `${key}:\n`
          value.forEach(item => {
            markdown += `  - ${item}\n`
          })
        } else {
          markdown += `${key}: ${value}\n`
        }
      }
    })
    markdown += '---\n\n'
    markdown += mainContent

    setGeneratedMarkdown(markdown)
    setShowMarkdown(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMarkdown)
    alert('Markdown copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Generate Content Markdown
            </h1>
            <button
              onClick={() => router.push('/simple-admin')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
          </div>

          {!showMarkdown ? (
            <>
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-sm font-semibold text-yellow-900 mb-2">Note: Production Limitation</h3>
                <p className="text-sm text-yellow-800">
                  Due to Vercel's serverless architecture, content cannot be created directly in production. 
                  Use this tool to generate the markdown file, then add it to your Git repository.
                </p>
              </div>

              <ContentEditor
                formData={formData}
                setFormData={(data) => {
                  if (data.title !== formData.title && !formData.slug) {
                    data.slug = generateSlug(data.title)
                  }
                  setFormData(data)
                }}
                type="post"
              />

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => router.push('/simple-admin')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={generateMarkdown}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Generate Markdown
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-sm font-semibold text-green-900 mb-2">Next Steps:</h3>
                <ol className="text-sm text-green-800 list-decimal list-inside">
                  <li>Copy the markdown below</li>
                  <li>Create a new file: <code className="bg-green-100 px-1">content/posts/{formData.slug}.md</code></li>
                  <li>Paste the content and save</li>
                  <li>Commit and push to Git</li>
                </ol>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Generated Markdown
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <textarea
                  value={generatedMarkdown}
                  readOnly
                  className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowMarkdown(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  ← Back to Edit
                </button>
                <button
                  onClick={() => router.push('/simple-admin')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}