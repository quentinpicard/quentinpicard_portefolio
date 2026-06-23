# Liaison Figma ↔ Dev — Portfolio (HTML / CSS / JS + GSAP + Rive)

README AI-readable. À lire **avant tout développement**. Source de vérité = le DS Figma.

- Fichier : `MhlZePLOBMnB7lOvvbnKzU` · Page DS : `105:347`
- Stack : HTML/CSS/JS vanilla. Animations : **GSAP**. Boutons : **Rive (`.riv`)**.
- Règle absolue : **jamais de valeur hardcodée**, toujours `var(--token-*)`.

---

## 1. Mapping Figma → CSS custom properties

Convention : variable Figma `categorie/nom` → CSS `--categorie-nom` (slash → tiret).

```css
:root{
  /* Couleurs */
  --color-cream:#F2EFE8;
  --color-blue:#384BD6;
  --color-blue-deep:#2838AD;   /* réf. Rive uniquement */
  --color-ink:#202020;
  --color-black:#101010;

  /* Radius */
  --radius-sm:12px;
  --radius-md:14px;
  --radius-lg:16px;
  --radius-xl:22px;

  /* Bordures */
  --border-thin:4px;
  --border-thick:6px;

  /* Espacement */
  --space-8:8px;
  --space-12:12px;
  --space-16:16px;
  --space-24:24px;
  --space-32:32px;
  --space-64:64px;

  /* Typo */
  --font-display:"Archivo Black", sans-serif;
  --font-body:"Archivo", sans-serif;
  --text-xl:56px;
  --text-l:24px;
  --text-m:22px;
  --text-s:20px;
  --text-label:16px;
  --text-body:16px;
  --tracking-display:-0.08em;
  --tracking-xl:-0.06em;
  --leading-tight:0.9;
  --leading-snug:1.2;

  /* Ombre */
  --shadow-hard:0 6px 0 0 var(--color-black);
}
```

---

## 2. Text styles → classes utilitaires

```css
.display-xl{ font-family:var(--font-display); font-size:var(--text-xl); letter-spacing:var(--tracking-xl); line-height:var(--leading-tight); text-transform:uppercase; }
.display-l { font-family:var(--font-display); font-size:var(--text-l); letter-spacing:var(--tracking-display); text-transform:uppercase; }
.display-m { font-family:var(--font-display); font-size:var(--text-m); letter-spacing:var(--tracking-display); text-transform:uppercase; }
.display-s { font-family:var(--font-display); font-size:var(--text-s); line-height:var(--leading-snug); }
.label     { font-family:var(--font-display); font-size:var(--text-label); letter-spacing:var(--tracking-display); text-transform:uppercase; }
.body      { font-family:var(--font-body); font-size:var(--text-body); line-height:var(--leading-snug); }
.meta      { font-family:var(--font-body); font-size:var(--text-body); line-height:var(--leading-tight); }
```

---

## 3. Composants → recette code

| Composant Figma | Node | Rendu | Tokens clés |
|---|---|---|---|
| `Tag` (Filled) | `112:487` | `<span class="tag tag--filled label">` | bg `--color-blue`, border `--border-thin` `--color-ink`, radius `--radius-md`, pad `--space-12`/`--space-8` |
| `Tag` (Outline) | `112:489` | `<span class="tag tag--outline label">` | bg `--color-cream`, idem bordure/radius/pad |
| `Carte process` | `112:492` | `<article class="card-process">` | bg `--color-cream`, border `--border-thin`, radius `--radius-lg`, gap/pad `--space-8`/`--space-12`. Enfants : `.visuel` (bg `--color-ink`, radius `--radius-lg`) + `.display-s` + `.body` |
| `Ligne expérience` | `112:496` | `<li class="exp-row">` flex space-between | bg `--color-cream`, border `--border-thin`, radius `--radius-md`, pad `--space-16`. `.display-l` (entreprise) + `.body` (période) |
| `Carte projet` | `3:850` | `<a class="card-project">` | tokens liés dans Figma. Hover = GSAP (cf. §5) |
| `Icônes` | `12:93` | `<svg>` inline, `fill:var(--color-ink)` | export SVG depuis Figma |

Squelettes :

```html
<!-- Tag -->
<span class="tag tag--filled label">UX.UI</span>

<!-- Carte process -->
<article class="card-process">
  <div class="visuel"></div>
  <h3 class="display-s">Recherche &amp; Comprendre</h3>
  <p class="body">…</p>
</article>

<!-- Ligne expérience -->
<li class="exp-row">
  <span class="display-l">LIMEO</span>
  <span class="body">2024 — En cours</span>
</li>
```

