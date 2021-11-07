import Player from "./Player.js";
const wrongLetters = document.querySelector("#wrong-letters"),
  wordContainer = document.querySelector("#word"),
  nextButton = document.querySelector("#next-button"),
  livesText = document.querySelector("#lives");

class HangmanGame {
  static word;
  static wordNormalized;
  static tip;
  inputtedWords;
  player;
  score;

  constructor(word) {
    this.word = word.word;
    this.wordNormalized = word.normalized;
    this.tip = word.tip;
    this.player = new Player(6);
    this.inputtedWords = [];
  }

  execute(input) {
    // Flag para habilitar o jogo ser reiniciado
    localStorage.setItem("restart", true);

    // Deixando a letra em caixa alta para facilitar a comparação
    input = input.toUpperCase();

    // Verificando se a letra já foi digitada
    if (this.inputtedWords.includes(input)) {
      alert("Letra já digitada!");
      return;
    }

    // Verificando se a letra está na palavra
    this.match(input);

    // Adiciona a letra ao array de letras já digitadas
    this.inputtedWords.push(input);

    // Ordena as letras alfabeticamente e exibe no DOM
    const sortedWords = this.inputtedWords.sort();

    wrongLetters.innerHTML = "";

    sortedWords.forEach((sortedWord) => {
      let child = document.createElement("h1");
      child.textContent = sortedWord;
      child.className = "wrong__letter";

      wrongLetters.appendChild(child);
    });

    // Adiciona o estado do jogo ao localStorage
    localStorage.setItem("game", JSON.stringify(this));
  }

  match(letter) {
    // Verificando se a letra digitada está na palavra
    if (this.wordNormalized.includes(letter)) {
      let indexes = [];

      // Encontrando todas as ocorrências da letra na palavra
      let idx = this.wordNormalized.indexOf(letter);
      while (idx !== -1) {
        indexes.push(idx);
        idx = this.wordNormalized.indexOf(letter, idx + 1);
      }

      // Revelando todas as ocorrências da letra na palavra
      indexes.forEach((index) => {
        wordContainer.children[index].textContent = this.word[index];
      });

      // Adiciona os acertos do jogador
      this.player.hit = indexes.length;

      // Verificando se o jogador venceu
      if (this.player.hitCount === this.wordNormalized.length) {
        this.endGame("PARABÉNS VOCÊ ACERTOU! Deseja começar um novo jogo? 👏🎉🥳", true);
      }
    } else {
      // Adiciona os erros do jogador
      this.player.mistake();

      // Verificando se o jogador perdeu
      if (this.player.gameOver) {
        this.endGame("GAMER OVER! A palavra era: " + this.word.word + "Deseja começar um novo jogo? 😔😔😔");
      }

      // Adicionando a parte do boneco da forca ao DOM
      document.querySelector(`#p-${5 - this.player.remainingGuesses}`).style.display = "block";

      //Atualiza a vida do jogador no DOM
      livesText.textContent = `Vidas: ${this.player.remainingGuesses}`;
    }
  }

  // Função que exibe a mensagem de fim de jogo
  endGame(message, won) {
    // Pausa o timer
    clearInterval(1);

    // Remove o estado de jogo do localStorage
    localStorage.removeItem("game");

    // Flag para desabilitar o jogo ser reiniciado
    localStorage.setItem("restart", false);

    // Se o jogador ganhou, verifica se ele bateu o recorde, caso sim, atualiza o recorde
    if (won) {
      const highScore = localStorage.getItem("highScore");

      if (this.score < highScore || highScore === null) {
        localStorage.setItem("highScore", this.score);
      }
    }

    // Exibe a mensagem de fim de jogo
    if (confirm(message)) {
      document.location.reload(true);
    } else {
      nextButton.disabled = true;
    }
  }
}

export default HangmanGame;
