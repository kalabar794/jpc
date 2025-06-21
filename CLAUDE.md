- When making a Netlify deployment, wait for 5 minutes and check whether it was successful so the user doesn't have to copy build logs from Netlify and paste them into the Claude code terminal window
- Always use Playwright to test new code and features

# Claude Code Best Practices (from Anthropic article)

## Workflow
- Follow "explore, plan, code, commit" workflow:
  1. Read relevant files first
  2. Make a plan (use "think" for complex problems)
  3. Implement solution
  4. Commit changes with clear messages

## Testing
- Use test-driven development (TDD) when possible
- Always test with Playwright before claiming features work
- Provide visual targets (screenshots, mocks) for better iteration

## Context Management
- Be specific and direct in responses
- Course correct early and often
- Use /clear to keep context focused
- Create focused, single-purpose tests

## Project Documentation
- Update CLAUDE.md with:
  - Bash commands for common tasks
  - Code style guidelines
  - Testing instructions
  - Developer environment setup
  - Lessons learned from debugging

## Development Tips
- Check for existing patterns in codebase before implementing
- Always verify deployments actually happened
- Use existing logged-in sessions for auth-required testing
- Take screenshots when debugging UI issues

## Security Features & Common Commands
- Use Accept Edits Mode for batch changes across multiple gallery components
- Network requests (Cloudinary, APIs, Netlify) require approval

## Netlify MCP Server Integration
- The project now includes Netlify MCP server configuration in `mcp.json`
- This enables AI agents to interact directly with Netlify's platform

## AI Context Files
- Project includes AI context files for better code generation
- Files are located in:
  - `.windsurf/rules/` - For Windsurf editor
  - `.cursor/rules/` - For Cursor editor
  - Root directory: `jonathon-portfolio.mdc`

### Context Files Included
1. **netlify-development.mdc** - Netlify platform-specific guidance
2. **jonathon-portfolio.mdc** - Project-specific patterns and conventions

### Benefits
- AI tools generate more accurate, project-aligned code
- Consistent code patterns across different AI assistants
- Better understanding of Netlify features and project structure
- Reduced errors and improved suggestions

### Setup Instructions
1. Install Netlify CLI: `npm run netlify:install` (already installed)
2. Login to Netlify: `npm run netlify:login` (already authenticated as jonathonc@gmail.com)
3. The MCP server will automatically use npx to run @netlify/mcp when accessed by MCP clients
4. Current project: stalwart-smakager-b57fc1 (https://jonathoncarter.com)

### Available MCP Features
- Create and manage Netlify projects
- Deploy sites and monitor deployment status
- Manage environment variables
- Handle form submissions
- Configure access controls and team settings
- Install/uninstall Netlify extensions

### Authentication Troubleshooting
- If authentication fails, create a Personal Access Token (PAT) from Netlify dashboard
- Add PAT to mcp.json configuration:
```json
{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp"],
      "env": {
        "NETLIFY_ACCESS_TOKEN": "your-personal-access-token"
      }
    }
  }
}
```

### Common Safe Commands (for Prompt Fatigue Mitigation)
```bash
# Build and test commands
pnpm build
pnpm test
pnpm dev
pnpm lint
pnpm typecheck

# Playwright testing
playwright test
npx playwright test
npx playwright test --ui

# Netlify deployment
netlify deploy
netlify deploy --prod
netlify status
netlify env:list

# Git commands
git status
git diff
git log
git add .
git commit

# File operations
ls
cat
grep
find
```