let categories = [{ id: 0, name: "Tous" }];
const filters = document.querySelector(".filters");
let idFiltreSelectionne = 0;

// Récupérations des données via l'API
// async function getWorks() {
//   const reponse = await fetch("http://localhost:5678/api/works");
//   const projects = await reponse.json();
//   return projects;
// }
// async function getCategories() {
//   const reponse = await fetch("http://localhost:5678/api/categories");
//   const projectsCategories = await reponse.json();
//   return projectsCategories;
// }

// Récupération des catégories
async function GetCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const projectsCategories = await reponse.json();
  console.log(projectsCategories);
  //Boucle de création des boutons associés aux catégories
  for (let i = 0; i < projectsCategories.length; i++) {
    categories[i + 1] = projectsCategories[i];
  }
  console.log(categories);
  console.log(projectsCategories);

  // Fonction de création des filtres en fonction du tableau contenant les filtres
  function CreerFiltre() {
    console.log(categories.length);
    for (let i = 0; i < categories.length; i++) {
      const filter = document.createElement("button");
      filter.classList.add("filter");
      filter.id = categories[i].id;
      filters.appendChild(filter);
      filter.innerText = categories[i].name;

      console.log(filter.id);
      if (filter.id == 0) {
        filter.classList.add("selected");
        console.log("sélection ajoutée");
      }

      console.log(filter);

      // Fonction pour filtrer au clic sur les boutons
      filter.addEventListener("click", function () {
        const projetsFiltres = projects.filter(function (projet) {
          return projet.categoryId == i;
        });
        console.log(projetsFiltres);
      });
    }
    // categories[0].classList.add("selected");
  }
  CreerFiltre();
}

// Fonction d'affichage au clic sur un des filtres
// function afficherSelonFiltre(idFiltreSelectionne) {

// }

GetCategories().then((categories) => {});

// Récupération des travaux depuis l'API
async function displayWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const projects = await reponse.json();

  console.log(projects);
  // Boucle de récupération de TOUS les éléments travaux de l'API
  for (let i = 0; i < projects.length; i++) {
    console.log("encore coucou");
    const project = projects[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const galleryTravaux = document.querySelector(".gallery");
    // Création d’une balise dédiée à un projet
    const projectElement = document.createElement("figure");
    // On crée l’élément img contenu dans la balise figure
    const projectImage = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    projectImage.src = project.imageUrl;
    // Idem pour le nom
    const projectTitle = document.createElement("figcaption");
    projectTitle.innerText = project.title;

    // On rattache la balise figure à la section Gallery
    galleryTravaux.appendChild(projectElement);
    // On rattache l’image et la légende à projectElement (la balise figure)
    projectElement.appendChild(projectImage);
    projectElement.appendChild(projectTitle);

    //On récupère la catégorie du projet
    // const projectCategory = project.category;
    // const category = [];
    // category[i] = project[i].category;
    // console.log(2);

    // for (let index = 1; index < projects.length; index++) {}
  }

  //Récupération des catégories et création des boutons associés
}

console.log("Coucou");

displayWorks().then((projects) => {});

// Récupération des catégories et création des boutons associés

// async function afficherFilms() {
//   const reponse = await fetch("http://localhost:5678/api/works");
//   const films = await reponse.json();
// }

// afficherFilms().then((films) => {
//   console.log(films);
// });

// const labelFiltre = "";
