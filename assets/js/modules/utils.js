/**
 * Fonctions utilitaires partagées par les autres modules.
 */
window.Escale = window.Escale || {};

Escale.utils = (function () {
  /** Formate un prix en euros, ex. 1250 -> "1 250 €" */
  function formatPrice(value) {
    return Math.round(value).toLocaleString("fr-FR") + " €";
  }

  /** Raccourci pour document.querySelector */
  function $(selector) {
    return document.querySelector(selector);
  }

  /** Affiche un message temporaire en bas de l'écran */
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(el._timer);
    el._timer = setTimeout(function () {
      el.hidden = true;
    }, 2800);
  }

  /** Retrouve une destination par son identifiant */
  function findDestination(id) {
    return Escale.DESTINATIONS.find(function (d) {
      return d.id === id;
    });
  }

  return { formatPrice: formatPrice, $: $, toast: toast, findDestination: findDestination };
})();
