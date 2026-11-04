/**
 * Panier.
 *
 * Gère les séjours ajoutés par le voyageur, leur sauvegarde dans le
 * navigateur (localStorage), les codes promo et le calcul du total.
 */
window.Escale = window.Escale || {};

Escale.cart = (function () {
  const STORAGE_KEY = "escale-cart";

  // Codes promo valides et leur réduction
  const PROMO_CODES = {
    ESCALE10: 0.1,
    BIENVENUE: 0.05
  };

  let items = load();
  let discountRate = 0;

  /** Lit le panier sauvegardé */
  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  /** Sauvegarde le panier */
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      /* stockage indisponible : le panier reste en mémoire */
    }
  }

  /**
   * Ajoute un séjour au panier.
   * @param {Object} destination
   * @param {number} travelers nombre de voyageurs saisi dans la recherche
   */
  function add(destination, travelers) {
    items.push({
      id: destination.id,
      name: destination.name,
      emoji: destination.emoji,
      price: destination.price,
      travelers: travelers,
      addedAt: new Date().toISOString()
    });
    save();
  }

  /** Retire un séjour du panier */
  function remove(id) {
    items = items.filter(function (item) {
      return item.id !== id;
    });
    save();
  }

  function getItems() {
    return items;
  }

  function count() {
    return items.length;
  }

  /**
   * Applique un code promo.
   * @returns {boolean} true si le code est valide
   */
  function applyPromo(code) {
    const rate = PROMO_CODES[code.trim().toUpperCase()];
    if (!rate) return false;
    discountRate = discountRate + rate;
    return true;
  }

  /** Total à payer, réduction comprise */
  function total() {
    const subtotal = items.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    return subtotal * (1 - discountRate);
  }

  return {
    add: add,
    remove: remove,
    getItems: getItems,
    count: count,
    applyPromo: applyPromo,
    total: total
  };
})();
