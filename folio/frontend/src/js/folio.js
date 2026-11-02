/**
 * Folio's own script (frontend/vite.design.mjs runs it right after the theme's JS).
 * The motion of DESIGN.md §6:
 * - Motion (motion.dev, vanilla API): the hero slab's lines and inline image, and the
 *   section rules drawing in. Each runs once.
 * - GSAP ScrollTrigger + SplitText: everything that moves with the page. Section titles
 *   rise word by word, leads light up word by word as they scroll through, cards and rows
 *   enter in staggered waves, photos drift inside their frames, dark bands open like
 *   plates, the CTA ticker slides, the hero plate opens, the footer wordmark rises, and a
 *   reading line runs along the top.
 * Plus the drafting grid (canvas), the logo marquee and the wordmark fit.
 * One library per element. With reduced motion none of the motion runs and every element
 * shows in its final state (folio.css only collapses the rules under html.folio-motion).
 */
import { animate, inView, stagger } from 'motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = [0.2, 0.7, 0.1, 1];

/* Hero and page titles: each .folio-line rises out of its clip; the inline image
   widens once the lines have landed */
const revealSlabs = () => {
  document.querySelectorAll('.folio-slab').forEach((slab) => {
    const lines = slab.querySelectorAll('.folio-line');
    const media = slab.querySelector('.folio-inline-media');
    animate(lines, { y: ['105%', '0%'] }, { duration: 0.7, ease: EASE, delay: stagger(0.08) })
      .then(() => slab.classList.add('is-revealed'));
    if (media) {
      animate(media, { clipPath: ['inset(0 50% 0 50%)', 'inset(0 0% 0 0%)'] }, { duration: 0.6, ease: EASE, delay: 0.45 });
    }
  });
};

/* Section rules (section heads and hairline lists) draw in from the left */
const drawRules = () => {
  inView('.section-head, .service-list', (el) => {
    el.classList.add('is-drawn');
  }, { amount: 0.6 });
};

/* Client logos: a single row becomes an endless band. The marks are cloned once into a
   track that slides by half its width (folio.css .folio-marquee-track); the clones are
   hidden from assistive tech. Runs with reduced motion too (the CSS stops the slide). */
const marquees = () => {
  document.querySelectorAll('.logo-row').forEach((row) => {
    const items = [...row.children];
    if (items.length < 3) return;
    const track = document.createElement('div');
    track.className = 'folio-marquee-track';
    items.forEach((item) => track.append(item));
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', '-1'));
      track.append(clone);
    });
    row.style.setProperty('--marquee-time', `${Math.max(items.length * 5, 24)}s`);
    row.classList.add('is-marquee');
    row.append(track);
  });
};

/* Drafting grid: a hairline grid on a canvas behind the hero slab and the Carbon CTA band.
   With a mouse, the cells under the pointer fill (Dust on Stone, a Sheet tint on Carbon) and fade out behind it, thin crosshair lines follow the pointer and a small
   readout gives its position in grid units. Touch and reduced motion get the still grid.
   Draws only while the pointer is over it or cells are still fading, and only on screen. */
