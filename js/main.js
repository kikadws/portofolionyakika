/* =================================================================
   ASSET MAP — replace paths here once real files are ready.
   Nothing else in the code needs to change.
================================================================= */
const ASSETS = {
  portrait: "assets/images/portrait.png"
};

/* =================================================================
   PROJECT DATA — single source of truth for Selected Work
================================================================= */
const PROJECTS = [
  {
    number: "01", id:"reze-mograph", title:"Reze MoGraph", category:"Motion Graphics", year:"2026",
    type:"video", media:"assets/videos/reze-mograph.mp4", poster:"assets/images/reze-poster.png",
    role:"Motion Designer — responsible for the entire motion design process, including dynamic movement and camera animation.",
    tools:"After Effects",
    description:"A personal motion project combining a visual story, music, and character-driven editing. The project explores the relationship between story and mood through movement and camera work — including a first attempt at 3D camera layers in After Effects.",
    disclaimer:"Personal / fan-made motion exploration. Not affiliated with the source anime or music."
  },
  {
    number: "02", id:"malam-minggu", title:"Malam Minggu", category:"Motion Graphics", year:"2026",
    type:"video", media:"assets/videos/malam-minggu.mp4", poster:"assets/images/malam-minggu-poster.png",
    role:"Motion Designer — camera movement, layer separation and animation, scene compositing, from Photoshop-separated character artwork.",
    tools:"After Effects, Photoshop",
    description:"A second motion exploration combining character storytelling and manga-inspired animation, connecting layered character artwork, manga panels, camera movement, and scene transitions.",
    disclaimer:"Personal / fan-made motion exploration. Not affiliated with the source manga or music."
  },
  {
    number: "03", id:"laundry-web", title:"Laundry Website Redesign", category:"UI/UX", year:"2025",
    type:"image", media:"assets/images/laundry.png",
    role:"UI/UX Designer — redesigned the overall website interface with a more modern visual direction.",
    tools:"Figma",
    description:"An internship (PKL) project redesigning a client's laundry service website into a more modern and visually organized digital experience.",
    disclaimer:null
  },
  {
    number: "04", id:"food-redesign", title:"Food Product Redesign", category:"Graphic Design / Branding", year:"2025",
    type:"image", media:"assets/images/food-redesign.png",
    role:"Redesigned promotional visuals and improved the overall visual presentation.",
    tools:"Figma",
    description:"A client project redesigning existing food & beverage promotional content into a cleaner, more contemporary visual presentation.",
    disclaimer:null
  },
  {
    number: "05", id:"uniform-social", title:"Uniform Product Social Content", category:"Graphic Design / Branding", year:"2025",
    type:"image", media:"assets/images/uniform-social.png",
    role:"Designed and produced promotional Instagram content.",
    tools:"Figma",
    description:"Internship (PKL) project designing promotional Instagram content for a client's custom uniform/sewing products, restructured into a cleaner social-media format.",
    disclaimer:null
  },
  {
    number: "06", id:"service-listing", title:"Service Marketplace Listing", category:"Graphic Design / Branding", year:"2025",
    type:"image", media:"assets/images/service-listing.png",
    role:"Visual design and layout of the promotional listing.",
    tools:"Figma",
    description:"Internship (PKL) project creating promotional visual content for a website-development service, for Facebook Marketplace/listing content.",
    disclaimer:null
  },
  {
    number: "07", id:"eaide-branding", title:"Eaide Branding", category:"Motion Branding / Branding", year:"2026",
    type:"video", media:"assets/videos/eaide-branding.mp4", poster:"assets/images/eaide-branding-poster.png",
    role:"Motion Designer",
    tools:"After Effects",
    collaboration:"Independent Collaboration",
    focus:"Motion Branding",
    sound:"Original Sound Design",
    description:"An independent collaboration creating motion branding content for Eaide, an AI developed by a programmer friend. The project translates research into a modern visual language and demonstrates the AI through everyday interactions, emphasizing speed, responsiveness, and efficiency.",
    disclaimer:"Independent collaboration. Eaide was developed by a friend — my contribution covers research, visual direction, motion branding, animation, and sound design."
  }
];

