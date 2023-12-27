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

getWorks().then((works) => {
  displayWorks(works, 0);
  console.log("affichage projets ok");
});

function displayWorks(works, categoryId) {
  // Boucle de récupération de tous les éléments du tableau works
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    if (categoryId != 0 && work.categoryId != categoryId) {
      continue;
    }

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
}

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
      console.log(buttonID);
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
const navLogin = document.getElementById("nav_login");
// const editButton = document.querySelector(".open_modal");

console.log(navLogin);

function displayLoginMode() {
  if (userId) {
    headerAdmin.style.display = null;
    portfolioAdmin.style.display = null;
    document.getElementById("nav_login").href = "#";
    document.getElementById("nav_login").innerHTML = "Logout";
    document.getElementById("nav_login").classList.add("nav_logout");
  }
}
displayLoginMode();

const navLogout = document.querySelector(".nav_logout");

function logoutMenu() {
  if (navLogout) {
    headerAdmin.style.display = "none";
    portfolioAdmin.style.display = "none";
    window.localStorage.clear();
    document.getElementById("nav_login").innerHTML = "Login";
    document.getElementById("nav_login").classList.remove("nav_logout");
  }
  // if ((document.getElementById("nav_login").innerHTML = "Login")) {
  //   document.getElementById("nav_login").href = "login.html";
  // }
}

navLogout.addEventListener("click", logoutMenu);

// Apparition de la modal
// const modal = document.querySelector("aside");
// const faClose = document.querySelector(".close");
// console.log(faClose);

// function openModal(e) {
//   e.preventDefault();
//   modal.style.display = null;
//   modal.removeAttribute("aria-hidden");
//   modal.setAttribute("aria-modal", "true");
// }

// function closeModal(e) {
//   e.preventDefault();
//   modal.style.display = "none";
//   modal.setAttribute("aria-hidden", "true");
//   modal.removeAttribute("aria-modal");
// }

// editButton.addEventListener("click", openModal);
// faClose.addEventListener("click", closeModal);
