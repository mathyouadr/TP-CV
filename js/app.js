// Amélioration progressive : la page reste complète sans JavaScript.

// Année du pied de page
const annee = document.getElementById("annee");
if (annee) {
  annee.textContent = new Date().getFullYear();
}

// Bouton mode clair / mode sombre (caché tant que JavaScript n'est pas chargé)
const racine = document.documentElement;
const boutonTheme = document.querySelector(".theme-toggle");
const systemeSombre = window.matchMedia("(prefers-color-scheme: dark)");

function themeActuel() {
  return racine.dataset.theme || (systemeSombre.matches ? "dark" : "light");
}

function majBoutonTheme() {
  boutonTheme.setAttribute("aria-pressed", String(themeActuel() === "dark"));
}

if (boutonTheme) {
  boutonTheme.hidden = false;
  majBoutonTheme();

  boutonTheme.addEventListener("click", () => {
    const nouveau = themeActuel() === "dark" ? "light" : "dark";
    racine.dataset.theme = nouveau;
    try {
      localStorage.setItem("theme", nouveau);
    } catch (e) {
      // Stockage indisponible (navigation privée) : le choix vaut pour cette visite
    }
    majBoutonTheme();
  });

  systemeSombre.addEventListener("change", majBoutonTheme);
}

// Surligne dans le menu la section en cours de lecture
const liens = document.querySelectorAll(".nav-list a");
if ("IntersectionObserver" in window && liens.length) {
  const observer = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;
        liens.forEach((lien) => {
          if (lien.getAttribute("href") === "#" + entree.target.id) {
            lien.setAttribute("aria-current", "true");
          } else {
            lien.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}
