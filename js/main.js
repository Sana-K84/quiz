"use strict";

const $ = document.querySelector.bind(document);

const quiz = $('.quiz');
const warning = $('.warning');
const btnNext = $('.quiz__next-btn');
let count = 0;
let userScore = 0;

if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    showQuetions(count);
} else {
    warning.classList.remove('hidden');
}
function showQuetions(index) {
    const title = $('.quiz__title');
    const list = $('.quiz__list');
    const total = $('.quiz__footer');
    let progress = $('.quiz__progress-inner');

    title.innerHTML = `${questions[index].question}`

    list.innerHTML = '';
    questions[index].options.forEach(el => {
        const text = `<li class='quiz__option'>${el}</li>`
        list.insertAdjacentHTML('beforeend', text)
    })

    total.innerHTML = `${index + 1} из ${questions.length + 1}`;
    progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`
}




console.log(quiz);