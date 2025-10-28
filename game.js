import { projet_quiz } from './script.js';

let currentQuestionIndex = 0;

const question = document.getElementById("question-text");
const reponses = document.getElementById("options-container");
const suivant = document.getElementsByClassName("next-button");
const compteur = document.getElementsByClassName("compteur");

const firstQuestion = projet_quiz.questions[currentQuestionIndex];

question.innerText = firstQuestion.text;

firstQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    option_btn.classList.add("option")
    reponses.appendChild(option_btn);

console.log(option_btn)
} )

