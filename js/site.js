(function () {
  const doc = document;
  const body = doc.body;
  const isRTL = body.classList.contains('rtl');

  const scrollToTarget = (target) => {
    const el = typeof target === 'string' ? doc.querySelector(target) : target;
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const navToggle = doc.querySelector('[data-nav-toggle]');
  const nav = doc.querySelector('[data-nav]');

  const closeNav = () => {
    body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (open) {
        navToggle.focus();
      }
    });
  }

  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  const scrollTriggers = Array.from(doc.querySelectorAll('[data-scroll-to]'));
  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const target = trigger.getAttribute('data-scroll-to');
      if (!target) return;
      event.preventDefault();
      closeNav();
      scrollToTarget(target);
    });
  });

  const sections = Array.from(doc.querySelectorAll('[data-section]'));
  const progressFill = doc.querySelector('[data-progress-fill]');
  const progressMarkersContainer = doc.querySelector('[data-progress-markers]');
  const navLinks = Array.from(doc.querySelectorAll('[data-scroll-to]')).filter((link) => link.tagName === 'A');
  const sectionIds = sections.map((section) => section.id || section.getAttribute('data-section-title'));

  const buildMarker = (section) => {
    if (!progressMarkersContainer) return;
    const label = section.dataset.sectionTitle || section.getAttribute('aria-label') || section.id || '';
    if (!label) return;
    const marker = doc.createElement('button');
    marker.type = 'button';
    marker.className = 'progress-marker';
    marker.textContent = label;
    marker.setAttribute('data-target', section.id ? `#${section.id}` : '');
    marker.addEventListener('click', () => {
      const target = marker.getAttribute('data-target');
      if (target) {
        scrollToTarget(target);
      }
    });
    progressMarkersContainer.appendChild(marker);
  };

  sections.forEach(buildMarker);

  const progressMarkers = Array.from(doc.querySelectorAll('.progress-marker'));

  const setActive = (targetId) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('data-scroll-to') === `#${targetId}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });

    progressMarkers.forEach((marker) => {
      if (marker.getAttribute('data-target') === `#${targetId}`) {
        marker.classList.add('is-active');
      } else {
        marker.classList.remove('is-active');
      }
    });
  };

  if (sectionIds.length && progressFill) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = doc.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      progressFill.style.height = `${progress * 100}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id || entry.target.getAttribute('data-section-title');
          if (id) {
            setActive(id.replace('#', ''));
          }
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));

  const preloader = doc.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('preloader--done');
      setTimeout(() => preloader.remove(), 600);
    }
  });

  const yearEl = doc.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const form = doc.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.reset();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = isRTL
          ? 'شكرًا لتواصلكم! سنعود إليكم خلال يومي عمل.'
          : 'Thank you! A coordinator will reach out within two working days.';
      }
    });
  }
})();
