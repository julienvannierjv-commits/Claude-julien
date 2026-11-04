/**
 * Assistant « Inspire-moi » (innovation, prototype bêta).
 *
 * Le voyageur décrit son voyage idéal en langage naturel. Le prototype
 * repère quelques mots-clés et propose une destination.
 * Ce n'est pas encore une vraie IA : la version cible est à définir.
 */
window.Escale = window.Escale || {};

Escale.inspire = (function () {
  // Mot-clé repéré dans le texte -> ambiance correspondante
  const KEYWORDS = {
    plage: "soleil",
    soleil: "soleil",
    chaud: "soleil",
    rando: "aventure",
    aventure: "aventure",
    trek: "aventure",
    musee: "culture",
    histoire: "culture",
    culture: "culture",
    montagne: "nature",
    nature: "nature",
    manger: "gastronomie",
    cuisine: "gastronomie",
    calme: "deconnexion",
    repos: "deconnexion"
  };

  /**
   * Propose une destination à partir d'une description libre.
   * @returns {{destination: Object|null, message: string}}
   */
  function suggest(text) {
    const words = text.toLowerCase().split(/\s+/);
    let mood = null;

    words.forEach(function (word) {
      if (KEYWORDS[word]) mood = KEYWORDS[word];
    });

    if (!mood) {
      return {
        destination: null,
        message: "Je n'ai pas bien compris votre envie. Essayez avec des mots comme « plage », « montagne » ou « culture »."
      };
    }

    const match = Escale.DESTINATIONS.find(function (d) {
      return d.moods.includes(mood);
    });

    return {
      destination: match,
      message: "Pour un voyage « " + mood + " », je vous recommande " + match.name + " (" + match.country + ")."
    };
  }

  return { suggest: suggest };
})();
