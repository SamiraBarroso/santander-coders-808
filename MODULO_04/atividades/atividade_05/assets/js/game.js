import HangmanGame from "./HangmanGame.js";
import timeToString from "./utils/timeToString.js";

const wordContainer = document.querySelector("#word"),
  wrongLetters = document.querySelector("#wrong-letters"),
  livesText = document.querySelector("#lives");

// Crie um elemento para cada letra da palavra, anexa ao wordContainer e mostra a dica e as vidas do jogador
function mountGame(gameData) {
  const tipText = document.querySelector("#tip"),
    currentTimeText = document.querySelector("#current-time"),
    highScoreText = document.querySelector("#high-score");

  const gameRecovery = JSON.parse(localStorage.getItem("game"));

  if (gameRecovery) {
    if (confirm("Foi encontrado um jogo inacabado anteriormente deseja continuar?")) {
      const { word, wordNormalized, tip, inputtedWords, player, score } = gameRecovery;

      gameData.word = word;
      gameData.tip = tip;
      gameData.wordNormalized = wordNormalized;
      gameData.inputtedWords = inputtedWords;
      gameData.player.lives = player.lives;
      gameData.player.hits = player.hits;
      gameData.score = score;

      tipText.textContent = gameData.tip;
      livesText.textContent = gameData.player.lives;
      currentTimeText.textContent = timeToString(gameData.score);
    } else {
      localStorage.removeItem("game");
      alert("Bora começar o game! Você terá apenas 6 vidas, tome cuidado!");
    }
  }

  let elapsedTime = gameData.score || 0;

  function print(txt) {
    currentTimeText.innerHTML = "Current: " + txt;
  }

  let startTime = Date.now() - elapsedTime;
  setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));

    gameData.score = elapsedTime;
  }, 10);

  const highScore = localStorage.getItem("highScore");

  if (highScore) {
    highScoreText.innerHTML = `High Score: ${timeToString(highScore)}`;
  } else {
    highScoreText.innerHTML = `High Score: 0`;
  }

  for (let i = 0; i < gameData.wordNormalized.length; i++) {
    let child = document.createElement("h1");
    child.innerText = "-";
    child.id = `p-${i}`;
    child.className = "letter";

    wordContainer.appendChild(child);
  }

  gameData.inputtedWords.forEach((letter) => {
    if (gameData.wordNormalized.includes(letter)) {
      let indexes = [];

      // Encontrando todas as ocorrências da letra na palavra
      let idx = gameData.wordNormalized.indexOf(letter);
      while (idx !== -1) {
        indexes.push(idx);
        idx = gameData.wordNormalized.indexOf(letter, idx + 1);
      }

      // Revelando todas as ocorrências da letra na palavra
      indexes.forEach((index) => {
        wordContainer.children[index].textContent = gameData.word[index];
      });
    }
  });

  const sortedWords = gameData.inputtedWords.sort();

  wrongLetters.innerHTML = "";

  sortedWords.forEach((sortedWord) => {
    let child = document.createElement("h1");
    child.textContent = sortedWord;
    child.className = "wrong__letter";

    wrongLetters.appendChild(child);
  });

  tipText.textContent = `Dica: ${gameData.tip}`;
  livesText.textContent = `Vidas: ${gameData.player.remainingGuesses}`;

  console.log("Professor aqui está a resposta! rsrs =>", gameData.word);
}

export default function hangman(word) {
  const restartButton = document.querySelector("#restart-button"),
    nextButton = document.querySelector("#next-button");

  // Instancia o objeto HangmanGame
  const gameData = new HangmanGame(word);

  mountGame(gameData);

  // Passa para próxima letra
  nextButton.addEventListener("click", () => {
    let input = prompt("Digite apenas uma letra de A-Z!");

    while (
      !input ||
      !input.match(/[A-Za-z]/) ||
      input.length > 1 ||
      gameData.inputtedWords.includes(input.toUpperCase())
    ) {
      input = prompt("Digite apenas uma letra de A-Z!");
    }

    gameData.execute(input);
  });

  // Reinicia o jogo
  restartButton.addEventListener("click", () => {
    gameData.endGame("Deseja começar um novo jogo? 🤔🤔🤔");
  });
}
