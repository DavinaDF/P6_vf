const galleryModal = document.querySelector(".gallery_container");
const editButton = document.querySelector(".open_modal");
const buttonAddWork = document.querySelector(".button_add");
const modalDeleteWork = document.getElementById("delete_work");
const modalAddWork = document.getElementById("add_work");

// Apparition de la modal
const modal = document.querySelector("aside");
const faClose = document.querySelector(".close");
console.log(faClose);

function openModal(e) {
  e.preventDefault();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
}

function closeModal(e) {
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
}

editButton.addEventListener("click", openModal);
faClose.addEventListener("click", closeModal);

getWorks().then((works) => {
  displayWorksModal(works);
  console.log("affichage ok");
});

function displayWorksModal(works) {
  // Boucle de récupération de tous les éléments du tableau works
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const workElement = document.createElement("figure");
    const workImage = document.createElement("img");
    workImage.src = work.imageUrl;

    // On rattache la balise figure à la section Gallery
    galleryModal.appendChild(workElement);
    // On rattache l’image et la légende à projectElement (la balise figure)
    workElement.appendChild(workImage);
  }
}

function displayAddWorkModal() {
  modalDeleteWork.style.display = "none";
  modalAddWork.style.display = null;
}

buttonAddWork.addEventListener("click", displayAddWorkModal);
