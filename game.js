import { projet_quiz } from './script.js';

let currentQuestionIndex = -1; // Je prépare l'index des questions, comme ça je pourrais faire +1 à chaque changement de question
const landingPage = document.getElementById("landing-page");
const quizSection = document.getElementById("quiz-section");
const startButton = document.getElementById("start-button");
const question = document.getElementById("question-text");
const reponses = document.getElementById("options-container");
const suivant = document.getElementById("next-button");
const compteur = document.getElementsByClassName("compteur");

// J'ai créé des variables et je les ai liées aux éléments du HTML dont j'ai besoin (le bloc question, le bloc réponses, le bouton suivant, le compteur)
// Show quiz only after clicking "Commencer"
startButton.addEventListener("click", () => {
  landingPage.style.display = "none";
  quizSection.style.display = "block";
  currentQuestionIndex = 0;
  loadQuestion();
});
function loadQuestion() { // Je crée ma fonction qui va charger les questions 
reponses.innerHTML = " "; // Je vide la section réponses pour être sûr qu'il n'y a pas déjà des boutons

const firstQuestion = projet_quiz.questions[currentQuestionIndex]; // Ici je vais chercher mes questions et mes réponses dans mon fichier script.js

question.innerText = firstQuestion.text; // Je mets le texte de la question dans le bloc question

firstQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    option_btn.classList.add("option")
    reponses.appendChild(option_btn);

} ) // Je crée une boucle pour chaque réponse possible (4) : je crée un bouton(createElement), je lui donne le texte de la réponse(.innerText), je lui mets la classe "option" pour que le CSS s'applique (classList.add) et je la mets en enfant du bloc de réponses dans le HTML (appendChild)

}

function selectAnswer(selectedBtn, correctAnswer) {
  const allButtons = reponses.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedBtn.innerText === correctAnswer) {
    selectedBtn.classList.add("correct");
    correctAnswersCount++;
    launchConfetti(); // 🎉 Appel ici
  } else {
    selectedBtn.classList.add("wrong");
  }

  allButtons.forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  

  compteurReponses.innerText = `Bonnes réponses : ${correctAnswersCount}`;
  suivant.disabled = false;
}
suivant.addEventListener("click", () => {
  // Vérifie s'il reste des questions
  if (currentQuestionIndex < projet_quiz.questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    // Fin du quiz
    question.innerText = "🎉 Terminé ! Bravo d'avoir complété le quiz 🎬🎵";
    reponses.innerHTML = ""; // j'efface les reponses 
    suivant.style.display = "none"; // je cache le button suivant

    // bouton "Rejouer"
    const replayButton = document.createElement("button");
    replayButton.innerText = "Rejouer";
    replayButton.classList.add("option"); // pour garder le même style
    reponses.appendChild(replayButton);

    // Quand on clique sur Rejouer on réinitialiser le quiz
    replayButton.addEventListener("click", () => {
      currentQuestionIndex = 0; // revenir à la première question
      suivant.style.display = "inline-block"; // reafficher le button suivant
      reponses.innerHTML = ""; // revenir a 0
      loadQuestion(); // relancer le quiz
    });
  }
});


// Je crée un écouteur d'événement sur mon bouton suivant (addEventListener)
