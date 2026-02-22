const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const {
  safeResolvePath,
  resolveCacheControl,
  getSecurityHeaders
} = require('./server');

const ROOT = __dirname;

test('safeResolvePath maps root route to index.html', () => {
  const resolved = safeResolvePath('/');
  assert.equal(resolved, path.resolve(ROOT, 'index.html'));
});

test('safeResolvePath rejects path traversal', () => {
  const resolved = safeResolvePath('/../../etc/passwd');
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
