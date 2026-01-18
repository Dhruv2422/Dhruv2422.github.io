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

window.addEventListener("load", () => {
 const loader = document.getElementById("loader");
 if (!loader) return;
 loader.style.opacity = "0";
 setTimeout(() => loader.remove(), 350);
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

// Ensure projects section is visible on page load (fix for mobile opacity issue)
const projectsSection = document.getElementById("projects");
if (projectsSection) {
  projectsSection.classList.add("visible");
}

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
 const filterButtons = document.querySelectorAll(".filter-btn");
 const projects = document.querySelectorAll(".project");
 if (!filterButtons.length || !projects.length) return;
 // Initialize: Show all projects and set 'All' button as active
 projects.forEach((project) => {
 project.style.display = "block";
 });
 const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
 if (allBtn) {
 allBtn.classList.add("active");
 }
 filterButtons.forEach((btn) => {
 btn.addEventListener("click", () => {
 const filter = btn.getAttribute("data-filter");
 filterButtons.forEach((b) => b.classList.remove("active"));
 btn.classList.add("active");
 projects.forEach((project) => {
 const categories = project.getAttribute("data-category") || "";
 if (
 filter === "all" ||
 categories.split(" ").includes(filter)
 ) {
 project.style.display = "block";
 } else {
 project.style.display = "none";
 }
 });
 });
 });
});

// FIXED TYPING ANIMATION
document.addEventListener("DOMContentLoaded", () => {
 if (window.Typed) {
 new Typed(".typing", {
 strings: [
 "AI/ML Engineer", 
 "Data Engineer", 
 "Machine Learning Specialist"
 ],
 loop: true,
 typeSpeed: 80,
 backSpeed: 40,
 backDelay: 2000,
 smartBackspace: true,
 showCursor: true,
 cursorChar: "|",
 autoInsertCss: true
 });
 }
});

