// Variables globales
const editButton = document.querySelector(".open_modal");
const backgroundModal = document.getElementById("background_modal");
const modal = document.querySelector("aside");
const faClose = document.querySelectorAll(".close");
const modalDeleteWork = document.getElementById("delete_work");
const modalAddWork = document.getElementById("add_work");
const galleryModal = document.querySelector(".gallery_container");
const buttonAddWork = document.querySelector(".button_add");
const arrowBack = document.querySelector(".fa-arrow-left");
const buttonUploadPhoto = document.querySelector(".upload_photo");
// Variables du formulaire d'ajout
const formAddWork = document.getElementById("formAdd");
const inputFile = document.getElementById("file");
const previewImage = document.getElementById("previewImage");
const inputTitle = document.getElementById("title_new_work");
const selectedCategory = document.getElementById("category_new_work");

// Fonction apparition de la modal
function openModal(e) {
  e.preventDefault();
  modal.style = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  // Affichage des projets
  galleryModal.innerHTML = "";
  getWorks().then((works) => {
    displayWorksModal(works);
  });
}
// Fonction fermeture de la modal
function closeModal(e) {
  e.preventDefault();
  // Affichage des projets sur la page d'accueil
  gallery.innerHTML = "";
  getWorks().then((works) => {
    displayWorks(works, 0);
  });
  modal.style = "display:none;";
  modalDeleteWork.style.display = null;
  modalAddWork.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  inputFile.value = "";
  previewImage.src = "#";
  previewImage.style.display = "none";
  inputTitle.value = "";
  selectedCategory.value = "";
}

// Actions au clic
editButton.addEventListener("click", openModal);
faClose.forEach(function (xmarkClose) {
  xmarkClose.addEventListener("click", closeModal);
});
arrowBack.addEventListener("click", function () {
  modalDeleteWork.style.display = null;
  modalAddWork.style.display = "none";
});
backgroundModal.addEventListener("click", function (e) {
  const modalWrapper = document.querySelector(".modal_wrapper");
  if (!modalWrapper.contains(e.target)) {
    closeModal(e);
  }
});
formAddWork.addEventListener("submit", addNewWork);

function displayWorksModal(works) {
  // Boucle de récupération de tous les éléments du tableau works
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    // On crée les balises pour chaque projet à afficher
    const workElement = document.createElement("figure");
    const workImage = document.createElement("img");
    const workIconDelete = document.createElement("i");
    workIconDelete.id = work.id;
    workIconDelete.classList.add("fa-solid", "fa-trash-can");
    workImage.src = work.imageUrl;

    // On rattache les balises à la div gallery_container
    galleryModal.appendChild(workElement);
    workElement.appendChild(workImage);
    workElement.appendChild(workIconDelete);
  }
  // Appel de la fonction de suppression des projets
  deleteWork();
}

// Fonction de suppression des travaux
function deleteWork() {
  const buttonsDeleteWork = document.querySelectorAll(".fa-trash-can");
  buttonsDeleteWork.forEach(function (buttonDelete) {
    buttonDelete.addEventListener("click", function () {
      // e.preventDefault();
      const deleteId = buttonDelete.id;
      fetch("http://localhost:5678/api/works/" + deleteId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "same-origin",
      }).then(() => {
        getWorks().then((works) => {
          gallery.innerHTML = "";
          galleryModal.innerHTML = "";
          displayWorksModal(works);
          displayWorks(works, 0);
        });
      });
    });
  });
}

// Fonction pour afficher la modal d'ajout de travaux
function displayAddWorkModal() {
  modalDeleteWork.style.display = "none";
  modalAddWork.style.display = null;
}
buttonAddWork.addEventListener("click", displayAddWorkModal);

//Fonction qui génère les catégories dynamiquement pour liste
async function displayCategoryModal() {
  const select = document.querySelector("form select");
  const reponse = await fetch("http://localhost:5678/api/categories");
  const worksCategories = await reponse.json();

  worksCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}
displayCategoryModal();

// ------------------------- //
// Partie permettant d'ajouter un projet

function previewImg() {
  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
    }
  });
}
previewImg();

function checkForm() {
  const validateButton = document.querySelector(".button_submit");
  formAddWork.addEventListener("input", () => {
    if (
      !inputFile.value == "" &&
      !inputTitle.value == "" &&
      !selectedCategory.value == ""
    ) {
      validateButton.classList.remove("button_grey");
      validateButton.classList.add("button_green");
    } else {
      validateButton.classList.remove("button_green");
      validateButton.classList.add("button_grey");
    }
  });
}
checkForm();

// Fonction ajout travaux dans API
function addNewWork() {
  // On récupère les valeurs du formulaire
  const formData = new FormData(formAddWork);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  }).then(() => {
    getWorks().then((works) => {
      galleryModal.innerHTML = "";
      displayWorksModal(works);
    });
  });
}
