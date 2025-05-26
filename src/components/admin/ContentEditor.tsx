'use client'

import { useState } from 'react'
import SEOFields from './SEOFields'
import OpenGraphFields from './OpenGraphFields'
import StructuredDataInfo from './StructuredDataInfo'

interface ContentEditorProps {
  formData: any
  setFormData: (data: any) => void
  type: 'post' | 'project'
}

export default function ContentEditor({ formData, setFormData, type }: ContentEditorProps) {
  const [activeTab, setActiveTab] = useState('content')

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'seo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            SEO & Social
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'advanced'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Advanced
          </button>
        </nav>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status || 'draft'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image URL
            </label>
            <input
              type="text"
              value={formData.heroImage || ''}
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
              value={formData.excerpt || ''}
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
              value={formData.content || formData.description || ''}
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
                value={formData.techStack?.join(', ') || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {type === 'post' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ai-marketing">AI Marketing</option>
                  <option value="automation">Marketing Automation</option>
                  <option value="case-studies">Case Studies</option>
                  <option value="tutorials">Tutorials</option>
                  <option value="industry-insights">Industry Insights</option>
                  <option value="tools-reviews">Tools & Reviews</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.readTime || ''}
                  onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div>
          <SEOFields 
            data={formData}
            onChange={(seo) => setFormData({ ...formData, seo })}
            type={type}
          />
          
          <OpenGraphFields
            data={formData}
            onChange={(og) => setFormData({ ...formData, og })}
            type={type}
          />
          
          <StructuredDataInfo type={type} />
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured {type}</span>
            </label>
            <p className="mt-1 text-sm text-gray-500 ml-6">
              Display prominently on the homepage
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Canonical URL
            </label>
            <input
              type="text"
              value={formData.canonical || ''}
              onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
              placeholder="Leave empty to use default URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Override the canonical URL for this page
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.noindex || false}
                onChange={(e) => setFormData({ ...formData, noindex: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Hide from search engines</span>
            </label>
            <p className="mt-1 text-sm text-gray-500 ml-6">
              Prevent search engines from indexing this page
            </p>
          </div>

          {type === 'project' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <input
                  type="text"
                  value={formData.projectUrl || ''}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom JSON-LD Data
            </label>
            <textarea
              value={formData.customSchema || ''}
              onChange={(e) => setFormData({ ...formData, customSchema: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              placeholder='{"@context": "https://schema.org", ...}'
            />
            <p className="mt-1 text-sm text-gray-500">
              Add custom structured data (advanced users only)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}