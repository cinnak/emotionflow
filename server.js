const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 8080);
const ROOT_DIR = __dirname;
const ROOT_PREFIX = `${ROOT_DIR}${path.sep}`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8'
};

const NO_CACHE_PATHS = new Set(['/index.html']);

function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '0',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
  };
}

function safeResolvePath(urlPath) {
  try {
    const decoded = decodeURIComponent(urlPath);
    if (decoded.includes('\0')) {
      return null;
    }

    const normalizedPath = decoded === '/' ? '/index.html' : decoded;
    const relativePath = normalizedPath.replace(/^\/+/, '');
    const absolutePath = path.resolve(ROOT_DIR, relativePath);

    if (absolutePath !== ROOT_DIR && !absolutePath.startsWith(ROOT_PREFIX)) {
      return null;
    }

    return absolutePath;
  } catch {
    return null;
  }
}

function resolveCacheControl(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  const publicPath = `/${path.relative(ROOT_DIR, filePath).replace(/\\/g, '/')}`;

  if (extname === '.html' || NO_CACHE_PATHS.has(publicPath)) {
    return 'no-cache';
  }

  return 'public, max-age=3600, stale-while-revalidate=86400';
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    ...getSecurityHeaders(),
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function createServer() {
  return http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const urlPath = requestUrl.pathname;

    console.log(`[${new Date().toISOString()}] ${req.method} ${urlPath}`);

    if ((req.method === 'GET' || req.method === 'HEAD') && urlPath === '/healthz') {
      const payload = {
        status: 'ok',
        uptime: Number(process.uptime().toFixed(2))
      };
      if (req.method === 'HEAD') {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          ...getSecurityHeaders(),
          'Cache-Control': 'no-store'
        });
        return res.end();
      }
      return sendJson(res, 200, payload);
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return sendJson(res, 405, { error: 'Method Not Allowed' });
    }

    const filePath = safeResolvePath(urlPath);
    if (!filePath) {
      return sendJson(res, 400, { error: 'Bad Request' });
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.stat(filePath, (statErr, stats) => {
      if (statErr || !stats.isFile()) {
        if (statErr && statErr.code !== 'ENOENT') {
          return sendJson(res, 500, { error: 'Internal Server Error' });
        }
        return sendJson(res, 404, { error: 'Not Found' });
      }

      const headers = {
        'Content-Type': contentType,
        ...getSecurityHeaders(),
        'Cache-Control': resolveCacheControl(filePath)
      };

      if (req.method === 'HEAD') {
        res.writeHead(200, headers);
        return res.end();
      }

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          return sendJson(res, 500, { error: 'Internal Server Error' });
        }

        res.writeHead(200, headers);
        res.end(content);
      });
    });
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`EmotionFlow server running at http://${HOST}:${PORT}`);
  });
}

module.exports = {
  createServer,
  safeResolvePath,
  resolveCacheControl,
  getSecurityHeaders
};