/* =================================================================
   RENDER — SELECTED WORK
================================================================= */
const workList = document.getElementById('workList');
PROJECTS.forEach(p => {
  const isCase = Boolean(p.collaboration);

  const extraMeta = p.collaboration ? `
            <div><span class="lbl">Type</span><span class="val">${p.collaboration}</span></div>
            <div><span class="lbl">Focus</span><span class="val">${p.focus}</span></div>
            <div><span class="lbl">Sound</span><span class="val">${p.sound}</span></div>` : '';

  const row = document.createElement('div');
  row.className = 'work-row';
  row.innerHTML = `
    <div class="work-row-head" data-toggle>
      <span class="num">${p.number}</span>
      <span class="title">${p.title}</span>
      <span class="cat">${p.category}</span>
      <span class="yr">${p.year}</span>
      <span class="plus"></span>
    </div>
    <div class="work-row-body">
      <div class="work-detail">
        <div class="work-detail-info">
          <p>${p.description}</p>
          <div class="work-detail-meta${isCase ? ' wrap' : ''}">
            <div><span class="lbl">Role</span><span class="val">${p.role.split(' — ')[0]}</span></div>
            <div><span class="lbl">Tools</span><span class="val">${p.tools}</span></div>${extraMeta}
          </div>
          ${p.disclaimer ? `<p style="font-size:12.5px;border-left:2px solid var(--line);padding-left:14px;">${p.disclaimer}</p>` : ''}
        </div>
        <div class="media-frame">
          ${p.type === 'video'
            ? `<video src="${p.media}" poster="${p.poster}" controls${isCase ? ' preload="none" playsinline' : ''} style="width:100%; height:100%; object-fit:cover;"></video>`
            : `<img src="${p.media}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;">`}
        </div>
      </div>
    </div>
  `;
  workList.appendChild(row);
  row.querySelector('[data-toggle]').addEventListener('click', () => {
    const wasOpen = row.classList.contains('open');
    document.querySelectorAll('.work-row.open').forEach(r => r !== row && r.classList.remove('open'));
    row.classList.toggle('open', !wasOpen);
  });
});

/* =================================================================
   RENDER — MOTION (03)
================================================================= */
const motionWrap = document.getElementById('motionProjects');
const MOTION_VIDEOS = [];   // untuk memastikan hanya 1 video berbunyi pada satu waktu

const ICON = {
  play:  '<svg class="i-play" viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path d="M6 4l10 6-10 6V4z"/></svg>',
  pause: '<svg class="i-pause" viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path d="M5 4h3.5v12H5V4zm6.5 0H15v12h-3.5V4z"/></svg>',
  vol:   '<svg class="i-vol" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M3 8v4h3l4 3.5v-11L6 8H3z" fill="currentColor"/><path d="M13 7.5a3.5 3.5 0 010 5M15.2 5.3a6.6 6.6 0 010 9.4"/></svg>',
  muted: '<svg class="i-muted" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M3 8v4h3l4 3.5v-11L6 8H3z" fill="currentColor"/><path d="M13.5 7.5l4 5M17.5 7.5l-4 5"/></svg>',
  enter: '<svg class="i-enter" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" width="16" height="16"><path d="M7 3H4a1 1 0 00-1 1v3M13 3h3a1 1 0 011 1v3M7 17H4a1 1 0 01-1-1v-3M13 17h3a1 1 0 001-1v-3"/></svg>',
  exit:  '<svg class="i-exit" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" width="16" height="16"><path d="M3 7h3a1 1 0 001-1V3M17 7h-3a1 1 0 01-1-1V3M3 13h3a1 1 0 011 1v3M17 13h-3a1 1 0 00-1 1v3"/></svg>'
};

const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  const mm = String(m).padStart(2, '0'), ss = String(sec).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

