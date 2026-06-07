/* =====================================================
   SMWOA Website JavaScript
   Loads shared header/footer and handles mobile nav
   ===================================================== */

const includeHTML = async (selector, file) => {
  const element = document.querySelector(selector);

  if (!element) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Could not load ${file}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
};

const setCurrentYear = () => {
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

const setupMobileNav = () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    });
  });
};

const setActiveNavLink = () => {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/index\.html$/, "/");

    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });
};

const initSite = async () => {
  await includeHTML("#site-header", "/includes/header.html");
  await includeHTML("#site-footer", "/includes/footer.html");

  setupMobileNav();
  setActiveNavLink();
  setCurrentYear();
};

document.addEventListener("DOMContentLoaded", initSite);