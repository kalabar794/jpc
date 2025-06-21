#!/bin/bash
echo "=== MCP Diagnostics ==="
echo ""
echo "1. Claude Code version:"
claude --version
echo ""
echo "2. MCP servers configured:"
claude mcp list
echo ""
echo "3. Testing npx availability:"
which npx
npx --version
echo ""
echo "4. Testing if chart server can be downloaded:"
npx @antv/mcp-server-chart --help 2>&1 | head -5 || echo "Failed to run chart server"
echo ""
echo "5. Checking Claude's MCP debug info:"
claude --mcp-debug mcp list 2>&1
echo ""
echo "=== End Diagnostics ==="