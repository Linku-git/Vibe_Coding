/*  app.js — Main application logic
    Theme toggle, mobile nav, accordions, smooth scroll  */

/* ========== THEME ========== */
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  // Defer button setup until nav is injected
  setTimeout(() => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    updateThemeIcon(btn);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(btn);
    });
  }, 0);
}

function updateThemeIcon(btn) {
  const theme = document.documentElement.getAttribute('data-theme');
  btn.textContent = theme === 'light' ? '\u2600' : '\u263E';
}

/* ========== NAVIGATION ========== */
function initNav(activePage) {
  const container = document.getElementById('nav-container');
  if (!container) return;
  container.innerHTML = getNav(activePage);

  // Mobile hamburger toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav-open');
      toggle.classList.toggle('nav-active');
    });
    // Close menu on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('nav-open');
        toggle.classList.remove('nav-active');
      });
    });
  }
}

/* ========== FOOTER ========== */
function initFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;
  container.innerHTML = getFooter();
}

/* ========== ACCORDIONS ========== */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('accordion-open');

      // Close all siblings (optional — remove these 3 lines for multi-open)
      // item.parentElement.querySelectorAll('.accordion-item').forEach(s => s.classList.remove('accordion-open'));

      if (isOpen) {
        item.classList.remove('accordion-open');
      } else {
        item.classList.add('accordion-open');
      }
    });
  });
}

/* ========== SMOOTH SCROLL ========== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ========== MODULE PAGINATION ========== */
function initModulePagination(currentNum, totalModules) {
  const container = document.getElementById('module-pagination');
  if (!container) return;
  container.innerHTML = getModuleNav(currentNum, totalModules || 11);
}

/* ========== INIT ========== */
function init(activePage, options = {}) {
  initTheme();
  initNav(activePage);
  initFooter();
  initAccordions();
  initSmoothScroll();
  if (options.moduleNum) {
    initModulePagination(options.moduleNum, options.totalModules);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Auto-detect page from data attribute on body
  const page = document.body.dataset.page || 'guide';
  const moduleNum = parseInt(document.body.dataset.moduleNum || '0', 10);
  init(page, { moduleNum, totalModules: 11 });
});
