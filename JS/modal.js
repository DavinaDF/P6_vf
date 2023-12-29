// Variables globales
const editButton = document.querySelector(".open_modal");
const modal = document.querySelector("aside");
const faClose = document.querySelectorAll(".close");
const modalDeleteWork = document.getElementById("delete_work");
const modalAddWork = document.getElementById("add_work");
const galleryModal = document.querySelector(".gallery_container");
const buttonAddWork = document.querySelector(".button_add");
const arrowBack = document.querySelector(".fa-arrow-left");
const buttonUploadPhoto = document.querySelector(".upload_photo");

// Fonction apparition de la modal
function openModal(e) {
  e.preventDefault();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
}
// Fonction fermeture de la modal
function closeModal(e) {
  e.preventDefault();
  modal.style.display = "none";
  modalDeleteWork.style.display = null;
  modalAddWork.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
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

// Affichage des projets
getWorks().then((works) => {
  displayWorksModal(works);
});
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
  console.log(buttonsDeleteWork);
  buttonsDeleteWork.forEach(function (buttonDelete) {
    buttonDelete.addEventListener("click", function () {
      const deleteId = buttonDelete.id;

      fetch("http://localhost:5678/api/works/" + deleteId, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer {token}",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((json) => console.log(JSON.stringify(json)));

      //   const objectDelete = {
      //     method: "DELETE",
      //     headers: {
      //       Authorization: "Bearer ${token}",
      //       "Content-Type": "application/json",
      //     },
      //   };
      //   fetch("http://localhost:5678/api/works/" + deleteId, objectDelete);
    });
  });

  //   location.reload();
}

// buttonsDeleteWork.forEach(function (buttonDelete) {
//   buttonDelete.addEventListener("click", function () {
//     console.log("clic poubelle ok");
//     const deleteWorkId = buttonDelete.id;
//     console.log(deleteWorkId);
//   });
// });

// Fonction pour afficher la modal d'ajout de travaux
function displayAddWorkModal() {
  modalDeleteWork.style.display = "none";
  modalAddWork.style.display = null;
}
buttonAddWork.addEventListener("click", displayAddWorkModal);

//Fonction qui génère les catégories dynamiquement
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

// Variables
const formAddWork = document.getElementById("formAdd");
const inputFile = document.getElementById("file");
const previewImage = document.getElementById("previewImage");

function previewImg() {
  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        console.log(previewImage.src);
        previewImage.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
    }
  });
}
previewImg();

// function selectImage() {
//   var inputFile = document.getElementById("file");
//   inputFile.addEventListener("change", function () {
//     console.log("je ne comprends pas tout");
//     var reader = new FileReader();
//     reader.readAsDataURL(inputFile);
//     var urlImage = reader.result;
//     console.log(reader);
//     console.log(reader.readAsDataURL(inputFile.files[0]));
//   });
//   return inputFile;
// }
// selectImage();

// document.getElementsByTagName("body")[0].appendChild(
//   selectImage(function (inputFile) {
//     var reader = new FileReader();
//     reader.readAsDataURL(inputFile.files[0]);
//     console.log("Done");
//   })
// );
