class Player {
  lives;
  hits = 0;

  constructor(guesses) {
    this.lives = guesses;
  }

  set hit(number) {
    this.hits += number;
  }

  mistake() {
    this.lives--;
  }

  get remainingGuesses() {
    return this.lives;
  }

  get gameOver() {
    return this.remainingGuesses === 0;
  }

  get hitCount() {
    return this.hits;
  }
}

export default Player;