const CELL = 48;
const draftingGrid = (host, interactive) => {
  const canvas = document.createElement('canvas');
  canvas.className = 'folio-grid';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const readout = document.createElement('span');
  readout.className = 'folio-grid-readout';
  readout.setAttribute('aria-hidden', 'true');
  host.append(readout);

  const ctx = canvas.getContext('2d');
  const dark = host.matches('.cta-box') || host.closest('[data-theme="dark"]');
  const line = dark ? 'rgba(244,243,238,0.08)' : 'rgba(13,13,13,0.07)';
  const fill = dark ? '244,243,238' : '169,166,151';
  const hair = dark ? 'rgba(244,243,238,0.35)' : 'rgba(13,13,13,0.35)';
  let w = 0, h = 0, cols = 0, rows = 0, cells = new Float32Array(0);
  let px = -1, py = -1, inside = false, running = false, visible = true;

  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = host.clientWidth;
    h = host.querySelector('.hero-folio-plate')
      ? host.querySelector('.hero-folio-plate').offsetTop
      : host.clientHeight;
    canvas.style.height = `${h}px`;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / CELL);
    rows = Math.ceil(h / CELL);
    cells = new Float32Array(cols * rows);
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    let active = false;
    for (let i = 0; i < cells.length; i++) {
      const a = cells[i];
      if (a > 0.01) {
        active = true;
        ctx.fillStyle = `rgba(${fill},${(dark ? 0.12 : 0.55) * a})`;
        ctx.fillRect((i % cols) * CELL, Math.floor(i / cols) * CELL, CELL, CELL);
        cells[i] = a * 0.92;
      } else {
        cells[i] = 0;
      }
    }
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += CELL) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
    for (let y = 0; y <= h; y += CELL) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
    ctx.stroke();
    if (inside) {
      ctx.strokeStyle = hair;
      ctx.beginPath();
      ctx.moveTo(Math.round(px) + 0.5, 0); ctx.lineTo(Math.round(px) + 0.5, h);
      ctx.moveTo(0, Math.round(py) + 0.5); ctx.lineTo(w, Math.round(py) + 0.5);
      ctx.stroke();
    }
    return active || inside;
  };

  const tick = () => {
    if (!visible || !draw()) { running = false; gsap.ticker.remove(tick); }
  };
  const start = () => {
    if (!running && visible) { running = true; gsap.ticker.add(tick); }
  };

  size();
  new ResizeObserver(size).observe(host);
  if (!interactive) return;

  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); }).observe(host);
  host.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const r = host.getBoundingClientRect();
    px = event.clientX - r.left;
    py = event.clientY - r.top;
    inside = py >= 0 && py <= h;
    if (inside) {
      const c = Math.floor(px / CELL), rr = Math.floor(py / CELL);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const cx = c + dx, cy = rr + dy;
          if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
          const k = cy * cols + cx;
          cells[k] = Math.max(cells[k], dx === 0 && dy === 0 ? 1 : 0.45);
        }
      }
      readout.textContent = `X ${String(c).padStart(2, '0')} · Y ${String(rr).padStart(2, '0')}`;
      readout.style.transform = `translate(${Math.min(px + 12, w - 96)}px, ${Math.max(py - 22, 4)}px)`;
    }
    readout.classList.toggle('is-on', inside);
    start();
  });
  host.addEventListener('pointerleave', () => {
    inside = false;
    readout.classList.remove('is-on');
    start();
  });
};

const initDraftingGrids = () => {
  const interactive = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  document.querySelectorAll('.hero-folio-slide, .cta-section:not([data-theme="dark"]) .cta-box:not(.has-bg)')
    .forEach((host) => draftingGrid(host, interactive));
};
initDraftingGrids();

/* Footer wordmark: the company name fills the container width, whatever its length
   (not motion: runs with reduced motion too) */
const fitWordmark = () => {
  const mark = document.querySelector('.folio-wordmark');
  if (!mark) return;
  const fit = () => {
    const box = getComputedStyle(mark.parentElement);
    const room = mark.parentElement.clientWidth - parseFloat(box.paddingLeft) - parseFloat(box.paddingRight);
    mark.style.fontSize = '';
    mark.style.width = 'max-content';
    const size = parseFloat(getComputedStyle(mark).fontSize);
    const used = mark.getBoundingClientRect().width;
    mark.style.width = '';
    // 0.98: the condensed caps overhang their advance width a little at the edges
    if (room > 0 && used > 0) mark.style.fontSize = `${Math.min(size * (room / used) * 0.98, 480)}px`;
  };
  document.fonts.ready.then(fit);
  new ResizeObserver(fit).observe(mark.parentElement);
};
fitWordmark();

