// Menu Toggle Functionality
function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("show");
}

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".menu-toggle");
    if (!sidebar || !toggle) return;
    if (
        sidebar.classList.contains("show") &&
        !sidebar.contains(e.target) &&
        e.target !== toggle
    ) {
        sidebar.classList.remove("show");
    }
});

// Loader - Hide on page load
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 350);
});

// Smooth Scrolling for Navigation Links
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            
            // Close sidebar on mobile after clicking
            const sidebar = document.querySelector(".sidebar");
            if (window.innerWidth <= 960 && sidebar.classList.contains("show")) {
                sidebar.classList.remove("show");
            }
        });
    });
});

// Section Observer for Active Navigation Highlighting
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            if (!id) return;
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (!link) return;
            if (entry.isIntersecting) {
                document
                    .querySelectorAll(".nav-links a")
                    .forEach((a) => a.classList.remove("active"));
                link.classList.add("active");
            }
        });
    },
    {
        threshold: 0.4,
    }
);

// Observe all sections for navigation highlighting
document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
});

// Reveal Animation Elements
const revealElements = document.querySelectorAll(
    "section, .card, .project, .extra, .language-box, .course a, .resume-item"
);
revealElements.forEach((el) => el.classList.add("reveal"));

// Intersection Observer for Reveal Animation with Mobile Fix
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { 
        threshold: window.innerWidth <= 600 ? 0.05 : 0.16,
        rootMargin: '0px 0px -50px 0px'
    }
);

// Observe reveal elements
revealElements.forEach((el) => revealObserver.observe(el));

// Mobile Fallback - Force reveal if observer doesn't trigger
if (window.innerWidth <= 600) {
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 500);
}

// Additional mobile check on scroll for projects specifically
if (window.innerWidth <= 600) {
    window.addEventListener('scroll', () => {
        const projects = document.querySelectorAll('.project.reveal');
        projects.forEach(project => {
            const rect = project.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !project.classList.contains('visible')) {
                project.classList.add('visible');
            }
        });
    });
}

// Lightbox Functionality for Project Images
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");

if (lightbox && lightboxImg && captionText) {
    const images = document.querySelectorAll(
        ".project-img, .crime-project-img"
    );

    images.forEach((img) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            captionText.textContent = img.alt || "";
        });
    });

    // Close button
    const closeBtn = document.querySelector(".lightbox .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    // Close on clicking outside image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.style.display === "flex") {
            lightbox.style.display = "none";
        }
    });
}

// Project Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");
    
    if (!filterButtons.length || !projects.length) return;

    // Ensure all projects are visible by default on page load
    projects.forEach((project) => {
        project.style.display = "block";
    });

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");
            
            // Update active button
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Filter projects
            projects.forEach((project) => {
                const categories = project.getAttribute("data-category") || "";
                if (filter === "all" || categories.split(" ").includes(filter)) {
                    project.style.display = "block";
                    // Force visibility on mobile
                    if (window.innerWidth <= 600) {
                        project.classList.add("visible");
                    }
                } else {
                    project.style.display = "none";
                }
            });
        });
    });
});

// Typed.js Initialization for Hero Section
document.addEventListener("DOMContentLoaded", () => {
    if (window.Typed && document.querySelector(".typing")) {
        new Typed(".typing", {
            strings: ["Tech Enthusiast", "Developer", "Digital Innovator"],
            loop: true,
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            smartBackspace: true
        });
    }
});

// Ensure projects are visible after page fully loads (final failsafe)
window.addEventListener('load', () => {
    if (window.innerWidth <= 600) {
        setTimeout(() => {
            const projects = document.querySelectorAll('.project');
            projects.forEach(project => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
                project.classList.add('visible');
            });
        }, 300);
    }
});

// Handle window resize - reset reveal animations if needed
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 600) {
            // Force all projects visible on mobile after resize
            document.querySelectorAll('.project').forEach(project => {
                project.classList.add('visible');
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            });
        }
    }, 250);
});

// Force visibility check on DOM content loaded (extra safety)
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 600) {
        setTimeout(() => {
            const projectSection = document.getElementById('projects');
            if (projectSection) {
                const allProjects = projectSection.querySelectorAll('.project');
                allProjects.forEach(project => {
                    project.style.display = 'block';
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                    project.classList.add('visible');
                });
            }
        }, 100);
    }
});

// Debug helper - Log project visibility on mobile (remove in production)
if (window.innerWidth <= 600) {
    setTimeout(() => {
        const projects = document.querySelectorAll('.project');
        console.log(`Total projects found: ${projects.length}`);
        projects.forEach((project, index) => {
            const styles = window.getComputedStyle(project);
            console.log(`Project ${index + 1}:`, {
                display: styles.display,
                opacity: styles.opacity,
                transform: styles.transform,
                visible: project.classList.contains('visible')
            });
        });
    }, 1000);
}
