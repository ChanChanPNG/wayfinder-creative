/* Shared progressive-enhancement motion layer. Native scrolling stays intact. */
(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = sessionStorage.getItem('wayfinder-motion') !== 'off' && !preference.matches;
  const progress = document.createElement('div');
  progress.className = 'motion-progress';
  progress.setAttribute('aria-hidden', 'true');
  const control = document.createElement('button');
  control.className = 'motion-lab';
  control.type = 'button';
  document.body.append(progress, control);
  const sync = () => {
    root.classList.toggle('motion-on', enabled);
    control.setAttribute('aria-pressed', String(enabled));
    control.setAttribute('aria-label', enabled ? 'Pause experimental motion' : 'Enable experimental motion');
    control.innerHTML = `Motion lab <span>${enabled ? 'ON · pause' : 'OFF · play'}</span>`;
    schedule();
  };
  control.addEventListener('click', () => {
    enabled = !enabled;
    sessionStorage.setItem('wayfinder-motion', enabled ? 'on' : 'off');
    sync();
  });
  preference.addEventListener('change', () => { enabled = !preference.matches && sessionStorage.getItem('wayfinder-motion') !== 'off'; sync(); });

  // Preserve the existing heading markup and natural spaces for selection and reading.
  document.querySelectorAll('main h1, main h2').forEach(heading => {
    let index = 0;
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
        const mask = document.createElement('span');
        mask.className = 'motion-word';
        const inner = document.createElement('span');
        inner.textContent = word;
        inner.style.setProperty('--word-index', Math.min(index++, 18));
        mask.append(inner); fragment.append(mask);
      });
      node.replaceWith(fragment);
    });
    heading.classList.add('motion-heading');
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting, boundingClientRect}) => {
      if (isIntersecting) target.classList.add('is-visible');
      else if (boundingClientRect.top > innerHeight) target.classList.remove('is-visible');
    });
  }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
  const selectors = 'main h1, main h2, main .eyebrow, main p, main .buttonrow, .card, .project, .blog-card, .path-item, .info-panel, .form-placeholder, .platform-pair, .origin-photos, .media-placeholder, .youtube-gallery, .mini-cols>div, .footer-grid>div, .footbottom, .legal-crosslinks';
  document.querySelectorAll(selectors).forEach(el => {
    // Animate cards as one object rather than hiding nested paragraphs independently.
    if (el.parentElement.closest('.card,.project,.blog-card,.path-item,.form-placeholder,.info-panel,.platform-pair,.youtube-gallery,.legal-crosslinks')) return;
    el.classList.add('motion-reveal');
    const peers = Array.from(el.parentElement.children);
    el.style.setProperty('--reveal-delay', `${Math.min(peers.indexOf(el), 4) * 65}ms`);
    observer.observe(el);
  });
  document.querySelectorAll('.motion-heading').forEach(el => observer.observe(el));

  let frame = 0;
  const hero = document.querySelector('.hero-video,.page-hero');
  const ctas = [...document.querySelectorAll('.cta')];
  const dots = [...document.querySelectorAll('.rail-dot')];
  function paint() {
    frame = 0;
    const range = Math.max(1, root.scrollHeight - innerHeight);
    const fraction = Math.min(1, Math.max(0, scrollY / range));
    root.style.setProperty('--page-progress', fraction);
    root.classList.toggle('motion-scrolled', scrollY > 45);
    dots.forEach((dot, i) => dot.classList.toggle('motion-passed', fraction > [.12,.37,.62,.87][i % 4]));
    if (!enabled) return;
    if (hero) {
      const t = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
      hero.style.setProperty('--hero-shift', `${t * 170}px`);
      hero.style.setProperty('--hero-zoom', 1.05 + t * .15);
      hero.style.setProperty('--hero-copy-shift', `${t * 80}px`);
      hero.style.setProperty('--hero-opacity', 1 - t * .85);
    }
    ctas.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) el.style.setProperty('--orbit-shift', `${(innerHeight / 2 - rect.top) * .14}px`);
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  // Pointer effects are limited to precise pointers and do no work on touch scrolling.
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.card,.project,.blog-card,.info-panel,.platform-pair').forEach(card => {
      card.classList.add('motion-tilt');
      card.addEventListener('pointermove', e => {
        if (!enabled) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty('--tilt-x', x);
        card.style.setProperty('--tilt-y', -y);
        card.style.setProperty('--tilt-angle', `${Math.hypot(x,y) * 7}deg`);
      });
      card.addEventListener('pointerleave', () => card.style.setProperty('--tilt-angle', '0deg'));
    });
    document.querySelectorAll('.btn,.nav-cta,.yt-arrow').forEach(button => {
      button.addEventListener('pointermove', e => {
        if (!enabled) return;
        const r = button.getBoundingClientRect();
        button.style.translate = `${(e.clientX-r.left-r.width/2)*.14}px ${(e.clientY-r.top-r.height/2)*.2}px`;
      });
      button.addEventListener('pointerleave', () => { button.style.translate = ''; });
    });
    document.querySelectorAll('.cta,.page-hero').forEach(el => el.addEventListener('pointermove', e => {
      if (!enabled) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${(e.clientX-r.left)/r.width*100}%`);
      el.style.setProperty('--spot-y', `${(e.clientY-r.top)/r.height*100}%`);
    }));
  }
  document.addEventListener('click', e => {
    if (!enabled || preference.matches || !e.target.closest('a,button') || !e.detail) return;
    const ring = document.createElement('i');
    ring.className = 'motion-ripple'; ring.setAttribute('aria-hidden','true');
    ring.style.left = `${e.clientX}px`; ring.style.top = `${e.clientY}px`;
    document.body.append(ring);
    ring.addEventListener('animationend', () => ring.remove(), {once:true});
  });
  addEventListener('pageshow', schedule);
  sync();
})();
