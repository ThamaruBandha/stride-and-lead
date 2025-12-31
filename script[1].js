// ===============================
// GLOBAL SCRIPT FOR STRIDE & LEAD
// ===============================



document.addEventListener("DOMContentLoaded", () => {
  setupKhoSidebarToggle();
  setupKhoTipsNav();
  setupActiveNavLink();
  setupFadeInOnScroll();
  setupScrollToTopButton();
  setupContactAlerts();
});

// -------------------------------
// 1. Kho Kho sidebar toggle
// -------------------------------
function setupKhoSidebarToggle() {
  const sidebar = document.querySelector(".kho-sidebar");
  const toggleBtn = document.querySelector(".kho-menu-toggle");

  if (!sidebar || !toggleBtn) return;

  toggleBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    sidebar.classList.toggle("open");
  });
}


// -------------------------------
// 2. Smooth scroll + section highlight
// -------------------------------
function setupKhoTipsNav() {
  const sideNav = document.querySelector(".kho-side-nav");
  if (!sideNav) return;

  sideNav.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;

    e.preventDefault();

    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    target.classList.add("highlight-section");
    setTimeout(() => {
      target.classList.remove("highlight-section");
    }, 1200);
  });
}

// -------------------------------
// 3. Auto-active navbar link
// -------------------------------
function setupActiveNavLink() {
  const nav = document.querySelector(".nav-list");
  if (!nav) return;

  const navLinks = nav.querySelectorAll("a");
  if (!navLinks.length) return;

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href.toLowerCase() === currentPage) {
      link.classList.add("active");
    }
  });
}


// -------------------------------
// 4. Fade-in animation on scroll
// -------------------------------
function setupFadeInOnScroll() {
  const elements = document.querySelectorAll(
    ".hero, .kho-hero-banner, .kho-photo-card, .kho-rules-block, .about-main-card, .about-portrait-frame, .highlight-card, .learn-section"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// -------------------------------
// 5. Scroll-to-top button
// -------------------------------
function setupScrollToTopButton() {
  const btn = document.createElement("button");
  btn.className = "scroll-top-btn";
  btn.textContent = "↑ Top";
  btn.setAttribute("aria-label", "Scroll to top");

  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -------------------------------
// 6. Footer contact alert
// -------------------------------
function setupContactAlerts() {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  footer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      alert("Thanks for reaching out! I’ll get back to you soon 😊");
    });
  });
}
