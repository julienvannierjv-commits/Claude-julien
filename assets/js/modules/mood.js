/**
 * Recherche par envie (innovation).
 *
 * Le voyageur choisit une ambiance (soleil, aventure…) plutôt qu'un lieu.
 * Les destinations sont filtrées selon leur champ `moods`.
 */
window.Escale = window.Escale || {};

Escale.mood = (function () {
  const MOODS = [
    { id: "soleil", label: "Soleil", icon: "☀️" },
    { id: "aventure", label: "Aventure", icon: "🧭" },
    { id: "culture", label: "Culture", icon: "🎭" },
    { id: "nature", label: "Nature", icon: "🌿" },
    { id: "gastronomie", label: "Gastronomie", icon: "🍷" },
    { id: "deconnexion", label: "Déconnexion", icon: "🧘" }
  ];

  let active = null;

  /** Active une ambiance, ou la désactive si on reclique dessus */
  function toggle(moodId) {
    active = active === moodId ? null : moodId;
    return active;
  }

  function getActive() {
    return active;
  }

  /** Destinations correspondant à l'ambiance active (tout le catalogue si aucune) */
  function filter() {
    if (!active) return Escale.DESTINATIONS.slice();
    return Escale.DESTINATIONS.filter(function (d) {
      return d.moods.includes(active);
    });
  }

  return { MOODS: MOODS, toggle: toggle, getActive: getActive, filter: filter };
})();
