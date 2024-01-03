let categories = [{ id: 0, name: "Tous" }];
const filters = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");

// Récupération des catégories
async function GetCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const worksCategories = await reponse.json();

  //Boucle de création des boutons associés aux catégories
  for (let i = 0; i < worksCategories.length; i++) {
    categories[i + 1] = worksCategories[i];
  }
  displayCategories();
}
GetCategories();

// Fonction de création des filtres en fonction du tableau contenant les filtres
function displayCategories() {
  for (let i = 0; i < categories.length; i++) {
    const filter = document.createElement("button");
    filter.classList.add("filter");
    filter.id = categories[i].id;
    filters.appendChild(filter);
    filter.innerText = categories[i].name;

    if (filter.id == 0) {
      filter.classList.add("selected");
    }
  }
}

// Récupération des travaux depuis l'API
async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();
  return works;
}

// Fonction de création des travaux dans le DOM
function createWork(work) {
  const gallery = document.querySelector(".gallery");
  const workElement = document.createElement("figure");
  const workImage = document.createElement("img");
  workImage.src = work.imageUrl;
  const workTitle = document.createElement("figcaption");
  workTitle.innerText = work.title;

  // On rattache la balise figure à la section Gallery
  gallery.appendChild(workElement);
  // On rattache l’image et la légende à projectElement (la balise figure)
  workElement.appendChild(workImage);
  workElement.appendChild(workTitle);
}

// Fonction d'affichage des travaux
function displayWorks(works, categoryId) {
  // Boucle de récupération de tous les éléments du tableau works
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    if (categoryId != 0 && work.categoryId != categoryId) {
      continue;
    }
    createWork(work);
  }
}

getWorks().then((works) => {
  displayWorks(works, 0);
});

// Fonction d'affichage des travaux au clic sur les filtres
async function filterWorks() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      gallery.innerHTML = "";
      buttons.forEach((element) => element.classList.remove("selected"));
      button.classList.add("selected");
      const buttonID = event.target.id;
      displayWorks(works, buttonID);
    });
  });
}
filterWorks();

/* --------------     Partie admin    --------------- */

// Apparition des éléments après login
const userId = window.localStorage.getItem("userId");
const userToken = window.localStorage.getItem("userToken");
const headerAdmin = document.getElementById("header_admin");
const portfolioAdmin = document.getElementById("portfolio_admin");
const navLogin = document.querySelector(".nav_login");
const navLogout = document.querySelector(".nav_logout");
// const editButton = document.querySelector(".open_modal");

// Affichage des éléments du mode admin
function displayLoginMode() {
  console.log(userId);
  if (userId) {
    headerAdmin.style.display = null;
    portfolioAdmin.style.display = null;
    document.getElementById("nav_login").href = "index.html";
    document.getElementById("nav_login").innerHTML = "Logout";
    document.getElementById("nav_login").classList.remove("nav_login");
    document.getElementById("nav_login").classList.add("nav_logout");
  }
}
displayLoginMode();

// Fonction de déconnexion
function logoutMenu() {
  console.log("ok");
  headerAdmin.style.display = "none";
  portfolioAdmin.style.display = "none";
  window.localStorage.clear();
  document.getElementById("nav_login").innerHTML = "Login";
  document.getElementById("nav_login").classList.remove("nav_logout");
  document.getElementById("nav_login").classList.add("nav_login");
}
navLogin.addEventListener("click", logoutMenu);