function initMotionPlayer(playerEl) {
  const video    = playerEl.querySelector('video');
  const controls = playerEl.querySelector('.player-controls');
  const playBtn  = playerEl.querySelector('[data-play]');
  const bigBtn   = playerEl.querySelector('[data-big]');
  const muteBtn  = playerEl.querySelector('[data-mute]');
  const fullBtn  = playerEl.querySelector('[data-full]');
  const progress = playerEl.querySelector('.player-progress');
  const fillEl   = playerEl.querySelector('.player-progress-fill');
  const bufEl    = playerEl.querySelector('.player-progress-buffer');
  const curEl    = playerEl.querySelector('[data-cur]');
  const durEl    = playerEl.querySelector('[data-dur]');
  const errorEl  = playerEl.querySelector('.player-error');

  let raf = 0, hideTimer = 0, scrubbing = false;
  MOTION_VIDEOS.push(video);

  /* ---------- helpers ---------- */
  const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;
  const isFull    = () => fsElement() === playerEl;

  const syncCursorLabel = () => {
    playerEl.dataset.cursor = video.paused ? 'PLAY' : 'PAUSE';
    const lbl = document.getElementById('cursorLabel');
    if (lbl && playerEl.matches(':hover')) lbl.textContent = playerEl.dataset.cursor;
  };

  const updateProgress = () => {
    const d = video.duration, t = video.currentTime;
    const ratio = isFinite(d) && d > 0 ? Math.min(1, t / d) : 0;
    fillEl.style.transform = `scaleX(${ratio})`;
    curEl.textContent = fmtTime(t);
  };
  const updateAria = () => {
    const d = video.duration, t = video.currentTime;
    progress.setAttribute('aria-valuenow', isFinite(d) && d > 0 ? Math.round((t / d) * 100) : 0);
    progress.setAttribute('aria-valuetext', `${fmtTime(t)} of ${fmtTime(d)}`);
  };
  const updateBuffered = () => {
    const d = video.duration;
    if (!isFinite(d) || !d || !video.buffered.length) return;
    let end = 0;
    for (let i = 0; i < video.buffered.length; i++) {
      if (video.buffered.start(i) <= video.currentTime + 0.5) end = Math.max(end, video.buffered.end(i));
    }
    bufEl.style.transform = `scaleX(${Math.min(1, end / d)})`;
  };
  const loop = () => {
    updateProgress();
    if (!video.paused && !video.ended) raf = requestAnimationFrame(loop);
  };

  /* ---------- kontrol auto-hide saat bermain ---------- */
  const showUI = () => {
    playerEl.classList.add('ui-active');
    clearTimeout(hideTimer);
    if (!video.paused) {
      hideTimer = setTimeout(() => {
        if (scrubbing || controls.matches(':hover')) return showUI();
        playerEl.classList.remove('ui-active');
      }, 2500);
    }
  };

  /* ---------- aksi ---------- */
  const toggle = () => {
    if (playerEl.classList.contains('has-error')) return;
    if (video.paused || video.ended) {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      video.pause();
    }
  };
  const skip = (sec) => {
    if (!isFinite(video.duration)) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + sec));
    updateProgress();
  };
  const toggleMute = () => {
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) video.volume = 1;
  };
  const toggleFull = () => {
    if (isFull()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else if (playerEl.requestFullscreen) {
      playerEl.requestFullscreen().catch(() => {});
    } else if (playerEl.webkitRequestFullscreen) {
      playerEl.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {   // iOS Safari (iPhone)
      video.webkitEnterFullscreen();
    }
  };

  playBtn.addEventListener('click', toggle);
  bigBtn.addEventListener('click', toggle);
  video.addEventListener('click', () => { toggle(); showUI(); });
  muteBtn.addEventListener('click', toggleMute);
  fullBtn.addEventListener('click', toggleFull);

  /* ---------- event video → state UI ---------- */
  video.addEventListener('play', () => {
    MOTION_VIDEOS.forEach(v => { if (v !== video && !v.paused) v.pause(); });
    playerEl.classList.add('playing');
    playBtn.setAttribute('aria-label', 'Pause');
    cancelAnimationFrame(raf); loop();
    showUI(); syncCursorLabel();
  });
  video.addEventListener('pause', () => {
    playerEl.classList.remove('playing');
    playBtn.setAttribute('aria-label', 'Play');
    cancelAnimationFrame(raf); updateProgress(); updateAria();
    clearTimeout(hideTimer); syncCursorLabel();
  });
  video.addEventListener('ended', () => {
    playerEl.classList.remove('playing');
    playBtn.setAttribute('aria-label', 'Replay');
    updateProgress(); syncCursorLabel();
  });
  video.addEventListener('timeupdate', () => { updateProgress(); updateAria(); updateBuffered(); });
  video.addEventListener('progress', updateBuffered);
  ['loadedmetadata', 'durationchange'].forEach(ev => video.addEventListener(ev, () => {
    durEl.textContent = fmtTime(video.duration);
    updateProgress(); updateAria(); updateBuffered();
  }));
  ['waiting', 'seeking'].forEach(ev => video.addEventListener(ev, () => playerEl.classList.add('is-loading')));
  ['playing', 'canplay', 'seeked', 'pause'].forEach(ev => video.addEventListener(ev, () => playerEl.classList.remove('is-loading')));
  video.addEventListener('volumechange', () => {
    const muted = video.muted || video.volume === 0;
    playerEl.classList.toggle('is-muted', muted);
    muteBtn.setAttribute('aria-pressed', String(muted));
    muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
  });
  video.addEventListener('error', () => {
    playerEl.classList.add('has-error');
    playerEl.classList.remove('is-loading', 'playing');
    errorEl.hidden = false;
  });

  /* ---------- seek: klik & drag pada progress bar ---------- */
  const seekFromPointer = (e) => {
    if (!isFinite(video.duration)) return;
    const r = progress.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    video.currentTime = ratio * video.duration;
    updateProgress();
  };
  progress.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    scrubbing = true;
    playerEl.classList.add('is-scrubbing');
    try { progress.setPointerCapture(e.pointerId); } catch (_) {}
    seekFromPointer(e);
  });
  progress.addEventListener('pointermove', e => { if (scrubbing) seekFromPointer(e); });
  const endScrub = (e) => {
    if (!scrubbing) return;
    scrubbing = false;
    playerEl.classList.remove('is-scrubbing');
    try { progress.releasePointerCapture(e.pointerId); } catch (_) {}
    showUI();
  };
  progress.addEventListener('pointerup', endScrub);
  progress.addEventListener('pointercancel', endScrub);

  /* ---------- keyboard ---------- */
  progress.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); e.stopPropagation(); skip(-5); }
    if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); skip(5); }
    if (e.key === 'Home')       { e.preventDefault(); e.stopPropagation(); video.currentTime = 0; }
    if (e.key === 'End')        { e.preventDefault(); e.stopPropagation(); if (isFinite(video.duration)) video.currentTime = video.duration; }
  });
  playerEl.addEventListener('keydown', e => {
    if (e.target !== playerEl) return;           // tombol & slider mengurus dirinya sendiri
    switch (e.key) {
      case ' ': case 'k': case 'K': e.preventDefault(); toggle(); break;
      case 'ArrowLeft':  e.preventDefault(); skip(-5); break;
      case 'ArrowRight': e.preventDefault(); skip(5);  break;
      case 'm': case 'M': toggleMute(); break;
      case 'f': case 'F': toggleFull(); break;
      default: return;
    }
    showUI();
  });

  /* ---------- tampilkan kontrol saat mouse bergerak / disentuh ---------- */
  playerEl.addEventListener('pointermove', showUI);
  playerEl.addEventListener('pointerdown', showUI);

  /* ---------- fullscreen sync ---------- */
  const onFs = () => {
    const full = isFull();
    playerEl.classList.toggle('is-full', full);
    fullBtn.setAttribute('aria-label', full ? 'Exit fullscreen' : 'Fullscreen');
  };
  document.addEventListener('fullscreenchange', onFs);
  document.addEventListener('webkitfullscreenchange', onFs);

  /* ---------- auto-pause saat keluar dari layar ---------- */
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting && !video.paused && !fsElement()) video.pause();
  }, { threshold: 0.2 }).observe(playerEl);
}

