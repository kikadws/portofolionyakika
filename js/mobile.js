/* =====================================================================
   KADWSS — MOBILE ENHANCEMENTS
   Muat SETELAH main.js:  <script src="js/mobile.js"></script>

   - Membuat dock navigasi di bawah dari link yang sudah ada di .nav-links
   - Indikator aktif yang bergeser mengikuti section
   - Progress bar baca di tepi atas layar
   - Top bar auto-hide saat scroll ke bawah, muncul lagi saat scroll ke atas
   Tidak mengubah apa pun di desktop (semua elemen disembunyikan via CSS).
===================================================================== */
(function () {
  'use strict';

  const mq    = window.matchMedia('(max-width: 820px)');
  const nav   = document.getElementById('nav');
  const links = Array.from(document.querySelectorAll('.nav-links a[data-nav]'));
  if (!links.length) return;

  /* ---------- Dock ---------- */
  const dock = document.createElement('nav');
  dock.className = 'dock';
  dock.setAttribute('aria-label', 'Quick navigation');
  dock.innerHTML = '<span class="dock-ind" aria-hidden="true"></span>';
  const ind = dock.firstElementChild;

  const items = links.map(src => {
    const a = document.createElement('a');
    a.href = src.getAttribute('href');
    a.dataset.nav = src.dataset.nav;
    a.textContent = src.textContent.trim();
    dock.appendChild(a);
    return a;
  });
  document.body.appendChild(dock);


  /* ---------- Hero: salinan judul untuk efek outline di atas potret ----------
     Judul solid ada di BELAKANG potret, salinan ini (hanya garis putih) ada di DEPAN,
     sehingga huruf yang menimpa potret tampak berongga. Disembunyikan di desktop via CSS. */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !document.querySelector('.hero-title-outline')) {
    const outline = heroTitle.cloneNode(true);
    outline.classList.add('hero-title-outline');
    outline.removeAttribute('id');
    outline.setAttribute('aria-hidden', 'true');
    heroTitle.after(outline);
  }

  /* ---------- Progress baca ---------- */
  const bar = document.createElement('div');
  bar.className = 'm-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  /* ---------- Indikator aktif ---------- */
  function moveIndicator() {
    const active = items.find(i => i.classList.contains('active'));
    dock.classList.toggle('has-active', Boolean(active));
    if (!active) return;
    ind.style.setProperty('--x', active.offsetLeft + 'px');
    ind.style.setProperty('--w', active.offsetWidth + 'px');
  }

  /* Peta section → item dock (UI/UX & Graphic dihitung sebagai "Work";
     hero tidak mengaktifkan apa pun) */
  const MAP = { top: null, work: 'work', motion: 'motion', uiux: 'work', graphic: 'work', about: 'about', contact: 'contact' };
  const watched = Object.keys(MAP).map(id => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window && watched.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = MAP[entry.target.id];
        items.forEach(a => {
          const on = a.dataset.nav === target;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
        moveIndicator();
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    watched.forEach(s => io.observe(s));
  }

  /* ---------- Scroll: progress + auto-hide top bar ---------- */
  let lastY = window.scrollY, ticking = false;

  function onScroll() {
    ticking = false;
    const y   = Math.max(0, window.scrollY);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);

    if (nav && mq.matches) {
      const dy = y - lastY;
      if (y < 120 || dy < -6) nav.classList.remove('is-hidden');   // dekat atas / scroll ke atas
      else if (dy > 8)        nav.classList.add('is-hidden');      // scroll ke bawah
    }
    lastY = y;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* ---------- Sinkronisasi saat ukuran berubah ---------- */
  window.addEventListener('resize', moveIndicator);
  window.addEventListener('orientationchange', () => setTimeout(moveIndicator, 250));
  mq.addEventListener ? mq.addEventListener('change', () => { nav && nav.classList.remove('is-hidden'); moveIndicator(); })
                      : mq.addListener(() => { nav && nav.classList.remove('is-hidden'); moveIndicator(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);

  onScroll();
  moveIndicator();
})();
