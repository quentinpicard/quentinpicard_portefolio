(function () {
  function initScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (!window.matchMedia('(min-width: 1280px)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    var scroller = document.querySelector('.col-droite, .proj-col-droite');
    if (!scroller) return;

    function reveal(selector, skipFirst) {
      var els = gsap.utils.toArray(selector);
      if (skipFirst) els = els.slice(1);
      els.forEach(function (el) {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }

    // Page projet : blocs en colonne droite (le 1er est déjà révélé par l'animation de page)
    reveal('.proj-col-droite-inner > *', true);

    // Page profil : cartes process + lignes expérience
    reveal('.profil-process-grid article');
    reveal('.exp-row');
  }

  window.__scrollTrigger = { init: initScrollTrigger };
  document.addEventListener('DOMContentLoaded', initScrollTrigger);
})();
