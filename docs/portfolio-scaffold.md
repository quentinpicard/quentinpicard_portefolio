# Scaffold — Portfolio (HTML / CSS / JS vanilla)

But : poser la **structure vide** du projet. La fondation CSS (tokens, typo, composants) est déjà prête — le reste est en squelette, à remplir **page par page** ensuite.

Ce fichier sert deux usages : le suivre à la main, **ou** le coller comme prompt dans Claude Code / un agent de vibecoding.

---

## 1. Arborescence cible

```
portfolio/
├── index.html              # Accueil        → SQUELETTE
├── profil.html             # Profil         → SQUELETTE
├── projet.html             # Template projet → SQUELETTE
├── css/
│   ├── tokens.css          # variables :root → PRÊT (ci-dessous)
│   ├── base.css            # reset + classes typo → PRÊT
│   ├── components.css      # .tag .card-process .exp-row → PRÊT
│   └── layout.css          # grilles + breakpoints → SQUELETTE
├── js/
│   ├── rive.js             # init boutons .riv → VIDE
│   ├── animations.js       # GSAP → VIDE
│   ├── projects.js         # rendu JSON → VIDE
│   └── carousel.js         # carousel projet → VIDE
├── data/
│   └── projects.json       # contenu des projets → SQUELETTE
├── rive/                   # bouton.riv, social.riv, retour.riv (à exporter)
├── icons/                  # SVG des icônes (export Figma)
└── img/
    └── projects/           # visuels par projet
```

**Légende :** PRÊT = contenu fourni plus bas, à coller. SQUELETTE = structure minimale + `TODO`. VIDE = fichier créé, vide (à coder plus tard).

---

## 2. Créer la structure vide (commande)

Optionnel mais pratique. Dans le dossier parent, en terminal :

```bash
mkdir -p portfolio/{css,js,data,rive,icons,img/projects}
cd portfolio
touch index.html profil.html projet.html
touch css/{tokens,base,components,layout}.css
touch js/{rive,animations,projects,carousel}.js
touch data/projects.json
```

Ensuite tu remplis chaque fichier avec les contenus ci-dessous.

---

## 3. Fichiers PRÊTS (à coller tels quels)

### `css/tokens.css`
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

### `css/base.css`
```css
*,*::before,*::after{ box-sizing:border-box; }
html,body{ margin:0; }
body{
  background:var(--color-cream);
  color:var(--color-ink);
  font-family:var(--font-body);
  font-size:var(--text-body);
  line-height:var(--leading-snug);
}
a{ color:inherit; text-decoration:none; }
ul{ list-style:none; padding:0; margin:0; }

/* Styles de texte (= text styles Figma) */
.display-xl{ font-family:var(--font-display); font-size:var(--text-xl); letter-spacing:var(--tracking-xl); line-height:var(--leading-tight); text-transform:uppercase; }
.display-l { font-family:var(--font-display); font-size:var(--text-l); letter-spacing:var(--tracking-display); text-transform:uppercase; }
.display-m { font-family:var(--font-display); font-size:var(--text-m); letter-spacing:var(--tracking-display); text-transform:uppercase; }
.display-s { font-family:var(--font-display); font-size:var(--text-s); line-height:var(--leading-snug); }
.label     { font-family:var(--font-display); font-size:var(--text-label); letter-spacing:var(--tracking-display); text-transform:uppercase; }
.body      { font-family:var(--font-body); font-size:var(--text-body); line-height:var(--leading-snug); }
.meta      { font-family:var(--font-body); font-size:var(--text-body); line-height:var(--leading-tight); }
```

