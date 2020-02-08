const convertStrToWordArr = (str) => {
  // gets rid of line-break or whatever
  const newReg = /(^)?\s*$/gm;

  const uniqueWordRegex = /([a-z]\w+)(?![\s\S]*\1)/gi;

  // remove some punc
  const puncRegEx = /[.,-]/g;

  // apply regex
  const regexTxt = str.replace(newReg, ' ').replace(puncRegEx, '');

  // split txt into arr of words
  return regexTxt.split(' ');
};

// creates an object of the most-frequent words occuring
function getWordsByCount(srcWordArr) {
  const startingArr = (typeof srcWordArr === 'string') ? convertStrToWordArr(srcWordArr) : srcWordArr;

  // https://en.wikipedia.org/wiki/Most_common_words_in_English
  const topThirty = ['the', 'be', 'to', 'of', 'and',
    'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with',
    'he', 'as', 'you', 'do', 'at', '',
    'this', 'but', 'his', 'by', 'from',
    'they', 'we', 'say', 'her', 'she'];
  const freqUsedWords = [];

  startingArr.forEach((singleWord) => {
    const lowerCaseWord = singleWord.toLowerCase();
    let thisIndex = null;
    // check if this word is already in array
    if (freqUsedWords.some((arrObj, arrObjInd) => {
      if (arrObj.word == lowerCaseWord) {
        thisIndex = arrObjInd;
      }
      return arrObj.word == lowerCaseWord;
    })
    ) {
      freqUsedWords[thisIndex].occurances += 1;
    } else {
      // if this word is NOT in the topThirty array, add to freqWords
      if (!topThirty.includes(lowerCaseWord)) {
        freqUsedWords.push({ word: singleWord.toLowerCase(), occurances: 1 });
      } else return;
    }
  });

  freqUsedWords.sort((a, b) => b.occurances - a.occurances);
  return freqUsedWords;
}

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

function ingWords(str) {
  const findEnding = /\w*ing\b/g;
  const res = str.match(findEnding);
  return res;
}

function edWords(str) {
  const findEnding = /\w*ed\b/g;
  const res = str.match(findEnding).sort();
  return res;
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
  convertStrToWordArr,
  getLongestThirty,
  getWordsByCount,
  getWordsByLength,
  ingWords,
  edWords,
  getSentences,
};
