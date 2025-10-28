import { projet_quiz } from './script.js';

const question = document.getElementById("question-text");
const reponses = document.getElementById("options-container");
const suivant = document.getElementsByClassName("next-button");
const compteur = document.getElementsByClassName("compteur");

const firstQuestion = projet_quiz.questions[0];

question.innerText = firstQuestion.text;

firstQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    option_btn.classList.add("option-bouton")
    reponses.appendChild(option_btn);

console.log(option_btn)
} )

