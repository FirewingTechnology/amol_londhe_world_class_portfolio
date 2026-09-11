// Amol Londhe — World Class Portfolio Scripts
document.addEventListener('DOMContentLoaded', () => {
  const q = s => document.querySelector(s);
  const qAll = s => document.querySelectorAll(s);

  // Dynamic Year
  const yearEl = q('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Ambient Cursor Glow
  const cursor = q('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // Scroll Progress Bar
  const bar = q('.bar');
  const updateScrollProgress = () => {
    if (!bar) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    bar.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Intersection Observer for Smooth Reveal Animations
  const revealElements = qAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // 3D Parallax Tilt Effect for Hero Founder Card
  const heroCard = q('.founder-card');
  const founderImg = q('#hero-founder-photo');
  const floatingBadges = qAll('.floating-badge');

  if (heroCard && window.matchMedia('(pointer: fine)').matches) {
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroCard.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;

          const deltaX = (e.clientX - cardCenterX) / 25;
          const deltaY = (e.clientY - cardCenterY) / 25;

          // Limit rotation range
          const rotateX = Math.max(Math.min(-deltaY * 0.4, 10), -10);
          const rotateY = Math.max(Math.min(deltaX * 0.4, 10), -10);

          if (founderImg) {
            founderImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
          }

          floatingBadges.forEach((badge, index) => {
            const factor = (index + 1) * 0.4;
            badge.style.transform = `translate(${deltaX * factor}px, ${deltaY * factor}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });

    heroCard.addEventListener('mouseleave', () => {
      if (founderImg) {
        founderImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
      floatingBadges.forEach(badge => {
        badge.style.transform = '';
      });
    });
  }

  // Active Navigation Anchor Highlighting
  const navLinks = qAll('header nav a');
  const sections = qAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${currentId}` ? 'var(--accent-orange)' : '';
    });
  }, { passive: true });
});
