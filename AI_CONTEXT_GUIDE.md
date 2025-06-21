# AI Context Files Guide

## Overview
This project uses AI context files to help AI assistants (Claude, Cursor, Windsurf, etc.) generate better, more accurate code that follows our project patterns and leverages Netlify's features.

## File Structure
```
.
├── jonathon-portfolio.mdc      # Main project context
├── project-patterns.mdc        # Detailed patterns and overrides
├── .windsurf/rules/           # Windsurf-specific context
│   ├── netlify-development.mdc
│   ├── jonathon-portfolio.mdc
│   └── project-patterns.mdc
└── .cursor/rules/             # Cursor-specific context
    ├── netlify-development.mdc
    ├── jonathon-portfolio.mdc
    └── project-patterns.mdc
```

## Context Files

### 1. netlify-development.mdc
- Netlify platform features and best practices
- Serverless functions, Edge functions, Forms
- Deployment and environment configuration
- Automatically maintained by Netlify

### 2. jonathon-portfolio.mdc
- Project-specific technology stack
- Coding conventions and guidelines
- Security requirements
- Testing requirements

### 3. project-patterns.mdc
- Detailed component patterns
- Import conventions
- State management patterns
- Project-specific overrides

## How It Works
1. AI tools automatically read these files when you open the project
2. The context helps AI understand your project structure and conventions
3. Results in more accurate code suggestions and better adherence to patterns

## Maintaining Context Files

### When to Update
- After establishing new patterns or conventions
- When adding new technologies or dependencies
- After major architectural changes
- When you notice AI tools making repeated mistakes

### How to Update
1. Edit the `.mdc` files in the root directory
2. Run the sync script to copy to AI directories:
   ```bash
   # Create a sync script
   cp jonathon-portfolio.mdc .windsurf/rules/ && cp jonathon-portfolio.mdc .cursor/rules/
   cp project-patterns.mdc .windsurf/rules/ && cp project-patterns.mdc .cursor/rules/
   ```

### Best Practices
- Keep context concise but comprehensive
- Include code examples for complex patterns
- Document "DO" and "DON'T" clearly
- Update when patterns change
- Version control all context files

## Adding New AI Tools
To add support for a new AI tool:
1. Create directory: `.toolname/rules/`
2. Copy all `.mdc` files to the new directory
3. Test that the tool recognizes the context

## Troubleshooting
- If AI suggestions don't follow patterns, check context files are present
- Ensure files are in correct directories for your AI tool
- Update context files if patterns have evolved
- Use `<ProviderContextOverrides>` for strong preferences

## Benefits
- Consistent code generation across team
- Reduced errors and better suggestions
- AI understands Netlify-specific features
- Maintains project conventions automatically
- Faster development with accurate AI assistance