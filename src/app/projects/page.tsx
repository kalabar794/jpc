import { getProjects } from '@/lib/content'
import ProjectsPageClient from './ProjectsPageClient'
import { generateMetadata as generateMeta } from '@/lib/metadata'

export const metadata = generateMeta(
  'Projects',
  'Explore AI-powered marketing solutions and creative projects that have transformed businesses with measurable ROI improvements.',
  '/projects'
)

export default async function ProjectsPage() {
  // Get all published projects
  const allProjects = await getProjects()
  const publishedProjects = allProjects.filter(project => project.status === 'published')

  return <ProjectsPageClient projects={publishedProjects} />
}