PROJECTS.filter(p => p.type === 'video').forEach(p => {
  const block = document.createElement('div');
  block.className = 'motion-project';
  block.innerHTML = `
    <div class="motion-project-head">
      <div class="title display">${p.title}</div>
      <div class="tags"><span>${p.category}</span><span>${p.year}</span></div>
    </div>
    <div class="player" data-cursor="PLAY" tabindex="0" role="group" aria-label="${p.title} — video player">
      <video class="video-element" src="${p.media}" poster="${p.poster}" preload="metadata" playsinline></video>

      <button type="button" class="player-big" data-big aria-label="Play video">
        <svg viewBox="0 0 20 20" fill="currentColor" width="30" height="30"><path d="M6 4l10 6-10 6V4z"/></svg>
      </button>
      <div class="player-spinner" aria-hidden="true"></div>
      <div class="player-error" hidden>Video unavailable</div>

      <div class="player-controls">
        <button type="button" class="player-btn" data-play aria-label="Play">${ICON.play}${ICON.pause}</button>
        <span class="player-time" data-cur>00:00</span>
        <div class="player-progress" role="slider" tabindex="0" aria-label="Seek"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="player-progress-track">
            <div class="player-progress-buffer"></div>
            <div class="player-progress-fill"></div>
          </div>
        </div>
        <span class="player-time player-dur" data-dur>00:00</span>
        <button type="button" class="player-btn" data-mute aria-label="Mute" aria-pressed="false">${ICON.vol}${ICON.muted}</button>
        <button type="button" class="player-btn" data-full aria-label="Fullscreen">${ICON.enter}${ICON.exit}</button>
      </div>
    </div>
    <div class="motion-project-meta">
      <div><span class="lbl">Role</span><span class="val">${p.role}</span></div>
      <div><span class="lbl">Tools</span><span class="val">${p.tools}</span></div>
      ${p.collaboration ? `<div><span class="lbl">Type</span><span class="val">${p.collaboration}</span></div>` : ''}
      ${p.sound ? `<div><span class="lbl">Sound</span><span class="val">${p.sound}</span></div>` : ''}
    </div>
    ${p.disclaimer ? `<p class="motion-disclaimer">${p.disclaimer}</p>` : ''}
  `;
  motionWrap.appendChild(block);
  initMotionPlayer(block.querySelector('.player'));
});


