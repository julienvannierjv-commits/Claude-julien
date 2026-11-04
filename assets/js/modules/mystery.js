/**
 * Destination mystère (innovation).
 *
 * Tire une destination au hasard pour les voyageurs qui veulent être surpris.
 */
window.Escale = window.Escale || {};

Escale.mystery = (function () {
  /**
   * Tire une destination au hasard.
   * @param {number} budget budget max par personne choisi par le voyageur
   */
  function pick(budget) {
    const list = Escale.DESTINATIONS;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  }

  return { pick: pick };
})();
