/* =============================================
   OMKAR JARANDE – Portfolio JS
   - Blueprint canvas animation
   - Navbar scroll effect
   - Scroll reveal
   - Mobile nav toggle
   ============================================= */

// ── BLUEPRINT CANVAS ──
(function () {
  const canvas = document.getElementById('blueprint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const gridSize = 50;
    ctx.strokeStyle = '#00C2A8';
    ctx.lineWidth = 0.4;

    // Fine grid
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Major grid
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = 'rgba(0, 194, 168, 0.5)';
    for (let x = 0; x <= w; x += gridSize * 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridSize * 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Cross-hairs at intersections
    ctx.strokeStyle = 'rgba(0, 194, 168, 0.6)';
    ctx.lineWidth = 0.6;
    const crossSize = 6;
    for (let x = 0; x <= w; x += gridSize * 5) {
      for (let y = 0; y <= h; y += gridSize * 5) {
        ctx.beginPath();
        ctx.moveTo(x - crossSize, y);
        ctx.lineTo(x + crossSize, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y - crossSize);
        ctx.lineTo(x, y + crossSize);
        ctx.stroke();
      }
    }

    // Corner bracket top-left (engineering drawing aesthetic)
    const bx = 50, by = 50, bs = 60;
    ctx.strokeStyle = 'rgba(0, 194, 168, 0.7)';
    ctx.lineWidth = 1.5;
    // TL
    ctx.beginPath(); ctx.moveTo(bx, by + bs); ctx.lineTo(bx, by); ctx.lineTo(bx + bs, by); ctx.stroke();
    // TR
    ctx.beginPath(); ctx.moveTo(w - bx - bs, by); ctx.lineTo(w - bx, by); ctx.lineTo(w - bx, by + bs); ctx.stroke();
    // BL
    ctx.beginPath(); ctx.moveTo(bx, h - by - bs); ctx.lineTo(bx, h - by); ctx.lineTo(bx + bs, h - by); ctx.stroke();
    // BR
    ctx.beginPath(); ctx.moveTo(w - bx - bs, h - by); ctx.lineTo(w - bx, h - by); ctx.lineTo(w - bx, h - by - bs); ctx.stroke();

    // Small dimension-style labels
    ctx.fillStyle = 'rgba(0, 194, 168, 0.55)';
    ctx.font = '9px "Space Grotesk", monospace';
    ctx.fillText('ΔX', bx + 8, by + 18);
    ctx.fillText('ΔY', bx + 8, by + 30);
    ctx.fillText('KIT · KA', w - bx - 52, h - by - 8);
  }

  window.addEventListener('resize', resize);
  resize();

  // Fade canvas on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / window.innerHeight;
    canvas.style.opacity = Math.max(0, 0.18 - scrolled * 0.3);
  });
})();


// ── NAVBAR ──
(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close nav on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
})();


// ── SCROLL REVEAL ──
(function () {
  const targets = document.querySelectorAll(
    '.about-grid, .about-card, .timeline-item, .project-card, .skills-group, .cert-list, .contact-links'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
})();


// ── ACTIVE NAV LINK ──
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();
