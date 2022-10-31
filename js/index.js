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
const word = 'halloween';
let wrongGuessLetters = '';

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

displayWord(word);

// Eventlistner som lyssnar efter knapptryck.
addEventListener('keypress', (event) => {
  comparePressedKey(event.key);
});
// Jämför inmatad bokstaven med ordet.
function comparePressedKey(key) {
  console.log(`Du tryckte på tangenten ${key}`);
  if (word.includes(key)) {
    console.log(`Bokstaven ${key} finns i ordet.`);
  } else if (wrongGuessLetters.includes(key)) {
    console.log('du har redan gissat denna bokstav');
  } else {
    console.log(`Bokstaven ${key} finns inte ordet`);
    wrongGuessLetters += ` ${key}`;
    console.log(
      `De här bokstäverna har du gissat på: ${wrongGuessLetters}`
    );

    // Visar gissningar som var fel i html.
    wrongLetters.textContent = wrongGuessLetters;
  }
}

// Om du gissar rätt, visar rätt bokstav.
// Nytt

// Om du gissar fel, visa en del av gubben.

// Du klarade spelet

// Du förlorade spelet

// Starta om spelet
