// E2E Test with Playwright
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runTest() {
  console.log('=== EmotionFlow E2E Test with Playwright ===\n');

  const browser = await chromium.launch({
    headless: false,  // Set to false to see the browser
    slowMo: 500
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console logs
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    console.log('[Browser Console]', text);
  });

  // Capture errors
  page.on('pageerror', error => {
    console.error('[Browser Error]', error.message);
  });

  try {
    console.log('[1] Opening local test file...');
    const testPath = 'file://' + path.join(__dirname, 'test-particle-system.html').replace(/\\/g, '/');
    await page.goto(testPath);

    console.log('[2] Waiting for page to load...');
    await page.waitForTimeout(1000);

    console.log('[3] Taking screenshot before test...');
    await page.screenshot({ path: 'test-before.png' });

    console.log('[4] Clicking test button...');
    await page.click('button');

    console.log('[5] Waiting for animation...');
    await page.waitForTimeout(3000);

    console.log('[6] Taking screenshot after animation...');
    await page.screenshot({ path: 'test-after.png' });

    console.log('\n=== Console Logs Summary ===');
    const particleLogs = consoleLogs.filter(l => l.includes('particle') || l.includes('Particle'));
    console.log('Particle-related logs:', particleLogs);

    console.log('\n=== Test Complete ===');
    console.log('Screenshots saved: test-before.png, test-after.png');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

runTest().catch(console.error);
