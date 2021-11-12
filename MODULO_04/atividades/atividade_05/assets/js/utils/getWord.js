async function apiCaller(url) {
  const req = await fetch(url);

  if (req.status === 200) {
    const data = await req.text();

    return data;
  }
}

async function getRandomWord() {
  const word = await apiCaller("https://api.dicionario-aberto.net/random");

  return JSON.parse(word).word.length <= 10 ? JSON.parse(word).word : getRandomWord();
}

async function getFullWordData(word) {
  const getFullWordData = await apiCaller(`https://api.dicionario-aberto.net/word/${word}`);

  return JSON.parse(getFullWordData)[0];
}

export default async function createWordObject() {
  let word = await getRandomWord();

  const wordWithData = await getFullWordData(word);

  const removeLineBreaksFromWordDefinition = wordWithData.xml.replace(/(\r\n|\n|\r)/gm, "");

  const wordDefinition = removeLineBreaksFromWordDefinition.match(/<def>(.+?)<\/def>/)[1];

  return {
    word: word.toUpperCase(),
    normalized: wordWithData.normalized.toUpperCase(),
    tip: wordDefinition,
  };
}
