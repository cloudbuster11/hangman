/*
KVAR ATT GÖRA:
* clear funktion?
* ta bort kommentarer
*/

const monsterArray = [
  'zombie',
  'vampire',
  'witch',
  'ghost',
  'monster',
  'devil',
  'demon',
];

// DOM
const displayWrongLetters = document.querySelector(
  '.game__wrongletters'
); // visa felgissade ord här
const displayWord = document.querySelector('.game__displayword'); // visa ord här
const restartButton = document.querySelector('.button__restart'); // knapp för att starta om spelet
const startButton = document.querySelector('.button__start'); // starta timer knapp
const gameResult = document.querySelector('.game__result'); // visa game over text
const countdownTimer = document.querySelector('.game__countdown'); // visar timer
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

// Variabler
let mistakes = 0; // ändrade 5 to 0, räknar upp vid varje felgissning
let answer = ''; // ordet man ska gissa
let wrongGuessedLetters = []; // ändrade till array
let playerScore = 0; // räknar upp vid varje rätt gissning
let gameActive = false;
let timer;
let timeLeft = 60; // seconds

figure.show();

// Eventlistener som lyssnar efter tangentryck
addEventListener('keyup', (event) => {
  textInput = event.key.match(/^[a-zåäö]$/i);
  if (textInput === null) {
    return;
  } else {
    comparePressedKey(textInput); //call function to compare this keyup event with existing key in generated random word from array
  }
});

//eventlistener startar timer
startButton.addEventListener('click', startTimer);

//eventlistener för restart btn som startar om spelet
restartButton.addEventListener('click', restartGame);

// Slumpa fram ord från monsterArray
function randomWord() {
  answer =
    monsterArray[Math.floor(Math.random() * monsterArray.length)];

  // Loopar över answer och lägger till en P-tag(-) och class="bokstaven".
  for (let i = 0; i < answer.length; i++) {
    const paragraph = document.createElement('p');
    const node = document.createTextNode(' _ ');
    paragraph.classList.add(answer[i]);
    paragraph.appendChild(node);
    displayWord.appendChild(paragraph);
  }
}

// Jämför inmatad bokstaven med ordet.
function comparePressedKey(key) {
  if (playerScore == answer.length - 1) {
    displayCorrectLetter(key);
    gameWon();
  } else if (
    answer.includes(key) &&
    !displayWord.textContent.includes(key)
  ) {
    playerScore++;
    displayCorrectLetter(key); // lägg till och visa tryckt key
  } else if (
    (gameActive === true && wrongGuessedLetters.includes(key)) ||
    (gameActive === true && displayWord.textContent.includes(key))
  ) {
    alert(`You have already guessed the letter: ${key}`); //ändrade till alert
  } else if (gameActive === true) {
    displayHangman(); // Funktionen visar hangman SVG för varje fel
    wrongGuessedLetters += ` ${key}`; // lägg till felgissad key till arrayen wrongGuessedLetters
    displayWrongLetters.textContent = wrongGuessedLetters;
  }

  // Visa arrayen wrongGuessedLetters med felgissade keys
}

// Om du gissar rätt, visar rätt bokstav.
function displayCorrectLetter(correctKey) {
  const correctLetterParagraph = document.querySelectorAll('p');
  for (let i = 0; i < correctLetterParagraph.length; i++) {
    if (correctLetterParagraph[i].classList.contains(correctKey)) {
      correctLetterParagraph[i].textContent = correctKey;
    }
  }
}

function displayHangman() {
  mistakes++; //Ändrade -- till ++
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
    gameOver(); // När man nått 5 misstag är spelet slut
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
  // startButton.classList.add('hidden');
  addHiddenClass(startButton);
  removeHiddenClass(hint);
  // hint.classList.remove('hidden');
}
