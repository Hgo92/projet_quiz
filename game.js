import { projet_quiz } from './script.js';

const question = document.getElementById("question-text");
const reponses = document.getElementsByClassName("options");
const suivant = document.getElementsByClassName("next-button");
const compteur = document.getElementsByClassName("compteur");

const firstQuestion = projet_quiz.questions[3];

question.innerText = firstQuestion.text;

console.log(firstQuestion.text)
console.log(question.innerText)