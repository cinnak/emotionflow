// ============================================
// EmotionFlow - Emotional Release Engine
// Based on psychological research for true catharsis
// ============================================

// Debug mode — set to true for verbose particle/canvas logging
const DEBUG = window.localStorage.getItem('emotionflow:debug') === '1';
function debugLog(...args) {
  if (DEBUG) {
    console.log(...args);
    let consoleDiv = document.getElementById('debug-console');
    if (!consoleDiv) {
      consoleDiv = document.createElement('div');
      consoleDiv.id = 'debug-console';
      document.body.appendChild(consoleDiv);
    }
    const msg = document.createElement('div');
    msg.textContent = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ');
    consoleDiv.appendChild(msg);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  }
}

debugLog('[EmotionFlow] app.js loaded successfully!');
if (DEBUG) {
  console.info('[EmotionFlow] Debug mode enabled via localStorage key emotionflow:debug=1');
}

// ============================================
// Color Palettes - Emotional Journeys
// ============================================
const COLOR_PALETTES = {
  sadness: {
    heavy: '#1a3a52',
    primary: '#4a7a9a',
    peak: '#6db0d5',
    peace: '#c8e4f6',
    glow: 'rgba(109, 176, 213, 0.5)',
    journey: ['#1a3a52', '#2d5a7a', '#4a7a9a', '#6db0d5', '#9dd0e9', '#c8e4f6']
  },
  anger: {
    heavy: '#6c2a2a',
    primary: '#f0805a',
    peak: '#ffa070',
    peace: '#ffdcc7',
    glow: 'rgba(240, 128, 90, 0.5)',
    journey: ['#6c2a2a', '#a03030', '#c04040', '#f0805a', '#ffb080', '#ffdcc7']
  },
  anxiety: {
    heavy: '#3d2b5e',
    primary: '#ab7cc8',
    peak: '#d9b8f0',
    peace: '#f0e3ff',
    glow: 'rgba(171, 124, 200, 0.5)',
    journey: ['#3d2b5e', '#5a3a7a', '#7a4a8a', '#ab7cc8', '#d9b8f0', '#f0e3ff']
  },
  fear: {
    heavy: '#1a3d3a',
    primary: '#3a8a7a',
    peak: '#5cb8a5',
    peace: '#a8e8d8',
    glow: 'rgba(92, 184, 165, 0.5)',
    journey: ['#1a3d3a', '#2a5a5a', '#3a8a7a', '#5cb8a5', '#88d0c0', '#a8e8d8']
  },
  shame: {
    heavy: '#3d2a1a',
    primary: '#8a6a3a',
    peak: '#b8955a',
    peace: '#e8d4a8',
    glow: 'rgba(184, 149, 90, 0.5)',
    journey: ['#3d2a1a', '#5a4a2a', '#8a6a3a', '#b8955a', '#d8b585', '#e8d4a8']
  },
  loneliness: {
    heavy: '#2a1a3d',
    primary: '#6a3a8a',
    peak: '#9a5ab8',
    peace: '#d4a8e8',
    glow: 'rgba(154, 90, 184, 0.5)',
    journey: ['#2a1a3d', '#4a2a5a', '#6a3a8a', '#9a5ab8', '#b87ad8', '#d4a8e8']
  },
  auto: {
    heavy: '#2d3748',
    primary: '#6a7788',
    peak: '#8dbdac',
    peace: '#c8ddd4',
    glow: 'rgba(141, 189, 172, 0.5)',
    journey: ['#2d3748', '#4a5568', '#6a7788', '#8dbdac', '#b8cdd4', '#c8ddd4']
  }
};

// ============================================
// Emotion Analysis Engine
// ============================================
const EmotionEngine = {
  keywords: {
    sadness: [
      'sad', 'cry', 'crying', 'tears', 'lonely', 'alone', 'empty', 'hollow',
      'hopeless', 'depressed', 'heartbroken', 'hurt', 'miss', 'missing',
      'grief', 'sorrow', 'melancholy', 'blue', 'down', 'unhappy',
      '难过', '伤心', '悲伤', '想哭', '孤独', '寂寞', '空虚', '心碎',
      '心痛', '流泪', '眼泪', '失落', '沮丧', '痛苦'
    ],
    anger: [
      'angry', 'mad', 'furious', 'hate', 'disgusting', 'annoying', 'pissed',
      'frustrated', 'irritated', 'rage', 'outraged', 'unbelievable',
      'ridiculous', 'wtf', 'crap', 'shut up', 'whatever',
      '生气', '愤怒', '气死', '气炸', '火大', '烦', '烦死', '讨厌', '恨',
      '无语', '不爽', '糟心', '憋屈', '恶心', '离谱', '过分', '滚'
    ],
    anxiety: [
      'anxious', 'worried', 'nervous', 'stress', 'stressed', 'overwhelmed',
      'panic', 'tense', 'uneasy', 'restless', 'overthinking', 'dread', 'apprehensive',
      '焦虑', '担心', '紧张', '慌', '压力', '累', '疲惫', '迷茫', '困惑',
      '不知道', '纠结', '犹豫', '忙', '失眠', '睡不着'
    ],
    fear: [
      'scared', 'afraid', 'frightened', 'terrified', 'horror', 'nightmare',
      'phobia', 'threat', 'danger', 'panic attack', 'shaking', 'trembling',
      '害怕', '恐惧', '吓死', '惊恐', '发抖', '颤抖', '危险', '噩梦'
    ],
    shame: [
      'ashamed', 'embarrassed', 'humiliated', 'guilty', 'worthless', 'inferior',
      'inadequate', 'unworthy', 'regret', 'mistake', 'failure', 'exposed',
      '羞耻', '尴尬', '丢脸', '内疚', '愧疚', '不值得', '后悔', '错误', '失败'
    ],
    loneliness: [
      'isolated', 'abandoned', 'rejected', 'nobody cares', 'disconnect',
      'friendless', 'alone', 'solitary', 'miss someone', 'longing',
      '孤单', '寂寞', '没人关心', '被抛弃', '想念', '渴望', '孤独'
    ]
  },

  afterglowMessages: {
    sadness: [
      'The storm passes. The calm remains.',
      'Your tears have watered new possibilities.',
      'Feel the lightness. You deserve this peace.',
      'You have honored your sadness. Now let it drift away.',
      'Like leaves on a river, it flows away from you.'
    ],
    anger: [
      'The fire has burned itself out. Ash fertilizes new growth.',
      'You have released the pressure. Breathe now.',
      'Your anger was heard. It no longer needs to be held.',
      'The storm of energy has passed. Warmth remains.',
      'You have every right to feel this way. And every right to let it go.'
    ],
    anxiety: [
      'The fog is lifting. Clarity returns.',
      'You have faced the unease. It has no more power.',
      'Breathe. You are here. You are safe.',
      'The what-ifs have scattered like mist in the sun.',
      'Your worries have been heard. Now rest.'
    ],
    fear: [
      'The trembling stops. Safety surrounds you.',
      'You have faced the shadow. It cannot hurt you now.',
      'Courage is not the absence of fear, but moving through it.',
      'The threat has passed. You are still here, still standing.',
      'Your bravery in acknowledging fear is your strength.'
    ],
    shame: [
      'You are worthy, exactly as you are.',
      'Mistakes do not define your worth.',
      'The darkness recedes. Your light remains.',
      'You have faced the hard truth. Now you can heal.',
      'There is nothing to hide. You are enough.'
    ],
    loneliness: [
      'You are connected to all, even in solitude.',
      'The space you feel can become room for growth.',
      'You are never truly alone in your experience.',
      'Others feel this too. You are part of something larger.',
      'Connection begins within yourself.'
    ],
    auto: [
      'You have released. You are free.',
      'Feel the lightness. You deserve this peace.',
      'The page is turned. A new chapter begins.',
      'Breathe. You have honored your feelings.',
      'This burden has been released. You can let go now.'
    ]
  },

  // Milestone messages - Start from 5 to keep first release quiet
  milestones: {
    5: "5 releases! You're building emotional awareness.",
    10: "10 releases! Emotional freedom is becoming a habit.",
    25: "25 releases! You're mastering the art of letting go.",
    50: "50 releases! A milestone of emotional growth.",
    100: "100 releases! You've created a powerful practice."
  },

  analyze(text) {
    // Use localeCompare for case-insensitive matching that works with Chinese
    const lowerText = text.toLowerCase();

    const scores = { sadness: 0, anger: 0, anxiety: 0, fear: 0, shame: 0, loneliness: 0 };

    for (const [emotion, words] of Object.entries(this.keywords)) {
      for (const word of words) {
        // Check if word exists in text (works for both English and Chinese)
        if (text.includes(word) || lowerText.includes(word.toLowerCase())) {
          scores[emotion]++;
        }
      }
    }

    let maxScore = 0;
    let detectedEmotion = 'auto';

    for (const [emotion, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        detectedEmotion = emotion;
      }
    }

    return {
      emotion: maxScore > 0 ? detectedEmotion : 'auto',
      confidence: maxScore
    };
  },

  getMessage(emotion) {
    const messages = this.afterglowMessages[emotion] || this.afterglowMessages.auto;
    return messages[Math.floor(Math.random() * messages.length)];
  },

  getPalette(emotion) {
    return COLOR_PALETTES[emotion] || COLOR_PALETTES.auto;
  }
};

