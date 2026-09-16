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
