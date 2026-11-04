# Architecture technique

## Vue d'ensemble

Escale est un site **statique** d'une seule page. Tout s'exécute dans le navigateur :
il n'y a ni serveur, ni base de données, ni API. Le catalogue est un fichier JavaScript.

```
 index.html ──charge──▶ data/destinations.js   (catalogue)
                        modules/*.js           (logique par fonctionnalité)
                        app.js                 (événements)
                                │
   clic / saisie ──▶ app.js ──▶ module métier ──▶ render.js ──▶ écran
```

## Cycle d'une action

Exemple : le voyageur clique sur « Ajouter » sur une carte.

1. `app.js` intercepte le clic sur `#results-grid` (bouton `data-action="add"`).
2. Il retrouve la destination avec `Escale.utils.findDestination(id)`.
3. Il appelle `Escale.cart.add(destination, voyageurs)` : le séjour est ajouté
   à la liste et sauvegardé dans le `localStorage`.
4. Il demande à `Escale.render.cartBadge()` de mettre à jour la pastille du panier.
5. Un message de confirmation s'affiche (`Escale.utils.toast`).

## Modules

| Module | Rôle | Fonctions publiques |
|---|---|---|
| `utils` | Outils partagés | `formatPrice`, `$`, `toast`, `findDestination` |
| `search` | Filtre et trie le catalogue | `filter(criteria)`, `sort(list, mode)` |
| `mood` | Filtre par ambiance | `MOODS`, `toggle`, `getActive`, `filter` |
| `carbon` | Estime le CO₂ d'un aller-retour | `estimate`, `level` |
| `cart` | Panier et promotions | `add`, `remove`, `getItems`, `count`, `applyPromo`, `total` |
| `favorites` | Cœurs sur les cartes | `toggle`, `has` |
| `mystery` | Tirage au sort | `pick(budget)` |
| `inspire` | Assistant par mots-clés | `suggest(text)` |
| `render` | Génère le HTML | `results`, `resultsInfo`, `moods`, `cartBadge`, `cart`, `detail`, `inspireAnswer` |

## Données

Chaque destination de `destinations.js` contient notamment : `id`, `name`, `country`,
`price` (par personne), `durationDays`, `transport`, `distanceKm`, `moods`,
`popularity`, `rating`, `familyFriendly`. Le détail des champs est en tête du fichier.

Le champ `familyFriendly` existe dans les données mais n'est utilisé nulle part sur le site.

## Stockage

| Donnée | Où | Persistance |
|---|---|---|
| Panier | `localStorage` (`escale-cart`) | Conservé après rechargement |
| Code promo appliqué | Mémoire | Perdu au rechargement |
| Favoris | Mémoire | Perdus au rechargement |
| Ambiance sélectionnée | Mémoire | Perdue au rechargement |

## Limites connues de l'architecture

- Pas de back-office : le catalogue est modifié à la main dans le code.
- Pas de paiement, pas de compte client, pas d'envoi d'e-mail.
- Pas de tests automatisés.