// ============================================
// Simple, Clean Particle System - Complete Rewrite
// ============================================

/**
 * Single Particle Class
 * Simple ES6 class with clear physics
 */
class Particle {
  constructor(x, y, emotion, palette, type = 'text') {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.emotion = emotion;
    this.palette = palette;

    this.type = type; // 'text' or 'rain'

    // Physics
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.96;
    this.gravity = 0.1;
    this.size = Math.random() * 3 + 1; // Default size for all particle types

    // Lifecycle
    this.life = 1.0;
    this.decay = Math.random() * 0.01 + 0.005;
    this.delay = Math.random() * 100; // ms delay before moving (for text)

    // Appearance
    // Map life 1.0 -> 0.0 to palette colors
    this.journey = palette.journey;
    this.colorIndex = 0;

    // Phase: for text particles
    this.phase = type === 'text' ? 'holding' : 'raining';

    if (type === 'rain') {
      this.initRainPhysics();
    } else {
      this.initTextPhysics();
    }
  }

  initTextPhysics() {
    this.vx = 0;
    this.vy = 0;
    // Specific behaviors based on emotion
    if (this.emotion === 'anxiety') {
      this.chaosAmount = 2.5;
    } else if (this.emotion === 'fear') {
      this.trembleAmount = 1.5;
    }
  }

  initRainPhysics() {
    this.life = 1.0 + Math.random() * 0.5; // Last longer
    this.decay = 0.002 + Math.random() * 0.003;
    this.y = -Math.random() * window.innerHeight * 0.5; // Start above screen
    this.x = Math.random() * window.innerWidth;

    switch (this.emotion) {
      case 'anger': // Heavy storm
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = 15 + Math.random() * 10;
        this.gravity = 0.5;
        this.size = Math.random() * 3 + 2;
        break;
      case 'anxiety': // Chaotic swirling
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = 8 + Math.random() * 5;
        this.gravity = 0.2;
        break;
      case 'sadness': // Slow heavy rain
        this.vx = 0;
        this.vy = 5 + Math.random() * 5;
        this.gravity = 0.1;
        break;
      default: // Peace/Auto - Glittering
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = 3 + Math.random() * 4;
        this.gravity = 0.05;
    }
  }

  explode() {
    this.phase = 'exploding';

    // VIOLENT EXPLOSION UPGRADE
    // Much higher base velocity for shattering effect
    const explosionForce = 15 + Math.random() * 20;
    const angle = Math.random() * Math.PI * 2;

    this.vx = Math.cos(angle) * explosionForce;
    this.vy = Math.sin(angle) * explosionForce;

    // Specific emotion overrides for explosion style
    switch (this.emotion) {
      case 'anger':
        // Explosive outward burst
        this.vx *= 1.5;
        this.vy *= 1.5;
        this.friction = 0.94; // Slow down faster
        break;
      case 'sadness':
        // Heavy drop
        this.vx *= 0.3; // Less horizontal
        this.vy = Math.abs(this.vy) + 5; // Force down
        this.gravity = 0.5;
        break;
      case 'anxiety':
        // Jittery scatter
        this.vx = (Math.random() - 0.5) * 30;
        this.vy = (Math.random() - 0.5) * 30;
        this.friction = 0.90;
        break;
    }
  }

  update() {
    if (this.type === 'rain') {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;

      // Anxiety rain swirls
      if (this.emotion === 'anxiety') {
        this.vx += (Math.random() - 0.5) * 2;
      }

      this.life -= this.decay;

      // Kill if off bottom
      if (this.y > window.innerHeight + 100) {
        this.life = 0;
      }
      return this.life > 0;
    }

    // Text Particle Logic
    if (this.phase === 'holding') {
      this.delay -= 16;
      if (this.delay <= 0) {
        this.explode();
      }
      return true;
    }

    // Standard physics for exploding text
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;

    // Add chaos/tremble for holding? No, only after explosion or if implemented
    if (this.phase === 'exploding' && this.emotion === 'anxiety') {
      this.vx += (Math.random() - 0.5) * 2; // Post-explosion jitter
    }

    this.x += this.vx;
    this.y += this.vy;

    this.life -= this.decay;
    const progress = 1 - this.life;
    this.colorIndex = Math.floor(progress * (this.journey.length - 1));
    this.colorIndex = Math.min(this.colorIndex, this.journey.length - 1);

    return this.life > 0;
  }

  draw(ctx) {
    if (!ctx) return;

    if (this.type === 'rain') {
      ctx.fillStyle = this.palette.primary; // Rain usually one color
      if (this.emotion === 'auto') ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = this.journey[this.colorIndex];
    }

    ctx.globalAlpha = Math.max(0, this.life);

    ctx.beginPath();
    // Rain looks like streaks for anger/sadness
    if (this.type === 'rain' && (this.emotion === 'anger' || this.emotion === 'sadness')) {
      ctx.ellipse(this.x, this.y, this.size, this.size * 3, 0, 0, Math.PI * 2);
    } else {
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    }
    ctx.fill();
  }
}

/**
 * Main Particle System
 * Manages text-to-particle conversion and animation
 */
class EmotionalParticleSystem {
  constructor(canvas) {
    debugLog('[Architect] Initializing Particle System...');
    if (!canvas) {
      console.error('FATAL: Canvas element is null/undefined!');
      return;
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });

    if (!this.ctx) {
      console.error('[Architect] Failed to get 2d context!');
    }

    this.particles = [];
    this.isRunning = false;
    this.width = 0;
    this.height = 0;

    // Initial sync
    this.resize();

