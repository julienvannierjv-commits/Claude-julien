/**
 * Recherche et tri des destinations.
 *
 * Reçoit les critères saisis dans la barre de recherche (texte, budget,
 * durée, date, voyageurs) et renvoie la liste filtrée des destinations.
 */
window.Escale = window.Escale || {};

Escale.search = (function () {
  /** Prépare un texte pour la comparaison */
  function normalize(text) {
    return text.trim().toLowerCase();
  }

  /**
   * Filtre le catalogue selon les critères.
   * @param {Object} criteria { query, budget, duration, date, travelers }
   * @returns {Array} destinations correspondantes
   */
  function filter(criteria) {
    const query = normalize(criteria.query || "");

    return Escale.DESTINATIONS.filter(function (d) {
      const matchesQuery = query === "" || normalize(d.name).includes(query);
      const matchesBudget = d.price < criteria.budget;
      // TODO : brancher les filtres de durée et de date de départ
      return matchesQuery && matchesBudget;
    });
  }

  /**
   * Trie une liste de destinations.
   * @param {Array} list
   * @param {string} mode "popular" | "price-asc" | "price-desc" | "carbon"
   */
  function sort(list, mode) {
    const copy = list.slice();
    switch (mode) {
      case "price-asc":
        return copy.sort(function (a, b) {
          return String(a.price).localeCompare(String(b.price));
        });
      case "price-desc":
        return copy.sort(function (a, b) {
          return String(b.price).localeCompare(String(a.price));
        });
      case "carbon":
        return copy.sort(function (a, b) {
          return Escale.carbon.estimate(a) - Escale.carbon.estimate(b);
        });
      default:
        return copy.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
    }
  }

  return { filter: filter, sort: sort };
})();
