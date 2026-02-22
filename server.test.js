const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const http = require('node:http');

const {
  createServer,
  safeResolvePath,
  resolveCacheControl,
  getSecurityHeaders
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
