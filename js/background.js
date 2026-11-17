/**
 * BACKGROUND.JS - Interactive Particle & Constellation Canvas
 * High performance, interactive background with mouse connections, theme adaptation & shockwaves
 * Supports both Dark Mode & Light (White) Theme
 */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };
  let shockwaves = [];

  // Theme palettes for Dark and Light modes
  const darkThemePalettes = {
    default: ['rgba(167, 139, 250, ', 'rgba(96, 165, 250, '],
    emerald: ['rgba(52, 211, 153, ', 'rgba(56, 189, 248, '],
    rose: ['rgba(244, 114, 182, ', 'rgba(192, 132, 252, '],
    amber: ['rgba(245, 158, 11, ', 'rgba(251, 146, 60, ']
  };

  const lightThemePalettes = {
    default: ['rgba(124, 58, 237, ', 'rgba(37, 99, 235, '],
    emerald: ['rgba(5, 150, 105, ', 'rgba(2, 132, 199, '],
    rose: ['rgba(219, 39, 119, ', 'rgba(147, 51, 234, '],
    amber: ['rgba(217, 119, 6, ', 'rgba(234, 88, 12, ']
  };

  let activeThemeKey = localStorage.getItem('nishita_portfolio_theme') || 'default';
  let activeMode = localStorage.getItem('nishita_portfolio_mode') || 'dark';

  function getPalette() {
    const table = activeMode === 'light' ? lightThemePalettes : darkThemePalettes;
    return table[activeThemeKey] || table.default;
  }

  let activePalette = getPalette();

  window.updateCanvasThemeColors = function (newKey) {
    activeThemeKey = newKey;
    activePalette = getPalette();
    particles.forEach(p => {
      p.color = Math.random() > 0.45 ? activePalette[0] : activePalette[1];
    });
  };

  window.updateCanvasColorMode = function (newMode) {
    activeMode = newMode;
    activePalette = getPalette();
    particles.forEach(p => {
      p.color = Math.random() > 0.45 ? activePalette[0] : activePalette[1];
      p.alpha = activeMode === 'light' ? Math.random() * 0.35 + 0.35 : Math.random() * 0.45 + 0.25;
    });
  };

  // Responsive particle density
  function getParticleCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) return 36;
    if (screenWidth < 1024) return 60;
    return 85;
  }

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.color = Math.random() > 0.45 ? activePalette[0] : activePalette[1];
      this.alpha = activeMode === 'light' ? Math.random() * 0.35 + 0.35 : Math.random() * 0.45 + 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around bounds smoothly
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse attraction / gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = dx / dist;
          const directionY = dy / dist;
          this.x -= directionX * force * 1.8;
          this.y -= directionY * force * 1.8;
        }
      }

      // Shockwave repulsion
      for (let i = 0; i < shockwaves.length; i++) {
        const sw = shockwaves[i];
        const dx = this.x - sw.x;
        const dy = this.y - sw.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (Math.abs(dist - sw.radius) < 30) {
          const force = (1 - sw.radius / sw.maxRadius) * 4;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 130;
    const baseLineAlpha = activeMode === 'light' ? 0.22 : 0.16;

    // Connect particles to each other
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * baseLineAlpha;
          ctx.beginPath();
          ctx.strokeStyle = activePalette[0] + opacity + ')';
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      // Connect particles to mouse cursor when close
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particles[a].x;
        const dy = mouse.y - particles[a].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const opacity = (1 - dist / 110) * (activeMode === 'light' ? 0.45 : 0.35);
          ctx.beginPath();
          ctx.strokeStyle = activePalette[1] + opacity + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function updateShockwaves() {
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += 5;
      sw.alpha = (1 - sw.radius / sw.maxRadius) * 0.5;

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = activePalette[0] + Math.max(0, sw.alpha) + ')';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (sw.radius >= sw.maxRadius) {
        shockwaves.splice(i, 1);
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();
    updateShockwaves();

    animationFrameId = requestAnimationFrame(animate);
  }

  // Mouse move handler
  window.addEventListener('mousemove', function (e) {
    if (e.clientY <= height) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  // Click shockwave
  window.addEventListener('click', function (e) {
    if (e.clientY <= height) {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 180,
        alpha: 0.6
      });
    }
  });

  // Debounced resize
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 150);
  });

  // Init
  resizeCanvas();
  animate();
})();
