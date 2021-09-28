import getWord from "./utils/getWord.js";
import hangman from "./hangman.js";
import changeTheme from "./utils/changeTheme.js";

/*==================== GET HANGMAN WORD ====================*/
const word = getWord();

/*==================== GAME ====================*/
hangman(word);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.querySelector("#theme-button");

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", changeTheme);
