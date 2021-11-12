import HangmanGame from "./HangmanGame.js";
import timeToString from "./utils/timeToString.js";
import keyboardVirtual from "./utils/keyboard.js";

const wordContainer = document.querySelector("#word"),
  wrongLetters = document.querySelector("#wrong-letters"),
  livesText = document.querySelector("#lives");

// Função responsável por "montar" o jogo
function mountGame(gameData) {
  const tipText = document.querySelector("#tip"),
    currentTimeText = document.querySelector("#current-time"),
    highScoreText = document.querySelector("#high-score");

  // Busca um jogo salvo no localStorage
  const gameRecovery = JSON.parse(localStorage.getItem("game"));
  // Busca a flag de recuperação de jogo
  const restart = JSON.parse(localStorage.getItem("restart"));

  // Se houver um jogo salvo e estiver disponível o reinício, recupera o jogo
  if (gameRecovery && restart) {
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

      for (let i = 0; i <= 5 - gameData.player.lives; i++) {
        document.querySelector(`#p-${i}`).style.display = "block";
      }
    } else {
      // Se não, apaga o jogo salvo e inicia um novo jogo
      localStorage.removeItem("game");
      alert("Bora começar o game! Você terá apenas 6 vidas, tome cuidado!");
    }
  }

  // Caso o jogo tenha sido recuperado, o timer continua a partir do tempo salvo, caso contrário, inicia do zero
  let elapsedTime = gameData.score || 0;

  // Função responsável por atualizar o tempo no DOM
  function print(txt) {
    currentTimeText.innerHTML = "Current: " + txt;
  }

  // Conjunto de instruções responsáveis por atualizar o tempo
  let startTime = Date.now() - elapsedTime;
  setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));

    gameData.score = elapsedTime;
  }, 10);

  // Busca o highscore salvo no localStorage
  const highScore = localStorage.getItem("highScore");

  // Se existir um highscore, atualiza o DOM, caso contrário, inicia com zero
  if (highScore) {
    highScoreText.innerHTML = `High Score: ${timeToString(highScore)}`;
  } else {
    highScoreText.innerHTML = `High Score: 0`;
  }

  // Laço responsável por montar o campo de letras com base no tamanho da palavra
  for (let i = 0; i < gameData.wordNormalized.length; i++) {
    let child = document.createElement("h1");
    child.innerText = "-";
    child.id = `p-${i}`;
    child.className = "letter";

    wordContainer.appendChild(child);
  }

  // Laço responsável por revelar as letras da palavra que o jogador acertou
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

  // Laço responsável por montar o campo de letras erradas
  const sortedWords = gameData.inputtedWords.sort();

  wrongLetters.innerHTML = "";

  sortedWords.forEach((sortedWord) => {
    let child = document.createElement("h1");
    child.textContent = sortedWord;
    child.className = "wrong__letter";

    wrongLetters.appendChild(child);
  });

  // Exibe as dicas e a vida do jogador no DOM
  tipText.textContent = `Dica: ${gameData.tip}`;
  livesText.textContent = `Vidas: ${gameData.player.remainingGuesses}`;

  // Exibe a resposta no console para fins de teste
  console.log("Professor aqui está a resposta! rsrs =>", gameData.word);
}

// Função responsável por iniciar e executar o jogo
export default function hangman(word) {
  const restartButton = document.querySelector("#restart-button"),
    nextButton = document.querySelector("#next-button"),
    guessButton = document.querySelector("#guess-button");

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

  guessButton.addEventListener("click", () => {
    let wordInput = document.querySelector("#word-input");

    if (wordInput.value == " " || wordInput.value == "" || wordInput.value == null || wordInput.value == undefined)
      alert("Você precisa digitar uma palavra!");
    if (wordInput.value.match(/[0-9]/)) alert("Você precisa digitar uma palavra sem caracteres especiais!");
    else gameData.checkWord(wordInput.value);

    document.getElementById("word-input").value = "";
  });

  // Reinicia o jogo
  restartButton.addEventListener("click", () => {
    gameData.endGame("Deseja começar um novo jogo? 🤔🤔🤔");
  });
}
