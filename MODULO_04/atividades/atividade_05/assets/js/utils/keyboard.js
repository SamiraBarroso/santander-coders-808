export default function keyboardVirtual() {
  const keyboard = document.getElementById("keyboard");
  const bKeyboard = document.querySelector("#bKeyboard");
  const inputWord = document.querySelector("#word-input");
  const letter = document.querySelectorAll('[id="letter"]');

  bKeyboard.addEventListener("click", function () {
    if (keyboard.style.display == "none") {
      keyboard.style.display = "block";
      inputWord.focus();
    } else {
      keyboard.style.display = "none";
    }
  });

  window.addEventListener("DOMContentLoaded", (event) => {
    letter.forEach((el) => {
      el.addEventListener("click", function () {
        if (el.innerText.toLowerCase() != "limpar") {
          inputWord.value += el.innerHTML;
          inputWord.focus();
        } else {
          inputWord.value = "";
        }
      });
    });
  });
}
