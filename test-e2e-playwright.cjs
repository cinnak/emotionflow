// E2E Test with Playwright - Capture Console Logs
const { chromium } = require('playwright');
const fs = require('fs');

async function runTest() {
  console.log('=== EmotionFlow E2E Test ===\n');
  console.log('Launching browser...');

  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console logs
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    console.log('[Browser]', text);
  });

  // Capture errors
  page.on('pageerror', error => {
    console.error('[Browser Error]', error.message);
  });

  try {
    console.log('\n[1] Opening https://emotionflow.vercel.app/ ...');
    await page.goto('https://emotionflow.vercel.app/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    console.log('\n[2] Taking initial screenshot...');
    await page.screenshot({ path: 'screenshot-initial.png' });

    console.log('\n[3] Typing text...');
    const textarea = page.locator('#emotionInput');
    await textarea.fill('test release');
    await page.waitForTimeout(500);

    console.log('\n[4] Taking screenshot after typing...');
    await page.screenshot({ path: 'screenshot-typed.png' });

    console.log('\n[5] Clicking release button...');
    const releaseBtn = page.locator('#releaseBtn');
    await releaseBtn.click();
    await page.waitForTimeout(500);

    console.log('\n[6] Waiting for animation...');
    await page.waitForTimeout(3000);

    console.log('\n[7] Taking final screenshot...');
    await page.screenshot({ path: 'screenshot-final.png', fullPage: true });

    console.log('\n=== Console Logs Summary ===');
    console.log('Total logs:', consoleLogs.length);
    console.log('\nParticle-related logs:');
    const particleLogs = consoleLogs.filter(l =>
      l.toLowerCase().includes('particle') ||
      l.toLowerCase().includes('canvas') ||
      l.toLowerCase().includes('drawing')
    );
    particleLogs.forEach(log => console.log('  -', log));

    console.log('\n=== Test Complete ===');
    console.log('Screenshots saved:');
    console.log('  - screenshot-initial.png');
    console.log('  - screenshot-typed.png');
    console.log('  - screenshot-final.png');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await page.waitForTimeout(2000);
    await browser.close();
  }
}

runTest().catch(console.error);
