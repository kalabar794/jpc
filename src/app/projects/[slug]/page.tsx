import { notFound } from 'next/navigation'
import { getProject, getProjects } from '@/lib/content'
import ProjectDetailClient from './ProjectDetailClient'
import { generateMetadata as generateMeta } from '@/lib/metadata'
import { Metadata } from 'next'

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getProjects()
  
  return projects
    .filter(project => project.status === 'published')
    .map((project) => ({
      slug: project.slug,
    }))
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return generateMeta(
    project.title,
    project.excerpt || `${project.title} - AI-powered marketing solution with proven ROI improvements.`,
    `/projects/${params.slug}`,
    {
      image: project.heroImage,
      type: 'article'
    }
  )
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project || project.status !== 'published') {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}