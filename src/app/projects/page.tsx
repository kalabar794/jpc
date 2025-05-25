import { getProjects } from '@/lib/content'
import ProjectsPageClient from './ProjectsPageClient'

export default async function ProjectsPage() {
  // Get all published projects
  const allProjects = await getProjects()
  const publishedProjects = allProjects.filter(project => project.status === 'published')

  return <ProjectsPageClient projects={publishedProjects} />
}