/* =================================================================
   RENDER — UI/UX GALLERY (Placeholder teks dihapus)
================================================================= */
const uiuxGallery = document.getElementById('uiuxGallery');
const uiuxData = [
  { img: "assets/images/laundry-01.png", title: "Laundry Dashboard" },
  { img: "assets/images/laundry-02.png", title: "Laundry Flow" },
  { img: "assets/images/laundry-03.png", title: "Laundry Mobile View" }
];

uiuxData.forEach(item => {
  const slide = document.createElement('div');
  slide.className = 'uiux-slide';
  slide.dataset.cursor = 'DRAG';
  slide.innerHTML = `<img src="${item.img}" alt="${item.title}" draggable="false"
    style="width:100%; height:100%; object-fit:cover; position:relative; z-index:2;">`;
  uiuxGallery.appendChild(slide);
});

(function initUiuxSlider(){
  const gallery = uiuxGallery;
  const slides  = Array.from(gallery.querySelectorAll('.uiux-slide'));
  if (!slides.length) return;

  /* --- aksesibilitas --- */
  gallery.setAttribute('tabindex', '0');
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-roledescription', 'carousel');
  gallery.setAttribute('aria-label', 'UI/UX project screens');

  /* --- kontrol --- */
  const controls = document.createElement('div');
  controls.className = 'uiux-controls';
  controls.innerHTML = `
    <span class="uiux-count text-meta"><b>01</b> / <span class="uiux-total">${String(slides.length).padStart(2, '0')}</span></span>
    <span class="uiux-progress"><span class="uiux-progress-fill"></span></span>
    <div class="uiux-nav">
      <button type="button" class="uiux-btn" data-dir="-1" data-cursor="PREV" aria-label="Previous slide">←</button>
      <button type="button" class="uiux-btn" data-dir="1"  data-cursor="NEXT" aria-label="Next slide">→</button>
    </div>`;
  gallery.insertAdjacentElement('afterend', controls);

  const countEl = controls.querySelector('.uiux-count b');
  const totalEl = controls.querySelector('.uiux-total');
  const fillEl  = controls.querySelector('.uiux-progress-fill');
  const prevBtn = controls.querySelector('[data-dir="-1"]');
  const nextBtn = controls.querySelector('[data-dir="1"]');

  const maxScroll = () => Math.max(0, gallery.scrollWidth - gallery.clientWidth);

  /* Posisi scroll yang BENAR-BENAR bisa dicapai tiap slide.
     Posisi yang terjepit ke nilai yang sama digabung, jadi langkah
     navigasi selalu menghasilkan perpindahan nyata. */
  let positions = [0];
  const computePositions = () => {
    const max = maxScroll();
    const raw = slides.map(s => Math.min(s.offsetLeft, max));
    positions = raw.filter((p, i) => i === 0 || p - raw[i - 1] > 2);
  };

  const currentIndex = () => {
    let best = 0, bestDist = Infinity;
    positions.forEach((p, i) => {
      const d = Math.abs(p - gallery.scrollLeft);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  };

  const goTo = (i) => {
    i = Math.max(0, Math.min(positions.length - 1, i));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gallery.scrollTo({ left: positions[i], behavior: reduce ? 'auto' : 'smooth' });
  };

  /* --- UI state --- */
  let ticking = false;
  const update = () => {
    ticking = false;
    computePositions();
    const max = maxScroll();
    controls.hidden = max <= 4;
    const idx = currentIndex();
    countEl.textContent = String(idx + 1).padStart(2, '0');
    totalEl.textContent = String(positions.length).padStart(2, '0');
    fillEl.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, gallery.scrollLeft / max)) : 1})`;
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= positions.length - 1;
  };
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  gallery.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  if ('ResizeObserver' in window) new ResizeObserver(requestUpdate).observe(gallery);
  window.addEventListener('load', requestUpdate);

  /* --- tombol & keyboard --- */
  controls.addEventListener('click', e => {
    const btn = e.target.closest('.uiux-btn');
    if (!btn || btn.disabled) return;
    computePositions();
    goTo(currentIndex() + Number(btn.dataset.dir));
  });
  gallery.addEventListener('keydown', e => {
    computePositions();
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex() - 1); }
    if (e.key === 'Home')       { e.preventDefault(); goTo(0); }
    if (e.key === 'End')        { e.preventDefault(); goTo(positions.length - 1); }
  });

  /* --- drag dengan mouse (touch & trackpad sudah native) --- */
  let down = false, startX = 0, startLeft = 0, startIdx = 0, dx = 0;

  gallery.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    computePositions();
    down = true; dx = 0;
    startX = e.clientX; startLeft = gallery.scrollLeft; startIdx = currentIndex();
    gallery.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    dx = e.clientX - startX;
    gallery.scrollLeft = startLeft - dx;
  });
  const endDrag = () => {
    if (!down) return;
    down = false;
    gallery.classList.remove('is-dragging');
    const threshold = Math.min(80, slides[0].offsetWidth * 0.12);
    let target = currentIndex();
    if (dx < -threshold)      target = startIdx + 1;
    else if (dx > threshold)  target = startIdx - 1;
    goTo(target);
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  gallery.addEventListener('dragstart', e => e.preventDefault());

  update();
})();

/* =================================================================
   RENDER — GRAPHIC DESIGN GRID (05)
================================================================= */
const gfxData = [
  { cls:'item-1', img:'assets/images/food-redesign1.png',   alt:'Food Product Redesign',          ratio:'3/4', title:'Food Product Redesign',   tag:'Branding' },
  { cls:'item-2', img:'assets/images/uniform-social1.png',  alt:'Uniform Product Social Content', ratio:'3/4', title:'Uniform Social Content',  tag:'Social Media' },
  { cls:'item-3', img:'assets/images/service-listing1.png', alt:'Website Service Listing',        ratio:'1/1', title:'Service Listing',         tag:'Promo' },
  { cls:'item-4', img:'assets/images/food-redesign2.png',   alt:'Food Product Redesign 02',       ratio:'3/4', title:'Food Redesign 02',        tag:'Branding' }
];
const gfxGrid = document.getElementById('gfxGrid');
gfxData.forEach((g, i) => {
  const el = document.createElement('div');
  el.className = `gfx-item ${g.cls}`;
  el.dataset.cursor = 'VIEW';
  el.style.setProperty('--ratio', g.ratio);
  el.innerHTML = `
    <img src="${g.img}" alt="${g.alt}" loading="lazy" decoding="async">
    <span class="gfx-num">${String(i + 1).padStart(2, '0')}</span>
    <span class="gfx-label"><i></i>${g.title} — ${g.tag}</span>
  `;
  gfxGrid.appendChild(el);
});

/* =================================================================
   CUSTOM CURSOR
================================================================= */
const cursor = document.getElementById('cursor');
const cursorLabel = document.getElementById('cursorLabel');
let mx = 0, my = 0, cx = 0, cy = 0, lx = 0, ly = 0;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (isFinePointer) {
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  const loop = () => {
    cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
    lx += (mx - lx) * 0.14; ly += (my - ly) * 0.14;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    cursorLabel.style.transform = `translate(${lx}px, ${ly}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll('[data-cursor], .work-row-head, .player, .uiux-slide').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const label = el.dataset.cursor || (el.classList.contains('work-row-head') ? 'VIEW' : el.classList.contains('player') ? 'PLAY' : 'VIEW');
      cursorLabel.textContent = label;
      cursorLabel.classList.add('active');
      cursor.classList.add('hidden');
    });
    el.addEventListener('mouseleave', () => {
      cursorLabel.classList.remove('active');
      cursor.classList.remove('hidden');
    });
  });
}

