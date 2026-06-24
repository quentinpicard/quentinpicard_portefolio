(function () {
  var EXIT_MS = 360;

  function playExit(dest) {
    document.body.classList.add('page-exiting');
    setTimeout(function () {
      window.location.href = dest;
    }, EXIT_MS);
  }

  function enterDynamic(leftEl, rightEl) {
    leftEl.classList.add('anim-enter-left');
    rightEl.classList.add('anim-enter-right');
  }

  function setupLinks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        href.startsWith('//') ||
        link.target === '_blank'
      ) return;
      e.preventDefault();
      playExit(href);
    });
  }

  window.__transitions = { enterDynamic: enterDynamic, playExit: playExit };

  document.addEventListener('DOMContentLoaded', setupLinks);
})();
