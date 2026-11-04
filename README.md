# Escale — site de voyage (projet pédagogique)

> **Escale** est une agence de voyage en ligne **fictive**. Ce dépôt sert de support à un atelier
> de *product discovery* : le site fonctionne, mais il est **volontairement imparfait**.
> À vous d'observer, de questionner et de proposer des améliorations.

## Le site en un coup d'œil

Escale propose de choisir un séjour selon son **envie** plutôt que selon un lieu.

| Fonctionnalité | État |
|---|---|
| Catalogue de 12 destinations | ✅ Disponible |
| Barre de recherche (destination, date, voyageurs, durée, budget) | ⚠️ Disponible |
| Tri (popularité, prix, empreinte carbone) | ⚠️ Disponible |
| Recherche par envie (soleil, aventure, culture…) | 🧪 Innovation |
| Badge d'empreinte carbone par destination | 🧪 Innovation |
| Destination mystère (tirage au sort) | 🧪 Innovation |
| Assistant « Inspire-moi » (description en langage naturel) | 🧪 Bêta |
| Panier avec codes promo | ⚠️ Disponible |
| Favoris | 🚧 Partiel |
| Paiement en ligne | ❌ Pas encore |
| Compte client / connexion | ❌ Pas encore |
| Voyage en groupe | ❌ Annoncé « Bientôt » |

## Lancer le site

Aucune installation n'est nécessaire.

- **En local** : téléchargez le dépôt puis ouvrez `index.html` dans un navigateur.
- **En ligne** : activez GitHub Pages (Settings → Pages → *Deploy from a branch* → `main` / `root`).

## Organisation du dépôt

```
.
├── index.html                  Page unique du site (structure HTML)
├── assets/
│   ├── css/main.css            Styles (sommaire en tête de fichier)
│   └── js/
│       ├── data/
│       │   └── destinations.js Catalogue des destinations (données)
│       ├── modules/            Logique métier, un fichier par fonctionnalité
│       │   ├── utils.js        Fonctions partagées (format des prix, toast…)
│       │   ├── search.js       Recherche et tri
│       │   ├── mood.js         Recherche par envie
│       │   ├── carbon.js       Calcul de l'empreinte carbone
│       │   ├── cart.js         Panier et codes promo
│       │   ├── favorites.js    Favoris
│       │   ├── mystery.js      Destination mystère
│       │   ├── inspire.js      Assistant « Inspire-moi »
│       │   └── render.js       Affichage HTML (aucune logique métier)
│       └── app.js              Point d'entrée : relie les clics aux modules
├── docs/
│   ├── architecture.md         Fonctionnement technique détaillé
│   ├── produit/                Contexte de l'entreprise et backlog actuel
│   └── discovery/              Matière brute : verbatims, tickets support, analytics
└── CLAUDE.md                   Guide pour interroger le dépôt avec Claude
```

## Pour l'atelier

Le dossier [`docs/discovery`](docs/discovery) contient la matière brute à exploiter :

- [`verbatims-utilisateurs.md`](docs/discovery/verbatims-utilisateurs.md) — extraits d'entretiens avec des clients
- [`tickets-support.csv`](docs/discovery/tickets-support.csv) — demandes reçues par le service client
- [`analytics-t3-2026.md`](docs/discovery/analytics-t3-2026.md) — chiffres de fréquentation et de conversion

Le dossier [`docs/produit`](docs/produit) décrit l'entreprise et son backlog actuel.

Pistes de travail : Lean Canvas ou Product Canvas, personas, parcours utilisateur (*user journey*),
story map, priorisation du backlog.

## Interroger le dépôt avec Claude

Le fichier [`CLAUDE.md`](CLAUDE.md) décrit le projet pour un assistant IA. Exemples de questions :

- « Comment fonctionne la recherche de destinations ? »
- « Que se passe-t-il quand j'ajoute deux fois le même séjour au panier ? »
- « Quels profils de clients ressortent des verbatims ? »
- « Quelles fonctionnalités sont annoncées mais pas encore codées ? »
