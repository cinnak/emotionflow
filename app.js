// ============================================
// EmotionFlow - Emotional Release Engine
// Based on psychological research for true catharsis
// ============================================

// DEBUG: Log immediately when app.js loads
console.log('[EmotionFlow] app.js loaded successfully!');

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
      ' inadequate', 'unworthy', 'regret', 'mistake', 'failure', 'exposed',
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
  constructor(x, y, emotion, palette) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.emotion = emotion;
    this.palette = palette;

    // Physics properties
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.15;
    this.friction = 0.99;

    // Visual properties
    this.size = 4 + Math.random() * 3;  // 4-7px for better visibility
    this.baseSize = this.size;
    this.life = 1.0;
    this.decay = 0.003 + Math.random() * 0.003;
    this.color = palette.peak;
    this.colorIndex = 0;
    this.journey = palette.journey;

    // State
    this.phase = 'holding'; // holding, exploding, fading
    this.delay = Math.random() * 500; // Staggered explosion
  }

  /**
   * Trigger explosion with emotion-specific velocity
   */
  explode() {
    this.phase = 'exploding';

    switch (this.emotion) {
      case 'anger':
        // Violent explosion in ALL directions
        const angerPower = 12 + Math.random() * 20;
        const angerAngle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angerAngle) * angerPower;
        this.vy = Math.sin(angerAngle) * angerPower - 3; // Slight upward bias
        this.decay = 0.012 + Math.random() * 0.008;
        break;

      case 'sadness':
        // Fall down, then float up
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = 2 + Math.random() * 4; // Start falling
        this.gravity = 0.2;
        this.fallTime = 30 + Math.random() * 30;
        this.phase = 'sadness_falling';
        this.decay = 0.004 + Math.random() * 0.002;
        break;

      case 'anxiety':
        // Chaotic scatter
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 15;
        this.gravity = 0.12;
        this.chaosAmount = 2;
        this.decay = 0.008 + Math.random() * 0.005;
        break;

      case 'fear':
        // Trembling movement
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 8;
        this.gravity = 0.1;
        this.trembleAmount = 1.5;
        this.decay = 0.005 + Math.random() * 0.003;
        break;

      case 'shame':
        // Shrink then expand
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = 1 + Math.random() * 3;
        this.gravity = 0.08;
        this.shrinking = true;
        this.shrinkTime = 20 + Math.random() * 20;
        this.decay = 0.003 + Math.random() * 0.002;
        break;

      case 'loneliness':
        // Drift seeking
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 5;
        this.gravity = 0.1;
        this.driftAngle = Math.random() * Math.PI * 2;
        this.decay = 0.004 + Math.random() * 0.002;
        break;

      default: // auto
        // Gentle explosion
        const autoPower = 6 + Math.random() * 10;
        const autoAngle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(autoAngle) * autoPower;
        this.vy = Math.sin(autoAngle) * autoPower - 2;
        this.gravity = 0.12;
        this.decay = 0.005 + Math.random() * 0.003;
    }
  }

  update() {
    // Handle delay before explosion
    if (this.phase === 'holding') {
      this.delay -= 16;
      if (this.delay <= 0) {
        this.explode();
      }
      return true;
    }

    // Emotion-specific behavior
    switch (this.phase) {
      case 'sadness_falling':
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.fallTime--;
        if (this.fallTime <= 0) {
          this.phase = 'sadness_rising';
          this.vy = -2 - Math.random() * 2; // Float up
        }
        break;

      case 'sadness_rising':
        this.vy *= 0.97;
        this.vx *= 0.98;
        this.gravity = 0; // No gravity when rising
        break;

      case 'exploding':
        // Default physics
        if (this.chaosAmount) {
          // Anxiety chaos
          this.vy += this.gravity;
          this.vx *= this.friction;
          this.vx += (Math.random() - 0.5) * this.chaosAmount;
          this.vy += (Math.random() - 0.5) * this.chaosAmount;
          this.chaosAmount *= 0.98;
        } else if (this.trembleAmount) {
          // Fear tremble
          this.vy += this.gravity;
          this.vx *= this.friction;
          this.vx += (Math.random() - 0.5) * this.trembleAmount;
          this.vy += (Math.random() - 0.5) * this.trembleAmount;
          this.trembleAmount *= 0.97;
        } else if (this.shrinking !== undefined) {
          // Shame
          if (this.shrinking) {
            this.size *= 0.97;
            this.vx *= 0.95;
            this.vy *= 0.95;
            this.shrinkTime--;
            if (this.shrinkTime <= 0) {
              this.shrinking = false;
              this.vx = (Math.random() - 0.5) * 8;
              this.vy = 2 + Math.random() * 4;
            }
          } else {
            this.vy += this.gravity;
            this.vx *= 0.98;
          }
        } else if (this.driftAngle !== undefined) {
          // Loneliness
          this.vy += this.gravity;
          this.driftAngle += 0.02;
          this.vx += Math.cos(this.driftAngle) * 0.2;
          this.vx *= 0.99;
        } else {
          // Default (anger, auto)
          this.vy += this.gravity;
          this.vx *= this.friction;
        }
        break;
    }

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Update color through journey
    this.life -= this.decay;
    const progress = 1 - this.life;
    this.colorIndex = Math.floor(progress * (this.journey.length - 1));
    this.colorIndex = Math.min(this.colorIndex, this.journey.length - 1);

    return this.life > 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.journey[this.colorIndex];
    ctx.globalAlpha = this.life;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Main Particle System
 * Manages text-to-particle conversion and animation
 */
class EmotionalParticleSystem {
  constructor(canvas) {
    console.log('[EmotionalParticleSystem] Constructor called with canvas:', canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    console.log('[EmotionalParticleSystem] Canvas context:', this.ctx);
    console.log('[EmotionalParticleSystem] Canvas size:', canvas.width, 'x', canvas.height);
    this.particles = [];
    this.isRunning = false;
    this.width = 0;
    this.height = 0;
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = document.documentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    // Set canvas size (CSS handles display size)
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * Convert text to particles by rendering and sampling pixels
   */
  createTextParticles(text, emotion) {
    this.particles = [];

    // Get color palette
    const palette = EmotionEngine.getPalette(emotion);

    // Create offscreen canvas for text rendering
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    offCanvas.width = this.width;
    offCanvas.height = this.height;

    // Calculate font size matching the CSS
    const fontSize = Math.min(64, Math.max(32, this.width / (text.length * 0.55)));
    offCtx.font = `600 ${fontSize}px "Inter", -apple-system, sans-serif`;

    // Draw text centered on canvas
    offCtx.fillStyle = '#ffffff';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, this.width / 2, this.height / 2);

    // Get pixel data
    const imageData = offCtx.getImageData(0, 0, this.width, this.height);
    const pixels = imageData.data;

    // Sample pixels to create particles
    const gap = 5;
    let particleCount = 0;

    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        // Check if pixel is filled (alpha > 128)
        const index = (y * this.width + x) * 4;
        if (pixels[index + 3] > 128) {
          // Create particle at this position
          this.particles.push(new Particle(x, y, emotion, palette));
          particleCount++;
        }
      }
    }

    console.log(`[Particle System] Created ${particleCount} particles from text: "${text}"`);
    console.log(`[Particle System] Canvas size: ${this.width}x${this.height}, Font size: ${fontSize}px`);
  }

  /**
   * Trigger all particles to explode
   */
  releaseText() {
    this.particles.forEach(p => {
      if (p.phase === 'holding') {
        p.delay = 0; // Immediate explosion
      }
    });
  }

  /**
   * Main animation loop
   */
  update() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Debug: log frame
    if (this.particles.length > 0 && Math.random() < 0.02) {
      console.log(`[Particle System] Drawing ${this.particles.length} particles`);
    }

    // Update and draw particles
    this.particles = this.particles.filter(p => {
      const alive = p.update();
      if (alive && p.life > 0) {
        p.draw(this.ctx);
      }
      return alive;
    });

    // Reset alpha
    this.ctx.globalAlpha = 1;

    // Return true if any particles remain
    return this.particles.length > 0;
  }

  /**
   * Start animation loop
   */
  start() {
    console.log('[Particle System] Starting animation loop');
    this.isRunning = true;
    const animate = () => {
      if (!this.isRunning) return;
      const hasParticles = this.update();
      if (hasParticles) {
        requestAnimationFrame(animate);
      } else {
        console.log('[Particle System] Animation loop ended - no particles');
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
// Main Application
// ============================================
class SadnessConfetti {
  constructor() {
    console.log('[EmotionFlow] SadnessConfetti constructor called');

    // Elements
    this.body = document.body;
    this.emotionInput = document.getElementById('emotionInput');
    this.charCount = document.getElementById('charCount');
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

    // State
    this.selectedEmotion = 'sadness';
    this.currentText = '';
    this.isReleasing = false;
    this.isHolding = false;
    this.holdStartTime = 0;
    this.holdTimer = null;
    this.clickCountdownTimer = null;
    this.requiredHoldTime = 1500;
    this.spacePressed = false;
    this.reduceMotion = false;

    // Systems
    console.log('[EmotionFlow] Creating particle system...');
    this.particles = new EmotionalParticleSystem(this.canvas);
    console.log('[EmotionFlow] Particle system created:', this.particles);
    this.audio = new EmotionalAudioEngine();

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
    this.selectedEmotion = emotion;

    this.emotionBtns.forEach(btn => {
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

      this.chargeFill.style.width = `${progress * 100}%`;

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
    if (!text) return;

    // Require at least 2 characters
    if (text.length < 2) return;

    // Determine emotion
    let emotion = this.selectedEmotion;
    if (emotion === 'auto') {
      const detected = EmotionEngine.analyze(text);
      emotion = detected.emotion === 'auto' ? 'sadness' : detected.emotion;
    }

    // Use full text for display (up to 80 chars), or entire text if short
    const displayText = text.length > 80 ? text.substring(0, 80) + '...' : text;

    // Hide input section
    this.inputSection.style.transition = 'opacity 0.5s, transform 0.5s';
    this.inputSection.style.opacity = '0';
    this.inputSection.style.transform = 'scale(0.95)';

    // Set body state to hide header and emotion selector
    this.body.dataset.state = 'releasing';

    await this.delay(500);
    this.inputSection.style.display = 'none';

    // Show release container with text
    this.releaseContainer.classList.add('active');
    this.releaseContainer.classList.add('building');
    this.releaseContainer.classList.add(emotion);
    this.canvas.classList.add('active');

    // Display the text that will be shattered - centered on screen
    this.textPreview.textContent = displayText;
    this.textPreview.style.opacity = '1';

    // Create text particles at the exact position of the text (center of screen)
    this.particles.createTextParticles(displayText, emotion);

    // Start animation loop IMMEDIATELY so particles are visible during build-up
    // Particles will stay in 'holding' phase until releaseText() is called
    this.particles.start();

    // Play a subtle build-up sound
    this.audio.playRelease(emotion);

    // PHASE 1: BUILDING - Text appears and builds tension (1.5s)
    await this.delay(1500);

    // PHASE 2: DEFORMING - Text distorts and twists (0.8s)
    this.releaseContainer.classList.remove('building');
    this.releaseContainer.classList.add('deforming');

    await this.delay(800);

    // PHASE 3: SHATTERING - Text breaks apart and explodes (0.5s)
    this.releaseContainer.classList.remove('deforming');
    this.releaseContainer.classList.add('shattering');

    this.announce('Releasing your emotions...');

    // Hide text preview IMMEDIATELY so particles are visible
    this.textPreview.style.opacity = '0';

    // Start the shattering - particles break away from text positions
    this.particles.releaseText();

    // Small delay for explosion to play out
    await this.delay(500);
    this.releaseContainer.classList.remove('active');
    this.releaseContainer.classList.remove('shattering');
    this.releaseContainer.classList.remove(emotion);

    await this.delay(1500);
    this.transitionToAfterglow(emotion);

    await this.delay(3000);
    this.showAfterglow(emotion);
  }

  transitionToAfterglow(emotion) {
    this.body.dataset.state = 'afterglow';
    this.body.dataset.emotion = emotion;
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
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  new SadnessConfetti();
});
