#!/bin/bash

# Launch Claude Code with Claudia MCP server
export MCP_SERVERS='{
  "claudia": {
    "command": "/Users/jonathonc/Auto1111/claude/claudia/src-tauri/target/release/claudia",
    "args": []
  }
}'

# Launch Claude Code
claude "$@"