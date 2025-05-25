'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'AI Marketing',
    status: 'published',
    featured: false,
    excerpt: '',
    content: '',
    techStack: '',
    projectUrl: '',
    githubUrl: '',
    heroImage: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const generateMarkdown = () => {
    const date = new Date().toISOString().split('T')[0]
    const techStackArray = formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
    
    return `---
title: "${formData.title}"
slug: "${formData.slug}"
date: "${date}"
featured: ${formData.featured}
status: "${formData.status}"
heroImage: "${formData.heroImage}"
excerpt: "${formData.excerpt}"
techStack: [${techStackArray.map(t => `"${t}"`).join(', ')}]
category: "${formData.category}"
projectUrl: "${formData.projectUrl}"
githubUrl: "${formData.githubUrl}"
metrics:
  roi: ""
  engagement: ""
  efficiency: ""
---

${formData.content}`
  }

  const handleSave = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.slug || 'new-project'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/content/browse"
              className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">New Project</h1>
              <p className="text-purple-200">Create a new portfolio project</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                  className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="URL-friendly version of title"
                  className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="AI Marketing">AI Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analysis">Data Analysis</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-black/20 border-white/20 rounded focus:ring-purple-500"
                />
                <label className="text-sm font-medium text-purple-300">Featured Project</label>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of the project"
                  className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Tech Stack</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  placeholder="React, Next.js, TypeScript (comma separated)"
                  className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Project URL</label>
                  <input
                    type="url"
                    name="projectUrl"
                    value={formData.projectUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/user/repo"
                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Hero Image URL</label>
                <input
                  type="url"
                  name="heroImage"
                  value={formData.heroImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Content (Markdown)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  placeholder="# Project Description

Write your project details here using markdown syntax..."
                  className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Markdown Preview</h2>
            
            <div className="bg-black/20 rounded-lg p-4 max-h-[800px] overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                {generateMarkdown()}
              </pre>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="text-purple-300 font-medium mb-2">How to Use</h4>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Fill out the project details in the form</li>
                <li>Review the markdown preview on the right</li>
                <li>Click "Download" to save the .md file</li>
                <li>Place the file in <code className="bg-black/20 px-1 rounded">content/projects/</code></li>
              </ol>
            </div>
            <div>
              <h4 className="text-purple-300 font-medium mb-2">Tips</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Use markdown syntax in the content field</li>
                <li>Slug auto-generates from title</li>
                <li>Featured projects appear on homepage</li>
                <li>Images can be URLs or local files</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}