### `css/components.css`
```css
/* Tag */
.tag{ display:inline-flex; align-items:center;
  border:var(--border-thin) solid var(--color-ink);
  border-radius:var(--radius-md);
  padding:var(--space-8) var(--space-12); }
.tag--filled{ background:var(--color-blue); color:var(--color-cream); }
.tag--outline{ background:var(--color-cream); color:var(--color-ink); }

/* Carte process */
.card-process{ display:flex; flex-direction:column; gap:var(--space-8);
  background:var(--color-cream);
  border:var(--border-thin) solid var(--color-ink);
  border-radius:var(--radius-lg);
  padding:var(--space-12); }
.card-process .visuel{ height:175px;
  background:var(--color-ink);
  border:var(--border-thin) solid var(--color-ink);
  border-radius:var(--radius-lg); }

/* Ligne expérience */
.exp-row{ display:flex; align-items:center; justify-content:space-between;
  background:var(--color-cream);
  border:var(--border-thin) solid var(--color-ink);
  border-radius:var(--radius-md);
  padding:var(--space-16); }

/* TODO : .card-project (bento), styles d'instances des boutons .riv (taille canvas) */
```

---

## 4. Fichiers SQUELETTE (structure minimale + TODO)

### `index.html` / `profil.html` / `projet.html`
Même tête de fichier pour les trois (adapter `<title>` et le `TODO`).

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quentin Picard — Accueil</title> <!-- Profil / Projet -->

  <!-- Polices : remplacer par ton service / fichiers locaux -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <!-- TODO : contenu de la page (colonne gauche + contenu droite) -->

  <!-- Scripts (à activer quand tu y arrives) -->
  <!-- <script type="module" src="js/rive.js"></script> -->
  <!-- <script type="module" src="js/animations.js"></script> -->
</body>
</html>
```

> Ordre des CSS volontaire : `tokens` → `base` → `layout` → `components`. Les tokens d'abord (tout en dépend), les composants en dernier (ils peuvent surcharger le layout).

### `css/layout.css`
```css
/* Grilles des blocs projet (mappées sur les layouts du JSON) */
.layout-hero{ /* TODO : 1 colonne, grande image */ }
.layout-trio{ /* TODO : 3 colonnes */ }
.layout-duo { /* TODO : 2 colonnes */ }

/* Bento Accueil */
.bento{ /* TODO : grille bento */ }

/* Breakpoints (calés sur Figma) — mobile-first : base = mobile 393 */
@media (min-width:768px){  /* Tablette  */ }
@media (min-width:1280px){ /* Laptop    */ }
@media (min-width:1440px){ /* Desktop   */ }
```

### `data/projects.json`
```json
{
  "growup": {
    "title": "GrowUp",
    "tag": "UX.UI",
    "intro": "TODO : phrase d'intro",
    "links": { "figma": "", "proto": "" },
    "blocks": [
      { "layout": "hero", "images": [], "text": "TODO" }
    ]
  }
}
```

---

## 5. Fichiers VIDES (créés, à coder plus tard)

Mettre juste un commentaire d'entête pour te rappeler le rôle :

```js
// js/rive.js — init des boutons .riv (Bouton, Bouton réseau social, Bouton retour)
// cf. figma-dev-mapping.md §4

// js/animations.js — GSAP : reveal au scroll, hover cartes bento, transition carousel
// cf. figma-dev-mapping.md §5

// js/projects.js — fetch data/projects.json + rendu bento (Accueil) + rendu page projet (?slug=)

// js/carousel.js — carousel des projets (flèches arrow_back / arrow_forward)
```

---

## 6. Ordre de travail recommandé

1. Créer l'arbo (§2) + coller les fichiers **PRÊTS** (§3).
2. Coder **`index.html`** en statique (sans JSON) → premier écran qui s'affiche.
3. Coder **`profil.html`** (réutilise tags, cartes process, lignes expérience).
4. **`layout.css`** au fur et à mesure : tu remplis les grilles quand tu en as besoin.
5. **`projet.html` + `projects.json` + `projects.js`** → le template dynamique (le gros morceau).
6. **`rive.js`** puis **`animations.js`** en dernier, sur un site déjà debout.

> Règle qui ne bouge pas : **aucune valeur en dur**, toujours `var(--token-*)`. Si un token manque, on l'ajoute dans `tokens.css` (et dans la collection Figma `Tokens`).
