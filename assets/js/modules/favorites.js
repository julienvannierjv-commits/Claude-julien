/**
 * Favoris.
 *
 * Permet de marquer une destination d'un cœur.
 * TODO : sauvegarder les favoris et créer une page « Mes favoris ».
 */
window.Escale = window.Escale || {};

Escale.favorites = (function () {
  const ids = new Set();

  /** Ajoute ou retire une destination des favoris, renvoie le nouvel état */
  function toggle(id) {
    if (ids.has(id)) {
      ids.delete(id);
      return false;
    }
    ids.add(id);
    return true;
  }

  function has(id) {
    return ids.has(id);
  }

  return { toggle: toggle, has: has };
})();
