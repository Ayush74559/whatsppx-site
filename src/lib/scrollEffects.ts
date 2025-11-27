type ParallaxEl = {
  el: HTMLElement;
  speed: number;
};

export function initScrollEffects() {
  if (typeof window === 'undefined') return;

  // Reveal on scroll using IntersectionObserver
  try {
    const threshold = 0.12;
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    // Observe reveal elements, but if an element is already inside the viewport
    // make it visible immediately to avoid it staying hidden after a refresh.
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const vh = window.innerHeight;
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < vh && rect.bottom > 0;
      if (isVisible) {
        el.classList.add('show');
      } else {
        revealObserver.observe(el);
      }
    });
  } catch (e) {
    // fallback: show all
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => el.classList.add('show'));
  }

  // Lightweight parallax: elements with data-parallax-speed attribute
  const parallaxNodes: ParallaxEl[] = [];
  document.querySelectorAll<HTMLElement>('[data-parallax-speed]').forEach((el) => {
    const speedAttr = el.getAttribute('data-parallax-speed') || '0.12';
    const speed = parseFloat(speedAttr);
    if (!isNaN(speed)) parallaxNodes.push({ el, speed });
  });

  if (parallaxNodes.length === 0) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY || window.pageYOffset;
        const vh = window.innerHeight;

        parallaxNodes.forEach(({ el, speed }) => {
          // compute element center relative to viewport center
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2 - vh / 2;
          const translate = -elCenter * speed;
          el.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // trigger initial
  onScroll();
}
