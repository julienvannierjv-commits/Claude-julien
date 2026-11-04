/**
 * Empreinte carbone (innovation).
 *
 * Estime les émissions de CO2 d'un aller-retour depuis Paris, par personne,
 * et les classe en trois niveaux affichés sous forme de badge sur chaque carte.
 */
window.Escale = window.Escale || {};

Escale.carbon = (function () {
  // kg de CO2 par km et par passager (ordre de grandeur, source : fiche interne)
  const FACTOR_PLANE = 0.23;
  const FACTOR_TRAIN = 0.003;

  /** Retourne les kg de CO2 estimés pour un aller-retour */
  function estimate(destination) {
    // TODO : utiliser FACTOR_TRAIN pour les destinations accessibles en train
    return Math.round(destination.distanceKm * 2 * FACTOR_PLANE);
  }

  /** Retourne le niveau : "faible", "moyen" ou "élevé" */
  function level(destination) {
    const kg = estimate(destination);
    if (kg < 300) return "faible";
    if (kg < 1500) return "moyen";
    return "élevé";
  }

  return { estimate: estimate, level: level, FACTOR_TRAIN: FACTOR_TRAIN };
})();
