# WEO Competitive Intelligence - Deployment Guide

## Quick Start (5 minutes)

### 1. Create GitHub Repository for Data
1. Go to GitHub and create a new **private** repository called `weo-competitor-data`
2. Create a file `data/competitors.json` with initial content:
```json
{}
```
3. Generate a Personal Access Token:
   - Go to Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it repo access
   - Copy the token

### 2. Get Claude API Key
1. Go to https://console.anthropic.com/
2. Create an API key
3. Copy it for later

### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, then set environment variables:
vercel env add GITHUB_TOKEN
vercel env add GITHUB_OWNER
vercel env add GITHUB_REPO
vercel env add CLAUDE_API_KEY
```

### 4. Add Password Protection
In Vercel Dashboard:
1. Go to your project settings
2. Click "Password Protection"
3. Enable it and set a password
4. Share this password with your team

## Features

### ✅ Automated
- **AI Analysis**: Uses Claude to analyze competitor websites
- **Basic Scraping**: Extracts meta tags, social links, basic info
- **Change Detection**: Tracks when competitor data changes
- **Excel Import**: Upload your existing competitive analysis

### 📝 Manual Entry
- Edit any competitor data through the UI
- Add notes and observations
- Track metrics over time

### 📊 What It Tracks
From Excel:
- Location, Company Size, Founded Year
- Core Focus, Services Offered
- Client Count (estimated)
- Pricing Info, Brand Messaging
- DSO Marketing capabilities

From Web Scraping:
- Social media links
- Meta descriptions
- Technology stack (basic)
- Content updates

From Claude AI:
- Service analysis
- Target market insights
- Value propositions
- Marketing channel focus

## Usage

### Import Excel Data
1. Click "Import Excel"
2. Select your `comp analysis.xlsx` file
3. Data will be merged with existing records

### Analyze New Competitor
1. Click "Analyze with AI"
2. Enter the competitor's website URL
3. Claude will analyze and extract insights

### Edit Data
1. Click the edit icon on any competitor card
2. Update fields as needed
3. Click Save

### Export Data
- Click "Export Data" to download JSON
- Can be imported into Excel or other tools

## Architecture

```
Frontend (Vercel Static):
├── dashboard.html - Main UI
└── Simple vanilla JS (no build step)

API Routes (Vercel Functions):
├── /api/get-competitors - Read from GitHub
├── /api/save-competitor - Write to GitHub  
├── /api/analyze-competitor - Claude AI analysis
└── /api/import-excel - Process Excel uploads

Data Storage (GitHub):
└── Private repo with version history
```

## Costs
- Vercel: Free tier (upgrade to $20/mo if needed)
- Claude API: ~$0.01 per analysis
- GitHub: Free (private repos included)
- **Total**: ~$5-20/month depending on usage

## Security
- Password protected (single password for team)
- Data in private GitHub repo
- API keys in Vercel environment variables
- No public access

## Troubleshooting

### "Failed to load data"
- Check GitHub token has repo access
- Verify repo name and owner are correct

### "Analysis failed"
- Check Claude API key is valid
- Ensure URL is accessible

### Password not working
- Set in Vercel dashboard, not in code
- Use project settings → Password Protection

## Next Steps
1. Add email alerts for changes
2. Schedule weekly competitor scans
3. Generate comparison reports
4. Add more AI insights