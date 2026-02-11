// ============================================
// EmotionFlow - Emotional Release Engine
// Based on psychological research for true catharsis
// ============================================

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
// Advanced Particle System with True Emotional Physics
// ============================================
class EmotionalParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      powerPreference: 'high-performance'
    });
    this.particles = [];
    this.textParticles = [];
    this.isRunning = false;
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = document.documentElement.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);

    this.width = rect.width;
    this.height = rect.height;
  }

  // Get color at a specific stage of emotional journey
  getColorAtStage(emotion, progress) {
    const palette = EmotionEngine.getPalette(emotion);
    const journey = palette.journey;
    const index = Math.floor(progress * (journey.length - 1));
    return journey[Math.min(index, journey.length - 1)];
  }

  // Create text particles - THE TEXT ITSELF TRANSFORMS
  createTextParticles(text, emotion) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Calculate font size - Match CSS: clamp(2rem, 6vw, 4rem) ≈ 32-64px
    const baseFontSize = Math.min(64, Math.max(32, this.width / (text.length * 0.55)));
    tempCtx.font = `600 ${baseFontSize}px "Inter", -apple-system, sans-serif`;

    tempCanvas.width = this.width * window.devicePixelRatio;
    tempCanvas.height = this.height * window.devicePixelRatio;
    tempCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Draw text with emotion color - positioned at center of screen (match CSS top: 50%)
    const palette = EmotionEngine.getPalette(emotion);
    const textY = this.height * 0.5; // Match CSS top: 50%

    tempCtx.fillStyle = '#ffffff';
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText(text, this.width / 2, textY);

    // Get pixel data
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const pixels = imageData.data;

    const gap = 3; // Pixel sampling gap
    const behavior = this.getEmotionBehavior(emotion);
    const centerX = this.width / 2;
    const centerY = textY;

    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        const index = (y * tempCanvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 128) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Staggered delay for more dramatic shatter effect
          const delay = Math.random() * 400;

          // Text particles get glow based on distance from center (more dramatic)
          // Only 20% of text particles get glow for performance
          const hasGlow = Math.random() > 0.8;
          const glowIntensity = 0.5 + Math.random() * 0.5;

          this.textParticles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            targetX: x + (Math.random() - 0.5) * this.width * 1.2, // Wider spread
            targetY: this.height + 150 + Math.random() * 300, // Fall further
            vx: 0,
            vy: 0,
            size: gap - 1,
            baseSize: gap - 1,
            color: palette.primary,
            glowColor: palette.peak,
            emotion: emotion,
            distance: distance,
            angle: angle,
            life: 1,
            decay: 0.0015 + Math.random() * 0.0015, // Slower fade
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: behavior.wobbleSpeed,
            behavior: behavior,
            delay: delay,
            phase: 'holding',
            trail: [],
            maxTrailLength: 15, // Longer trails for more drama
            hasGlow: hasGlow,
            glowIntensity: glowIntensity
          });
        }
      }
    }
  }

  // Get emotion-specific physics behavior
  getEmotionBehavior(emotion) {
    const behaviors = {
      sadness: {
        decay: 0.002 + Math.random() * 0.002,
        wobbleSpeed: 0.01 + Math.random() * 0.01,
        gravity: 0.05,
        friction: 0.99,
        lift: -0.3,
        turbulence: 0.2,
        phase: 'down_then_up'
      },
      anger: {
        decay: 0.008 + Math.random() * 0.005,
        wobbleSpeed: 0.05 + Math.random() * 0.05,
        gravity: 0.3,
        friction: 0.96,
        lift: -2,
        turbulence: 2,
        phase: 'explosive'
      },
      anxiety: {
        decay: 0.004 + Math.random() * 0.003,
        wobbleSpeed: 0.08 + Math.random() * 0.08,
        gravity: 0.1,
        friction: 0.98,
        lift: -0.5,
        turbulence: 1.5,
        phase: 'chaotic_then_calm'
      },
      fear: {
        decay: 0.003 + Math.random() * 0.002,
        wobbleSpeed: 0.1 + Math.random() * 0.05,
        gravity: 0.08,
        friction: 0.985,
        lift: -0.8,
        turbulence: 1.2,
        phase: 'trembling'
      },
      shame: {
        decay: 0.0015 + Math.random() * 0.001,
        wobbleSpeed: 0.005 + Math.random() * 0.005,
        gravity: 0.02,
        friction: 0.995,
        lift: -0.1,
        turbulence: 0.1,
        phase: 'shrinking_then_expanding'
      },
      loneliness: {
        decay: 0.0025 + Math.random() * 0.0015,
        wobbleSpeed: 0.015 + Math.random() * 0.01,
        gravity: 0.04,
        friction: 0.99,
        lift: -0.4,
        turbulence: 0.5,
        phase: 'seeking'
      },
      auto: {
        decay: 0.003 + Math.random() * 0.002,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
        gravity: 0.1,
        friction: 0.98,
        lift: -0.5,
        turbulence: 0.5,
        phase: 'gentle'
      }
    };

    return behaviors[emotion] || behaviors.auto;
  }

  releaseText() {
    this.textParticles.forEach(p => {
      p.phase = 'waiting';
    });
  }

  triggerDeconstruction(p) {
    p.phase = 'deconstructing';

    const behavior = p.behavior;

    if (behavior.phase === 'explosive') {
      // ANGER: Dramatic outward explosion from text
      const power = 25 + Math.random() * 30;
      p.vx = Math.cos(p.angle) * power + (Math.random() - 0.5) * 15;
      p.vy = Math.sin(p.angle) * power + (Math.random() - 0.5) * 15 - 5;
    } else if (behavior.phase === 'down_then_up') {
      // SADNESS: Falls slightly then floats up beautifully
      p.vx = (Math.random() - 0.5) * 6;
      p.vy = 3 + Math.random() * 6;
      p.phase = 'falling';
      p.fallDuration = 40 + Math.random() * 40;
    } else if (behavior.phase === 'chaotic_then_calm') {
      // ANXIETY: Scattered, chaotic movement
      p.vx = (Math.random() - 0.5) * 18;
      p.vy = (Math.random() - 0.5) * 18 + 3;
      p.chaos = 1;
      p.chaosDecay = 0.01;
      p.phase = 'chaotic';
    } else if (behavior.phase === 'trembling') {
      // FEAR: Nervous shaking movement
      p.vx = (Math.random() - 0.5) * 12;
      p.vy = 2 + Math.random() * 7;
      p.tremble = 1;
      p.trembleDecay = 0.015;
    } else if (behavior.phase === 'shrinking_then_expanding') {
      // SHAME: Slow, gentle release
      p.vx = (Math.random() - 0.5) * 3;
      p.vy = 1 + Math.random() * 3;
      p.shrinkPhase = true;
      p.expandTimer = 30 + Math.random() * 30;
    } else if (behavior.phase === 'seeking') {
      // LONELINESS: Drifting, searching movement
      p.vx = (Math.random() - 0.5) * 7;
      p.vy = 2 + Math.random() * 4;
      p.driftAngle = Math.random() * Math.PI * 2;
    } else {
      // AUTO/GENTLE: Balanced release
      p.vx = (Math.random() - 0.5) * 8;
      p.vy = 3 + Math.random() * 6;
    }
  }

  createBurst(emotion) {
    const palette = EmotionEngine.getPalette(emotion);
    const behavior = this.getEmotionBehavior(emotion);
    const isMobile = this.width < 640;

    // Increased particle counts for more dramatic effect (2x-3x)
    // Performance-balanced particle counts
    let count = isMobile ? 800 : 1500;
    if (emotion === 'anger') count = isMobile ? 1200 : 2500;
    else if (emotion === 'anxiety' || emotion === 'fear') count = isMobile ? 1000 : 2000;

    const waves = 3;
    const particlesPerWave = Math.floor(count / waves);

    for (let wave = 0; wave < waves; wave++) {
      setTimeout(() => {
        this.createWaveParticles(particlesPerWave, emotion, palette, behavior, wave);
      }, wave * 300);
    }
  }

  createWaveParticles(count, emotion, palette, behavior, waveIndex) {
    for (let i = 0; i < count; i++) {
      const spawnX = Math.random() * this.width;
      const spawnY = -50 - Math.random() * 100;

      const particleType = Math.random();
      let size, decayMod, hasGlow, glowIntensity;

      if (particleType < 0.30) {
        // Large confetti - main show particles with strong glow
        size = 8 + Math.random() * 12;
        decayMod = 1;
        hasGlow = true;
        glowIntensity = 1.0;
      } else if (particleType < 0.50) {
        // Medium sparkles - moderate glow
        size = 2 + Math.random() * 4;
        decayMod = 0.7;
        hasGlow = Math.random() > 0.6; // 40% have glow (reduced from 70%)
        glowIntensity = 0.6 + Math.random() * 0.4;
      } else {
        // Small mist particles - subtle or no glow
        size = 1 + Math.random() * 3;
        decayMod = 1.5;
        hasGlow = Math.random() > 0.85; // Only 15% have subtle glow
        glowIntensity = 0.3 + Math.random() * 0.3;
      }

      const vx = (Math.random() - 0.5) * 6;
      const vy = 2 + Math.random() * 4;

      this.particles.push({
        x: spawnX,
        y: spawnY,
        vx: vx,
        vy: vy,
        size: size,
        baseSize: size,
        color: palette.journey[Math.floor(Math.random() * 2)],
        glowColor: palette.peak,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        life: 1,
        decay: behavior.decay * decayMod,
        gravity: behavior.gravity * 0.5,
        friction: behavior.friction,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: behavior.wobbleSpeed,
        emotion: emotion,
        type: particleType < 0.30 ? 'confetti' : (particleType < 0.50 ? 'sparkle' : 'mist'),
        hasGlow: hasGlow,
        glowIntensity: glowIntensity,
        trail: [],
        maxTrailLength: hasGlow ? 15 : 8
      });
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.textParticles = this.textParticles.filter(p => {
      if (p.phase === 'holding') {
        p.delay -= 16;
        if (p.delay <= 0) {
          this.triggerDeconstruction(p);
        }

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        return true;
      }

      if (p.phase === 'waiting') {
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        return true;
      }

      if (p.phase === 'falling') {
        p.vy += 0.06;
        p.fallDuration--;

        if (p.fallDuration <= 0) {
          p.phase = 'rising';
          p.vy = p.behavior.lift;
        }
      } else if (p.phase === 'rising') {
        p.vy *= 0.98;
        p.vy -= 0.02;
        p.vx *= 0.99;
      } else if (p.tremble !== undefined && p.phase === 'deconstructing') {
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.vy += p.behavior.gravity * 0.5;

        p.tremble -= p.trembleDecay;
        if (p.tremble > 0) {
          p.vx += (Math.random() - 0.5) * p.tremble * 3;
          p.vy += (Math.random() - 0.5) * p.tremble * 2;
        }
      } else if (p.shrinkPhase !== undefined) {
        if (p.shrinkPhase) {
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.expandTimer--;
          if (p.expandTimer <= 0) {
            p.shrinkPhase = false;
            p.vx = (Math.random() - 0.5) * 8;
            p.vy = -2 - Math.random() * 3;
          }
        } else {
          p.vy *= 0.98;
          p.vy -= 0.01;
          p.vx *= 0.99;
        }
      } else if (p.driftAngle !== undefined) {
        p.vx *= 0.99;
        p.vy += p.behavior.gravity * 0.3;
        p.driftAngle += 0.02;
        p.vx += Math.cos(p.driftAngle) * 0.1;
      } else if (p.chaos !== undefined && p.phase === 'chaotic') {
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.vy += p.behavior.gravity * 0.5;

        p.chaos -= p.chaosDecay;
        if (p.chaos > 0) {
          p.vx += (Math.random() - 0.5) * p.chaos * 2;
          p.vy += (Math.random() - 0.5) * p.chaos * 2;
        }
      } else {
        p.vy += p.behavior.gravity * 0.3;
        p.vx *= p.behavior.friction;
        p.vy *= p.behavior.friction;
      }

      p.x += p.vx;
      p.y += p.vy;

      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.3;

      if (p.maxTrailLength > 0) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrailLength) {
          p.trail.shift();
        }
      }

      p.life -= p.decay;

      const progress = 1 - p.life;
      p.color = this.getColorAtStage(p.emotion, progress);

      if (p.life > 0) {
        // Draw trail with glow
        if (p.trail.length > 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            this.ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          this.ctx.strokeStyle = p.color;
          this.ctx.globalAlpha = p.life * 0.5;
          this.ctx.lineWidth = p.size * 0.8;
          this.ctx.lineCap = 'round';
          this.ctx.stroke();
        }

        // Additive blending for glow effect
        this.ctx.globalCompositeOperation = 'lighter';

        // Bloom glow for particles that have it
        if (p.hasGlow && p.glowIntensity) {
          // Reduced blur radius for better performance
          const glowRadius = p.size * 2 * p.life * p.glowIntensity;
          this.ctx.shadowBlur = glowRadius;
          this.ctx.shadowColor = p.glowColor;
        } else {
          this.ctx.shadowBlur = 0;
        }

        // Draw main particle
        this.ctx.globalAlpha = p.life;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * (0.5 + p.life * 0.5), 0, Math.PI * 2);
        this.ctx.fill();

        // Reset effects
        this.ctx.shadowBlur = 0;
        this.ctx.globalCompositeOperation = 'source-over';
      }

      return p.life > 0;
    });

    this.particles = this.particles.filter(p => {
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.vy *= p.friction;

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.8;

      p.life -= p.decay;

      const progress = 1 - p.life;
      p.color = this.getColorAtStage(p.emotion || 'auto', progress);

      if (p.life > 0) {
        this.ctx.save();

        // Additive blending for glow effect on burst particles
        this.ctx.globalCompositeOperation = 'lighter';

        // Bloom glow
        if (p.hasGlow && p.glowIntensity) {
          // Reduced blur radius for better performance
          const glowRadius = p.baseSize * 2.5 * p.life * p.glowIntensity;
          this.ctx.shadowBlur = glowRadius;
          this.ctx.shadowColor = p.glowColor;
        }

        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.globalAlpha = p.life;
        this.ctx.fillStyle = p.color;

        if (p.type === 'confetti') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.type === 'sparkle') {
          this.ctx.beginPath();
          this.ctx.moveTo(0, -p.size);
          this.ctx.lineTo(p.size * 0.3, 0);
          this.ctx.lineTo(0, p.size);
          this.ctx.lineTo(-p.size * 0.3, 0);
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      return p.life > 0 && p.y < this.height + 100;
    });

    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.shadowBlur = 0;

    return this.textParticles.length > 0 || this.particles.length > 0;
  }

  start() {
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

  reset() {
    this.particles = [];
    this.textParticles = [];
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
    this.particles = new EmotionalParticleSystem(this.canvas);
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

    // Start the shattering - particles break away from text positions
    this.particles.releaseText();
    this.particles.start();

    // Add burst particles from top for extra drama
    this.particles.createBurst(emotion);

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
