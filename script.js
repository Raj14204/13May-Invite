/* ═══════════════════════════════════════════
   RAJA & PRIYANKA WEDDING — script.js

   SPLASH FLOW:
   1. Page loads  → Bokeh + names shown. Video paused. Play button visible.
   2. User taps play button → names + play btn fade out. Video plays once.
   3. Video ends  → Splash auto-dismisses to hero. No scroll needed.
   ═══════════════════════════════════════════ */

(function initSplash() {
  const splash      = document.getElementById('splash');
  const mainPage    = document.getElementById('main-page');
  const video       = document.getElementById('bg-video');
  const overlay     = document.getElementById('splash-overlay');
  const playBtn     = document.getElementById('play-btn');
  const bokeh       = document.getElementById('bokeh-wrap');

  /* ── Bokeh particles ── */
  for (let i = 0; i < 22; i++) {
    const d    = document.createElement('div');
    const size = Math.random() * 90 + 20;
    d.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:radial-gradient(circle,
        rgba(201,168,76,${(Math.random() * 0.18 + 0.04).toFixed(2)}) 0%,
        transparent 70%);
      left:${(Math.random() * 110 - 5).toFixed(1)}%;
      top:${(Math.random() * 110 - 5).toFixed(1)}%;
      animation:pulse-play ${(3 + Math.random() * 4).toFixed(1)}s ease-in-out infinite;
      animation-delay:${(Math.random() * 4).toFixed(1)}s;
      pointer-events:none;
    `;
    bokeh.appendChild(d);
  }

  let tapped     = false;
  let dismissed  = false;

  /* ── Dismiss: slide splash up, show main page ── */
  function dismissSplash() {
    if (dismissed) return;
    dismissed = true;
    splash.style.transition    = 'transform 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease';
    splash.style.transform     = 'translateX(-50%) translateY(-100%)';
    splash.style.opacity       = '0';
    splash.style.pointerEvents = 'none';
    mainPage.classList.add('visible');
    window.scrollTo({ top: 800, behavior: 'instant' });
    setTimeout(initHeroPetals, 500);
    setTimeout(() => { if (splash.parentNode) splash.remove(); }, 1000);
  }

  /* ── After video ends — auto dismiss ── */
  video.addEventListener('ended', function() {
    // Small delay for a graceful transition
    setTimeout(dismissSplash, 400);
  });

  /* ── Play button tap / click ── */
  function startVideo() {
    if (tapped) return;
    tapped          = true;
    video.loop      = false;
    video.currentTime = 0;

    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity    = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 420);

    playBtn.classList.add('hidden');

    video.play()
      .then(() => { video.style.opacity = '1'; })
      .catch(() => { dismissSplash(); }); // blocked fallback
  }

  playBtn.addEventListener('click', (e) => { e.stopPropagation(); startVideo(); });
  playBtn.addEventListener('touchend', (e) => { e.stopPropagation(); e.preventDefault(); startVideo(); }, { passive: false });

})();


/* ══════════════════════════════════════════════
   2. HERO — FALLING PETALS
══════════════════════════════════════════════ */
function initHeroPetals() {
  const wrap = document.getElementById('petals-wrap');
  if (!wrap) return;
  const colors = [
    'rgba(192,57,90,0.38)', 'rgba(139,26,42,0.22)',
    'rgba(201,168,76,0.22)', 'rgba(240,175,195,0.42)',
  ];
  function spawnPetal() {
    const p     = document.createElement('div');
    p.className = 'petal';
    const size  = Math.random() * 10 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size * 1.4}px;
      left:${Math.random() * 100}%; top:-20px;
      background:radial-gradient(ellipse, ${color} 0%, transparent 70%);
      animation-duration:${(Math.random() * 6 + 5).toFixed(1)}s;
      animation-delay:${(Math.random() * 2).toFixed(1)}s;
      transform:rotate(${Math.floor(Math.random() * 360)}deg);
    `;
    wrap.appendChild(p);
    setTimeout(() => p.remove(), 10000);
  }
  setInterval(spawnPetal, 480);
}


/* ══════════════════════════════════════════════
   3. COUNTDOWN
══════════════════════════════════════════════ */
(function initCountdown() {
  const target = new Date('2026-05-13T17:30:00').getTime();
  const els    = ['cd-days','cd-hours','cd-mins','cd-secs'].map(id => document.getElementById(id));
  const divs   = [86400000, 3600000, 60000, 1000];
  const mods   = [null, 86400000, 3600000, 60000];

  function setVal(el, val) {
    if (!el) return;
    const str = String(val).padStart(2, '0');
    if (el.textContent !== str) {
      el.textContent = str;
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
    }
  }
  function tick() {
    const diff = Math.max(0, target - Date.now());
    els.forEach((el, i) => setVal(el, Math.floor((mods[i] ? diff % mods[i] : diff) / divs[i])));
  }
  tick();
  setInterval(tick, 1000);
})();


/* ══════════════════════════════════════════════
   4. SCRATCH CARDS
   Color themes matched to each event:
   0 - Pre-Wedding Bash   → Deep Magenta/Purple (festive, carnival)
   1 - Sakharpuda         → Rich Gold/Amber (auspicious, engagement)
   2 - Haldi              → Turmeric Yellow/Saffron Orange
   3 - Sangeet            → Peacock Teal/Deep Emerald (dance night)
   4 - Wedding            → Deep Crimson/Maroon (traditional bridal)
   5 - Reception          → Midnight Navy/Silver (formal gala)
══════════════════════════════════════════════ */
(function initScratch() {
  const CARD_COLORS = [
    ['#4A1060', '#9B2D6A'],   // Pre-Wedding: deep purple → magenta
    ['#8B6914', '#C9A84C'],   // Sakharpuda: dark gold → bright gold
    ['#A05A00', '#E8A020'],   // Haldi: burnt orange → turmeric yellow
    ['#0D5C4A', '#1A9B7A'],   // Sangeet: deep teal → emerald
    ['#6B0A18', '#C0395A'],   // Wedding: deep maroon → crimson rose
    ['#0D1A3A', '#2E4A7A'],   // Reception: midnight navy → slate blue
  ];

  document.querySelectorAll('.scratch-canvas').forEach((canvas, i) => {
    const wrap   = canvas.closest('.scratch-canvas-wrap');
    const cont   = canvas.closest('.scratch-container');
    const hint   = wrap.querySelector('.scratch-hint');
    const badge  = wrap.querySelector('.scratched-badge');
    const reveal = cont.querySelector('.scratch-reveal');
    const [c1, c2] = CARD_COLORS[i] || CARD_COLORS[0];

    let ctx, scratched = false, isDrawing = false;
    let scratchedArea = 0;
    let totalArea = 0;

    function initCanvas() {
      const W = canvas.offsetWidth;
      const H = reveal.offsetHeight;
      const DPR = window.devicePixelRatio || 1;

      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      canvas.style.height = H + 'px';

      ctx = canvas.getContext('2d');
      ctx.scale(DPR, DPR);

      totalArea = W * H;

      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Subtle dot texture
      ctx.globalAlpha = 0.07;
      for (let r = 0; r < H; r += 18) {
        for (let c = 0; c < W; c += 18) {
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(c, r, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Shimmer band
      const sh = ctx.createLinearGradient(0, H * 0.44, W, H * 0.56);
      sh.addColorStop(0, 'transparent');
      sh.addColorStop(0.5, 'rgba(255,255,255,0.12)');
      sh.addColorStop(1, 'transparent');
      ctx.fillStyle = sh;
      ctx.fillRect(0, H * 0.44, W, H * 0.12);

      // Text
      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      ctx.font = `600 ${W * 0.048}px Cinzel, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', W / 2, H / 2);
    }

    function scratch(x, y) {
      if (scratched) return;

      const radius = 28;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      scratchedArea += Math.PI * radius * radius * 0.45;
      hint.style.opacity = '0';

      if ((scratchedArea / totalArea) > 0.5) {
        autoReveal();
      }
    }

    function autoReveal() {
      if (scratched) return;
      scratched = true;

      canvas.style.transition = 'opacity 0.5s ease';
      canvas.style.opacity = '0';
      hint.style.opacity = '0';
      badge.classList.add('show');
      cont.classList.add('scratched');

      setTimeout(() => { canvas.style.display = 'none'; }, 500);

      reveal.style.transform = 'scale(1.04)';
      reveal.style.transition = 'all 0.35s ease';
      setTimeout(() => { reveal.style.transform = 'scale(1)'; }, 300);

      burstPetals(canvas);
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches ? e.touches[0] : e;
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }

    canvas.addEventListener('mousedown', e => { isDrawing = true; scratch(...Object.values(getPos(e))); });
    canvas.addEventListener('mousemove', e => { if (!isDrawing) return; scratch(...Object.values(getPos(e))); });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

    let startX = 0, startY = 0, isIntent = null;

    canvas.addEventListener('touchstart', e => {
      const t = e.touches[0];
      startX = t.clientX; startY = t.clientY;
      isDrawing = true; isIntent = null;
    }, { passive: true });

    canvas.addEventListener('touchmove', e => {
      if (!isDrawing) return;
      const t = e.touches[0];
      const dx = Math.abs(t.clientX - startX);
      const dy = Math.abs(t.clientY - startY);
      if (isIntent === null && (dx > 5 || dy > 5)) { isIntent = dx > dy; }
      if (isIntent) { e.preventDefault(); scratch(...Object.values(getPos(e))); }
    }, { passive: false });

    canvas.addEventListener('touchend', () => { isDrawing = false; isIntent = null; });

    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { initCanvas(); }
    }, { threshold: 0.2 }).observe(canvas);
  });

  function burstPetals(source) {
    const rect = source.getBoundingClientRect();
    const emojis = ['🌸','✨','🌺','💮'];
    emojis.forEach((emoji, i) => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'floating-petal';
        el.textContent = emoji;
        el.style.left = rect.left + Math.random() * rect.width + 'px';
        el.style.top  = rect.top + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }, i * 120);
    });
  }
})();


/* ══════════════════════════════════════════════
   5. SCROLL REVEAL
══════════════════════════════════════════════ */
(function () {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();