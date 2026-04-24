document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 920 && sidebar) {
      sidebar.classList.remove('show');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  };

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  };

  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 320);
    });
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeSidebarOnMobile();
    });
  });

  document.addEventListener('click', (event) => {
    if (!sidebar || !menuToggle) return;
    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideSidebar && !clickedToggle && window.innerWidth <= 920) {
      sidebar.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (!prefersReducedMotion) revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealItems.forEach((item) => {
    if (prefersReducedMotion) {
      item.classList.add('visible');
    } else {
      revealObserver.observe(item);
    }
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);
      if (!visibleSections.length) return;

      const mostVisible = visibleSections.reduce((best, current) => {
        return current.intersectionRatio > best.intersectionRatio ? current : best;
      });

      setActiveNav(mostVisible.target.id);
    },
    {
      rootMargin: '-25% 0px -55% 0px',
      threshold: [0.2, 0.35, 0.5, 0.7]
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        const shouldShow = selectedFilter === 'all' || categories.includes(selectedFilter);

        if (shouldShow) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 180);
        }
      });
    });
  });

  projectCards.forEach((card) => {
    card.style.transition = 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.22s ease';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920 && sidebar && menuToggle) {
      sidebar.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  if (sections.length) {
    setActiveNav(sections[0].id);
  }
});