    // Modern robust resizing using ResizeObserver
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.canvas);
    } else {
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    // Get actual layout dimensions
    const rect = this.canvas.getBoundingClientRect();

    // Set internal buffer to match observed visual size
    this.width = Math.floor(rect.width);
    this.height = Math.floor(rect.height);

    // Important: syncing the buffer attributes
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    debugLog(`[Architect] Sync Complete - Visual size: ${this.width}x${this.height}, Buffer size: ${this.canvas.width}x${this.canvas.height}`);
  }

  /**
   * Create cleansing rain from top
   */
  spawnRain(emotion) {
    debugLog('[Particle System] Spawning rain for:', emotion);
    this.resize(); // Ensure size is correct
    const palette = EmotionEngine.getPalette(emotion);

    // Spawn 500 rain drops
    for (let i = 0; i < 500; i++) {
      this.particles.push(new Particle(0, 0, emotion, palette, 'rain'));
    }

    if (!this.isRunning) this.start();
  }

  /**
   * Convert text to particles by rendering and sampling pixels
   */
  createTextParticles(text, emotion) {
    this.resize();
    if (this.width === 0 || this.height === 0) return;

    debugLog('[Particle System] createTextParticles:', text);
    const palette = EmotionEngine.getPalette(emotion);

    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = this.width;
    offCanvas.height = this.height;

    const fontSize = Math.min(64, Math.max(32, this.width / (text.length * 0.55)));
    offCtx.font = `600 ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;

    offCtx.fillStyle = '#ffffff';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, this.width / 2, this.height / 2);

    const imageData = offCtx.getImageData(0, 0, this.width, this.height);
    const pixels = imageData.data;
    const gap = 5;
    let particleCount = 0;

    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        const index = (y * this.width + x) * 4;
        if (pixels[index + 3] > 128) {
          this.particles.push(new Particle(x, y, emotion, palette, 'text'));
          particleCount++;
        }
      }
    }
    debugLog(`[Particle System] Created ${particleCount} text particles`);
  }

  /**
   * Trigger all particles to explode
   */
  releaseText() {
    this.particles.forEach(p => {
      if (p.type === 'text' && p.phase === 'holding') {
        p.delay = 0;
      }
    });
  }

  /**
   * Main animation loop
   */
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Batch update
    let activeCount = 0;
    this.particles = this.particles.filter(p => {
      const alive = p.update();
      if (alive && p.life > 0) {
        p.draw(this.ctx);
        activeCount++;
      }
      return alive;
    });

    this.ctx.globalAlpha = 1;
    return activeCount > 0;
  }

  /**
   * Start animation loop
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const animate = () => {
      if (!this.isRunning) return;
      const hasParticles = this.update();
      if (hasParticles) {
        requestAnimationFrame(animate);
      } else {
        this.isRunning = false;
      }
    };
    animate();
  }

  /**
   * Reset system
   */
  reset() {
    this.particles = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.isRunning = false;
  }
}

// ============================================
// Audio Engine - Emotion-Specific Sounds
// ============================================
class EmotionalAudioEngine {
  constructor() {
    this.context = null;
    this.enabled = false;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: 'interactive'
      });
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not available');
    }
  }

  enable() {
    this.enabled = true;
    this.init();
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  disable() {
    this.enabled = false;
  }

  toggle() {
    if (this.enabled) {
      this.disable();
      return false;
    } else {
      this.enable();
      return true;
    }
  }

  playRelease(emotion) {
    if (!this.enabled || !this.context) return;

    const now = this.context.currentTime;

    if (emotion === 'anger') {
      this.playAngerSound(now);
    } else if (emotion === 'sadness') {
      this.playSadnessSound(now);
    } else if (emotion === 'anxiety') {
      this.playAnxietySound(now);
    } else if (emotion === 'fear') {
      this.playFearSound(now);
    } else if (emotion === 'shame') {
      this.playShameSound(now);
    } else if (emotion === 'loneliness') {
      this.playLonelinessSound(now);
    } else {
      this.playGentleRelease(now);
    }
  }

  playAngerSound(now) {
    const bufferSize = this.context.sampleRate * 0.3;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 15);
    }

    const noise = this.context.createBufferSource();
    noise.buffer = buffer;

    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.3);

    const gain = this.context.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.context.destination);

    noise.start(now);
    noise.stop(now + 0.3);

    const osc = this.context.createOscillator();
    const oscGain = this.context.createGain();

    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
    osc.type = 'sine';

    oscGain.gain.setValueAtTime(0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    osc.connect(oscGain);
    oscGain.connect(this.context.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  playSadnessSound(now) {
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);
    osc.type = 'sine';

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.context.destination);

    osc.start(now);
    osc.stop(now + 0.3);

    const chimes = [523.25, 659.25, 783.99];
    chimes.forEach((freq, i) => {
      const chimeOsc = this.context.createOscillator();
      const chimeGain = this.context.createGain();

      chimeOsc.frequency.value = freq;
      chimeOsc.type = 'sine';

      const startTime = now + 0.3 + i * 0.15;
      const duration = 2;

      chimeGain.gain.setValueAtTime(0, startTime);
      chimeGain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.context.destination);

      chimeOsc.start(startTime);
      chimeOsc.stop(startTime + duration);
    });
  }

  playAnxietySound(now) {
    const duration = 1.5;

    for (let i = 0; i < 3; i++) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();

      osc.frequency.setValueAtTime(200 + Math.random() * 400, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.5);
      osc.type = 'sawtooth';

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(this.context.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    }

    const resolveOsc = this.context.createOscillator();
    const resolveGain = this.context.createGain();

    resolveOsc.frequency.setValueAtTime(440, now + 0.5);
    resolveOsc.type = 'sine';

    resolveGain.gain.setValueAtTime(0, now + 0.5);
    resolveGain.gain.linearRampToValueAtTime(0.15, now + 0.7);
    resolveGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    resolveOsc.connect(resolveGain);
    resolveGain.connect(this.context.destination);

    resolveOsc.start(now + 0.5);
    resolveOsc.stop(now + duration);
  }

  playFearSound(now) {
    // Trembling sound that stabilizes
    for (let i = 0; i < 4; i++) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();

      const startFreq = 150 + Math.random() * 100;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.linearRampToValueAtTime(startFreq * 0.8, now + 0.3 + i * 0.1);
      osc.type = 'triangle';

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(this.context.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    }

    // Calming resolution
    const resolveOsc = this.context.createOscillator();
    const resolveGain = this.context.createGain();

    resolveOsc.frequency.setValueAtTime(330, now + 0.6);
    resolveOsc.type = 'sine';

    resolveGain.gain.setValueAtTime(0, now + 0.6);
    resolveGain.gain.linearRampToValueAtTime(0.12, now + 0.8);
    resolveGain.gain.exponentialRampToValueAtTime(0.01, now + 2);

    resolveOsc.connect(resolveGain);
    resolveGain.connect(this.context.destination);

    resolveOsc.start(now + 0.6);
    resolveOsc.stop(now + 2);
  }

  playShameSound(now) {
    // Muffled, low sound that opens up
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(280, now + 2);
    osc.type = 'sine';

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.linearRampToValueAtTime(2000, now + 1.5);
    filter.Q.setValueAtTime(8, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.context.destination);

    osc.start(now);
    osc.stop(now + 2.5);
  }

  playLonelinessSound(now) {
    // Echoing, seeking sound
    for (let i = 0; i < 3; i++) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();

      osc.frequency.value = 440 + i * 55;
      osc.type = 'sine';

      const startTime = now + i * 0.3;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);

      osc.connect(gain);
      gain.connect(this.context.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.5);
    }

    // Warm resolving chord
    const chordFreqs = [261.63, 329.63, 392.00]; // C major
    chordFreqs.forEach((freq, i) => {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();

      osc.frequency.value = freq;
      osc.type = 'sine';

      const startTime = now + 1;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.05, startTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 2);

      osc.connect(gain);
      gain.connect(this.context.destination);

      osc.start(startTime);
      osc.stop(startTime + 2);
    });
  }

  playGentleRelease(now) {
    const bufferSize = this.context.sampleRate * 0.6;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 4) * 0.5;
    }

    const noise = this.context.createBufferSource();
    noise.buffer = buffer;

    const filter = this.context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.5);
    filter.Q.setValueAtTime(1, now);

    const gain = this.context.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.context.destination);

    noise.start(now);
    noise.stop(now + 0.6);
  }
}

// ============================================
// Release History - localStorage-backed tracking
// ============================================
class ReleaseHistory {
  constructor() {
    this.storageKey = 'emotionflow_history';
    this.journalKey = 'emotionflow_journal';
  }

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch { return []; }
  }

  add(entry) {
    const history = this.getAll();
    history.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      emotion: entry.emotion,
      preview: entry.text.substring(0, 40) + (entry.text.length > 40 ? '...' : ''),
      message: entry.message,
      reflection: entry.reflection || null
    });
    // Keep last 100 entries
    if (history.length > 100) history.length = 100;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (e) {
      // Handle QuotaExceededError by trimming history
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        history.length = Math.floor(history.length / 2);
        try { localStorage.setItem(this.storageKey, JSON.stringify(history)); } catch (_) { /* give up */ }
      }
    }
    return history;
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }

  // ===================
  // Journal Methods
  // ===================
  getJournalEntries() {
    try {
      return JSON.parse(localStorage.getItem(this.journalKey) || '[]');
    } catch { return []; }
  }

  addReflection(releaseId, reflection) {
    const history = this.getAll();
    const entry = history.find(h => h.id === releaseId);
    if (entry) {
      entry.reflection = reflection;
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    }
    return history;
  }

  addMoodCheckIn(mood, note) {
    const journal = this.getJournalEntries();
    journal.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: 'checkin',
      mood: mood,
      note: note || ''
    });
    // Keep last 100 entries
    if (journal.length > 100) journal.length = 100;
    try {
      localStorage.setItem(this.journalKey, JSON.stringify(journal));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        journal.length = Math.floor(journal.length / 2);
        try { localStorage.setItem(this.journalKey, JSON.stringify(journal)); } catch (_) {}
      }
    }
    return journal;
  }

  getWeeklyMoods() {
    const journal = this.getJournalEntries();
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const moods = [];
    // Get check-ins from last 7 days grouped by day
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStr = d.toDateString();
      const dayCheckIns = journal.filter(j => 
        j.type === 'checkin' && new Date(j.timestamp).toDateString() === dayStr
      );
      moods.push({
        date: dayStr,
        mood: dayCheckIns.length > 0 ? dayCheckIns[0].mood : null
      });
    }
    return moods;
  }

  clearJournal() {
    localStorage.removeItem(this.journalKey);
  }

  getStats() {
    const history = this.getAll();
    if (history.length === 0) return null;

    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = history.filter(h => new Date(h.timestamp) > weekAgo);

    const emotionCounts = {};
    history.forEach(h => {
      emotionCounts[h.emotion] = (emotionCounts[h.emotion] || 0) + 1;
    });
    const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];

    // Calculate streak
    let streak = 0;
    const days = new Set();
    history.forEach(h => {
      days.add(new Date(h.timestamp).toDateString());
    });
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today - i * 24 * 60 * 60 * 1000);
      if (days.has(d.toDateString())) {
        streak++;
      } else if (i > 0) break;
    }

    return {
      total: history.length,
      thisWeek: thisWeek.length,
      topEmotion: topEmotion ? topEmotion[0] : null,
      streak
    };
  }
}

// ============================================
// Main Application
// ============================================
class SadnessConfetti {
  constructor() {
    debugLog('[EmotionFlow] SadnessConfetti constructor called');

    // Elements
    this.body = document.body;
    this.emotionInput = document.getElementById('emotionInput');
    this.charCount = document.getElementById('charCount');
    this.charProgressFill = document.getElementById('charProgressFill');
    this.inputStatus = document.getElementById('inputStatus');
    this.releaseBtn = document.getElementById('releaseBtn');
    this.chargeFill = document.getElementById('chargeFill');
    this.emotionBtns = document.querySelectorAll('.emotion-btn');
    this.canvas = document.getElementById('particleCanvas');
    this.releaseContainer = document.getElementById('releaseContainer');
    this.textPreview = document.getElementById('textPreview');
    this.inputSection = document.getElementById('inputSection');
    this.afterglowSection = document.getElementById('afterglowSection');
    this.afterglowMessage = document.getElementById('afterglowMessage');
    this.afterglowIcon = document.getElementById('afterglowIcon');
    this.resetBtn = document.getElementById('resetBtn');
    this.soundToggle = document.getElementById('soundToggle');
    this.soundIcon = this.soundToggle.querySelector('.sound-icon');
    this.exhaleIndicator = document.getElementById('exhaleIndicator');
    this.a11yAnnouncer = document.getElementById('a11yAnnouncer');

    // New UI elements
    this.clickReleaseBtn = document.getElementById('clickReleaseBtn');
    this.clickCountdown = document.getElementById('clickCountdown');
    this.motionToggle = document.getElementById('motionToggle');
    this.keyboardModal = document.getElementById('keyboardModal');
    this.closeKeyboardModal = document.getElementById('closeKeyboardModal');
    this.journeyStages = document.getElementById('journeyStages');
    this.totalReleases = document.getElementById('totalReleases');
    this.milestoneFooter = document.getElementById('milestoneFooter');

    // Guided Prompts
    this.guidedPrompts = document.getElementById('guidedPrompts');
    this.promptChips = document.querySelectorAll('.prompt-chip');

    // Share & History elements
    this.shareBtn = document.getElementById('shareBtn');
    this.historyToggle = document.getElementById('historyToggle');
    this.historyPanel = document.getElementById('historyPanel');
    this.historyOverlay = document.getElementById('historyOverlay');
    this.historyClose = document.getElementById('historyClose');
    this.historyStats = document.getElementById('historyStats');
    this.historyEntries = document.getElementById('historyEntries');
    this.historyContent = document.getElementById('historyContent');
    this.historyTabs = document.querySelectorAll('.history-tab');
    this.journalView = document.getElementById('journalView');
    this.journalEntries = document.getElementById('journalEntries');
    this.moodCalendar = document.getElementById('moodCalendar');
    this.journalWeekDate = document.getElementById('journalWeekDate');
    this.checkInBtn = document.getElementById('checkInBtn');
    this.clearHistoryBtn = document.getElementById('clearHistory');
    this.exportHistoryBtn = document.getElementById('exportHistory');

    // Reflection Modal
    this.reflectionModal = document.getElementById('reflectionModal');
    this.reflectionInput = document.getElementById('reflectionInput');
    this.skipReflection = document.getElementById('skipReflection');
    this.saveReflection = document.getElementById('saveReflection');
    this.closeReflection = document.getElementById('closeReflection');

    // Check-In Modal
    this.checkInModal = document.getElementById('checkInModal');
    this.moodSelector = document.getElementById('moodSelector');
    this.moodOptions = document.querySelectorAll('.mood-option');
    this.checkInNote = document.getElementById('checkInNote');
    this.cancelCheckIn = document.getElementById('cancelCheckIn');
    this.saveCheckIn = document.getElementById('saveCheckIn');

    // Share Modal Elements
    this.shareModal = document.getElementById('shareModal');
    this.closeShareModal = document.getElementById('closeShareModal');
    this.sharePreviewCanvas = document.getElementById('sharePreviewCanvas');
    this.downloadShareBtn = document.getElementById('downloadShareBtn');
    this.copyShareBtn = document.getElementById('copyShareBtn');
    this.shareOptionBtns = document.querySelectorAll('.share-option-btn');

// State
    this.selectedEmotion = 'sadness';
    this.currentText = '';
    this.isHolding = false;
    this.holdStartTime = 0;
    this.holdInterval = null;
    this.isClickHolding = false;
    this.clickHoldTime = 0;
    this.clickHoldInterval = null;
    this.lastReleaseMessage = '';
    this.lastReleasedEmotion = '';
    this.reduceMotion = false;
    this.DRAFT_KEY = 'emotionflow:draft';
    this.pendingReleaseId = null;

    // Systems
    this.particles = new EmotionalParticleSystem(this.canvas);
    debugLog('[EmotionFlow] Particle system ready');
    this.audio = new EmotionalAudioEngine();
    this.history = new ReleaseHistory();

    // Bind events
    this.bindEvents();

    // Check saved preferences
    this.loadPreferences();

    // Check for reduced motion preference
    this.checkMotionPreference();
  }

  loadPreferences() {
    const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
    if (soundEnabled) {
      this.audio.enable();
      this.soundIcon.textContent = '🔊';
    }

    const motionReduced = localStorage.getItem('reduceMotion') === 'true';
    if (motionReduced) {
      this.reduceMotion = true;
      this.body.classList.add('reduce-motion');
      if (this.motionToggle) {
        this.motionToggle.classList.add('active');
        this.motionToggle.setAttribute('aria-label', 'Motion reduced');
      }
    }

    // Load release count
    const releaseCount = parseInt(localStorage.getItem('releaseCount') || '0');
    if (this.totalReleases) {
      this.totalReleases.textContent = releaseCount;
    }

    // Restore draft if exists
    this.restoreDraft();
  }

  checkMotionPreference() {
    // Check system preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !this.reduceMotion) {
      this.reduceMotion = true;
      this.body.classList.add('reduce-motion');
      if (this.motionToggle) {
        this.motionToggle.classList.add('active');
      }
    }
  }

  announce(message) {
    if (this.a11yAnnouncer) {
      this.a11yAnnouncer.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        this.a11yAnnouncer.textContent = '';
      }, 1000);
    }
  }

  bindEvents() {
    // Emotion selector
    this.emotionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectEmotion(btn.dataset.emotion);
      });
    });

    // Input
    this.emotionInput.addEventListener('input', () => this.handleInput());
    this.emotionInput.addEventListener('focus', () => this.handleFocus());

    // Hold-to-release button (mouse/touch)
    this.releaseBtn.addEventListener('mousedown', (e) => this.startHold(e));
    this.releaseBtn.addEventListener('touchstart', (e) => this.startHold(e));
    this.releaseBtn.addEventListener('mouseup', () => this.endHold());
    this.releaseBtn.addEventListener('mouseleave', () => this.cancelHold());
    this.releaseBtn.addEventListener('touchend', () => this.endHold());

    // Click release alternative
    if (this.clickReleaseBtn) {
      this.clickReleaseBtn.addEventListener('click', () => this.startClickRelease());
    }

    // Reset button
    this.resetBtn.addEventListener('click', () => this.reset());

    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => this.shareRelease());
    }

    // Share Modal Events
    if (this.closeShareModal) {
      this.closeShareModal.addEventListener('click', () => this.toggleShareModal(false));
    }
    if (this.shareModal) {
      this.shareModal.addEventListener('click', (e) => {
        if (e.target === this.shareModal) this.toggleShareModal(false);
      });
    }
    if (this.downloadShareBtn) {
      this.downloadShareBtn.addEventListener('click', () => this.downloadShareImage());
    }
    if (this.copyShareBtn) {
      this.copyShareBtn.addEventListener('click', () => this.copyShareImage());
    }
    if (this.shareOptionBtns) {
      this.shareOptionBtns.forEach(btn => {
        if (btn.dataset.platform === 'more') {
          btn.addEventListener('click', () => {
            btn.classList.add('hidden');
            document.querySelectorAll('.hidden-share').forEach(b => b.classList.remove('hidden-share'));
          });
        } else {
          btn.addEventListener('click', () => this.shareToPlatform(btn.dataset.platform));
        }
      });
    }

    // History toggle
    if (this.historyToggle) {
      this.historyToggle.addEventListener('click', () => this.toggleHistory());
    }
    if (this.historyClose) {
      this.historyClose.addEventListener('click', () => this.toggleHistory(false));
    }
    if (this.clearHistoryBtn) {
      this.clearHistoryBtn.addEventListener('click', () => {
        this.history.clear();
        this.renderHistory();
      });
    }
    if (this.historyOverlay) {
      this.historyOverlay.addEventListener('click', () => this.toggleHistory(false));
    }

    // History tabs
    if (this.historyTabs) {
      this.historyTabs.forEach(tab => {
        tab.addEventListener('click', () => this.switchHistoryTab(tab.dataset.tab));
      });
    }

    // Check-in button
    if (this.checkInBtn) {
      this.checkInBtn.addEventListener('click', () => this.openCheckIn());
    }

    // Reflection modal
    if (this.skipReflection) {
      this.skipReflection.addEventListener('click', () => this.closeReflection());
    }
    if (this.closeReflection) {
      this.closeReflection.addEventListener('click', () => this.closeReflection());
    }
    if (this.saveReflection) {
      this.saveReflection.addEventListener('click', () => this.saveReflectionEntry());
    }
    if (this.reflectionModal) {
      this.reflectionModal.addEventListener('click', (e) => {
        if (e.target === this.reflectionModal) this.closeReflection();
      });
    }

    // Check-in modal
    if (this.cancelCheckIn) {
      this.cancelCheckIn.addEventListener('click', () => this.closeCheckIn());
    }
    if (this.saveCheckIn) {
      this.saveCheckIn.addEventListener('click', () => this.saveCheckInEntry());
    }
    if (this.checkInModal) {
      this.checkInModal.addEventListener('click', (e) => {
        if (e.target === this.checkInModal) this.closeCheckIn();
      });
    }
    if (this.moodOptions) {
      this.moodOptions.forEach(opt => {
        opt.addEventListener('click', () => {
          this.moodOptions.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    }

    // Guided prompts
    if (this.promptChips) {
      this.promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.emotionInput.value = chip.dataset.prompt;
          this.emotionInput.focus();
          this.handleInput();
          if (this.guidedPrompts) this.guidedPrompts.hidden = true;
        });
      });
    }

    // Export history
    if (this.exportHistoryBtn) {
      this.exportHistoryBtn.addEventListener('click', () => this.exportHistory());
    }

    // Sound toggle
    this.soundToggle.addEventListener('click', () => this.toggleSound());

    // Motion toggle
    if (this.motionToggle) {
      this.motionToggle.addEventListener('click', () => this.toggleMotion());
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('keyup', (e) => this.handleKeyup(e));

    // Keyboard modal
    if (this.closeKeyboardModal) {
      this.closeKeyboardModal.addEventListener('click', () => {
        this.keyboardModal.close();
      });
    }

    // Close modal on backdrop click
    if (this.keyboardModal) {
      this.keyboardModal.addEventListener('click', (e) => {
        if (e.target === this.keyboardModal) {
          this.keyboardModal.close();
        }
      });
    }

    // Pause/resume on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.particles.isRunning = false;
        if (this.isHolding) {
          this.cancelHold();
        }
        if (this.clickCountdownTimer) {
          this.cancelClickRelease();
        }
      }
    });
  }

  handleKeydown(e) {
    // Space bar for hold release
    if (e.code === 'Space' && !this.isReleasing && !e.repeat) {
      const hasContent = this.currentText.trim().length > 1;
      if (hasContent && document.activeElement !== this.emotionInput) {
        e.preventDefault();
        this.spacePressed = true;
        this.startHold(e);
      }
    }

    // Enter for click release
    if (e.code === 'Enter' && !this.isReleasing) {
      const hasContent = this.currentText.trim().length > 1;
      if (hasContent && document.activeElement !== this.emotionInput) {
        e.preventDefault();
        this.startClickRelease();
      }
    }

    // Number keys for emotion selection
    if (e.key >= '1' && e.key <= '7') {
      const index = parseInt(e.key) - 1;
      const btns = Array.from(this.emotionBtns);
      if (btns[index]) {
        btns[index].click();
      }
    }

    // ? for keyboard help
    if (e.key === '?' && !this.isReleasing) {
      e.preventDefault();
      this.keyboardModal.showModal();
    }

    // Escape to cancel or reset
    if (e.code === 'Escape') {
      if (this.isHolding) {
        this.cancelHold();
      }
      if (this.clickCountdownTimer) {
        this.cancelClickRelease();
      }
      if (this.afterglowSection.hidden === false) {
        this.reset();
      }
      if (this.keyboardModal.open) {
        this.keyboardModal.close();
      }
    }
  }

  handleKeyup(e) {
    if (e.code === 'Space' && this.spacePressed) {
      this.spacePressed = false;
      this.endHold();
    }
  }

  selectEmotion(emotion) {
    // Handle "More" button - show all emotions
    if (emotion === 'more') {
      this.emotionBtns.forEach(btn => {
        btn.classList.remove('hidden');
      });
      const moreBtn = document.querySelector('.emotion-btn.more-emotions');
      if (moreBtn) moreBtn.classList.add('hidden');
      return;
    }

    this.selectedEmotion = emotion;

    this.emotionBtns.forEach(btn => {
      if (btn.classList.contains('hidden')) return;
      const isActive = btn.dataset.emotion === emotion;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', isActive);
    });

    // Map emotion to body state
    const emotionMap = {
      sadness: 'sadness',
      anger: 'anger',
      anxiety: 'anxiety',
      fear: 'fear',
      shame: 'shame',
      loneliness: 'loneliness',
      auto: 'sadness'
    };

    this.body.dataset.emotion = emotionMap[emotion] || 'sadness';
    this.updateReleaseButton();
  }

  handleInput() {
    this.currentText = this.emotionInput.value;
    const length = this.currentText.length;

    this.charCount.textContent = length;

    // Update progress bar
    this.charProgressFill = this.charProgressFill || document.getElementById('charProgressFill');
    if (this.charProgressFill) {
      this.charProgressFill.style.transform = `scaleX(${Math.min(length / 1000, 1)})`;
    }

    // Show progress on focus/content
    const charIndicator = this.charCount.parentElement;
    if (charIndicator) {
      charIndicator.classList.toggle('has-content', length > 0);
    }

    // Add encouraging animation at milestones
    if (charIndicator && (length === 50 || length === 200 || length === 500)) {
      charIndicator.classList.add('encouraging');
      setTimeout(() => charIndicator.classList.remove('encouraging'), 300);
    }

    // Auto-save draft on input
    this.saveDraft();

    // Hide guided prompts once user starts typing
    if (this.guidedPrompts && length > 0) {
      this.guidedPrompts.hidden = true;
    } else if (this.guidedPrompts && length === 0) {
      this.guidedPrompts.hidden = false;
    }

    if (length === 0) {
      this.inputStatus.textContent = 'Start typing...';
      this.inputStatus.className = 'input-status';
    } else if (length < 20) {
      this.inputStatus.textContent = 'Keep going...';
      this.inputStatus.className = 'input-status typing';
    } else if (length < 100) {
      this.inputStatus.textContent = 'Let it all out...';
      this.inputStatus.className = 'input-status typing';
    } else {
      this.inputStatus.textContent = 'You\'re doing great. Keep going.';
      this.inputStatus.className = 'input-status typing';
    }

    // Auto-detect emotion if in auto mode
    if (this.selectedEmotion === 'auto' && length > 10) {
      const detected = EmotionEngine.analyze(this.currentText);
      if (detected.emotion !== 'auto') {
        const emotionMap = {
          sadness: 'sadness',
          anger: 'anger',
          anxiety: 'anxiety',
          fear: 'fear',
          shame: 'shame',
          loneliness: 'loneliness'
        };
        this.body.dataset.emotion = emotionMap[detected.emotion] || 'sadness';
      }
    }

    this.updateReleaseButton();
  }

  saveDraft() {
    if (this.currentText.trim().length > 0) {
      sessionStorage.setItem(this.DRAFT_KEY, this.currentText);
    }
  }

  restoreDraft() {
    const draft = sessionStorage.getItem(this.DRAFT_KEY);
    if (draft && !this.currentText) {
      this.emotionInput.value = draft;
      this.currentText = draft;
      this.charCount.textContent = draft.length;
      this.handleInput();
    }
  }

  clearDraft() {
    sessionStorage.removeItem(this.DRAFT_KEY);
  }

  handleFocus() {
    this.audio.init();
  }

  updateReleaseButton() {
    const hasContent = this.currentText.trim().length > 1;
    this.releaseBtn.disabled = !hasContent;
    this.releaseBtn.classList.toggle('ready', hasContent);

    if (this.clickReleaseBtn) {
      this.clickReleaseBtn.disabled = !hasContent;
      this.clickReleaseBtn.classList.toggle('ready', hasContent);
    }
  }

  startHold(e) {
    if (this.releaseBtn.disabled || this.isHolding) return;
    if (e instanceof Event && e.type !== 'keydown') {
      e.preventDefault();
    }

    this.isHolding = true;
    this.holdStartTime = Date.now();

    this.releaseBtn.classList.add('charging');
    this.announce('Building your release...');

    // Update journey stage to 'build'
    this.setJourneyStage('build');

    this.holdTimer = setInterval(() => {
      if (!this.isHolding) return;

      const elapsed = Date.now() - this.holdStartTime;
      const progress = Math.min(elapsed / this.requiredHoldTime, 1);

      this.chargeFill.style.transform = `scaleX(${progress})`;

      const btnText = this.releaseBtn.querySelector('.btn-text');
      if (progress < 0.33) {
        btnText.textContent = 'Building...';
      } else if (progress < 0.66) {
        btnText.textContent = 'Almost there...';
      } else if (progress < 1) {
        btnText.textContent = 'Ready...';
      } else {
        btnText.textContent = 'RELEASE!';
      }

      if (progress >= 1) {
        this.triggerRelease();
      }
    }, 50);
  }

  endHold() {
    if (!this.isHolding) return;

    const elapsed = Date.now() - this.holdStartTime;
    const wasCharged = elapsed >= this.requiredHoldTime;

    this.cancelHold();

    if (wasCharged) {
      this.triggerRelease();
    } else {
      this.announce('Release cancelled');
    }
  }

  cancelHold() {
    this.isHolding = false;
    if (this.holdTimer) {
      clearInterval(this.holdTimer);
      this.holdTimer = null;
    }
    this.releaseBtn.classList.remove('charging');
    this.chargeFill.style.width = '0%';

    const btnText = this.releaseBtn.querySelector('.btn-text');
    btnText.textContent = 'Hold to Release';

    // Reset journey stage back to 'feel'
    this.setJourneyStage('feel');
  }

  startClickRelease() {
    if (this.clickReleaseBtn.disabled || this.isReleasing) return;

    this.clickReleaseBtn.classList.add('counting');
    let countdown = 3;

    this.announce(`Release in ${countdown}...`);

    this.clickCountdown.textContent = `(${countdown}s)`;

    this.clickCountdownTimer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        this.clickCountdown.textContent = `(${countdown}s)`;
        this.announce(`Release in ${countdown}...`);
      } else {
        this.cancelClickRelease();
        this.triggerRelease();
      }
    }, 1000);
  }

  cancelClickRelease() {
    if (this.clickCountdownTimer) {
      clearInterval(this.clickCountdownTimer);
      this.clickCountdownTimer = null;
    }
    this.clickReleaseBtn.classList.remove('counting');
    this.clickCountdown.textContent = '';
  }

  async triggerRelease() {
    if (this.isReleasing) return;
    this.isReleasing = true;

    // Clear all hold states
    this.cancelHold();
    this.cancelClickRelease();

    const text = this.currentText.trim();
    if (!text || text.length < 2) {
      this.isReleasing = false;
      return;
    }

    // Capture text for history immediately
    this.lastReleaseText = text;

    // Determine emotion
    let emotion = this.selectedEmotion;
    if (emotion === 'auto') {
      const detected = EmotionEngine.analyze(text);
      emotion = detected.emotion === 'auto' ? 'sadness' : detected.emotion;
    }

    // Prepare display text — remove newlines (canvas fillText can't handle them)
    let displayText = text.length > 80 ? text.substring(0, 80) + '...' : text;
    displayText = displayText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

    // Hide input section
    this.inputSection.style.transition = 'opacity 0.5s, transform 0.5s';
    this.inputSection.style.opacity = '0';
    this.inputSection.style.transform = 'scale(0.95)';

    // Set body state to hide header and emotion selector
    this.body.dataset.state = 'releasing';

    await this.delay(500);
    this.inputSection.style.display = 'none';

    // CRITICAL: Make canvas visible and sized BEFORE creating particles
    this.canvas.classList.add('active');
    this.particles.resize();

    // Show release container with text
    this.releaseContainer.classList.add('active');
    this.releaseContainer.classList.add('building');
    this.releaseContainer.classList.add(emotion);

    // Display the text that will be shattered
    this.textPreview.textContent = displayText;
    this.textPreview.style.opacity = '1';

    // Wait a frame for canvas to be fully visible, then create particles
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    this.particles.canvas.classList.add('active');
    this.particles.createTextParticles(displayText, emotion);
    this.particles.start();

    // Play build-up sound
    this.audio.playRelease(emotion);

    // PHASE 1: BUILDING — text appears and builds tension
    await this.delay(1500);

    // PHASE 2: DEFORMING — text distorts
    this.releaseContainer.classList.remove('building');
    this.releaseContainer.classList.add('deforming');
    await this.delay(800);

    // PHASE 3: SHATTERING — text breaks apart
    this.releaseContainer.classList.remove('deforming');
    this.releaseContainer.classList.add('shattering');
    this.announce('Releasing your emotions...');

    // Hide text preview so particles are visible
    this.textPreview.style.opacity = '0';
    this.particles.releaseText();

    // NEW: Cleansing rain from top
    this.particles.spawnRain(emotion);

    // Let explosion play out
    await this.delay(500);
    this.releaseContainer.classList.remove('active', 'shattering', emotion);

    await this.delay(1500);
    this.transitionToAfterglow(emotion);

    await this.delay(3000);
    this.showAfterglow(emotion);
  }

  transitionToAfterglow(emotion) {
    this.body.dataset.state = 'afterglow';
    this.body.dataset.emotion = emotion;
    this.particles.canvas.classList.remove('active');
  }

  showAfterglow(emotion) {
    this.afterglowSection.hidden = false;
    this.afterglowMessage.textContent = EmotionEngine.getMessage(emotion);

    this.exhaleIndicator.classList.add('active');

    setTimeout(() => {
      this.exhaleIndicator.classList.remove('active');
    }, 4000);

    // Update release count
    let releaseCount = parseInt(localStorage.getItem('releaseCount') || '0');
    releaseCount++;
    localStorage.setItem('releaseCount', releaseCount.toString());

    if (this.totalReleases) {
      this.totalReleases.textContent = releaseCount;
    }

    // Check for milestone - now shows as small footer note
    this.checkMilestone(releaseCount);

    // Store pending release ID for reflection
    this.pendingReleaseId = Date.now();

    // Show reflection prompt after 3 seconds
    setTimeout(() => {
      this.showReflection();
    }, 3000);

    // Save to history
    this.lastReleasedEmotion = emotion;
    this.lastReleaseMessage = this.afterglowMessage.textContent;
    this.history.add({
      emotion,
      text: this.lastReleaseText || this.currentText.trim(),
      message: this.afterglowMessage.textContent
    });

    this.announce('Your emotions have been released. ' + this.afterglowMessage.textContent);

    this.isReleasing = false;
  }

  checkMilestone(count) {
    if (EmotionEngine.milestones[count] && this.milestoneFooter) {
      // Show milestone as small footer note
      this.milestoneFooter.textContent = `🎯 ${EmotionEngine.milestones[count]}`;
      this.milestoneFooter.hidden = false;
    }
  }

  updateJourneyStage(stage) {
    if (!this.journeyStages) return;

    const stages = this.journeyStages.querySelectorAll('.journey-stage');
    const stageNames = ['feel', 'build', 'release', 'peace'];
    const currentIndex = stageNames.indexOf(stage);

    stages.forEach((stageEl, index) => {
      stageEl.classList.remove('active', 'completed');
      if (index < currentIndex) {
        stageEl.classList.add('completed');
      } else if (index === currentIndex) {
        stageEl.classList.add('active');
      }
    });
  }

  setJourneyStage(stage) {
    this.updateJourneyStage(stage);
  }

  reset() {
    this.afterglowSection.hidden = true;
    this.body.dataset.state = '';

    this.exhaleIndicator.classList.remove('active');
    if (this.milestoneFooter) {
      this.milestoneFooter.hidden = true;
    }

    this.particles.reset();
    this.canvas.classList.remove('active');

    // Clear draft after successful release
    this.clearDraft();

    this.emotionInput.value = '';
    this.currentText = '';
    this.charCount.textContent = '0';
    this.inputStatus.textContent = 'Start typing...';
    this.inputStatus.className = 'input-status';

    this.inputSection.style.display = '';
    requestAnimationFrame(() => {
      this.inputSection.style.opacity = '1';
      this.inputSection.style.transform = 'scale(1)';
    });

    // Re-show guided prompts
    if (this.guidedPrompts) this.guidedPrompts.hidden = false;

    this.selectEmotion('sadness');
    this.emotionInput.focus();

    // Reset journey stage to 'feel'
    this.setJourneyStage('feel');

    this.announce('Ready for a new release');
  }

  toggleSound() {
    const enabled = this.audio.toggle();
    this.soundIcon.textContent = enabled ? '🔊' : '🔇';
    localStorage.setItem('soundEnabled', enabled);
    this.animateToggle(this.soundToggle);
  }

  toggleMotion() {
    this.reduceMotion = !this.reduceMotion;
    this.body.classList.toggle('reduce-motion', this.reduceMotion);
    this.motionToggle.classList.toggle('active', this.reduceMotion);

    if (this.reduceMotion) {
      this.motionToggle.setAttribute('aria-label', 'Motion reduced');
      localStorage.setItem('reduceMotion', 'true');
    } else {
      this.motionToggle.setAttribute('aria-label', 'Reduce motion');
      localStorage.setItem('reduceMotion', 'false');
    }
    this.animateToggle(this.motionToggle);
  }

  animateToggle(el) {
    if (!el || this.reduceMotion) return;
    el.classList.add('animating');
    setTimeout(() => el.classList.remove('animating'), 300);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ============================================
  // Share Feature
  // ============================================
  toggleShareModal(show) {
    if (!this.shareModal) return;
    if (show) {
      this.shareModal.showModal();
    } else {
      this.shareModal.close();
    }
  }

  async shareRelease() {
    this.toggleShareModal(true);
    await this.generateShareImage();
  }

  async generateShareImage() {
    const emotion = this.lastReleasedEmotion || this.selectedEmotion;
    const message = this.lastReleaseMessage || 'I released my emotions.';
    const palette = EmotionEngine.getPalette(emotion);

    const canvas = this.sharePreviewCanvas;
    // High resolution for retina/download
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, '#0d1219');
    grad.addColorStop(0.5, palette.heavy);
    grad.addColorStop(1, '#0d1219');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    // Decorative particles
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 1200;
      const y = Math.random() * 800;
      const r = Math.random() * 8 + 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = palette.journey[Math.floor(Math.random() * palette.journey.length)];
      ctx.globalAlpha = 0.3 + Math.random() * 0.5;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Emotion icon
    const emotionIcons = {
      sadness: '💧', anger: '🔥', anxiety: '🌀',
      fear: '👻', shame: '🌑', loneliness: '🌫️', auto: '✨'
    };
    ctx.font = '96px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emotionIcons[emotion] || '✨', 600, 160);

    // Glow behind text
    ctx.shadowColor = palette.peak;
    ctx.shadowBlur = 40;

    // Quote
    ctx.font = '500 44px Inter, -apple-system, sans-serif';
    ctx.fillStyle = palette.peace;
    ctx.textAlign = 'center';

    const words = message.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
      const test = currentLine + (currentLine ? ' ' : '') + word;
      if (ctx.measureText(test).width > 960) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    });
    if (currentLine) lines.push(currentLine);

    const lineHeight = 64;
    const startY = 400 - (lines.length * lineHeight) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, 600, startY + i * lineHeight);
    });

    ctx.shadowBlur = 0;

    // Branding
    ctx.font = '400 28px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('emotionflow.app', 600, 740);

    // Divider line
    ctx.strokeStyle = palette.primary;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(400, 680);
    ctx.lineTo(800, 680);
    ctx.stroke();
  }

  async shareToPlatform(platform) {
    const text = encodeURIComponent(`Thinking of you. I just used EmotionFlow to release "${this.lastReleaseMessage}". 🌊\n\nTry it yourself:`);
    const url = 'https://emotionflow.app';
    const urlEnc = encodeURIComponent(url);

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${urlEnc}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlEnc}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text} ${urlEnc}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${urlEnc}&text=${text}`;
        break;
      case 'weibo':
        shareUrl = `http://service.weibo.com/share/share.php?url=${urlEnc}&title=${text}&pic=${encodeURIComponent('https://emotionflow.app/og-image.png')}`;
        break;
      case 'qq':
        shareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${urlEnc}&title=${encodeURIComponent('EmotionFlow Release')}&desc=${text}`;
        break;
      case 'wechat':
      case 'xiaohongshu':
      case 'discord':
        // Fallback to copy image & text
        await this.copyShareImage();
        const appNames = { wechat: 'WeChat', xiaohongshu: 'Xiaohongshu', discord: 'Discord' };
        alert(`Image & Text Copied! 📋\n\nPlease open ${appNames[platform]} and paste to share.`);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  downloadShareImage() {
    const link = document.createElement('a');
    link.download = `emotionflow-release-${Date.now()}.png`;
    link.href = this.sharePreviewCanvas.toDataURL('image/png');
    link.click();
  }

  async copyShareImage() {
    try {
      const blob = await new Promise(resolve => this.sharePreviewCanvas.toBlob(resolve));
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      const originalText = this.copyShareBtn.querySelector('span').textContent;
      this.copyShareBtn.querySelector('span').textContent = 'Copied! ✓';
      setTimeout(() => {
        this.copyShareBtn.querySelector('span').textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
      // Fallback
      alert('To copy: Right-click the image and select "Copy Image"');
    }
  }

  // ============================================
  // Data Export Feature
  // ============================================
  exportHistory() {
    const entries = this.history.getAll();
    if (entries.length === 0) {
      alert('No release history to export.');
      return;
    }
    const data = JSON.stringify({ exportedAt: new Date().toISOString(), releases: entries }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `emotionflow-history-${new Date().toISOString().split('T')[0]}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  // ============================================
  // History Feature
  // ============================================
  toggleHistory(show) {
    if (!this.historyPanel) return;
    const isCurrentlyOpen = this.historyPanel.classList.contains('open');
    const shouldOpen = show !== undefined ? show : !isCurrentlyOpen;

    if (shouldOpen) {
      this.historyPanel.classList.add('open');
      if (this.historyOverlay) this.historyOverlay.classList.add('open');
      this.renderHistory();
    } else {
      this.historyPanel.classList.remove('open');
      if (this.historyOverlay) this.historyOverlay.classList.remove('open');
    }
  }

  renderHistory() {
    const entries = this.history.getAll();
    const stats = this.history.getStats();

    // Render stats
    if (this.historyStats && stats) {
      const emotionEmojis = {
        sadness: '💧', anger: '🔥', anxiety: '🌀',
        fear: '👻', shame: '🌑', loneliness: '🌫️', auto: '✨'
      };
      this.historyStats.innerHTML = '';
      const statData = [
        { value: String(stats.total), label: 'Total' },
        { value: String(stats.thisWeek), label: 'This Week' },
        { value: stats.streak + '\uD83D\uDD25', label: 'Streak' },
        { value: emotionEmojis[stats.topEmotion] || '\u2014', label: 'Top' }
      ];
      statData.forEach(({ value, label }) => {
        const stat = document.createElement('div');
        stat.className = 'stat';
        const valSpan = document.createElement('span');
        valSpan.className = 'stat-value';
        valSpan.textContent = value;
        const lblSpan = document.createElement('span');
        lblSpan.className = 'stat-label';
        lblSpan.textContent = label;
        stat.appendChild(valSpan);
        stat.appendChild(lblSpan);
        this.historyStats.appendChild(stat);
      });
    } else if (this.historyStats) {
      this.historyStats.innerHTML = '';
    }

    // Render entries
    if (this.historyEntries) {
      if (entries.length === 0) {
        this.historyEntries.innerHTML = '<p class="history-empty">No releases yet. Your journey begins here.</p>';
        return;
      }

      const emotionEmojis = {
        sadness: '💧', anger: '🔥', anxiety: '🌀',
        fear: '👻', shame: '🌑', loneliness: '🌫️', auto: '✨'
      };

      this.historyEntries.innerHTML = '';
      entries.slice(0, 20).forEach(entry => {
        const date = new Date(entry.timestamp);
        const timeStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
          + ' ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        const div = document.createElement('div');
        div.className = 'history-entry';
        div.dataset.emotion = entry.emotion;

        const emoji = document.createElement('span');
        emoji.className = 'history-emoji';
        emoji.textContent = emotionEmojis[entry.emotion] || '\u2728';

        const detail = document.createElement('div');
        detail.className = 'history-detail';

        const preview = document.createElement('span');
        preview.className = 'history-preview';
        preview.textContent = entry.preview; // safe: textContent escapes HTML

        const time = document.createElement('span');
        time.className = 'history-time';
        time.textContent = timeStr;

        detail.appendChild(preview);
        detail.appendChild(time);
        div.appendChild(emoji);
        div.appendChild(detail);
        this.historyEntries.appendChild(div);
      });
    }
  }

  // ===================
  // Journal Methods
  // ===================
  switchHistoryTab(tab) {
    this.historyTabs.forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
      t.setAttribute('aria-pressed', t.dataset.tab === tab);
    });

    const content = tab === 'releases' ? this.historyEntries : this.journalView;
    const oldContent = tab === 'releases' ? this.journalView : this.historyEntries;

    if (!this.reduceMotion) {
      content.style.opacity = '0';
      content.style.transform = 'translateX(15px)';
    }

    if (tab === 'releases') {
      this.journalView.classList.add('hidden');
      this.historyEntries.classList.remove('hidden');
    } else {
      this.journalView.classList.remove('hidden');
      this.historyEntries.classList.add('hidden');
      this.renderJournal();
    }

    if (!this.reduceMotion) {
      requestAnimationFrame(() => {
        content.style.transition = 'opacity 0.25s var(--ease-arrive), transform 0.25s var(--ease-arrive)';
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
        setTimeout(() => {
          content.style.transition = '';
          content.style.opacity = '';
          content.style.transform = '';
        }, 250);
      });
    }
  }

  renderJournal() {
    // Render week calendar
    const moods = this.history.getWeeklyMoods();
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const moodEmojis = { 1: '😢', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };

    if (this.moodCalendar) {
      this.moodCalendar.innerHTML = '';
      moods.forEach((m, i) => {
        const day = document.createElement('div');
        day.className = 'mood-day';
        const dot = document.createElement('div');
        dot.className = 'mood-dot' + (m.mood ? ` mood-${m.mood}` : '');
        dot.textContent = m.mood ? moodEmojis[m.mood] : '';
        const label = document.createElement('span');
        label.className = 'mood-label';
        label.textContent = dayNames[i];
        day.appendChild(dot);
        day.appendChild(label);
        this.moodCalendar.appendChild(day);
      });
    }

    // Set week date label
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 6);
    if (this.journalWeekDate) {
      this.journalWeekDate.textContent = weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        + ' - ' + now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    // Render journal entries (mood check-ins)
    const journal = this.history.getJournalEntries();
    const entries = journal.filter(j => j.type === 'checkin');

    if (this.journalEntries) {
      if (entries.length === 0) {
        this.journalEntries.innerHTML = '<p class="journal-empty">Your reflections will appear here.</p>';
        return;
      }

      this.journalEntries.innerHTML = '';
      entries.slice(0, 20).forEach(entry => {
        const date = new Date(entry.timestamp);
        const timeStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

        const div = document.createElement('div');
        div.className = 'journal-entry';

        const header = document.createElement('div');
        header.className = 'journal-entry-header';
        header.innerHTML = `<span class="journal-entry-date">${timeStr}</span><span>${moodEmojis[entry.mood]}</span>`;

        if (entry.note) {
          const preview = document.createElement('div');
          preview.className = 'journal-entry-preview';
          preview.textContent = entry.note;
          div.appendChild(header);
          div.appendChild(preview);
        } else {
          div.appendChild(header);
        }

        this.journalEntries.appendChild(div);
      });
    }
  }

  // Reflection modal
  showReflection() {
    if (this.reflectionModal) {
      this.reflectionModal.showModal();
      this.reflectionInput.focus();
    }
  }

  closeReflection() {
    if (this.reflectionModal) {
      this.reflectionModal.close();
      this.reflectionInput.value = '';
    }
  }

  saveReflectionEntry() {
    const reflection = this.reflectionInput.value.trim();
    if (reflection && this.pendingReleaseId) {
      this.history.addReflection(this.pendingReleaseId, reflection);
    }
    this.closeReflection();
  }

  // Check-In modal
  openCheckIn() {
    if (this.checkInModal) {
      this.moodOptions.forEach(o => o.classList.remove('selected'));
      this.checkInNote.value = '';
      this.checkInModal.showModal();
    }
  }

  closeCheckIn() {
    if (this.checkInModal) {
      this.checkInModal.close();
    }
  }

  saveCheckInEntry() {
    const selectedMood = document.querySelector('.mood-option.selected');
    const mood = selectedMood ? parseInt(selectedMood.dataset.mood) : 3;
    const note = this.checkInNote.value.trim();

    this.history.addMoodCheckIn(mood, note);
    this.closeCheckIn();
    this.renderJournal();
  }
}

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  new SadnessConfetti();
});
