// js/projects.js — rendu dynamique de la page projet depuis ?slug=

const SVG_PREV = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M15 18L9 12L15 6" stroke="#F2EFE8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const SVG_NEXT = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M9 18L15 12L9 6" stroke="#F2EFE8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function navBtn(id, svg, label) {
  return `<button class="btn-nav" id="${id}" aria-label="${label}">
    <span class="btn-nav__face">${svg}</span>
  </button>`;
}

function buildLeftCol(project) {
  const tags = project.tags
    .map(t => `<span class="tag tag--filled label">${t}</span>`)
    .join('');

  const tools = project.tools
    .map(t => `<div class="carte-outil">${t}</div>`)
    .join('');

  const links = project.links
    .map(l => `<a href="${l.url || '#'}" class="btn-chunky"${l.url ? ' target="_blank" rel="noopener"' : ' aria-disabled="true"'}>
      <span class="btn-chunky__face">${l.label}</span>
    </a>`)
    .join('');

  return `
    <aside class="proj-col-gauche">

      <section class="proj-bloc-hero">
        <div class="proj-entete">
          <a href="index.html" class="btn-retour label">Retour</a>
          <div class="proj-nav-inline">
            ${navBtn('btn-prev-h', SVG_PREV, 'Projet précédent')}
            ${navBtn('btn-next-h', SVG_NEXT, 'Projet suivant')}
          </div>
        </div>

        <div class="proj-hero-entete">
          <div class="liste-tags">${tags}</div>
          <h1 class="proj-titre">${project.title}</h1>
        </div>

        <p class="body">${project.intro}</p>

        <div class="proj-actions">${links}</div>
      </section>

      <section class="bloc-outils">
        <span class="meta">Outils</span>
        <div class="grille-outils">${tools}</div>
      </section>

      <div class="proj-nav-bottom">
        ${navBtn('btn-prev-f', SVG_PREV, 'Projet précédent')}
        ${navBtn('btn-next-f', SVG_NEXT, 'Projet suivant')}
      </div>

    </aside>`;
}

function buildBlock(block) {
  if (block.type === 'text') {
    return `<p class="proj-texte">${block.text}</p>`;
  }

  if (block.type === 'media') {
    if (block.layout === 'hero') {
      return `<div class="proj-img-hero">
        <img src="${block.images[0]}" alt="" loading="lazy">
      </div>`;
    }

    const cells = block.images
      .map(src => `<div class="proj-img-wrap">
          <img src="${src}" alt="" loading="lazy">
        </div>`)
      .join('');

    return `<div class="proj-galerie proj-galerie--${block.layout}">
      ${cells}
    </div>`;
  }

  return '';
}

function buildRightCol(project) {
  const blocks = project.blocks.map(buildBlock).join('\n');
  return `<main class="proj-col-droite" id="proj-col-droite">${blocks}</main>`;
}

function attachNavHandlers(prevSlug, nextSlug) {
  const go = slug => {
    const dest = `projet.html?slug=${slug}`;
    if (window.__transitions) { window.__transitions.playExit(dest); }
    else { window.location.href = dest; }
  };
  ['h', 'f'].forEach(suffix => {
    document.getElementById(`btn-prev-${suffix}`)?.addEventListener('click', () => go(prevSlug));
    document.getElementById(`btn-next-${suffix}`)?.addEventListener('click', () => go(nextSlug));
  });
}

async function init() {
  const slug = new URLSearchParams(window.location.search).get('slug') || 'growup';

  let data;
  try {
    const res = await fetch('data/projects.json');
    data = await res.json();
  } catch {
    document.getElementById('proj-page').innerHTML =
      `<p style="padding:64px;font-family:sans-serif">Erreur : impossible de charger les projets.<br>Ouvre la page via un serveur local (ex&nbsp;: <code>npx serve</code>).</p>`;
    return;
  }

  const project = data.projects[slug];
  if (!project) { window.location.href = 'index.html'; return; }

  const order = data.order;
  const idx = order.indexOf(slug);
  const prevSlug = order[(idx - 1 + order.length) % order.length];
  const nextSlug = order[(idx + 1) % order.length];

  document.title = `Quentin Picard — ${project.title}`;

  document.getElementById('proj-page').innerHTML =
    buildLeftCol(project) + buildRightCol(project);

  if (window.__transitions) {
    const left = document.querySelector('.proj-col-gauche');
    const right = document.querySelector('.proj-col-droite');
    window.__transitions.enterDynamic(left, right);
  }

  attachNavHandlers(prevSlug, nextSlug);
  initLightbox();
}

function initLightbox() {
  const SVG_CLOSE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="#F2EFE8" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Image agrandie');
  lb.innerHTML = `
    <button class="lightbox__close btn-nav" aria-label="Fermer">
      <span class="btn-nav__face">${SVG_CLOSE}</span>
    </button>
    <img class="lightbox__img" src="" alt="">
  `;
  document.body.appendChild(lb);

  const img = lb.querySelector('.lightbox__img');

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.querySelectorAll('.proj-img-wrap img, .proj-img-hero img').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => open(el.src, el.alt));
  });
}

init();
