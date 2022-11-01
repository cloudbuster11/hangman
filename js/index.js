// För att toggla SVG:en
// document.querySelector('figure').classList.add('scaffold');
// document.querySelector('figure').classList.add('head');
// document.querySelector('figure').classList.add('body');
// document.querySelector('figure').classList.add('arms');
// document.querySelector('figure').classList.add('legs');

// Dom
const wordContainer = document.querySelector('.word__container');
const wrongLetters = document.querySelector('.word__wrong');
const wordResult = document.querySelector('.word__result');
const restartButton = document.querySelector('.restart__button');
const gameoverText = document.querySelector('.word__gameover');

// Variabler
let word = 'monster';
let wrongGuessedLetters = '';
let playerScore = 5;
let playerWinScore = 0;

displayWord(word);
console.log(word.length);

// Eventlistner som lyssnar efter knapptryck.
addEventListener('keypress', (event) => {
  comparePressedKey(event.key);
});

restartButton.addEventListener('click', restartGame);

// Jämför inmatad bokstaven med ordet.
function comparePressedKey(key) {
  console.log(`Du tryckte på tangenten ${key}`);
  if (playerWinScore == word.length - 1) {
    console.log('Du vann!');
    displayCorrectLetter(key);
  } else if (word.includes(key)) {
    console.log(`Bokstaven ${key} finns i ordet.`);
    playerWinScore++;
    console.log(playerWinScore);
    displayCorrectLetter(key);
  } else if (wrongGuessedLetters.includes(key)) {
    console.log('Du har redan gissat denna bokstav');
  } else {
    console.log(`Bokstaven ${key} finns inte ordet`);
    displayHangman();
    wrongGuessedLetters += ` ${key}`;
    console.log(
      `De här bokstäverna har du gissat på: ${wrongGuessedLetters}`
    );

    // Visar gissningar som var fel i html.
    wrongLetters.textContent = wrongGuessedLetters;
  }
}

// Loopar över Word(halloween) och lägger till en P-tag(-) och class="bokstaven".
function displayWord(word) {
  for (let i = 0; i < word.length; i++) {
    const paragraph = document.createElement('p');
    const node = document.createTextNode(' _ ');

    paragraph.classList.add(word[i]);
    paragraph.appendChild(node);
    wordResult.appendChild(paragraph);
  }
}

// Om du gissar rätt, visar rätt bokstav.
function displayCorrectLetter(correctKey) {
  const correctLetterParagraph = document.querySelectorAll('p');
  console.log(correctKey);
  for (let i = 0; i < correctLetterParagraph.length; i++) {
    if (playerScore === word.length) {
      console.log('Du vann!!!!');
    } else if (
      correctLetterParagraph[i].classList.contains(correctKey)
    ) {
      correctLetterParagraph[i].textContent = correctKey;
    }
  }
}

function displayHangman() {
  playerScore--;
  console.log(`Spelare poäng ${playerScore}`);
  if (playerScore === 4) {
    document.querySelector('figure').classList.add('scaffold');
  } else if (playerScore === 3) {
    document.querySelector('figure').classList.add('head');
  } else if (playerScore === 2) {
    document.querySelector('figure').classList.add('body');
  } else if (playerScore === 1) {
    document.querySelector('figure').classList.add('arms');
  } else if (playerScore === 0) {
    document.querySelector('figure').classList.add('legs');
    gameOver();
  }
}

function gameOver() {
  console.log('Game Over');
  document.body.style.backgroundColor = '#555';
  wordResult.textContent = word;
  restartButton.style.display = 'block';
  wrongLetters.classList.add('hidden');
  gameoverText.classList.remove('hidden');
}

function restartGame() {
  document.querySelector('figure').classList.remove('scaffold');
  document.querySelector('figure').classList.remove('head');
  document.querySelector('figure').classList.remove('body');
  document.querySelector('figure').classList.remove('arms');
  document.querySelector('figure').classList.remove('legs');
  document.body.style.backgroundColor = '#7349ac';
  wordResult.textContent = '';
  wrongLetters.textContent = '';
  wrongGuessedLetters = '';
  restartButton.style.display = 'none';
  playerScore = 5;
  playerWinScore = 0;
  gameoverText.classList.add('hidden');
  wrongLetters.classList.remove('hidden');
  displayWord(word);
}

/*
1. Skapa du vann funktion
2. Array med ord och slumpa fram ord

3. timer
4. style

*/
