const wordContainer = document.querySelector("#word"),
  livesText = document.querySelector("#lives"),
  wrongLetters = document.querySelector("#wrong-letters");

function mountGame(gameData) {
  const tipText = document.querySelector("#tip");

  for (let i = 0; i < gameData.word.length; i++) {
    let child = document.createElement("h1");
    child.innerText = "-";
    child.id = `p-${i}`;
    child.className = "letter";

    wordContainer.appendChild(child);
  }

  tipText.textContent = `Dica: ${gameData.tip}`;
  livesText.textContent = `Vidas: ${gameData.lives}`;
}

export default function hangman(word) {
  const startButton = document.querySelector("#start-button"),
    restartButton = document.querySelector("#restart-button"),
    nextButton = document.querySelector("#next-button");

  const gameData = {
    ...word,
    lives: 6,
    inputtedWords: [],
    hits: 0,
    execute(input) {
      let inputToUpperCase = input.toUpperCase();

      gameData.match(inputToUpperCase);

      gameData.inputtedWords.push(inputToUpperCase);

      if (gameData.lives === 0) {
        gameData.missed();
      }

      const sortedWords = gameData.inputtedWords.sort();

      wrongLetters.innerHTML = "";

      sortedWords.forEach((sortedWord) => {
        let child = document.createElement("h1");
        child.textContent = sortedWord;
        child.className = "wrong__letter";

        wrongLetters.appendChild(child);
      });
    },
    match(letter) {
      if (this.normalized.includes(letter)) {
        let indexes = [];

        let idx = this.normalized.indexOf(letter);
        while (idx != -1) {
          indexes.push(idx);
          idx = this.normalized.indexOf(letter, idx + 1);
        }

        indexes.forEach((index) => {
          wordContainer.children[index].textContent = this.word[index];
        });

        this.hits += indexes.length;

        if (this.hits === this.word.length) {
          this.won();
        }
      } else {
        document.querySelector(`#p-${6 - this.lives}`).style.display = "block";

        this.missed();
      }
    },
    missed() {
      if (this.lives > 0) {
        this.lives -= 1;

        livesText.textContent = `Vidas: ${this.lives}`;
      } else {
        this.gameOver();
      }
    },
    won() {
      if (confirm("PARABÉNS VOCÊ ACERTOU! Deseja começar um novo jogo? 👏🎉🥳")) {
        document.location.reload(true);
      }
    },
    restart() {
      if (confirm("Deseja começar um novo jogo? 🤔🤔🤔")) {
        document.location.reload(true);
      }
    },
    gameOver() {
      if (confirm("GAMER OVER! Deseja começar um novo jogo? 😔😔😔")) {
        document.location.reload(true);
      }
    },
  };

  console.log("Professor aqui está a resposta! rsrs =>", gameData.word);

  mountGame(gameData);

  startButton.addEventListener("click", () => {
    alert("Bora começar o game! Você terá apenas 6 vidas, tome cuidado!");

    startButton.style.display = "none";
    nextButton.style.display = "block";

    let input = prompt("Digite apenas uma letra de A-Z");

    while (!input.match(/[A-Za-z]/) || input.length > 1) {
      input = prompt("Digite apenas uma letra de A-Z");
    }

    gameData.execute(input);
  });

  nextButton.addEventListener("click", () => {
    let input = prompt("Digite apenas uma letra de A-Z!");

    while (!input.match(/[A-Za-z]/) || input.length > 1 || gameData.inputtedWords.includes(input.toUpperCase())) {
      input = prompt("Digite apenas uma letra de A-Z!");
    }

    gameData.execute(input);
  });

  restartButton.addEventListener("click", gameData.restart);
}
