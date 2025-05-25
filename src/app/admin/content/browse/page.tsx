'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Database, Image, Edit, Eye, Trash2, Plus, ArrowLeft } from 'lucide-react'

interface ContentFile {
  name: string
  type: 'project' | 'post' | 'gallery'
  path: string
  title?: string
  status?: string
  lastModified: string
}

export default function ContentBrowsePage() {
  const [files, setFiles] = useState<ContentFile[]>([])
  const [filter, setFilter] = useState<'all' | 'project' | 'post' | 'gallery'>('all')

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll show the known content files
    const mockFiles: ContentFile[] = [
      {
        name: 'ai-marketing-generator.md',
        type: 'project',
        path: 'content/projects/ai-marketing-generator.md',
        title: 'AI Marketing Generator',
        status: 'published',
        lastModified: '2025-01-15'
      },
      {
        name: 'social-media-analyzer.md',
        type: 'project',
        path: 'content/projects/social-media-analyzer.md',
        title: 'Social Media Analyzer',
        status: 'published',
        lastModified: '2025-01-10'
      },
      {
        name: 'future-of-ai-marketing.md',
        type: 'post',
        path: 'content/posts/future-of-ai-marketing.md',
        title: 'The Future of AI in Marketing',
        status: 'published',
        lastModified: '2025-01-12'
      }
    ]
    setFiles(mockFiles)
  }, [])

  const filteredFiles = files.filter(file => filter === 'all' || file.type === filter)

  const getIcon = (type: string) => {
    switch (type) {
      case 'project': return Database
      case 'post': return FileText
      case 'gallery': return Image
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-500'
      case 'post': return 'bg-green-500'
      case 'gallery': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Content Browser</h1>
              <p className="text-purple-200">Manage your portfolio content files</p>
            </div>
          </div>
          
          <Link
            href="/admin/content/new-project"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Content
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          {(['all', 'project', 'post', 'gallery'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
              {type !== 'all' && ` (${files.filter(f => f.type === type).length})`}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file, index) => {
            const Icon = getIcon(file.type)
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${getTypeColor(file.type)} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {file.title || file.name}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-purple-300 capitalize">{file.type}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      file.status === 'published' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {file.status || 'draft'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Modified:</span>
                    <span className="text-gray-300">{file.lastModified}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 font-mono">{file.path}</p>
                </div>
              </div>
            )
          })}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No content found</h3>
            <p className="text-gray-500 mb-6">Create your first piece of content to get started.</p>
            <Link
              href="/admin/content/new-project"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Content
            </Link>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-3">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h3 className="text-purple-300 font-medium mb-2">File Locations</h3>
              <ul className="space-y-1">
                <li>• Projects: <code className="bg-black/20 px-1 rounded">content/projects/</code></li>
                <li>• Blog Posts: <code className="bg-black/20 px-1 rounded">content/posts/</code></li>
                <li>• Gallery: <code className="bg-black/20 px-1 rounded">content/gallery/</code></li>
              </ul>
            </div>
            <div>
              <h3 className="text-purple-300 font-medium mb-2">Quick Actions</h3>
              <ul className="space-y-1">
                <li>• Edit files directly in your code editor</li>
                <li>• Changes auto-refresh in development</li>
                <li>• Use markdown for rich content formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}