const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("mdp");
let arrayUserData;

// Quand on submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  const userEmail = email.value;
  const userPassword = password.value;
  // Création de l'utilisateur au format JSON
  const user = JSON.stringify({
    email: userEmail,
    password: userPassword,
  });

  getResponseUser(user)
    .then((userData) => {
      const userId = userData.userId;
      const userToken = userData.token;
      arrayUserData = [userId, userToken];
      return arrayUserData;
    })
    .then((arrayData) => {
      login(arrayData[0], arrayData[1]);
    });
});

// Demande de la réponse de l'API
async function getResponseUser(user) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    // Création
    body: user,
  });
  const result = await response.json();
  return result;
}

// Fonction de connection
async function login(id, token) {
  if (id && token) {
    clearErrorMessage();
    window.localStorage.setItem("userId", id);
    window.localStorage.setItem("userToken", token);
    window.location = "index.html";
  } else {
    displayErrorMessage();
  }
}

// Fonction d'affichage d'un message d'erreur
function displayErrorMessage() {
  email.style.border = "1px solid #FF0000";
  password.style.border = "1px solid #FF0000";
  const errorMessage = document.querySelector(".error_message");
  errorMessage.textContent = "L'e-mail ou le mot de passe est incorrect.";
}

function clearErrorMessage() {
  email.style.border = "none";
  password.style.border = "none";
  const errorMessage = document.querySelector(".error_message");
  errorMessage.style.display = "none";
}
