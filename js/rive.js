const riveGlobal = window.rive || window.Rive || window.rive?.default || {};
const Rive = riveGlobal.Rive || riveGlobal;
const Fit = riveGlobal.Fit || { Fill: 'fill' };
const Alignment = riveGlobal.Alignment || { Center: 'center' };
const Layout = riveGlobal.Layout || null;

if (!Rive) {
  throw new Error('Rive runtime not found. Make sure the CDN script is loaded before js/rive.js.');
}

const buttonConfigs = [
  { selector: '#btn-apropos',          src: 'rive/portefolio_btn.riv' },
  { selector: '#btn-instagram',         src: 'rive/icons_btn.riv' },
  { selector: '#btn-github',            src: 'rive/icons_btn.riv' },
  // Page Profil — boutons contact (portefolio_btn_contact.riv)
  { selector: '#btn-email',             src: 'rive/portefolio_btn_contact.riv', label: 'E-mail' },
  { selector: '#btn-contact-linkedin',  src: 'rive/portefolio_btn_contact.riv', label: 'Linkedin' },
  { selector: '#btn-viewcv',            src: 'rive/portefolio_btn_contact.riv', label: 'View CV' },
];

const iconsArtboards = new Set(['instagram', 'github', 'left_arrow', 'right_arrow']);

function resolveIconArtboard(name) {
  if (iconsArtboards.has(name)) {
    return name;
  }
  console.warn(`Rive icons_btn.riv: artboard '${name}' not found. This button will be hidden.`);
  return null;
}

function createRiveInstance(canvas, src, options = {}) {
  if (!canvas) return;
  const { label, ...riveOptions } = options;

  try {
    const layoutOptions = Layout
      ? new Layout({ fit: Fit.Fill, alignment: Alignment.Center })
      : { fit: Fit.Fill, alignment: Alignment.Center };

    const dpr = window.devicePixelRatio || 1;
    const resize = (r) => {
      if (r && typeof r.resizeDrawingSurfaceToCanvas === 'function') {
        r.resizeDrawingSurfaceToCanvas(dpr);
      }
    };

    const riveInst = new Rive({
      src,
      canvas,
      autoplay: true,
      layout: layoutOptions,
      onLoad: () => {
        if (label) {
          try {
            const vmi = riveInst.viewModelInstance;
            if (vmi) vmi.string('label').value = label;
          } catch (e) {
            // View Model indisponible — le texte du .riv reste tel quel
          }
        }
        resize(riveInst);
      },
      ...riveOptions,
    });

    resize(riveInst);
    return riveInst;
  } catch (error) {
    console.error('Rive initialization failed for', canvas.id, error);
    return null;
  }
}

function initRiveButtons() {
  buttonConfigs.forEach(({ selector, src, label }) => {
    const canvas = document.querySelector(selector);
    if (!canvas) return;

    const canvasWrapper = canvas.closest('.btn-canvas-wrapper');
    const dataIcon = canvas.dataset.icon;
    const options = label ? { label } : {};

    if (src.endsWith('icons_btn.riv') && dataIcon) {
      const artboard = resolveIconArtboard(dataIcon);
      if (!artboard) {
        if (canvasWrapper) canvasWrapper.style.display = 'none';
        return;
      }
      options.artboard = artboard;
    } else if (dataIcon) {
      options.artboard = dataIcon;
    }

    createRiveInstance(canvas, src, options);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRiveButtons);
} else {
  initRiveButtons();
}
