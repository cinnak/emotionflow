// E2E Test for Particle System
const fs = require('fs');
const path = require('path');

console.log('=== EmotionFlow Particle System E2E Test ===\n');

// Read and analyze app.js
const appJsPath = path.join(__dirname, 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('[1] Checking app.js exists and loads...');
console.log(`     ✓ app.js found (${appJs.length} bytes)`);

console.log('\n[2] Checking Particle class...');
if (appJs.includes('class Particle')) {
    console.log('     ✓ Particle class found');

    // Extract Particle constructor
    const particleClassMatch = appJs.match(/class Particle \{[\s\S]*?\n  \}/);
    if (particleClassMatch) {
        console.log('     ✓ Particle class definition found');

        // Check for key methods
        const methods = ['explode()', 'update()', 'draw(', 'constructor('];
        methods.forEach(method => {
            if (appJs.includes(method)) {
                console.log(`     ✓ Has ${method}`);
            } else {
                console.log(`     ✗ MISSING ${method}`);
            }
        });
    }
} else {
    console.log('     ✗ Particle class NOT FOUND!');
}

console.log('\n[3] Checking EmotionalParticleSystem...');
if (appJs.includes('class EmotionalParticleSystem')) {
    console.log('     ✓ EmotionalParticleSystem class found');

    // Check for text-to-particle conversion
    if (appJs.includes('createParticlesFromText')) {
        console.log('     ✓ createParticlesFromText method found');
    } else {
        console.log('     ✗ MISSING createParticlesFromText method');
    }

    // Check for canvas setup
    if (appJs.includes('getContext') && appJs.includes('particleCanvas')) {
        console.log('     ✓ Canvas setup found');
    } else {
        console.log('     ✗ Canvas setup MISSING');
    }
} else {
    console.log('     ✗ EmotionalParticleSystem NOT FOUND!');
}

console.log('\n[4] Checking particle size settings...');
const sizeMatch = appJs.match(/this\.size\s*=\s*(\d+(?:\.\d+)?)/);
if (sizeMatch) {
    console.log(`     ✓ Particle size: ${sizeMatch[1]}px`);
} else {
    console.log('     ? Could not find particle size');
}

console.log('\n[5] Checking emotion-specific physics...');
const emotions = ['sadness', 'anger', 'anxiety', 'fear', 'shame', 'loneliness', 'auto'];
emotions.forEach(emotion => {
    if (appJs.includes(`case '${emotion}'`)) {
        console.log(`     ✓ ${emotion} physics defined`);
    } else {
        console.log(`     ✗ ${emotion} physics MISSING`);
    }
});

console.log('\n[6] Checking release trigger...');
if (appJs.includes('triggerRelease()')) {
    console.log('     ✓ triggerRelease method found');
} else {
    console.log('     ✗ triggerRelease method MISSING');
}

console.log('\n[7] Checking canvas visibility setup...');
const indexHtmlPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

if (indexHtml.includes('particleCanvas')) {
    console.log('     ✓ particleCanvas element in HTML');
} else {
    console.log('     ✗ particleCanvas element MISSING from HTML!');
}

const stylesCssPath = path.join(__dirname, 'styles.css');
const stylesCss = fs.readFileSync(stylesCssPath, 'utf8');

const zIndexMatch = stylesCss.match(/#particleCanvas[^}]*z-index:\s*(\d+)/);
if (zIndexMatch) {
    console.log(`     ✓ Canvas z-index: ${zIndexMatch[1]}`);
} else {
    console.log('     ? Could not find canvas z-index');
}

console.log('\n[8] Critical checks for particle visibility...');
const issues = [];

// Check if particles are created with proper size
if (!appJs.includes('this.size = 4') && !appJs.includes('this.size = 5')) {
    issues.push('Particles may be too small (not 4-5px)');
}

// Check if explode() has proper velocity
if (!appJs.includes('this.vx') || !appJs.includes('this.vy')) {
    issues.push('Particles missing velocity properties');
}

// Check if draw() is called
if (!appJs.includes('.draw(') && !appJs.includes('draw(ctx')) {
    issues.push('draw() method may not be called');
}

// Check if animation loop exists
if (!appJs.includes('requestAnimationFrame')) {
    issues.push('Animation loop missing');
}

if (issues.length === 0) {
    console.log('     ✓ All critical checks passed');
} else {
    console.log('     ✗ ISSUES FOUND:');
    issues.forEach(issue => console.log(`       - ${issue}`));
}

console.log('\n=== Test Complete ===\n');

// Output the actual particle system code for inspection
console.log('[DEBUG] Particle class code excerpt:');
const particleStart = appJs.indexOf('class Particle');
if (particleStart !== -1) {
    const particleEnd = appJs.indexOf('\n  }\n', particleStart) + 5;
    const particleCode = appJs.substring(particleStart, Math.min(particleEnd + 500, appJs.length));
    console.log(particleCode.substring(0, 800) + '...\n');
}
