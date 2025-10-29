import { projet_quiz } from './script.js';

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

// Sélection des éléments
const landingPage = document.getElementById("landing-page");
const quizSection = document.getElementById("quiz-section");
const startButton = document.getElementById("start-button");

const question = document.getElementById("question-text");
const reponses = document.getElementById("options-container");
const suivant = document.getElementById("next-button");
const compteurQuestions = document.querySelector(".compteurQuestions");
const compteurReponses = document.querySelector(".compteurReponses");

const image = document.getElementById("question-image");

// CHARGEMENT D’UNE QUESTION
function loadQuestion() {
  const currentQuestion = projet_quiz.questions[currentQuestionIndex];

  // Changer l'image automatiquement
  image.src = currentQuestion.image;

  // Mettre à jour le compteur
  compteurQuestions.innerHTML = `Question ${currentQuestionIndex + 1}/ ${projet_quiz.questions.length}`;
  compteurReponses.innerHTML = `✅ ${correctAnswersCount} bonnes réponses`;

  // Vider les anciennes réponses
  reponses.innerHTML = "";

  // Afficher le texte de la question
  question.innerText = currentQuestion.text;

  // Créer les boutons de réponse
  currentQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    option_btn.classList.add("option");
    option_btn.addEventListener("click", () => selectAnswer(option_btn, currentQuestion.correct_answer));
    reponses.appendChild(option_btn);
  });

  suivant.disabled = true;
}

// CONFETTIS 🎊 
function launchConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.animationDelay = Math.random() * 2 + "s";
    confettiContainer.appendChild(confetti);
  }

  // Supprimer après 4 secondes
  setTimeout(() => {
    confettiContainer.remove();
  }, 4000);
}

//SELECTION D’UNE RÉPONSE

function selectAnswer(selectedBtn, correctAnswer) {
  const allButtons = reponses.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true); // Je désactive tous les boutons après avoir cliqué

  if (selectedBtn.innerText === correctAnswer) {
    selectedBtn.classList.add("correct");
    correctAnswersCount++;
    launchConfetti(); 
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
 // FIN DU QUIZ
function finQuiz() {
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
      correctAnswersCount = 0;
      suivant.style.display = "inline-block"; // reafficher le button suivant
      reponses.innerHTML = ""; // revenir a 0
      loadQuestion(); // relancer le quiz
    });}


// BOUTON SUIVANT ======
suivant.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < projet_quiz.questions.length) {
    loadQuestion();
  } else {
    finQuiz()
    compteurQuestions.innerHTML = `Score final : ${correctAnswersCount} / ${projet_quiz.questions.length}`;
  }
});

// LANCEMENT ======

startButton.addEventListener("click", () => {
  landingPage.style.display = "none";
  quizSection.style.display = "block";
  currentQuestionIndex = 0;
  loadQuestion();
});


