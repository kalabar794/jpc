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