# MCP (Model Context Protocol) Setup Guide

MCP servers allow Claude to interact directly with various services without manual copying/pasting.

## Quick Setup

1. **Install Claude Desktop** (if not already installed)
   - Download from: https://claude.ai/download

2. **Configure MCP Servers**
   
   Copy the MCP configuration to Claude's config directory:
   ```bash
   # On macOS
   mkdir -p ~/Library/Application\ Support/Claude
   cp .mcp/config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Set Environment Variables** (optional)
   
   If using GitHub server, add to your shell profile (~/.zshrc or ~/.bash_profile):
   ```bash
   export GITHUB_TOKEN="your-github-personal-access-token"
   ```

## Available MCP Servers

### 1. **Filesystem Server**
- Direct file read/write access
- No more manual file copying
- Path: `/Users/jonathonc/Auto1111/claude/Jonathon's Website`

### 2. **Git Server**
- Direct git operations
- Commit, push, pull, branch management
- No more copy/pasting git commands

### 3. **GitHub Server**
- Create/manage issues and PRs
- View repository information
- Requires: GitHub Personal Access Token

### 4. **Memory Server**
- Persistent memory across conversations
- Store project context and decisions

### 5. **Puppeteer Server**
- Browser automation
- Screenshot capture
- Web scraping

## Benefits

With MCP servers configured:
- ✅ Direct file editing without copy/paste
- ✅ Automatic git commits and pushes
- ✅ Browser automation for testing
- ✅ Persistent memory for project context
- ✅ Direct GitHub integration

## Troubleshooting

1. **Restart Claude Desktop** after configuration changes
2. **Check logs** at: `~/Library/Logs/Claude/`
3. **Verify npm/npx** is installed: `npm --version`

## Custom MCP Servers

You can also create custom MCP servers for:
- Database access
- API integrations
- Build/deployment automation
- Custom workflows

For more information: https://modelcontextprotocol.io/docs