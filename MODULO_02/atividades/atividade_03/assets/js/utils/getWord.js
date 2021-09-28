function apiCaller(url) {
  const req = new XMLHttpRequest();

  req.open("GET", url, false);
  req.send();

  return req.responseText;
}

function getRandomWord() {
  const word = apiCaller("https://api.dicionario-aberto.net/random");

  return JSON.parse(word).word.length <= 10 ? JSON.parse(word).word : getRandomWord();
}

function getFullWordData(word) {
  const getFullWordData = apiCaller(`https://api.dicionario-aberto.net/word/${word}`);

  return JSON.parse(getFullWordData)[0];
}

export default function createWordObject() {
  let word = getRandomWord();

  const wordWithData = getFullWordData(word);

  const removeLineBreaksFromWordDefinition = wordWithData.xml.replace(/(\r\n|\n|\r)/gm, "");

  const wordDefinition = removeLineBreaksFromWordDefinition.match(/<def>(.+?)<\/def>/)[1];

  return {
    word: word.toUpperCase(),
    normalized: wordWithData.normalized.toUpperCase(),
    tip: wordDefinition,
  };
}
