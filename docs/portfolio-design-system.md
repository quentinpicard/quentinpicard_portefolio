# Design System — Portfolio Quentin Picard

Style **néo-brutaliste** : aplats, bordures épaisses noires, ombre dure, deux bleus.
Cible technique : **vibecoding HTML / CSS / JS** + **GSAP** (animations) + **Rive** (boutons interactifs).

- Fichier Figma : `MhlZePLOBMnB7lOvvbnKzU`
- Page DS : `105:347`
- Collection de variables : `Tokens`

---

## 1. Tokens

### Couleurs
| Token Figma | Hex | Rôle |
|---|---|---|
| `color/cream` | `#F2EFE8` | Fond global + texte sur foncé |
| `color/blue` | `#384BD6` | Accent, face bouton primary, tags, bordure bouton contact |
| `color/blue-deep` | `#2838AD` | Base 3D du bouton primary *(référence Rive uniquement)* |
| `color/ink` | `#202020` | Texte, bordures, face bouton secondary |
| `color/black` | `#101010` | Base bouton secondary/contact, ombre |

### Radius
`radius/sm` 12 · `radius/md` 14 · `radius/lg` 16 · `radius/xl` 22

### Bordures
`border/thin` 4 (cartes, tags, lignes) · `border/thick` 6 (boutons)

### Espacement (base 8, + 12)
`space/8` · `space/12` · `space/16` · `space/24` · `space/32` · `space/64`

### Ombre
`shadow/hard` = `0 6px 0 0 #101010` — *hard shadow*, pas de flou. Utilisée sur le bouton retour.

---

## 2. Typographie

Deux familles : **Archivo Black** (display, labels, tout l'uppercase) et **Archivo** (corps).

| Text style | Police | Taille | Tracking | Interligne | Usage |
|---|---|---|---|---|---|
| `display/xl` | Archivo Black | 56 | -6% | 0.9 | H1 (nom, titres de page) |
| `display/l` | Archivo Black | 24 | -8% | auto | Bouton primary, titre ligne expérience |
| `display/m` | Archivo Black | 22 | -8% | auto | Bouton contact |
| `display/s` | Archivo Black | 20 | 0 | 1.2 | Titre carte process |
| `label` | Archivo Black | 16 | -8% | auto | Tags, bouton retour |
| `body` | Archivo | 16 | 0 | 1.2 | Paragraphes |
| `meta` | Archivo | 16 | 0 | 0.9 | Labels de section ("Outils", "Expérience") |

Tracking display constant à **-8%** (sauf H1 à -6%).

---

## 3. Composants

### Boutons — gérés en Rive (`.riv`)
L'effet *chunky* (le bouton s'enfonce) **n'est pas une `box-shadow`** : c'est une structure **2 couches** — une face posée sur une base plus foncée qui dépasse en bas (6px → 10px au hover/press). Cet effet vit dans la **State Machine Rive**, pas en CSS.

| Composant Figma | Node | Variantes | Couleurs |
|---|---|---|---|
| `Bouton` | `9:942` | primary / secondary × default / hover | primary : face `blue` / base `blue-deep` — secondary : face `ink` / base `black`, bordure `blue` |
| `Bouton réseau social` | `9:970` | default / variant2 | — |
| `Bouton retour` | `35:1731` | default / variant2 | + `shadow/hard` |

> Le « Bouton contact » (E-MAIL / LINKEDIN / VIEW CV) **n'est pas un composant séparé** : c'est `Bouton` variant **secondary** en pleine largeur.

### Composants HTML/CSS (reliés aux variables)
| Composant | Node | Notes |
|---|---|---|
| `Carte projet` | `3:850` | Bento. Fills/strokes/radius liés aux tokens |
| `Icônes` | `12:93` | SVG, fill `ink`. arrow_outward, instagram, pinterest, linkedin, github, arrow_back, arrow_forward |
| `Tag` | `112:491` | **Nouveau**. Variantes `Filled` (bleu) / `Outline` (cream) |
| `Carte process` | `112:492` | **Nouveau**. Visuel `ink` + titre `display/s` + texte `body` |
| `Ligne expérience` | `112:496` | **Nouveau**. Layout space-between, titre `display/l` + période `body` |

---

## 4. Corrections appliquées

1. **Lignes expérience** — la typo était incohérente (`LIMEO` en Archivo Black, `CHU Rouen`/`Niort Frère` en Archivo SemiBold). Le composant `Ligne expérience` uniformise tout en **Archivo Black** (`display/l`).
2. **Ombre** — le bouton retour utilisait `black` pur alors que tout le reste est `#101010`/`#202020`. `shadow/hard` est calé sur **`#101010`** (un noir de moins à maintenir).

---

## 5. Motion

Pas de tokens de motion pour l'instant (choix assumé). Le mouvement est géré **ad hoc** :
- **Rive** — boutons (press, hover), micro-interactions.
- **GSAP** — entrées au scroll, hover des cartes bento, transition du carousel projet.

À tokeniser plus tard si le besoin de cohérence se fait sentir (durées + easings nommés).
