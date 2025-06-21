#!/bin/bash
# Test MCP Chart Server

echo "Starting Claude Code with MCP servers..."
echo "Available MCP servers:"
claude mcp list
echo ""
echo "Starting new Claude session..."
cd /Users/jonathonc/Auto1111/claude/JonathonWebsite
claude --project . "Create a bar chart using mcp-server-chart showing technology distribution: Next.js 35%, TypeScript 25%, React 20%, Tailwind CSS 15%, Other 5%"