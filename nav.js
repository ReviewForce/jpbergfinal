/* Shared nav behaviour */
(function () {
  /* Reveal on scroll */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Hero bg zoom */
  window.addEventListener('load', () => {
    document.querySelectorAll('.page-hero-bg').forEach(bg => bg.classList.add('loaded'));
  });

  /* Mobile burger */
  const burger = document.getElementById('burger');
  const mob    = document.getElementById('mobileNav');
  if (burger && mob) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mob.classList.toggle('open');
      document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
    });
  }
  window.closeMobile = function () {
    if (burger) burger.classList.remove('open');
    if (mob)    mob.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* Counter animation */
  function animateCount(el) {
    const raw = el.dataset.count || el.textContent;
    const end = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const suf = raw.replace(/[0-9.]/g, '');
    const dur = 1500;
    const t0  = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const v = 1 - Math.pow(1 - p, 3);
      el.textContent = (end > 20 ? Math.round(v * end) : (v * end).toFixed(end % 1 !== 0 ? 1 : 0)) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));
})();
