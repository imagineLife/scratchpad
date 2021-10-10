const convertStrToWordArr = require('./convertStrToWordArr').default;

function getWordsByLength(srcWordArr) {
  const startingArr = (typeof srcWordArr === 'string') ? convertStrToWordArr(srcWordArr) : srcWordArr;

  const wordsByLength = [];

  startingArr.forEach((singleWord) => {
    let thisIndex = null;
    // check if this word is already in array
    const thisWordLength = singleWord.length;
    if (wordsByLength.some((arrObj, arrObjInd) => {
      if (arrObj.size == thisWordLength) {
        thisIndex = arrObjInd;
      }
      return arrObj.size == thisWordLength;
    })
    ) {
      wordsByLength[thisIndex].occurances += 1;
    } else {
      wordsByLength.push({ size: thisWordLength, occurances: 1 });
    }
  });

  return wordsByLength.sort((a, b) => b.occurances - a.occurances).slice(0, 8);
}

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
  getSentences,
  getWordsByLength
};