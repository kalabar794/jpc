import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const owner = 'kalabar794'
const repo = 'jpc'

export async function createOrUpdateFile(
  path: string,
  content: string,
  message: string
) {
  try {
    // Check if file exists
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path
      })
      if ('sha' in data) {
        sha = data.sha
      }
    } catch (error) {
      // File doesn't exist, that's ok
    }

    // Create or update file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha
    })

    return {
      success: true,
      sha: response.data.content?.sha,
      url: response.data.content?.html_url
    }
  } catch (error) {
    console.error('GitHub API error:', error)
    throw error
  }
}

export async function deleteFile(path: string, message: string) {
  try {
    // Get file SHA first
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path
    })
    
    if (!('sha' in data)) {
      throw new Error('File not found')
    }

    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message,
      sha: data.sha
    })

    return { success: true }
  } catch (error) {
    console.error('GitHub API error:', error)
    throw error
  }
}

export async function getFile(path: string) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path
    })
    
    if ('content' in data) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return {
        content,
        sha: data.sha
      }
    }
    
    throw new Error('Not a file')
  } catch (error) {
    console.error('GitHub API error:', error)
    throw error
  }
}