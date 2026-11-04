/**
 * Catalogue des destinations proposées par Escale.
 *
 * Source : export manuel de l'outil interne (mis à jour par l'équipe contenu).
 * Champs :
 *  - id            identifiant unique (slug)
 *  - name          nom affiché de la destination
 *  - country       pays
 *  - continent     continent
 *  - price         prix par personne en euros (vol/train + hébergement)
 *  - durationDays  durée du séjour en jours
 *  - transport     "avion" ou "train"
 *  - distanceKm    distance approximative depuis Paris
 *  - moods         ambiances associées (voir modules/mood.js)
 *  - popularity    score de popularité (0-100), utilisé pour le tri par défaut
 *  - rating        note moyenne des voyageurs (sur 5)
 *  - familyFriendly  adapté aux familles avec enfants
 *  - emoji / colors  éléments visuels de la carte
 */
window.Escale = window.Escale || {};

Escale.DESTINATIONS = [
  {
    id: "lisbonne",
    name: "Lisbonne",
    country: "Portugal",
    continent: "Europe",
    price: 590,
    durationDays: 4,
    transport: "avion",
    distanceKm: 1450,
    moods: ["soleil", "culture", "gastronomie"],
    popularity: 95,
    rating: 4.7,
    familyFriendly: true,
    emoji: "🚋",
    colors: ["#f6a04d", "#e8505b"],
    description: "Tramways jaunes, pastéis de nata et couchers de soleil depuis les miradouros.",
    highlights: ["Quartier de l'Alfama", "Belém", "Excursion à Sintra"]
  },
  {
    id: "seville",
    name: "Séville",
    country: "Espagne",
    continent: "Europe",
    price: 640,
    durationDays: 4,
    transport: "avion",
    distanceKm: 1590,
    moods: ["soleil", "culture", "gastronomie"],
    popularity: 82,
    rating: 4.6,
    familyFriendly: true,
    emoji: "💃",
    colors: ["#ff9a3c", "#c0392b"],
    description: "Flamenco, patios fleuris et tapas jusqu'au bout de la nuit.",
    highlights: ["Alcázar", "Plaza de España", "Soirée flamenco"]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japon",
    continent: "Asie",
    price: 2150,
    durationDays: 12,
    transport: "avion",
    distanceKm: 9700,
    moods: ["culture", "gastronomie", "deconnexion"],
    popularity: 90,
    rating: 4.9,
    familyFriendly: false,
    emoji: "⛩️",
    colors: ["#e8505b", "#6a2c70"],
    description: "Temples millénaires, jardins zen et cérémonie du thé.",
    highlights: ["Fushimi Inari", "Bambouseraie d'Arashiyama", "Nuit en ryokan"]
  },
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Islande",
    continent: "Europe",
    price: 1490,
    durationDays: 7,
    transport: "avion",
    distanceKm: 2240,
    moods: ["nature", "aventure"],
    popularity: 74,
    rating: 4.8,
    familyFriendly: true,
    emoji: "🌋",
    colors: ["#3a7bd5", "#00d2ff"],
    description: "Aurores boréales, geysers et lagons d'eau chaude.",
    highlights: ["Cercle d'or", "Blue Lagoon", "Chasse aux aurores"]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Maroc",
    continent: "Afrique",
    price: 720,
    durationDays: 5,
    transport: "avion",
    distanceKm: 2100,
    moods: ["soleil", "culture", "gastronomie"],
    popularity: 88,
    rating: 4.5,
    familyFriendly: true,
    emoji: "🕌",
    colors: ["#f7971e", "#d35400"],
    description: "Souks animés, riads paisibles et nuit sous les étoiles dans le désert d'Agafay.",
    highlights: ["Place Jemaa el-Fna", "Jardin Majorelle", "Nuit dans le désert"]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonésie",
    continent: "Asie",
    price: 1890,
    durationDays: 14,
    transport: "avion",
    distanceKm: 11800,
    moods: ["soleil", "nature", "deconnexion"],
    popularity: 86,
    rating: 4.6,
    familyFriendly: true,
    emoji: "🌴",
    colors: ["#11998e", "#38ef7d"],
    description: "Rizières en terrasses, plages et retraites de yoga.",
    highlights: ["Rizières de Tegallalang", "Ubud", "Plongée à Amed"]
  },
  {
    id: "annecy",
    name: "Annecy",
    country: "France",
    continent: "Europe",
    price: 340,
    durationDays: 3,
    transport: "train",
    distanceKm: 540,
    moods: ["nature", "deconnexion", "gastronomie"],
    popularity: 70,
    rating: 4.7,
    familyFriendly: true,
    emoji: "🏔️",
    colors: ["#56ccf2", "#2f80ed"],
    description: "Un lac turquoise, des montagnes et une vieille ville pleine de charme.",
    highlights: ["Tour du lac à vélo", "Vieille ville", "Randonnée au Semnoz"]
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Pays-Bas",
    continent: "Europe",
    price: 410,
    durationDays: 3,
    transport: "train",
    distanceKm: 500,
    moods: ["culture"],
    popularity: 79,
    rating: 4.4,
    familyFriendly: true,
    emoji: "🚲",
    colors: ["#ff5e62", "#ff9966"],
    description: "Canaux, musées et balades à vélo.",
    highlights: ["Rijksmuseum", "Maison d'Anne Frank", "Croisière sur les canaux"]
  },
  {
    id: "patagonie",
    name: "Patagonie",
    country: "Argentine",
    continent: "Amérique du Sud",
    price: 2890,
    durationDays: 16,
    transport: "avion",
    distanceKm: 12900,
    moods: ["aventure", "nature"],
    popularity: 61,
    rating: 4.9,
    familyFriendly: false,
    emoji: "🧗",
    colors: ["#2c3e50", "#4ca1af"],
    description: "Glaciers géants, trekking et paysages du bout du monde.",
    highlights: ["Glacier Perito Moreno", "Trek du Fitz Roy", "El Chaltén"]
  },
  {
    id: "crete",
    name: "Crète",
    country: "Grèce",
    continent: "Europe",
    price: 980,
    durationDays: 7,
    transport: "avion",
    distanceKm: 2300,
    moods: ["soleil", "nature", "gastronomie"],
    popularity: 84,
    rating: 4.6,
    familyFriendly: true,
    emoji: "🏛️",
    colors: ["#00b4db", "#0083b0"],
    description: "Plages turquoise, gorges sauvages et cuisine méditerranéenne.",
    highlights: ["Plage de Balos", "Gorges de Samaria", "Palais de Knossos"]
  },
  {
    id: "montreal",
    name: "Montréal",
    country: "Canada",
    continent: "Amérique du Nord",
    price: 1250,
    durationDays: 8,
    transport: "avion",
    distanceKm: 5500,
    moods: ["culture", "gastronomie"],
    popularity: 72,
    rating: 4.5,
    familyFriendly: true,
    emoji: "🍁",
    colors: ["#c94b4b", "#4b134f"],
    description: "Ville bilingue, festive et gourmande, porte d'entrée vers les grands espaces.",
    highlights: ["Vieux-Montréal", "Mont Royal", "Marché Jean-Talon"]
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    country: "Costa Rica",
    continent: "Amérique centrale",
    price: 2390,
    durationDays: 14,
    transport: "avion",
    distanceKm: 9100,
    moods: ["aventure", "nature", "soleil"],
    popularity: 77,
    rating: 4.8,
    familyFriendly: true,
    emoji: "🦥",
    colors: ["#134e5e", "#71b280"],
    description: "Volcans, forêts tropicales et faune incroyable.",
    highlights: ["Volcan Arenal", "Parc Manuel Antonio", "Tyrolienne dans la canopée"]
  }
];
