const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const http = require('node:http');

const {
  createServer,
  safeResolvePath,
  resolveCacheControl,
  getSecurityHeaders,
  isBlockedPath
} = require('./server');

const ROOT = __dirname;

function request(server, method, route) {
  const address = server.address();
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port: address.port,
        path: route,
        method
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8')
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

test('safeResolvePath maps root route to index.html', () => {
  const resolved = safeResolvePath('/');
  assert.equal(resolved, path.resolve(ROOT, 'index.html'));
});

test('safeResolvePath rejects path traversal', () => {
  const resolved = safeResolvePath('/../../etc/passwd');
  assert.equal(resolved, null);
});

test('safeResolvePath rejects malformed URI sequences', () => {
  const resolved = safeResolvePath('/%E0%A4%A');
  assert.equal(resolved, null);
});

test('resolveCacheControl disables cache for html and enables for static assets', () => {
  assert.equal(resolveCacheControl(path.resolve(ROOT, 'index.html')), 'no-cache');
  assert.match(resolveCacheControl(path.resolve(ROOT, 'styles.css')), /max-age=3600/);
});

test('security headers include baseline hardening keys', () => {
  const headers = getSecurityHeaders();
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(headers['Cross-Origin-Opener-Policy'], 'same-origin');
});

test('HEAD /healthz returns 200 with no body', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'HEAD', '/healthz');
  assert.equal(res.statusCode, 200);
  assert.equal(res.body, '');
  assert.equal(res.headers['cache-control'], 'no-store');
});

// --- isBlockedPath tests ---

test('isBlockedPath blocks server.js', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'server.js')), true);
});

test('isBlockedPath blocks package.json', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'package.json')), true);
});

test('isBlockedPath blocks .env', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, '.env')), true);
});

test('isBlockedPath blocks .git directory paths', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, '.git', 'config')), true);
});

test('isBlockedPath blocks node_modules paths', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'node_modules', 'express', 'index.js')), true);
});

test('isBlockedPath allows index.html', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'index.html')), false);
});

test('isBlockedPath allows styles.css', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'styles.css')), false);
});

test('isBlockedPath allows app.js (client JS)', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'app.js')), false);
});

test('isBlockedPath blocks files without allowed extensions', () => {
  assert.equal(isBlockedPath(path.resolve(ROOT, 'README.md')), true);
});

// --- Integration tests ---

test('GET / returns index.html with 200', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'GET', '/');
  assert.equal(res.statusCode, 200);
  assert.match(res.headers['content-type'], /text\/html/);
  assert.match(res.body, /EmotionFlow/);
});

test('GET /healthz returns JSON status', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'GET', '/healthz');
  assert.equal(res.statusCode, 200);
  const body = JSON.parse(res.body);
  assert.equal(body.status, 'ok');
  assert.equal(typeof body.uptime, 'number');
});

test('POST returns 405', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'POST', '/');
  assert.equal(res.statusCode, 405);
});

test('GET /nonexistent returns 404', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'GET', '/nonexistent.html');
  assert.equal(res.statusCode, 404);
});

test('GET /server.js is blocked and returns 404', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'GET', '/server.js');
  assert.equal(res.statusCode, 404);
});

test('GET /package.json is blocked and returns 404', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());

  const res = await request(server, 'GET', '/package.json');
  assert.equal(res.statusCode, 404);
});

test('security headers include CSP', () => {
  const headers = getSecurityHeaders();
  assert.ok(headers['Content-Security-Policy']);
  assert.match(headers['Content-Security-Policy'], /default-src 'self'/);
});

test('security headers include Permissions-Policy', () => {
  const headers = getSecurityHeaders();
  assert.ok(headers['Permissions-Policy']);
  assert.match(headers['Permissions-Policy'], /camera=\(\)/);
});