```css
.tag{ display:inline-flex; align-items:center; border:var(--border-thin) solid var(--color-ink);
      border-radius:var(--radius-md); padding:var(--space-8) var(--space-12); }
.tag--filled{ background:var(--color-blue); color:var(--color-cream); }
.tag--outline{ background:var(--color-cream); color:var(--color-ink); }

.card-process{ display:flex; flex-direction:column; gap:var(--space-8);
  background:var(--color-cream); border:var(--border-thin) solid var(--color-ink);
  border-radius:var(--radius-lg); padding:var(--space-12); }
.card-process .visuel{ aspect-ratio:auto; height:175px; background:var(--color-ink);
  border:var(--border-thin) solid var(--color-ink); border-radius:var(--radius-lg); }

.exp-row{ display:flex; align-items:center; justify-content:space-between;
  background:var(--color-cream); border:var(--border-thin) solid var(--color-ink);
  border-radius:var(--radius-md); padding:var(--space-16); list-style:none; }
```

---

## 4. Boutons — Rive (`.riv`)

Les boutons ne sont **pas** codés en HTML/CSS : ce sont des artefacts `.riv` intégrés via le runtime Rive.

### Liaison composant Figma → fichier `.riv`
| Fichier `.riv` | Composant Figma | Node | Contenu / usage |
|---|---|---|---|
| `portefolio_btn.riv` | `Bouton` variant **primary** | `9:942` | Bouton plein bleu (ex. « À propos »). Face `--color-blue` / base `--color-blue-deep` |
| `portefolio_btn_contact.riv` | `Bouton` variant **secondary** | `9:942` | Boutons contact pleine largeur (E-mail / LinkedIn / View CV). Face `--color-ink` / base `--color-black`, bordure `--color-blue` |
| `icons btn.riv` | `Bouton réseau social` + flèches carousel | `9:970`, `12:93` | Boutons à icône : réseaux sociaux (Insta / GitHub / LinkedIn) **et** navigation gauche / droite. L'icône change via le View Model |
| *(à définir)* | `Bouton retour` | `35:1731` | Non couvert par les 3 fichiers ci-dessus. Option recommandée : le coder en **CSS pur** (il utilise `--shadow-hard`, reproductible sans Rive) |

> Note 1 — le composant Figma `Bouton` (`9:942`) est découpé en **2 fichiers `.riv`** (primary → `portefolio_btn`, secondary → `portefolio_btn_contact`).
> Note 2 — `icons btn.riv` contient un **espace** dans le nom → en chemin web il devra être encodé (`icons%20btn.riv`). Plus sûr de le renommer **`icons_btn.riv`** pour rester cohérent avec les deux autres (underscore).

### Recette de l'effet *chunky*
Structure 2 couches : **face** (dessus) + **base** plus foncée qui dépasse en bas.
- repos : décalage base = 6px
- hover : 6px → légère montée
- press : la face descend (l'écart se réduit) → effet « enfoncé »

À reproduire dans la **timeline Rive**, pas en CSS.

### Inputs State Machine (convention)
- `isHover` (bool) — entrée/sortie souris
- `isPressed` (bool) — pointer down/up

> `portefolio_btn` et `portefolio_btn_contact` étant 2 fichiers séparés, pas besoin d'input `theme` pour basculer primary/secondary. Pour `icons btn`, prévoir à la place un input/View Model qui sélectionne l'icône (instagram / github / linkedin / arrow_back / arrow_forward).

### View Model (data binding)
- `label` (string) — texte du bouton
- couleurs mappées sur les tokens : face = `--color-blue` / base = `--color-blue-deep` (primary) · face = `--color-ink` / base = `--color-black`, bordure `--color-blue` (secondary)

### Intégration JS
```html
<canvas id="btn-apropos" width="272" height="56"></canvas>
<script type="module">
  import { Rive } from "https://unpkg.com/@rive-app/canvas";
  const r = new Rive({
    src: "/rive/portefolio_btn.riv",
    canvas: document.getElementById("btn-apropos"),
    stateMachines: "Button SM",
    autoplay: true,
    onLoad: () => {
      const vmi = r.viewModelInstance;             // View Model
      vmi.string("label").value = "À propos";
      r.resizeDrawingSurfaceToCanvas();
    }
  });
  // les inputs isHover/isPressed sont pilotés par les events souris du canvas
  // boutons contact → même logique avec src: "/rive/portefolio_btn_contact.riv"
</script>
```

> ⚠️ Synchroniser les hex dans le `.riv` avec les tokens. Si un token couleur change, le `.riv` doit être ré-exporté (Rive ne lit pas le CSS).

---

## 5. GSAP — points d'usage

Pas de tokens de motion (choix assumé) → réglages ad hoc. Zones d'application :
- **Reveal au scroll** : tags, cartes process, lignes expérience (stagger).
- **Hover cartes bento** (`Carte projet`) : léger scale/translate.
- **Carousel projet** : transition entre slides (cf. flèches `arrow_back`/`arrow_forward` du composant `Icônes`).

---

## 6. Règles de dev

1. Aucune valeur hardcodée → uniquement `var(--token-*)`.
2. `box-shadow` réservé à `--shadow-hard` (bouton retour). L'effet bouton chunky = Rive, pas une ombre.
3. Tout uppercase passe par `text-transform`, pas par du texte en capitales en dur.
4. Un nouveau composant doit d'abord exister dans le DS Figma + être relié aux variables avant d'être codé.
5. Si un token manque côté Figma → le créer dans la collection `Tokens`, pas une valeur en dur dans le CSS.
