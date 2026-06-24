(function () {
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    if (!window.matchMedia('(min-width: 1280px)').matches) return;

    var wrapper = document.querySelector('.col-droite, .proj-col-droite');
    if (!wrapper || !wrapper.firstElementChild) return;

    var lenis = new Lenis({
      wrapper: wrapper,
      content: wrapper.firstElementChild,
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Lenis + ScrollTrigger partagent le même ticker GSAP
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);
    } else {
      (function loop(time) { lenis.raf(time); requestAnimationFrame(loop); })(0);
    }

    window.__lenis = lenis;
    window.__lenisWrapper = wrapper;
  }

  window.__smoothScroll = { init: initLenis };
  document.addEventListener('DOMContentLoaded', initLenis);
})();
