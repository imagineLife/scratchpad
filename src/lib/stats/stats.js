const convertStrToWordArr = require('./convertStrToWordArr').default;

function getLongestThirty(arr) {
  const startingArr = (typeof arr === 'string') ? convertStrToWordArr(arr) : arr;

  // make NO REPEATS
  const uniqueWords = startingArr.reduce((acc, val) => {
    if (acc.indexOf(val.toLowerCase()) < 0) acc.push(val.toLowerCase());
    return acc;
  }, []);

  // sort the word by longest-at-the-top
  uniqueWords.sort((a, b) => b.length - a.length);

  const topTewnty = uniqueWords.slice(0, 30);

  return topTewnty;
}

function getSentences(srcTxt) {
  const twoWhiteSpaces = /(\s{2})/gm;
  const sentRegex = /(~~)\s/g;


  // arr of sentences
  let sentences = srcTxt.replace(twoWhiteSpaces, ' ')
    .replace(/\.\s/g, '.~~ ')
    .replace(/\?\s/g, '?~~ ')
    .replace(/!\s/g, '!~~ ')
    .split(sentRegex);

  sentences = sentences
    .filter((d, idx) => idx % 2 === 0)
    .map((s) => ({
      text: s.trim(), // 'three word sentence'
      wordCount: s.trim().split(' ').length, // 3
    }));

  return sentences;
}

module.exports = {
  getLongestThirty,
  getSentences
};