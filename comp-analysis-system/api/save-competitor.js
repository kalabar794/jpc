import { Octokit } from '@octokit/rest';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { competitorId, data } = req.body;
    
    if (!competitorId || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    // Get current data
    const { data: currentFile } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'data/competitors.json'
    });

    // Decode and update
    const content = Buffer.from(currentFile.content, 'base64').toString('utf-8');
    const competitors = JSON.parse(content);
    
    // Update competitor data
    competitors[competitorId] = {
      ...competitors[competitorId],
      ...data,
      lastUpdated: new Date().toISOString()
    };

    // Save back to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'data/competitors.json',
      message: `Update ${competitorId} data`,
      content: Buffer.from(JSON.stringify(competitors, null, 2)).toString('base64'),
      sha: currentFile.sha
    });

    res.status(200).json({ success: true, competitorId });
  } catch (error) {
    console.error('Error saving competitor:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
}