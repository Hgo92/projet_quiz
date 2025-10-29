import { projet_quiz } from './script.js';

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

// Sélection des éléments
const question = document.getElementById("question-text");
const reponses = document.getElementById("options-container");
const suivant = document.getElementById("next-button");
const compteurQuestions = document.querySelector(".compteurQuestions");
const compteurReponses = document.querySelector(".compteurReponses");
const image = document.getElementById("question-image");

// ====== CHARGEMENT D’UNE QUESTION ======
function loadQuestion() {
  const currentQuestion = projet_quiz.questions[currentQuestionIndex];

  // Changer l'image automatiquement (assure-toi que chaque question ait une image dans script.js)
  image.src = currentQuestion.image;

  // Mettre à jour le compteur
  compteurQuestions.innerHTML = `<span>Question ${currentQuestionIndex + 1}</span> / <span>${projet_quiz.questions.length}</span>`;
  compteurReponses.innerHTML = `<span>✅ ${correctAnswersCount}</span> bonnes réponses`;

  // Vider les anciennes réponses
  reponses.innerHTML = "";
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

// ====== SELECTION D’UNE RÉPONSE ======
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

// ====== BOUTON SUIVANT ======
suivant.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < projet_quiz.questions.length) {
    loadQuestion();
  } else {
    question.innerText = "🎉 Quiz terminé !";
    reponses.innerHTML = "";
    suivant.style.display = "none";
    image.style.display = "none";
    compteurQuestions.innerHTML = `Score final : ${correctAnswersCount} / ${projet_quiz.questions.length}`;
  }
});

// ====== CONFETTIS 🎊 ======
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

// ====== LANCEMENT ======
loadQuestion();



