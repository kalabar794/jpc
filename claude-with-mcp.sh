#!/bin/bash
# Force Claude Code to load MCP servers

echo "Starting Claude Code with MCP servers..."
echo ""

# Create a temporary MCP config file
cat > /tmp/mcp-config.json << 'EOF'
{
  "mcpServers": {
    "mcp-server-chart": {
      "command": "npx",
      "args": ["@antv/mcp-server-chart"]
    }
  }
}
EOF

echo "MCP Configuration:"
cat /tmp/mcp-config.json
echo ""
echo "Starting Claude with MCP servers..."
echo ""

# Start Claude with the MCP config
claude --mcp-config /tmp/mcp-config.json