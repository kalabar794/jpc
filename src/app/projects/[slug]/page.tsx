import { notFound } from 'next/navigation'
import { getProject, getProjects } from '@/lib/content'
import ProjectDetailClient from './ProjectDetailClient'

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
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Jonathon's Portfolio`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.heroImage ? [project.heroImage] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project || project.status !== 'published') {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}