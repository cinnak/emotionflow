// E2E Test for EmotionFlow Particle System
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('=== EmotionFlow E2E Test ===\n');

// Read app.js
const appJsPath = path.join(__dirname, 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('[CHECK] App.js size:', appJs.length, 'bytes');

// Find key code sections
const particleClassStart = appJs.indexOf('class Particle');
if (particleClassStart === -1) {
  console.error('ERROR: Particle class not found!');
  process.exit(1);
}

const particleClassEnd = appJs.indexOf('\n}\n', particleClassStart + 100);
const particleCode = appJs.substring(particleClassStart, particleClassEnd + 3);

console.log('\n=== Particle Class Code ===');
console.log(particleCode);

// Check draw method specifically
const drawStart = appJs.indexOf('draw(ctx)', particleClassStart);
if (drawStart !== -1) {
  const drawEnd = appJs.indexOf('\n  }\n', drawStart);
  const drawCode = appJs.substring(drawStart - 20, drawEnd + 5);
  console.log('\n=== Draw Method ===');
  console.log(drawCode);
}

// Check createTextParticles method
const createTextStart = appJs.indexOf('createTextParticles(text, emotion)');
if (createTextStart !== -1) {
  const createTextEnd = appJs.indexOf('\n  }\n', createTextStart);
  const createTextCode = appJs.substring(createTextStart - 50, createTextEnd + 5);
  console.log('\n=== CreateTextParticles Method ===');
  console.log(createTextCode);
}

// Check update method
const updateStart = appJs.indexOf('update() {', particleClassStart);
if (updateStart !== -1) {
  const updateEnd = appJs.indexOf('\n  }\n', updateStart);
  const updateCode = appJs.substring(updateStart, updateEnd + 5);
  console.log('\n=== Update Method ===');
  console.log(updateCode);
}

// Check particle system update method
const systemUpdateStart = appJs.indexOf('update() {\n    // Clear canvas', appJs.indexOf('class EmotionalParticleSystem'));
if (systemUpdateStart !== -1) {
  const systemUpdateEnd = appJs.indexOf('\n  }\n', systemUpdateStart + 100);
  const systemUpdateCode = appJs.substring(systemUpdateStart, systemUpdateEnd + 5);
  console.log('\n=== EmotionalParticleSystem.update() ===');
  console.log(systemUpdateCode);
}

console.log('\n=== Test Complete ===');
