/**
 * Altitude's own script (frontend/vite.design.mjs runs it right after the theme's JS).
 * Keep it to this design's interaction; behaviour every design needs belongs in the theme.
 */

/**
 * Product quote (templates/_layouts/detail/product.twig): the pointer's position over the
 * section, -0.5 to 0.5 on each axis, as --mx / --my. altitude.css "Product quote" drifts
 * the photo against it and the grain with it; leaving the section eases both back.
 * Mouse only (touch has no hover), and nothing with reduced motion.
 */
const initQuoteDrift = () => {
  if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;

  document.querySelectorAll('.product-quote.has-image').forEach((section) => {
    let frame = 0;
    const set = (x, y) => {
      section.style.setProperty('--mx', x.toFixed(3));
      section.style.setProperty('--my', y.toFixed(3));
    };

    section.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = section.getBoundingClientRect();
        set((event.clientX - r.left) / r.width - 0.5, (event.clientY - r.top) / r.height - 0.5);
      });
    });
    section.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      frame = 0;
      set(0, 0);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuoteDrift);
} else {
  initQuoteDrift();
}
