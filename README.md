# CV en ligne – Mathyou ANDRE

CV web statique réalisé dans le cadre de ma formation en BTS SIO option SISR.
Le contenu a d'abord été rédigé en Markdown (`cv.md`), puis intégré en HTML/CSS.

**Site en ligne :** https://mathyouadr.github.io/TP-CV/

## Structure du dépôt

```text
.
├─ index.html      Page du CV
├─ css/
│  └─ style.css    Styles (mobile-first, thème clair et sombre)
├─ js/
│  └─ app.js       Bouton clair/sombre, menu actif, année du pied de page
├─ img/            Images optimisées (vide pour l'instant)
├─ cv.md           Contenu du CV rédigé en Markdown
└─ README.md
```

## Consulter le site en local

Aucun serveur n'est nécessaire : il suffit d'ouvrir `index.html` dans un navigateur.

## Choix techniques

- **HTML sémantique** : un seul `<h1>`, titres `h2` puis `h3` sans saut de niveau, balises `header`, `nav`, `main`, `section`, `article` et `footer`.
- **Responsive** : CSS mobile-first avec Flexbox et Grid, sans Bootstrap pour garder une page légère. Aucun défilement horizontal, vérifié à 320 px de large.
- **Accessibilité** : contrastes conformes WCAG AA dans les deux thèmes, texte de 16 px minimum, focus visible au clavier, lien « Aller au contenu principal », textes de liens explicites, animations désactivées si l'utilisateur le demande.
- **SEO** : `<title>` et `<meta name="description">` renseignés, ancres lisibles (`#profil`, `#experiences`…).
- **Performance** : police système (aucune police web), aucune bibliothèque ni CDN, script chargé avec `defer`. Un court script dans le `<head>` applique le thème choisi avant l'affichage pour éviter un flash de couleur.

## Données personnelles

Le site ne contient ni numéro de téléphone, ni adresse, ni email.
Le seul moyen de contact est le lien vers mon profil GitHub.

## Auto-évaluation

### Résultats des outils