/* Scroll-linked (ScrollTrigger, scrubbed). Created top to bottom, as the page reads. */
const scrollScenes = () => {
  // Hero plate: opens from a 6% side inset to full bleed while its photo drifts up
  document.querySelectorAll('.hero-folio-plate').forEach((plate) => {
    const media = plate.querySelector('.hero-media');
    gsap.fromTo(plate, { clipPath: 'inset(0% 6% 0% 6%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: plate, start: 'top bottom', end: 'top 35%', scrub: 0.6 },
    });
    if (media) {
      gsap.fromTo(media, { yPercent: -6, scale: 1.12 }, {
        yPercent: 6,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: plate, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  });

  // Banner covers: the photo drifts against the scroll
  document.querySelectorAll('.page-hero-slide.is-cover .page-hero-cover-media').forEach((media) => {
    gsap.fromTo(media, { yPercent: 0, scale: 1.1 }, {
      yPercent: 10,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger: media.closest('.page-hero-slide'), start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // Section titles (and banner / CTA / heading-block titles): words rise out of a mask,
  // staggered, as the title comes into view
  document.querySelectorAll('.section-title, .heading-content-title, .page-hero-title, .cta-title, .split-section .split-grid :is(h2, h3), .folio-article-title, .portfolio-title, .newsletter-section :is(h2, h3).font-heading').forEach((title) => {
    const split = SplitText.create(title, { type: 'words', mask: 'words' });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 0.75,
      ease: 'power4.out',
      stagger: 0.035,
      scrollTrigger: { trigger: title, start: 'top 88%', once: true },
    });
  });

  // The pull quote (one per page at most) inks in word by word while it scrolls into the
  // reading zone; it is fully inked by the time it reaches the upper third. Leads are not
  // scrubbed: body copy must be readable the moment it is on screen.
  document.querySelectorAll('.testimonials-section .grid > :first-child:not(:only-child) .testimonial-quote').forEach((text) => {
    const split = SplitText.create(text, { type: 'words' });
    gsap.fromTo(split.words, { opacity: 0.3 }, {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: text, start: 'top 85%', end: 'bottom 70%', scrub: true },
    });
  });

  // Cards, rows, steps, quotes, logos: rise in staggered waves. Opacity only (never
  // visibility), so screen readers and find-in-page still reach content that has not
  // scrolled in yet; anything already above the viewport is shown at once.
  const items = [
    '.service-card', '.service-list-row', '.post-card', '.project-card', '.work-card',
    '.ucard', '.testimonial-card', '.tw-accordion-item', '.process-container-inner > *',
    '.team-section .grid > *', '.logo-grid > .logo-item', '.split-grid > *',
    '.product-card', '.gallery-section .grid > *', '.cta-box',
  ].join(', ');
  const fold = window.innerHeight;
  const targets = gsap.utils.toArray(items)
    .filter((el) => !el.closest('.hero-folio, .headerMain, .folio-capabilities'))
    .filter((el) => el.getBoundingClientRect().top > fold * 0.9);
  gsap.set(targets, { y: 28, opacity: 0 });
  const reveal = (batch) => {
    batch.forEach((el) => { el.dataset.folioShown = '1'; });
    gsap.to(batch, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07, overwrite: true });
  };
  ScrollTrigger.batch(targets, { start: 'top 94%', once: true, onEnter: reveal });
  // Safety net: after a jump (anchor, Back, smooth-scroll to) a trigger can be passed
  // without firing; when scrolling settles, show anything that is on or above the screen.
  ScrollTrigger.addEventListener('scrollEnd', () => {
    const due = targets.filter((el) => !el.dataset.folioShown && el.getBoundingClientRect().top < window.innerHeight);
    if (due.length) reveal(due);
  });

  // Photos drift a little inside their frames (scale 1.06 keeps faces in frame)
  document.querySelectorAll('.split-frame, .img-zoom-wrapper, .post-card-media, .project-card-media, .work-card-media, .page-hero-media, .folio-article-cover').forEach((frame) => {
    const img = frame.querySelector('img, video');
    if (!img) return;
    frame.style.overflow = 'hidden';
    gsap.fromTo(img, { yPercent: -3, scale: 1.06 }, {
      yPercent: 3,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Dark bands open like plates: from a side inset to full bleed as they arrive
  document.querySelectorAll('.block-section[data-theme="dark"]:not(.hero-layout)').forEach((band) => {
    gsap.fromTo(band, { clipPath: 'inset(0% 5% 0% 5%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: band, start: 'top bottom', end: 'top 30%', scrub: 0.6 },
    });
  });

  // CTA band: a giant ticker of its own title slides across behind it
  document.querySelectorAll('.cta-box').forEach((box) => {
    const title = box.querySelector('.cta-title');
    if (!title) return;
    const ticker = document.createElement('div');
    ticker.className = 'folio-ticker';
    ticker.setAttribute('aria-hidden', 'true');
    const words = title.textContent.trim();
    for (let i = 0; i < 4; i++) {
      const span = document.createElement('span');
      span.textContent = `${words} —`;
      ticker.append(span);
    }
    box.append(ticker);
    gsap.fromTo(ticker, { xPercent: 0 }, {
      xPercent: -35,
      ease: 'none',
      scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Footer wordmark: rises out of the footer's bottom edge as the footer comes in
  document.querySelectorAll('.folio-wordmark').forEach((mark) => {
    gsap.fromTo(mark, { yPercent: 45 }, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
    });
  });

  // Hero stats: whole-number figures of 10 or more count up from 0 when the row comes into
  // view ("140+", "1,200"). Ratings, scores out of something and decimals stay as written:
  // a count-up would show false intermediate claims ("3.2/5").
  document.querySelectorAll('.hero-stat-figure').forEach((fig) => {
    const text = fig.textContent.trim();
    const m = text.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    if (!m || m[2].includes('.') || m[3].includes('/') || parseFloat(m[2].replace(/,/g, '')) < 10) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] || '').length;
    const grouped = num.includes(',');
    const state = { v: 0 };
    const render = () => {
      let s = state.v.toFixed(decimals);
      if (grouped) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      fig.textContent = `${pre}${s}${post}`;
    };
    render();
    gsap.to(state, {
      v: target,
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: render,
      onComplete: () => { fig.textContent = text; },
      scrollTrigger: { trigger: fig, start: 'top 92%', once: true },
    });
  });

  // Capability grid (Universal Card with the class folio-capabilities): on desktop the
  // small tiles start scattered away from the centre and drift into their cells as the
  // section scrolls in ("under one roof"); the four feature tiles settle from 92%.
  gsap.matchMedia().add('(min-width: 1024px)', () => {
    document.querySelectorAll('.folio-capabilities .container > .grid').forEach((grid) => {
      const cells = [...grid.children];
      const box = grid.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid, start: 'top 95%', end: 'top 25%', scrub: 0.8 },
      });
      cells.forEach((cell, i) => {
        if (i < 4) {
          tl.fromTo(cell, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0.15);
          return;
        }
        const r = cell.getBoundingClientRect();
        const dx = r.left + r.width / 2 - cx;
        const dy = r.top + r.height / 2 - cy;
        const len = Math.hypot(dx, dy) || 1;
        const push = 90 + (i % 5) * 28;
        tl.fromTo(cell, {
          x: (dx / len) * push,
          y: (dy / len) * push * 0.6,
          opacity: 0,
        }, { x: 0, y: 0, opacity: 1, ease: 'power3.out' }, (i % 7) * 0.03);
      });
    });
  });

  // Journal strip (blogs grid view): on desktop the section pins under the header and the
  // strip of posts slides left by exactly its overflow while you scroll. Phones keep the
  // native swipe row (folio.css).
  gsap.matchMedia().add('(min-width: 1024px)', () => {
    const header = () => document.querySelector('.headerMain')?.offsetHeight || 0;
    const made = [];
    document.querySelectorAll('.entry-type.blogs .block-section .grid').forEach((strip) => {
      if (!strip.querySelector('.post-card')) return;
      const dist = () => strip.scrollWidth - strip.clientWidth;
      // pin only when there is a real journey (a quarter screen or more of overflow)
      if (dist() < window.innerWidth * 0.25) return;
      strip.classList.add('is-strip-pinned');
      made.push(strip);
      gsap.to(strip, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: strip.closest('.block-section'),
          start: () => `top ${header()}px`,
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => made.forEach((strip) => strip.classList.remove('is-strip-pinned'));
  });
  ScrollTrigger.sort();

  // Reading line along the top edge
  const progress = document.createElement('div');
  progress.className = 'folio-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  gsap.to(progress, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });

  // Fonts and lazy images change heights after load
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
};

marquees();

/* Desktop dropdown panels: the parent item's name set as a slab on the panel's left
   (folio.css .folio-dd-label); decorative, so hidden from assistive tech */
document.querySelectorAll('#menuNav .menu-ul > li.dropdown').forEach((li) => {
  const panel = li.querySelector(':scope > .dropdown-menu');
  const title = li.querySelector(':scope > .menu-group .menu-title, :scope > .menu-link .menu-title');
  if (!panel || !title || panel.querySelector('.folio-dd-label')) return;
  const count = panel.querySelectorAll(':scope > ul > li').length;
  const label = document.createElement('p');
  label.className = 'folio-dd-label';
  label.setAttribute('aria-hidden', 'true');
  label.textContent = title.textContent.trim();
  const small = document.createElement('small');
  small.textContent = `${String(count).padStart(2, '0')} ${count === 1 ? 'page' : 'pages'}`;
  label.append(small);
  panel.prepend(label);

  // The Theme's menu script marks an item .is-open on hover; with Folio's full-width panel
  // it can miss the leave and keep the panel (and its page overlay) up. Close it when the
  // pointer leaves the item and its panel, unless keyboard focus is inside.
  li.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse') return;
    setTimeout(() => {
      if (li.matches(':hover') || li.contains(document.activeElement)) return;
      li.classList.remove('is-open');
      if (!document.querySelector('#menuNav li.dropdown.is-open')) {
        document.querySelectorAll('.dropdown-overlay.is-open').forEach((o) => o.classList.remove('is-open'));
      }
    }, 120);
  });
});

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  document.documentElement.classList.add('folio-motion');
  revealSlabs();
  drawRules();
  scrollScenes();
}
