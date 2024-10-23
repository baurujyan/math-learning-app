const operators = ['+', '-', '*', '/'];
let currentOperator;
let num1, num2;
let difficulty = 1;
let streak = 0;
let isWaitingForNextProblem = false;

const num1Element = document.getElementById('num1');
const operatorElement = document.getElementById('operator');
const num2Element = document.getElementById('num2');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');
const streakElement = document.querySelector('#streak span');
const levelElement = document.querySelector('#level span');

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function generateProblem() {
    currentOperator = operators[Math.floor(Math.random() * operators.length)];
    
    do {
        switch (currentOperator) {
            case '+':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * (100 - num1)) + 1;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 99) + 1;
                num2 = Math.floor(Math.random() * num1) + 1;
                break;
            case '*':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                break;
            case '/':
                num2 = Math.floor(Math.random() * 10) + 1;
                num1 = num2 * (Math.floor(Math.random() * 10) + 1);
                break;
        }
    } while (getResult() > 100);

    num1Element.textContent = num1;
    operatorElement.textContent = currentOperator;
    num2Element.textContent = num2;
    answerInput.value = '';
    resultElement.textContent = '';

    animateElement(num1Element);
    animateElement(operatorElement);
    animateElement(num2Element);
}

function getResult() {
    switch (currentOperator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
    }
}

function animateElement(element) {
    element.classList.add('pop');
    setTimeout(() => {
        element.classList.remove('pop');
    }, 300);
}

function checkAnswer() {
    if (isWaitingForNextProblem) return;

    const userAnswer = parseFloat(answerInput.value);
    let correctAnswer;

    switch (currentOperator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = num1 / num2;
            break;
    }

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = '#4CAF50';
        streak++;
        streakElement.textContent = streak;
        if (streak % 3 === 0) {
            difficulty++;
            levelElement.textContent = difficulty;
            resultElement.textContent += ' Level up!';
        }
    } else {
        resultElement.textContent = 'Incorrect. Try again!';
        resultElement.style.color = '#ff6b6b';
        streak = 0;
        difficulty = 1;
        streakElement.textContent = streak;
        levelElement.textContent = difficulty;
    }

    animateElement(resultElement);
    isWaitingForNextProblem = true;
    submitButton.disabled = true;
    answerInput.disabled = true;

    setTimeout(() => {
        generateProblem();
        isWaitingForNextProblem = false;
        submitButton.disabled = false;
        answerInput.disabled = false;
        answerInput.focus();
    }, 1500);
}

submitButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && !isWaitingForNextProblem) {
        checkAnswer();
    }
});

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeIcon(isDarkMode);
}

function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Check for user's preference in localStorage
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
}

darkModeToggle.addEventListener('click', toggleDarkMode);

generateProblem();
