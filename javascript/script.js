document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const revealItems = [...document.querySelectorAll(".reveal")];
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const projectCards = [...document.querySelectorAll(".project-card")];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const canObserve = "IntersectionObserver" in window;

  const closeMenu = () => {
    if (window.innerWidth <= 920 && sidebar && menuToggle) {
      sidebar.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${id}`
      );
    });
  };

  const hideLoader = () => {
    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    window.setTimeout(() => {
      loader.style.display = "none";
    }, 320);
  };

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!sidebar || !menuToggle || window.innerWidth > 920) return;

    const clickedSidebar = sidebar.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedSidebar && !clickedMenuButton) {
      closeMenu();
    }
  });

  projectCards.forEach((card) => {
    card.style.transition =
      "opacity 0.2s ease, transform 0.2s ease, box-shadow 0.22s ease";
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");

        const shouldShow =
          selectedFilter === "all" ||
          categories.includes(selectedFilter);

        if (shouldShow) {
          card.style.display = "flex";

          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";

          window.setTimeout(() => {
            const activeFilter =
              document.querySelector(".filter-btn.active")?.dataset.filter ||
              "all";

            const currentCategories = (
              card.dataset.category || ""
            ).split(" ");

            if (
              activeFilter !== "all" &&
              !currentCategories.includes(activeFilter)
            ) {
              card.style.display = "none";
            }
          }, 180);
        }
      });
    });
  });

  const showAllRevealItems = () => {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  };

  /*
    Reveal animation runs only on desktop.
    Mobile always displays content, including Projects.
  */
  if (!reducedMotion && canObserve && window.innerWidth > 920) {
    document.documentElement.classList.add("js-animations");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    showAllRevealItems();
  }

  if (canObserve && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (!visibleSections.length) return;

        const currentSection = visibleSections.reduce((best, entry) => {
          return entry.intersectionRatio > best.intersectionRatio
            ? entry
            : best;
        });

        setActiveNav(currentSection.target.id);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920 && sidebar && menuToggle) {
      sidebar.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  if (sections.length) {
    setActiveNav(sections[0].id);
  }
});
