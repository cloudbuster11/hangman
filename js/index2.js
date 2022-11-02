/*
'keypress' används inte längre. Ändrade till 'keydown'

ÄNDRADE NAMN:
* wrongLetters = wrongLettersHTML
* playerScore = mistakes
* word = answer
* playerWinScore = playerScore

KVAR ATT GÖRA:
* styla 

* Lägga till en hint vad man ska gissa
* ta bort kommentarer & console loggar

*/

//array of words to be randomized for game:
const monsterList = [
  'zombie',
  'vampire',
  'witch',
  'ghost',
  'monster',
  'dracula',
  'demon',
];

// DOM
let wrongLettersHTML = document.querySelector('.word__wrong'); // visa felgissade ord här
const wordResult = document.querySelector('.word__result'); // visa ord här
const restartButton = document.querySelector('.restart__button'); // knapp för att starta om spelet
const timerButton = document.querySelector('.timer__button'); // starta timer knapp
const gameResultText = document.querySelector('.word__gameResult'); // visa game over text
const countdownTimer = document.querySelector('.word__countdown'); // visar timer

// Variabler
let mistakes = 0; // ändrade 5 to 0, räknar upp vid varje felgissning
let answer = ''; // ordet man ska gissa
let wrongGuessedLetters = []; // ändrade till array
let playerScore = 0; // räknar upp vid varje rätt gissning
let gameActive = false;

// randomWord(); // kalla på funktion som slumpar fram ordet att gissa

// Eventlistener som lyssnar efter tangentryck
addEventListener('keydown', (event) => {
  comparePressedKey(event.key); //call function to compare this keydown event with existing key in generated random word from array
});

//eventlistener startar timer
timerButton.addEventListener('click', startTimer);

//eventlistener för restart btn som startar om spelet
restartButton.addEventListener('click', restartGame);

// Slumpa fram ord från monsterList
function randomWord() {
  answer =
    monsterList[Math.floor(Math.random() * monsterList.length)];

  // Loopar över answer och lägger till en P-tag(-) och class="bokstaven".
  for (let i = 0; i < answer.length; i++) {
    const paragraph = document.createElement('p');
    const node = document.createTextNode(' _ ');
    paragraph.classList.add(answer[i]);
    paragraph.appendChild(node);
    wordResult.appendChild(paragraph);
  }
}

// Jämför inmatad bokstaven med ordet.
function comparePressedKey(key) {
  //console.log(`Du tryckte på tangenten ${key}`);
  if (playerScore == answer.length - 1) {
    console.log('Du vann!');
    displayCorrectLetter(key);
    gameWon();
  } else if (
    answer.includes(key) &&
    !wordResult.textContent.includes(key)
  ) {
    console.log(`JA. Bokstaven ${key} finns i ordet.`);
    playerScore++;
    //console.log(playerScore)
    displayCorrectLetter(key); // lägg till och visa tryct key
  } else if (
    (gameActive === true && wrongGuessedLetters.includes(key)) ||
    (gameActive === true && wordResult.textContent.includes(key))
  ) {
    alert('Du har redan gissat denna bokstav'); //ändrade till alert
  } else if (gameActive === true) {
    console.log(`NEJ. Bokstaven ${key} finns EJ i ordet`);
    displayHangman(); // Funktionen visar hangman SVG för varje fel
    wrongGuessedLetters += ` ${key}`; // lägg till felgissad key till arrayen wrongGuessedLetters
    console.log(`felgissade: ${wrongGuessedLetters}`);
  }

  // Visa arrayen wrongGuessedLetters med felgissade keys
  wrongLettersHTML.textContent =
    'Gissade bokstäver: ' + wrongGuessedLetters;
}

// Om du gissar rätt, visar rätt bokstav.
function displayCorrectLetter(correctKey) {
  const correctLetterParagraph = document.querySelectorAll('p');
  // console.log(correctKey);
  for (let i = 0; i < correctLetterParagraph.length; i++) {
    if (correctLetterParagraph[i].classList.contains(correctKey)) {
      correctLetterParagraph[i].textContent = correctKey;
    }
  }
}

function displayHangman() {
  mistakes++; //Ändrade -- till ++
  console.log(`Spelare misstag: ${mistakes}`);
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
  console.log('Game Over');
  document.body.style.backgroundColor = '#555';
  wordResult.textContent = answer;
  restartButton.classList.remove('hidden');
  wrongLettersHTML.classList.add('hidden');
  gameResultText.classList.remove('hidden');
  gameResultText.textContent = 'Game Over';
  // Test
  clearInterval(timer);
}

function restartGame() {
  gameActive = false;
  document.querySelector('figure').classList.remove('scaffold');
  document.querySelector('figure').classList.remove('head');
  document.querySelector('figure').classList.remove('body');
  document.querySelector('figure').classList.remove('arms');
  document.querySelector('figure').classList.remove('legs');
  document.body.style.backgroundColor = '#7349ac';
  wordResult.textContent = '';
  wrongLettersHTML.textContent = '';
  wrongGuessedLetters = '';
  restartButton.classList.add('hidden');
  mistakes = 0;
  playerScore = 0;
  gameResultText.classList.add('hidden');
  wrongLettersHTML.classList.remove('hidden');
  // randomWord(answer);
  timeLeft = 10;
  startTimer();
}

function gameWon() {
  gameActive = false;
  restartButton.classList.remove('hidden');
  wrongLettersHTML.classList.add('hidden');
  gameResultText.classList.remove('hidden');
  gameResultText.textContent = 'You Win!';
  clearInterval(timer);
}

let timer;
let timeLeft = 10; // seconds

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
  timerButton.classList.add('hidden');
}
