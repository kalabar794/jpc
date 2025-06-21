#!/bin/bash
# Direct Claude Code with MCP

echo "=== Testing MCP Servers with Claude Code ==="
echo ""
echo "1. Checking MCP servers are configured..."
claude mcp list
echo ""
echo "2. Starting interactive Claude session..."
echo "   You can now ask Claude to create charts!"
echo "   Example: 'Create a pie chart showing: Apple 40%, Orange 30%, Banana 30%'"
echo ""
echo "Press Ctrl+C to exit when done."
echo "-------------------------------------------"
echo ""

# Start interactive Claude session in the current directory
cd /Users/jonathonc/Auto1111/claude/JonathonWebsite
claude