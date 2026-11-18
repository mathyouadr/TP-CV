// Amélioration progressive : la page reste complète et lisible sans JavaScript.

const racine = document.documentElement;
const mouvementReduit = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Année du pied de page
const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();

// ---------- Bouton clair / sombre ----------
const bouton = document.querySelector(".bascule-theme");
const systemeSombre = matchMedia("(prefers-color-scheme: dark)");
const metaCouleur = document.querySelector('meta[name="theme-color"]');

const themeActuel = () => racine.dataset.theme || (systemeSombre.matches ? "dark" : "light");

function synchroniser() {
  bouton.setAttribute("aria-pressed", String(themeActuel() === "dark"));
  // La barre du navigateur mobile suit le thème affiché.
  metaCouleur.content = getComputedStyle(racine).getPropertyValue("--c-bg").trim();
}

function basculer() {
  const suivant = themeActuel() === "dark" ? "light" : "dark";
  racine.dataset.theme = suivant;
  try {
    localStorage.setItem("theme", suivant);
  } catch (e) {
    // Navigation privée : le choix ne vaut que pour cette visite.
  }
  synchroniser();
}

if (bouton) {
  bouton.hidden = false;
  synchroniser();
  systemeSombre.addEventListener("change", synchroniser);

  bouton.addEventListener("click", () => {
    // Le nouveau thème s'étend en cercle depuis le bouton quand le navigateur
    // sait faire une transition de vue ; sinon, bascule directe.
    if (!document.startViewTransition || mouvementReduit) {
      basculer();
      return;
    }
    const cadre = bouton.getBoundingClientRect();
    const x = cadre.left + cadre.width / 2;
    const y = cadre.top + cadre.height / 2;
    const rayon = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(basculer);
    transition.ready.then(() => {
      racine.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rayon}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  });
}

// ---------- Déchiffrage du nom ----------
// Chaque lettre passe par des caractères au hasard avant de se fixer.
// Le vrai nom est déjà dans le HTML (et dans l'aria-label du titre).
if (!mouvementReduit) {
  const glyphes = "abcdefghijklmnopqrstuvwxyz0123456789#$%&@*+=<>?/";
  document.querySelectorAll("[data-dechiffre]").forEach((el, rang) => {
    const final = el.textContent;
    el.style.width = `${el.offsetWidth}px`; // évite que le titre ne saute
    const debut = performance.now() + rang * 250;
    const image = () => {
      const fixes = Math.floor((performance.now() - debut) / 70 - 3);
      el.textContent = [...final]
        .map((c, i) => (i < fixes ? c : glyphes[Math.floor(Math.random() * glyphes.length)]))
        .join("");
      if (fixes < final.length) setTimeout(image, 60);
      else el.style.width = "";
    };
    image();
  });
}

// ---------- Révélation et compteurs à l'entrée dans l'écran ----------
const cibles = document.querySelectorAll(".apparait");
const compteurs = document.querySelectorAll("[data-compteur]");

function compter(el) {
  const cible = Number(el.dataset.compteur);
  const debut = performance.now();
  const pas = (maintenant) => {
    const t = Math.min(1, (maintenant - debut) / 1200);
    el.textContent = String(Math.round(cible * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

if ("IntersectionObserver" in window && !mouvementReduit) {
  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        observateur.unobserve(entree.target);
        if (entree.target.dataset.compteur) compter(entree.target);
        else entree.target.classList.add("est-visible");
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  cibles.forEach((el) => observateur.observe(el));
  compteurs.forEach((el) => observateur.observe(el));
} else {
  cibles.forEach((el) => el.classList.add("est-visible"));
}

// ---------- Menu : section en cours de lecture ----------
const liens = document.querySelectorAll(".lien-nav");
if ("IntersectionObserver" in window && liens.length) {
  const suivi = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;
        liens.forEach((lien) => {
          if (lien.getAttribute("href") === "#" + entree.target.id) lien.setAttribute("aria-current", "true");
          else lien.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((section) => suivi.observe(section));
}
