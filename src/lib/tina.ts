// TinaCMS client - will be available when running with npm run dev:tina
let client: any

try {
  client = require('../../tina/__generated__/client').default
} catch (e) {
  // Client not generated yet, provide fallback
  console.log('TinaCMS client not generated yet. Run npm run dev:tina to generate.')
}

export { client }

// Helper function to get all projects
export async function getProjects() {
  if (!client) return []
  try {
    const { data } = await client.queries.projectConnection()
    return data.projectConnection.edges?.map(edge => edge?.node) || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Helper function to get a single project
export async function getProject(slug: string) {
  if (!client) return null
  try {
    const { data } = await client.queries.project({ relativePath: `${slug}.md` })
    return data.project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// Helper function to get featured projects
export async function getFeaturedProjects() {
  if (!client) return []
  try {
    const { data } = await client.queries.projectConnection({
      filter: { featured: { eq: true } }
    })
    return data.projectConnection.edges?.map(edge => edge?.node) || []
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// Helper function to get all posts
export async function getPosts() {
  if (!client) return []
  try {
    const { data } = await client.queries.postConnection()
    return data.postConnection.edges?.map(edge => edge?.node) || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Helper function to get a single post
export async function getPost(slug: string) {
  if (!client) return null
  try {
    const { data } = await client.queries.post({ relativePath: `${slug}.md` })
    return data.post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Helper function to get featured posts
export async function getFeaturedPosts() {
  if (!client) return []
  try {
    const { data } = await client.queries.postConnection({
      filter: { featured: { eq: true } }
    })
    return data.postConnection.edges?.map(edge => edge?.node) || []
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Helper function to get gallery images
export async function getGalleryImages(category?: string) {
  if (!client) return []
  try {
    const filter = category ? { category: { eq: category } } : undefined
    const { data } = await client.queries.galleryImageConnection({ filter })
    return data.galleryImageConnection.edges?.map(edge => edge?.node) || []
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return []
  }
}

// Helper function to get site settings
export async function getSiteSettings() {
  if (!client) return null
  try {
    const { data } = await client.queries.siteSettings({ relativePath: 'site.md' })
    return data.siteSettings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}