const riveGlobal = window.rive || window.Rive || window.rive?.default || {};
const Rive = riveGlobal.Rive || riveGlobal;
const Fit = riveGlobal.Fit || { Fill: 'fill' };
const Alignment = riveGlobal.Alignment || { Center: 'center' };
const Layout = riveGlobal.Layout || null;

if (!Rive) {
  throw new Error('Rive runtime not found. Make sure the CDN script is loaded before js/rive.js.');
}

const buttonConfigs = [
  { selector: '#btn-apropos', src: 'rive/portefolio_btn.riv' },
  { selector: '#btn-instagram', src: 'rive/icons_btn.riv' },
  { selector: '#btn-github', src: 'rive/icons_btn.riv' },
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
  try {
    const layoutOptions = Layout
      ? new Layout({ fit: Fit.Fill, alignment: Alignment.Center })
      : { fit: Fit.Fill, alignment: Alignment.Center };

    const rive = new Rive({
      src,
      canvas,
      autoplay: true,
      layout: layoutOptions,
      ...options,
    });

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      if (typeof rive.resizeDrawingSurfaceToCanvas === 'function') {
        rive.resizeDrawingSurfaceToCanvas(dpr);
      }
    };

    resize();
    if (typeof rive.on === 'function') {
      rive.on('load', resize);
    }

    return rive;
  } catch (error) {
    console.error('Rive initialization failed for', canvas.id, error);
    return null;
  }
}

function initRiveButtons() {
  buttonConfigs.forEach(({ selector, src }) => {
    const canvas = document.querySelector(selector);
    if (!canvas) return;

    const canvasWrapper = canvas.closest('.btn-canvas-wrapper');
    const dataIcon = canvas.dataset.icon;
    let config = {};

    if (src.endsWith('icons_btn.riv') && dataIcon) {
      const artboard = resolveIconArtboard(dataIcon);
      if (!artboard) {
        if (canvasWrapper) {
          canvasWrapper.style.display = 'none';
        }
        return;
      }
      config = { artboard };
    } else if (dataIcon) {
      config = { artboard: dataIcon };
    }

    createRiveInstance(canvas, src, config);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRiveButtons);
} else {
  initRiveButtons();
}
