
function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("show");
}

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

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

            const sidebar = document.querySelector(".sidebar");
            if (window.innerWidth <= 960 && sidebar.classList.contains("show")) {
                sidebar.classList.remove("show");
            }
        });
    });
});

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

document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
});

const revealElements = document.querySelectorAll(
    "section, .card, .project, .extra, .language-box, .course a, .resume-item"
);
revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16 }
);

revealElements.forEach((el) => revealObserver.observe(el));

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

    const closeBtn = document.querySelector(".lightbox .close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.style.display === "flex") {
            lightbox.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.Typed) {
        new Typed(".typing", {
            strings: ["Tech Enthusiast", "Developer", "Digital Innovator"],
            loop: true,
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
        });
    }
});
