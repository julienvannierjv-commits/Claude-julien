/**
 * Point d'entrée de l'application.
 *
 * Branche les événements de la page (clics, formulaires) sur les modules
 * métier (search, mood, cart…) puis demande à `render` de mettre à jour l'écran.
 */
(function () {
  const u = Escale.utils;
  const $ = u.$;

  // Liste actuellement affichée dans la grille
  let currentList = Escale.DESTINATIONS.slice();

  /* ---------- Initialisation ---------- */

  function init() {
    Escale.render.moods(null);
    showList(Escale.DESTINATIONS);
    Escale.render.resultsInfo(Escale.DESTINATIONS.length);
    Escale.render.cartBadge();
    bindEvents();
  }

  /** Trie puis affiche une liste de destinations */
  function showList(list) {
    currentList = list;
    Escale.render.results(Escale.search.sort(list, $("#sort-select").value));
  }

  function getTravelers() {
    return parseInt($("#search-travelers").value, 10) || 1;
  }

  /* ---------- Événements ---------- */

  function bindEvents() {
    // Recherche
    $("#search-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const list = Escale.search.filter({
        query: $("#search-query").value,
        budget: parseInt($("#search-budget").value, 10),
        duration: $("#search-duration").value,
        date: $("#search-date").value,
        travelers: getTravelers()
      });
      Escale.render.moods(null);
      showList(list);
      document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
    });

    $("#search-budget").addEventListener("input", function (e) {
      $("#budget-value").textContent = u.formatPrice(e.target.value);
    });

    $("#sort-select").addEventListener("change", function () {
      showList(currentList);
    });

    // Recherche par envie
    $("#mood-list").addEventListener("click", function (e) {
      const btn = e.target.closest("[data-mood]");
      if (!btn) return;
      const active = Escale.mood.toggle(btn.dataset.mood);
      Escale.render.moods(active);
      showList(Escale.mood.filter());
    });

    // Actions sur les cartes
    $("#results-grid").addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const id = btn.closest(".card").dataset.id;
      const destination = u.findDestination(id);

      if (btn.dataset.action === "add") {
        addToCart(destination);
      } else if (btn.dataset.action === "fav") {
        const isFav = Escale.favorites.toggle(id);
        btn.textContent = isFav ? "♥" : "♡";
        btn.classList.toggle("is-fav", isFav);
      } else if (btn.dataset.action === "detail") {
        openDetail(destination);
      }
    });

    // Destination mystère
    $("#mystery-btn").addEventListener("click", function () {
      const destination = Escale.mystery.pick(parseInt($("#search-budget").value, 10));
      openDetail(destination);
      u.toast("🎲 Le hasard a choisi : " + destination.name + " !");
    });

    // Assistant « Inspire-moi »
    $("#inspire-form").addEventListener("submit", function (e) {
      e.preventDefault();
      Escale.render.inspireAnswer(Escale.inspire.suggest($("#inspire-input").value));
    });
    $("#inspire-answer").addEventListener("click", function (e) {
      const btn = e.target.closest("[data-open]");
      if (btn) openDetail(u.findDestination(btn.dataset.open));
    });

    // Panier
    $("#cart-btn").addEventListener("click", openCart);
    $("#cart-close").addEventListener("click", closeCart);
    $("#overlay").addEventListener("click", closeCart);

    $("#cart-items").addEventListener("click", function (e) {
      const btn = e.target.closest("[data-remove]");
      if (!btn) return;
      Escale.cart.remove(btn.dataset.remove);
      Escale.render.cart();
    });

    $("#promo-btn").addEventListener("click", function () {
      const ok = Escale.cart.applyPromo($("#promo-input").value);
      u.toast(ok ? "Code promo appliqué ✅" : "Code promo invalide");
      Escale.render.cart();
    });

    $("#checkout-btn").addEventListener("click", function () {
      u.toast("Le paiement en ligne arrive bientôt ! Appelez-nous au 01 23 45 67 89 pour réserver.");
    });

    // Fiche détail (modale)
    $("#detail-modal").addEventListener("click", function (e) {
      const addBtn = e.target.closest("[data-add-detail]");
      if (addBtn) {
        addToCart(u.findDestination(addBtn.dataset.addDetail));
        return;
      }
      if (e.target.id === "detail-modal") $("#detail-modal").hidden = true;
    });

    // Fonctionnalités pas encore disponibles
    $("#favorites-btn").addEventListener("click", function () {
      u.toast("La page Favoris arrive bientôt.");
    });
    document.querySelectorAll(".nav-soon, .header-actions .btn-ghost").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  /* ---------- Actions ---------- */

  function addToCart(destination) {
    Escale.cart.add(destination, getTravelers());
    Escale.render.cartBadge();
    u.toast(destination.name + " a été ajouté au panier 🧳");
  }

  function openDetail(destination) {
    Escale.render.detail(destination);
    $("#detail-modal").hidden = false;
  }

  function openCart() {
    Escale.render.cart();
    $("#cart-drawer").classList.add("is-open");
    $("#overlay").hidden = false;
  }

  function closeCart() {
    $("#cart-drawer").classList.remove("is-open");
    $("#overlay").hidden = true;
  }

  init();
})();
