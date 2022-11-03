const monsterArray = [
  'zombie',
  'vampire',
  'witch',
  'ghost',
  'monster',
  'devil',
  'demon',
];

const displayWrongLetters = document.querySelector(
  '.game__wrongletters'
);
const displayWord = document.querySelector('.game__displayword');
const restartButton = document.querySelector('.button__restart');
const startButton = document.querySelector('.button__start');
const gameResult = document.querySelector('.game__result');
const countdownTimer = document.querySelector('.game__countdown');
const hangman = document.querySelector('figure');
const hint = document.querySelector('.game__hint');

const figure = {
  figureParts: ['scaffold', 'head', 'body', 'arms', 'legs'],
  show: function () {
    this.figureParts.forEach((part) => {
      hangman.classList.add(part);
    });
  },
  clear: function () {
    this.figureParts.forEach((part) => {
      hangman.classList.remove(part);
    });
  },
};

let mistakes = 0;
let answer = '';
let wrongGuessedLetters = [];
let playerScore = 0;
let gameActive = false;
let timer;
let timeLeft = 60;

figure.show();

addEventListener('keyup', (event) => {
  textInput = event.key.match(/^[a-zåäö]$/i);
  if (textInput === null) {
    return;
  } else {
    comparePressedKey(textInput);
  }
});

startButton.addEventListener('click', startTimer);

restartButton.addEventListener('click', restartGame);

function randomWord() {
  answer =
    monsterArray[Math.floor(Math.random() * monsterArray.length)];
  for (let i = 0; i < answer.length; i++) {
    const paragraph = document.createElement('p');
    const node = document.createTextNode(' _ ');
    paragraph.classList.add(answer[i]);
    paragraph.appendChild(node);
    displayWord.appendChild(paragraph);
  }
}

function comparePressedKey(key) {
  if (playerScore == answer.length - 1) {
    displayCorrectLetter(key);
    gameWon();
  } else if (
    answer.includes(key) &&
    !displayWord.textContent.includes(key)
  ) {
    playerScore++;
    displayCorrectLetter(key);
  } else if (
    (gameActive === true && wrongGuessedLetters.includes(key)) ||
    (gameActive === true && displayWord.textContent.includes(key))
  ) {
    alert(`You have already guessed the letter: ${key}`);
  } else if (gameActive === true) {
    displayHangman();
    wrongGuessedLetters += ` ${key}`;
    displayWrongLetters.textContent = wrongGuessedLetters;
  }
}

function displayCorrectLetter(correctKey) {
  const correctLetterParagraph = document.querySelectorAll('p');
  for (let i = 0; i < correctLetterParagraph.length; i++) {
    if (correctLetterParagraph[i].classList.contains(correctKey)) {
      correctLetterParagraph[i].textContent = correctKey;
    }
  }
}

function displayHangman() {
  mistakes++;
  if (mistakes === 1) {
    document.querySelector('figure').classList.add('scaffold');
  } else if (mistakes === 2) {
    document.querySelector('figure').classList.add('head');
  } else if (mistakes === 3) {
    document.querySelector('figure').classList.add('body');
  } else if (mistakes === 4) {
    document.querySelector('figure').classList.add('arms');
  } else if (mistakes === 5) {
    document.querySelector('figure').classList.add('legs');
    gameOver();
  }
}

function gameOver() {
  gameActive = false;
  document.body.style.backgroundColor = '#555';
  displayWord.textContent = answer;
  gameResult.classList.add('lost');
  gameResult.textContent = 'Game Over';
  clearInterval(timer);
  figure.show();
  removeHiddenClass(restartButton, gameResult);
  addHiddenClass(displayWrongLetters, hint);
}

function restartGame() {
  gameActive = false;
  document.body.style.backgroundColor = '#7349ac';
  displayWord.textContent = '';
  displayWrongLetters.textContent = '';
  wrongGuessedLetters = '';
  mistakes = 0;
  playerScore = 0;
  timeLeft = 60;
  removeHiddenClass(displayWrongLetters, hint);
  addHiddenClass(restartButton, gameResult);
  figure.clear();
  startTimer();
}

function gameWon() {
  gameActive = false;
  gameResult.classList.remove('lost');
  gameResult.textContent = 'You Win!';
  clearInterval(timer);
  removeHiddenClass(restartButton, gameResult);
  addHiddenClass(displayWrongLetters, hint);
}

function removeHiddenClass(...className) {
  for (let i = 0; i < className.length; i++) {
    className[i].classList.remove('hidden');
  }
}

function addHiddenClass(...className) {
  for (let i = 0; i < className.length; i++) {
    className[i].classList.add('hidden');
  }
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) countdownTimer.textContent = timeLeft;
  else {
    gameOver();
  }
}

function startTimer() {
  gameActive = true;
  timer = setInterval(updateTimer, 1000);
  updateTimer();
  randomWord(answer);
  figure.clear();
  addHiddenClass(startButton);
  removeHiddenClass(hint);
}
