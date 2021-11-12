import getWord from "./utils/getWord.js";
import game from "./game.js";
import changeTheme from "./utils/changeTheme.js";
import keyboard from "./utils/keyboard.js";

//Ativa o teclado virtual
keyboard();

/*==================== GET HANGMAN WORD ====================*/
const word = await getWord();

/*==================== GAME ====================*/
game(word);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.querySelector("#theme-button");

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", changeTheme);
