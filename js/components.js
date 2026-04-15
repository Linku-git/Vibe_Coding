/*  components.js — Shared HTML templates for nav and footer
    All paths are relative, adjusted based on page depth.  */

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '..' : '.';
}

function getNav(activePage) {
  const base = getBasePath();
  const pages = [
    { id: 'guide', label: 'Guide', href: `${base}/index.html` },
    { id: 'modules', label: 'Modules', href: `${base}/pages/modules.html` },
    { id: 'prompts', label: 'Prompts', href: `${base}/pages/prompts.html` },
    { id: 'setup', label: 'Setup Guides', href: `${base}/pages/setup-guides.html` },
    { id: 'resources', label: 'Resources', href: `${base}/pages/resources.html` },
  ];

  const links = pages
    .map(p => `<li><a href="${p.href}"${p.id === activePage ? ' class="active"' : ''}>${p.label}</a></li>`)
    .join('\n      ');

  return `
<nav class="top-nav" id="main-nav">
  <div class="nav-inner">
    <a href="${base}/index.html" class="nav-logo">
      <span class="logo-icon">&#9889;</span> Vibe Coding
    </a>
    <button class="nav-toggle-btn" id="nav-toggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="nav-links">
      ${links}
      <li><button class="theme-toggle" id="theme-toggle" title="Toggle light/dark mode">&#9790;</button></li>
    </ul>
  </div>
</nav>`;
}

function getFooter() {
  return `
<footer class="footer">
  <div class="container">
    <p>Vibe Coding Process &middot; Full-Stack Development &middot; AI-Powered Workflow</p>
    <p class="footer-sub">Built for learning AI-assisted development with Claude Code, Codex, and Antigravity.</p>
  </div>
</footer>`;
}

function getModuleNav(currentNum, totalModules) {
  const base = getBasePath();
  const prev = currentNum > 1
    ? `<a href="${base}/pages/module-${String(currentNum - 1).padStart(2, '0')}.html" class="btn btn-ghost">&larr; Module ${String(currentNum - 1).padStart(2, '0')}</a>`
    : `<a href="${base}/pages/modules.html" class="btn btn-ghost">&larr; All Modules</a>`;
  const next = currentNum < totalModules
    ? `<a href="${base}/pages/module-${String(currentNum + 1).padStart(2, '0')}.html" class="btn btn-primary">Module ${String(currentNum + 1).padStart(2, '0')} &rarr;</a>`
    : `<a href="${base}/pages/modules.html" class="btn btn-primary">All Modules &rarr;</a>`;

  return `
<div class="module-pagination">
  ${prev}
  ${next}
</div>`;
}
