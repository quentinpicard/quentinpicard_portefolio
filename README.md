# Portfolio — Quentin Picard

Portfolio personnel de Quentin Picard, Product Designer UX/UI.
Site statique : **HTML / CSS / JS vanilla**, animations **GSAP**, boutons interactifs en **Rive**.

## Stack

- HTML / CSS (custom properties, pas de build) / JS vanilla
- [GSAP](https://gsap.com/) — animations (reveal, hover, carousel)
- [Rive](https://rive.app/) — boutons interactifs (`.riv`)
- Données projets en JSON local

## Structure

```
css/      tokens + base + composants + layout
js/       rive, animations, rendu projets, carousel
data/     contenu des projets (projects.json)
rive/     artefacts .riv
icons/    SVG
img/      visuels
docs/     documentation (voir ci-dessous)
```

## Documentation

Tout le détail est dans `docs/` :

- **`figma-dev-mapping.md`** — liaison Figma ↔ dev : tokens, mapping CSS, recettes composants, intégration Rive/GSAP. *À lire en premier pour développer.*
- **`portfolio-design-system.md`** — le design system (tokens, typo, composants).
- **`portfolio-scaffold.md`** — mise en place de la structure du projet.

> Règle de dev : aucune valeur en dur, toujours `var(--token-*)`.
