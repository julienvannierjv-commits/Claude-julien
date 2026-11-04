/**
 * Affichage (rendu HTML).
 *
 * Toutes les fonctions qui transforment les données en éléments visibles :
 * cartes de destinations, ambiances, panier, fiche détail.
 * Ce module n'a pas de logique métier : il affiche ce qu'on lui donne.
 */
window.Escale = window.Escale || {};

Escale.render = (function () {
  const u = Escale.utils;

  const CARBON_LABELS = {
    "faible": "🌱 CO₂ faible",
    "moyen": "🌤️ CO₂ moyen",
    "élevé": "🔥 CO₂ élevé"
  };

  /** Libellé lisible de la durée */
  function durationLabel(days) {
    return days + " jours";
  }

  /** HTML d'une carte destination */
  function card(d) {
    const level = Escale.carbon.level(d);
    const fav = Escale.favorites.has(d.id);
    return (
      '<article class="card" data-id="' + d.id + '">' +
        '<div class="card-visual" style="background: linear-gradient(135deg, ' + d.colors[0] + ', ' + d.colors[1] + ')">' +
          '<span class="card-emoji">' + d.emoji + "</span>" +
          '<button class="fav-btn' + (fav ? " is-fav" : "") + '" data-action="fav">' + (fav ? "♥" : "♡") + "</button>" +
          '<span class="badge carbon-' + level + '">' + CARBON_LABELS[level] + "</span>" +
        "</div>" +
        '<div class="card-body">' +
          '<div class="card-title">' +
            "<h3>" + d.name + "</h3>" +
            '<span class="rating">★ ' + d.rating + "</span>" +
          "</div>" +
          '<p class="card-country">' + d.country + " · " + durationLabel(d.durationDays) + "</p>" +
          '<p class="card-desc">' + d.description + "</p>" +
          '<div class="card-foot">' +
            '<p class="price"><small>dès</small> ' + u.formatPrice(d.price) + "<small> / pers.</small></p>" +
            '<div class="card-actions">' +
              '<button class="btn btn-ghost btn-sm" data-action="detail">Voir</button>' +
              '<button class="btn btn-primary btn-sm" data-action="add">Ajouter</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /** Affiche la grille de résultats */
  function results(list) {
    u.$("#results-grid").innerHTML = list.map(card).join("");
  }

  /** Affiche le nombre de destinations */
  function resultsInfo(count) {
    u.$("#results-info").textContent = count + " destinations disponibles";
  }

  /** Affiche les boutons d'ambiance */
  function moods(activeId) {
    u.$("#mood-list").innerHTML = Escale.mood.MOODS.map(function (m) {
      return (
        '<button class="mood' + (m.id === activeId ? " is-active" : "") + '" data-mood="' + m.id + '">' +
          '<span class="mood-icon">' + m.icon + "</span>" + m.label +
        "</button>"
      );
    }).join("");
  }

  /** Met à jour la pastille du panier dans l'en-tête */
  function cartBadge() {
    u.$("#cart-count").textContent = Escale.cart.count();
  }

  /** Affiche le contenu du panier */
  function cart() {
    const items = Escale.cart.getItems();
    u.$("#cart-items").innerHTML = items.map(function (item) {
      return (
        '<li class="cart-item">' +
          '<span class="cart-emoji">' + item.emoji + "</span>" +
          '<div class="cart-info">' +
            "<strong>" + item.name + "</strong>" +
            "<small>👥 " + item.travelers + " voyageur(s) · " + u.formatPrice(item.price) + " / pers.</small>" +
          "</div>" +
          '<button class="icon-btn" data-remove="' + item.id + '">🗑</button>' +
        "</li>"
      );
    }).join("");
    u.$("#cart-total").textContent = u.formatPrice(Escale.cart.total());
  }

  /** Affiche la fiche détaillée d'une destination dans la modale */
  function detail(d) {
    u.$("#detail-content").innerHTML =
      '<div class="detail-visual" style="background: linear-gradient(135deg, ' + d.colors[0] + ", " + d.colors[1] + ')">' +
        '<span class="card-emoji big">' + d.emoji + "</span>" +
      "</div>" +
      '<div class="detail-body">' +
        '<p class="eyebrow">' + d.country + " · " + d.continent + "</p>" +
        "<h2>" + d.name + "</h2>" +
        "<p>" + d.description + "</p>" +
        "<h4>Au programme</h4>" +
        "<ul>" + d.highlights.map(function (h) { return "<li>" + h + "</li>"; }).join("") + "</ul>" +
        '<div class="detail-facts">' +
          "<div><small>Durée</small><strong>" + durationLabel(d.durationDays) + "</strong></div>" +
          "<div><small>Transport</small><strong>" + d.transport + "</strong></div>" +
          "<div><small>Empreinte</small><strong>" + Escale.carbon.estimate(d) + " kg CO₂</strong></div>" +
        "</div>" +
        '<div class="detail-foot">' +
          '<p class="price">€' + d.price + "</p>" +
          '<button class="btn btn-primary" data-add-detail="' + d.id + '">Ajouter au panier</button>' +
        "</div>" +
      "</div>";
  }

  /** Affiche la réponse de l'assistant « Inspire-moi » */
  function inspireAnswer(result) {
    const box = u.$("#inspire-answer");
    box.hidden = false;
    box.innerHTML =
      "<p>" + result.message + "</p>" +
      (result.destination
        ? '<button class="btn btn-ghost btn-sm" data-open="' + result.destination.id + '">Voir la destination</button>'
        : "");
  }

  return {
    results: results,
    resultsInfo: resultsInfo,
    moods: moods,
    cartBadge: cartBadge,
    cart: cart,
    detail: detail,
    inspireAnswer: inspireAnswer
  };
})();
