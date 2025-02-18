/**
 * Code de base, ne pas modifier
 */

// Définition
const boutonVoyageHTML = document.querySelector(".btn-voyage");
const localisationEpoqueHTML = document.querySelector(".localisation_epoque");
const listeArtefactHTML = document.querySelector(".liste_artefacts");
const formChoixEpoqueHtml = document.querySelector(".form__choix_epoque");
const formRechercheArtefact = document.querySelector(
  ".form__recherche_artefact"
);

const epoque_element = document.querySelector(".localisation_epoque");
const loading_element = document.querySelector(".voyage_en_cours");


const epoques = {
  romaine: "Romaine",
  medievale: "Médievale",
  jurassique: "Jurassique",
};

const creerLesChoixEpoque = (epoques) => {
  const selectHtml = formChoixEpoqueHtml.querySelector("select");
  Object.entries(epoques).forEach(([id_epoque, nom_epoque]) => {
    const option = document.createElement("option");
    option.value = id_epoque;
    option.text = nom_epoque;
    selectHtml.appendChild(option);
  });
};

function generationNombreAleatoireEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const afficherDestination = (nomEpoque) =>
  (localisationEpoqueHTML.textContent = nomEpoque);

// Execution
formChoixEpoqueHtml.addEventListener("submit", (event) => {
  event.preventDefault();
  const epoque = new FormData(formChoixEpoqueHtml).get("epoque");

  if (!epoque) {
    alert("Choisie une époque de voyage temporel Chronos !");
    return;
  }

  quandEpoqueChoisie(epoque);
});

formRechercheArtefact.addEventListener("submit", (event) => {
  event.preventDefault();
  const artefact = new FormData(formRechercheArtefact).get("artefact");
  quandRechercheArtefact(artefact);
});

const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */
let nomEpoqueActuelle;

creerLesChoixEpoque(epoques);

// Fonction appelée plus haut quand le formulaire de voyage temporel est soumis
// et qu'une époque de destination du voyage temporel a été choisi
function quandEpoqueChoisie(nomEpoque) {
  nomEpoqueActuelle = nomEpoque;
  // --- Cache l'époque de la destination
  epoque_element.style.display = "none";
  //---  Affiche le "loader" de chargement
  loading_element.style.display = "block";

// ---- Le Téléporteur Temporel ----

  // Utilisation de votre fonction voyagerTemps
  voyagerTemps(nomEpoque, () => {
    loading_element.style.display ="none";
    epoque_element.style.display = "block";
    afficherDestination(nomEpoque);
  });
}

function voyagerTemps(destination, callback){
  setTimeout( () => {
    callback(destination);
  }, generationNombreAleatoireEntre(1000, 3000));
};

// ----  La Collecte d'Artefact Mystère ----

// Fonction appelée plus haut quand le formulaire de recherche d'artefact est soumis

// Gère la recherche de l'artefact, est l'affiche
function quandRechercheArtefact(artefact) {
  // Utilisation de votre fonction collecterArtefact
  collecterArtefact(artefact, (boolean, nom) => {
    afficherRechercheArtefact({ artefact: nom, epoque: nomEpoqueActuelle, success: boolean });
  });
};

function collecterArtefact(nomArtefact, callback){
  setTimeout( () => {
    const boolean = Math.random() * 100 < 50; // Génère un booléen (true ou false)
    callback(boolean, nomArtefact);
  }, 1000, 3000);
};

// ----  La Mission Temporelle Complexe ----