Tests réalisés le 16/09/2026 sur la version en ligne (https://mathyouadr.github.io/TP-CV/).

| Outil | Résultat | Analyse |
|---|---|---|
| validator.w3.org (HTML) | **0 erreur, 0 avertissement** | Balisage valide, aucune correction nécessaire. |
| jigsaw.w3.org (CSS) | **Valide, 0 erreur, 3 avertissements** | Les 3 avertissements indiquent seulement que le validateur ne peut pas vérifier les variables CSS (`var(--…)`). Ils sont informatifs et ne bloquent rien. |
| outiref.fr | **Structure Hn correcte** : 1 seul H1, 6 H2 et 17 H3 bien imbriqués. Aucune image. URL sans accent ni tiret bas. 2 remarques : `<title>` trop long (629 px pour une limite de 600 px) et meta description un peu courte (193 caractères pour 200 à 300 conseillés). Pas de balise canonical. | Les 3 points ont été corrigés (corrections 11 à 13). L'absence de meta Keywords n'est pas corrigée : Google ignore cette balise. Le code HTTP 301 est normal : GitHub Pages redirige automatiquement `http://` vers `https://`. |
| pagespeed.web.dev (mobile) | **Performance : 99 / Accessibilité : 100 / Bonnes pratiques : 100 / SEO : 100** (Navigation agentique : 2/2) | Page très légère (environ 32 ko, sans image, police ni bibliothèque externe), d'où un chargement quasi instantané sur mobile. Les scores de 100 confirment les contrastes, les libellés de liens, la balise `lang` et les métadonnées. |

### Corrections de la V1 à la version finale

**V1** : page HTML simple (en-tête, sections du CV, pied de page) avec un CSS mobile-first de base.

| # | Problème constaté | Correction apportée | Critère | Impact mesuré |
|---|---|---|---|---|
| 1 | Le lien GitHub n'apparaissait qu'en bas de page. | Bouton « Voir mes projets GitHub » dans l'en-tête. | C4, C5 | Lien de contact visible dès l'arrivée, avec un texte explicite. |
| 2 | Liens du menu trop petits pour le doigt (environ 42 px de haut). | Hauteur minimale de 44 px sur les liens et boutons. | C3, C4 | Toutes les zones cliquables font au moins 44 px. |
| 3 | Le lien « Aller au contenu principal » n'avait pas de contour visible au clavier. | Contour de 3 px au focus. | C4 | Focus visible sur tous les éléments interactifs. |
| 4 | Nom de famille écrit « André ». | Remplacé par « ANDRE » partout. | C1 | 7 occurrences corrigées. |
| 5 | Mise en page peu hiérarchisée (listes les unes sous les autres). | Refonte : bandeau d'accueil, compétences en cartes, parcours en frise chronologique. | C3, C4 | Contraste minimum de 5,2:1 sur les textes (seuil WCAG AA : 4,5:1). |
| 6 | Aucun repère de position dans une page longue. | Menu fixé en haut sur tablette et ordinateur, section en cours surlignée. | C4 | Navigation possible sans remonter en haut de la page. |
| 7 | Pas de thème sombre. | Thème sombre automatique et bouton clair/sombre utilisable au clavier et annoncé par les lecteurs d'écran. | C4 | Contrastes AA vérifiés dans les deux thèmes. |
| 8 | Sur mobile, dates coupées en deux et menu étalé sur 4 lignes. | Texte des dates regroupé, menu mobile en grille de 2 colonnes. | C3 | Aucun défilement horizontal à 320 px et 360 px de large. |
| 9 | Compétences présentées comme maîtrisées et nombre de stages incomplet. | Mention « Niveau débutant » sur les 7 compétences ; 6 stages de Bac Pro et le stage de 3e indiqués. | C1 | Contenu fidèle à mon niveau réel. |
| 10 | 8 avertissements au validateur CSS (préfixes `-webkit-`, police `-apple-system`, même couleur de fond et de bordure). | Suppression des préfixes inutiles et ajustement des couleurs. | C7 | 8 → 3 avertissements, les 3 restants étant informatifs. |

**Corrections après publication**, suite à l'audit Outiref :

| # | Problème constaté | Correction apportée | Critère | Impact mesuré |
|---|---|---|---|---|
| 11 | `<title>` de 74 caractères (629 px), coupé dans les résultats Google (limite de 600 px). | Titre raccourci : « Mathyou ANDRE – CV Technicien Numérique, alternant BTS SIO SISR ». | C5 | 74 → 63 caractères, environ 536 px : le titre s'affiche en entier. |
| 12 | Meta description de 193 caractères, sous les 200 à 300 conseillés. | Description complétée avec le parcours et les 6 stages. | C5 | 193 → 243 caractères. |
| 13 | Pas de balise canonical : le site répond à la fois en `http://` et en `https://`. | Ajout de `<link rel="canonical">` vers l'adresse `https://`. | C5 | Une seule adresse de référence pour les moteurs de recherche. |

### Bilan selon la grille d'évaluation

Coefficients par défaut de la grille, à remplacer par ceux du fichier officiel.

| Critère | Score (0–4) | Coef | Pondéré | Justification |
|---|---:|---:|---:|---|
| C1 Contenu | 3 | 10 | 30 | Clair et structuré, niveau réel indiqué. Il manque des réalisations chiffrées et le détail de mes missions en alternance. |
| C2 HTML sémantique | 4 | 10 | 40 | Un seul `<h1>`, `h2` puis `h3` sans saut, balises structurelles, ancres explicites, W3C sans erreur. |
| C3 Responsive | 4 | 15 | 60 | Mobile-first avec Grid et Flexbox, 3 points de rupture, aucun défilement horizontal à 320 px. |
| C4 UX & Accessibilité | 4 | 15 | 60 | Contrastes AA mesurés, focus visible, lien d'évitement, liens explicites, animations réduites si demandé. |
| C5 SEO | 4 | 10 | 40 | `<title>` et description pertinents et ajustés après l'audit Outiref, balise canonical, structure claire, libellés de liens descriptifs. PageSpeed SEO : 100. |
| C6 Performance | 4 | 10 | 40 | Environ 32 ko au total, aucune dépendance, police système, script en `defer`. PageSpeed mobile : 99 en performance. |
| C7 Validation & corrections | 4 | 10 | 40 | W3C sans erreur, structure Hn validée par Outiref, PageSpeed mobile entre 99 et 100, journal de 13 corrections. |
| C8 Publication | 3 | 5 | 15 | Site en ligne et stable, corrigé après publication. Test sur un vrai smartphone à faire. |
| C9 Auto-évaluation | 4 | 5 | 20 | Résultats des 3 outils, analyse des causes, corrections et impact mesuré pour chacune. |
| C10 Confidentialité | 4 | 5 | 20 | Aucune donnée personnelle, contact uniquement via GitHub, adresse email masquée dans les commits. |
| C11 Qualité du dépôt | 4 | 5 | 20 | Arborescence conforme, README détaillé, commits en français au format `type: description`. |
| **Total** | | **100** | **385** | **Note estimée : 19,25 / 20** |

**Points forts** : code valide, page légère, accessibilité travaillée, contenu honnête sur mon niveau.

**Axes d'amélioration** :
- Tester le site sur un vrai smartphone.
- Détailler mes missions en alternance chez SIGMA NET SANTE.
- Ajouter des réalisations concrètes, par exemple des projets sur GitHub.
