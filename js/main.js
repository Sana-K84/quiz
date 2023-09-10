"use strict";

const $ = document.querySelector.bind(document);

const quiz = $('.quiz');
const warning = $('.warning');
const btnNext = $('.quiz__next-btn');
let count = 0;
let userScore = 0;

btnNext.addEventListener('click', nextQuestion)


if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    showQuetions(count);
} else {
    warning.classList.remove('hidden');
}

// отображает контент
function showQuetions(index) {
    const title = $('.quiz__title');
    const list = $('.quiz__list');
    const total = $('.quiz__total');
    let progress = $('.quiz__progress-inner');

    title.innerHTML = `${questions[index].question}`

    list.innerHTML = '';
    questions[index].options.forEach(el => {
        const text = `<li class='quiz__option'>${el}</li>`
        list.insertAdjacentHTML('beforeend', text)
    })

    const options = list.querySelectorAll('.quiz__option');
    options.forEach(el => el.setAttribute('onclick', 'optionSelected(this)'));

    total.innerHTML = `${index + 1} из ${questions.length}`;
    progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`;
}

// обрабатывает ответ
function optionSelected(answer) {
    const userAnswer = answer.textContent;
    const correctAnswer = questions[count].answer;
    const options = document.querySelectorAll('.quiz__option');
    const iconCorrect = "<span>&#10004;</span>";
    const iconIncorrect = "<span>&#9940;</span>";

    if (userAnswer == correctAnswer) {
        userScore += 1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', iconCorrect);
    } else {
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML('beforeend', iconIncorrect);

        options.forEach(el => {
            if (el.textContent == correctAnswer) {
                setTimeout(() => {
                    el.classList.add('corect');
                    el.insertAdjacentHTML('beforeend', iconCorrect)
                }, 100)
            }
        })
    }
    options.forEach(el => el.classList.add('disabled'))
}

function nextQuestion() {

    const option = $('.quiz__option');
    const result = $('.result');
    const resultText = $('.result__text');

    if ((count + 1) == questions.length && option.classList.contains('disabled')) {
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        resultText.innerHTML = `Количество правильных ответов: ${userScore} из ${questions.length}`
        return
    }

    if (option.classList.contains('disabled')) {
        count++;
        showQuetions(count);
    } else {
        alert('Выбери один из вариантов, потом переходи к следующему');
    }


}