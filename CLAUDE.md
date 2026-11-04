# CLAUDE.md — guide du dépôt Escale

Ce fichier aide un assistant IA (Claude) à répondre aux questions sur ce dépôt.

## Nature du projet

- Site de voyage **fictif** nommé **Escale**, utilisé pour un **atelier de product discovery**.
- Le site est **volontairement imparfait** : fonctionnalités manquantes, comportements
  incohérents, notamment dans la **recherche** et le **panier**. C'est voulu.
- Public : apprenants **product managers / product owners**, pas forcément développeurs.

## Comment répondre

1. **Langue** : répondre en français, avec des mots simples ; expliquer le code
   en termes de comportement visible pour l'utilisateur du site.
2. **Citer les fichiers** (chemin + fonction) sur lesquels s'appuie la réponse.
3. **Ne pas corriger le code** sauf demande explicite : les imperfections sont le support
   de l'atelier. Si on demande une correction, la proposer sous forme de suggestion.
4. **Rester factuel** : décrire ce que fait le code, pas ce qu'il devrait faire.
   Distinguer clairement « ce qui est codé », « ce qui est annoncé mais absent » et
   « ce qui est une hypothèse ».
5. Pour les questions produit (personas, parcours, besoins), s'appuyer sur les fichiers
   de `docs/discovery/` et `docs/produit/` et **citer les sources** (numéro d'entretien,
   identifiant de ticket, section analytics).

## Carte du dépôt

| Sujet | Où regarder |
|---|---|
| Structure de la page | `index.html` |
| Données des destinations | `assets/js/data/destinations.js` |
| Recherche, filtres, tri | `assets/js/modules/search.js` + `app.js` (formulaire `#search-form`) |
| Recherche par envie | `assets/js/modules/mood.js` |
| Empreinte carbone | `assets/js/modules/carbon.js` |
| Panier, codes promo, total | `assets/js/modules/cart.js` + `render.js` (fonction `cart`) |
| Favoris | `assets/js/modules/favorites.js` |
| Destination mystère | `assets/js/modules/mystery.js` |
| Assistant « Inspire-moi » | `assets/js/modules/inspire.js` |
| Affichage HTML | `assets/js/modules/render.js` |
| Câblage des événements | `assets/js/app.js` |
| Styles | `assets/css/main.css` |
| Architecture technique | `docs/architecture.md` |
| Contexte entreprise, objectifs | `docs/produit/contexte-entreprise.md` |
| Backlog existant | `docs/produit/backlog-actuel.md` |
| Entretiens clients | `docs/discovery/verbatims-utilisateurs.md` |
| Tickets du service client | `docs/discovery/tickets-support.csv` |
| Chiffres d'usage | `docs/discovery/analytics-t3-2026.md` |

## Conventions techniques

- HTML / CSS / JavaScript « vanille », **sans framework ni étape de build**.
- Scripts classiques (pas de modules ES) pour que `index.html` s'ouvre directement
  depuis le disque. Chaque fichier ajoute un objet à l'espace de noms global `window.Escale`
  (`Escale.search`, `Escale.cart`…). L'ordre de chargement est défini en bas d'`index.html`.
- `render.js` ne contient que de l'affichage ; la logique est dans les autres modules.
- Le panier est sauvegardé dans le `localStorage` du navigateur (clé `escale-cart`).
- Les `TODO` dans le code signalent des fonctionnalités connues comme incomplètes.
