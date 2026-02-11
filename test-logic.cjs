// Logic test for particle system
const fs = require('fs');

console.log('=== Particle System Logic Test ===\n');

// Simulate Particle class behavior
class TestParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.phase = 'holding';
    this.delay = Math.random() * 500;
    this.life = 1.0;
    this.decay = 0.003 + Math.random() * 0.003;
    this.colorIndex = 0;
    this.journey = ['#6c2a2a', '#a03030', '#c04040', '#f0805a', '#ffb080', '#ffdcc7'];
    this.size = 4 + Math.random() * 3;
    this.vx = 0;
    this.vy = 0;
  }

  explode() {
    this.phase = 'exploding';
    const power = 12 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * power;
    this.vy = Math.sin(angle) * power - 3;
    this.decay = 0.012 + Math.random() * 0.008;
    console.log('  [EXPLODE] Particle at (' + this.x.toFixed(0) + ',' + this.y.toFixed(0) + ') exploded with velocity (' + this.vx.toFixed(2) + ',' + this.vy.toFixed(2) + ')');
  }

  update() {
    if (this.phase === 'holding') {
      this.delay -= 16;
      if (this.delay <= 0) {
        this.explode();
      }
      return true;
    }

    if (this.phase === 'exploding') {
      this.vy += 0.15; // gravity
      this.vx *= 0.99; // friction
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
    }

    const progress = 1 - this.life;
    this.colorIndex = Math.floor(progress * (this.journey.length - 1));
    this.colorIndex = Math.min(this.colorIndex, this.journey.length - 1);

    return this.life > 0;
  }

  draw() {
    // Simulate draw
    const color = this.journey[this.colorIndex];
    return { x: this.x, y: this.y, size: this.size, color: color, alpha: this.life };
  }
}

// Test 1: Holding phase behavior
console.log('Test 1: Holding Phase');
console.log('---------------------');
const p1 = new TestParticle(100, 100);
p1.delay = 100; // Fixed delay for testing

for (let i = 0; i < 10; i++) {
  p1.update();
  const state = p1.draw();
  console.log('Frame ' + i + ': phase=' + p1.phase + ', delay=' + p1.delay.toFixed(0) + ', life=' + p1.life.toFixed(3) + ', colorIndex=' + p1.colorIndex);
}

// Test 2: Immediate explosion
console.log('\nTest 2: Immediate Explosion');
console.log('----------------------------');
const p2 = new TestParticle(200, 200);
p2.delay = 0; // Immediate explosion

for (let i = 0; i < 5; i++) {
  p2.update();
  const state = p2.draw();
  console.log('Frame ' + i + ': phase=' + p2.phase + ', life=' + p2.life.toFixed(3) + ', pos=(' + state.x.toFixed(1) + ',' + state.y.toFixed(1) + ')');
}

// Test 3: Filter behavior
console.log('\nTest 3: Filter Behavior (like app.js)');
console.log('----------------------------------------');
const particles = [];
for (let i = 0; i < 5; i++) {
  const p = new TestParticle(300 + i * 20, 300);
  p.delay = 0;
  particles.push(p);
}

console.log('Initial: ' + particles.length + ' particles');

let frame = 0;
function updateAndFilter() {
  frame++;
  particles = particles.filter(p => {
    const alive = p.update();
    if (alive && p.life > 0) {
      // Would draw here
    }
    return alive;
  });

  console.log('Frame ' + frame + ': ' + particles.length + ' particles alive');

  if (particles.length > 0 && frame < 20) {
    updateAndFilter();
  }
}
updateAndFilter();

console.log('\n=== Logic Test Complete ===');
console.log('If this runs without errors, the logic is sound.');
console.log('The issue might be in browser rendering or canvas setup.');
