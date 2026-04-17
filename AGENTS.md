# AGENTS.md

## Commands

```bash
npm run dev    # Start server (0.0.0.0:8080)
npm start      # Alias for dev
npm test       # Run tests (Node.js built-in test runner)
```

## Environment

- Node.js 18+ required
- Configure host/port: `HOST=0.0.0.0 PORT=3000 npm start`

## Architecture

- Single package, no build step required
- `server.js` - main entry point, also exports testable functions
- Static files served from root (index.html, app.js, styles.css)
- `/healthz` - health check endpoint (GET/HEAD)

## Testing

Uses Node.js built-in test runner (`node:test`). Run all tests:
```bash
npm test
```

## Key Files

- `server.js` - HTTP server with security headers, path validation
- `server.test.js` - test suite
- `.claude/settings.local.json` - Claude permission config (allows WebSearch, git, node, powershell, python)

## Frontend Debug

Set `localStorage.setItem('emotionflow:debug', '1')` then reload to enable debug overlay.