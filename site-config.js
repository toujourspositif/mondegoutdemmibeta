window.SITE = {

  /* ---- À COMPLÉTER AVANT DE PUBLIER ---- */
  nomSite: "Mon dégoût de MMI",

  // Prénom NOM de l'éditeur (ou un pseudonyme si tu choisis de rester anonyme, voir plus bas)
  editeurNom: "Francsixsous",

  // Adresse e-mail de contact : sert aux demandes RGPD ET aux signalements de contenus.
  // Pense à la consulter régulièrement. Tu peux créer une adresse dédiée.
  email: "mondegoutdemmi@gmail.com",

  // Région où Supabase héberge ta base. À lire dans Supabase :
  // Project Settings > General > Region. Exemple : "Union européenne (Francfort, Allemagne)"
  regionSupabase: "Centre Europe (Frankfurt)",

  // Service qui envoie les e-mails d'inscription / de réinitialisation (réglé dans Supabase > Authentication > SMTP).
  // Mets "Google (Gmail)" si tu utilises Gmail, ou le nom de ton prestataire.
  emailPrestataire: "Google (Gmail)",

  // true  = site non professionnel, tu restes anonyme du public (ton identité est connue de tes hébergeurs)
  // false = ton nom ET ton adresse postale sont affichés dans les mentions légales
  editeurAnonyme: true,
  editeurAdresse: "",         // à remplir seulement si editeurAnonyme est false

  /* ---- Ne change pas ces valeurs sans mettre à jour les pages légales ---- */
  dateMaj: "21 novembre 2026",
  version: "2026-11-21",      // enregistrée avec le compte comme preuve d'acceptation
  ageMinimum: 15
};

/* Remplit automatiquement les pages légales avec les valeurs ci-dessus. */
(function () {
  var S = window.SITE;
  var missing = [];
  if (!S.editeurNom) missing.push("editeurNom");
  if (!S.email) missing.push("email");
  if (!S.regionSupabase) missing.push("regionSupabase");
  if (!S.editeurAnonyme && !S.editeurAdresse) missing.push("editeurAdresse");
  S.manquants = missing;

  function fill() {
    document.querySelectorAll("[data-site]").forEach(function (n) {
      var v = S[n.getAttribute("data-site")];
      if (v === undefined || v === "" || v === null) {
        n.textContent = "[à compléter]";
        n.classList.add("todo-inline");
      } else {
        n.textContent = v;
      }
    });
    document.querySelectorAll("a[data-mail]").forEach(function (a) {
      if (S.email) a.href = "mailto:" + S.email;
    });
    document.querySelectorAll("[data-missing]").forEach(function (n) { n.textContent = missing.join(", "); });
    document.querySelectorAll("[data-todo]").forEach(function (n) { n.hidden = missing.length === 0; });
    document.querySelectorAll("[data-anon]").forEach(function (n) { n.hidden = !S.editeurAnonyme; });
    document.querySelectorAll("[data-named]").forEach(function (n) { n.hidden = !!S.editeurAnonyme; });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill);
  else fill();
})();