/* =================================================================
   MAGNETIC BUTTON
================================================================= */
const magBtn = document.getElementById('magneticBtn');
if (isFinePointer && magBtn) {
  magBtn.addEventListener('mousemove', e => {
    const r = magBtn.getBoundingClientRect();
    const relX = e.clientX - r.left - r.width / 2;
    const relY = e.clientY - r.top - r.height / 2;
    magBtn.style.transform = `translate(${relX * 0.28}px, ${relY * 0.4}px)`;
  });
  magBtn.addEventListener('mouseleave', () => { magBtn.style.transform = 'translate(0,0)'; });
}

/* =================================================================
   NAV SCROLL STATE
================================================================= */
const nav         = document.getElementById('nav');
const navToggle   = document.getElementById('navToggle');
const navLinksEl  = document.getElementById('navLinks');
const navScrim    = document.getElementById('navScrim');
const heroCue     = document.querySelector('.hero-scroll-cue');
const mqMobile    = window.matchMedia('(max-width: 820px)');
const rootEl      = document.documentElement;

const isDrawerOpen = () => navLinksEl.classList.contains('open');

/* Drawer tertutup di mobile = tidak boleh bisa difokus / dibaca screen reader */
function syncDrawerA11y(){
  const hide = mqMobile.matches && !isDrawerOpen();
  if (hide) navLinksEl.setAttribute('inert', ''); else navLinksEl.removeAttribute('inert');
  if (mqMobile.matches) navLinksEl.setAttribute('aria-hidden', String(hide));
  else navLinksEl.removeAttribute('aria-hidden');
}

function openDrawer(){
  navLinksEl.classList.add('open');
  navToggle.classList.add('open');
  navScrim.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  rootEl.classList.add('nav-lock');
  nav.classList.remove('is-hidden');
  syncDrawerA11y();
  const first = navLinksEl.querySelector('a[href]');
  requestAnimationFrame(() => first && first.focus({ preventScroll: true }));
}
function closeDrawer(returnFocus = false){
  navLinksEl.classList.remove('open');
  navToggle.classList.remove('open');
  navScrim.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  rootEl.classList.remove('nav-lock');
  syncDrawerA11y();
  if (returnFocus) navToggle.focus({ preventScroll: true });
}

navToggle.addEventListener('click', () => (isDrawerOpen() ? closeDrawer(true) : openDrawer()));
navScrim.addEventListener('click', () => closeDrawer());
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeDrawer()));

document.addEventListener('keydown', e => {
  if (!isDrawerOpen()) return;
  if (e.key === 'Escape') { closeDrawer(true); return; }
  if (e.key !== 'Tab') return;                       // focus trap
  const items = [navToggle, ...navLinksEl.querySelectorAll('a[href]')];
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* Swipe ke kanan pada drawer untuk menutup */
let touchX = 0, touchY = 0;
navLinksEl.addEventListener('touchstart', e => {
  touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
}, { passive: true });
navLinksEl.addEventListener('touchend', e => {
  const t = e.changedTouches[0];
  const dx = t.clientX - touchX, dy = t.clientY - touchY;
  if (dx > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) closeDrawer(true);
}, { passive: true });

/* Layar melebar / rotasi saat drawer terbuka → tutup agar scroll tidak terkunci */
const onBreakpoint = () => { if (!mqMobile.matches && isDrawerOpen()) closeDrawer(); syncDrawerA11y(); };
mqMobile.addEventListener ? mqMobile.addEventListener('change', onBreakpoint) : mqMobile.addListener(onBreakpoint);

/* ---------- scroll: nav solid, auto-hide di mobile, scroll cue ---------- */
let lastY = window.scrollY, scrollTick = false;
function onScroll(){
  scrollTick = false;
  const y = Math.max(0, window.scrollY);

  nav.classList.toggle('scrolled', y > 80);
  if (heroCue) heroCue.classList.toggle('is-hidden', y > 40);

  if (mqMobile.matches && !isDrawerOpen()) {
    const dy = y - lastY;
    if (y < 120 || dy < -6) nav.classList.remove('is-hidden');   // dekat atas / scroll ke atas → tampil
    else if (dy > 8)        nav.classList.add('is-hidden');      // scroll ke bawah → sembunyi
  } else {
    nav.classList.remove('is-hidden');
  }
  lastY = y;
}
window.addEventListener('scroll', () => {
  if (!scrollTick) { scrollTick = true; requestAnimationFrame(onScroll); }
}, { passive: true });

/* ---------- link aktif ---------- */
const NAV_MAP = { top:null, work:'work', motion:'motion', uiux:'work', graphic:'work', about:'about', contact:'contact' };
const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');
const watched = Object.keys(NAV_MAP).map(id => document.getElementById(id)).filter(Boolean);
if (watched.length) {
  const navSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = NAV_MAP[entry.target.id];
      navAnchors.forEach(a => {
        const on = a.dataset.nav === target;
        a.classList.toggle('active', on);
        on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  watched.forEach(sec => navSectionObserver.observe(sec));
}

syncDrawerA11y();
onScroll();

/* =================================================================
   SCROLL REVEALS (IntersectionObserver)
================================================================= */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* Motion players — scale/fade in on view */
const players = document.querySelectorAll('.player');
const pio = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.3 });
players.forEach(p => pio.observe(p));

