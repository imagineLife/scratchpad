const convertStrToWordArr = str => {
  //gets rid of line-break or whatever
  let newReg = /(^)?\s*$/gm;

  let uniqueWordRegex = /([a-z]\w+)(?![\s\S]*\1)/gi

  //remove some punc
  let puncRegEx = /[.,-]/g

  //apply regex
  const regexTxt = str.replace(newReg," ").replace(puncRegEx, "")
  
  //split txt into arr of words
  return regexTxt.split(" ")
}

// creates an object of the most-frequent words occuring
function getWordsByCount(srcWordArr) {

  let startingArr = (typeof srcWordArr == 'string') ? convertStrToWordArr(srcWordArr) : srcWordArr;
  
  // https://en.wikipedia.org/wiki/Most_common_words_in_English
  let topThirty = ['the', 'be', 'to', 'of', 'and', 
  'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with',
  'he', 'as', 'you', 'do', 'at', '',
  'this', 'but', 'his', 'by', 'from',
  'they', 'we', 'say', 'her', 'she' ]
  let freqUsedWords = [];

  startingArr.forEach(function(singleWord){
      let lowerCaseWord = singleWord.toLowerCase()
      let thisIndex = null
      // check if this word is already in array
      if (freqUsedWords.some((arrObj, arrObjInd) => {

            if(arrObj.word == lowerCaseWord){
              thisIndex = arrObjInd
            }
            return arrObj.word == lowerCaseWord
          })
      ) {
        freqUsedWords[thisIndex].occurances +=1
      } else {

        //if this word is NOT in the topThirty array, add to freqWords
        if(!topThirty.includes(lowerCaseWord)){
          freqUsedWords.push({word: singleWord.toLowerCase(), occurances: 1})
        }
        else return
      }
  });

  freqUsedWords.sort((a, b) => b.occurances - a.occurances)
  return freqUsedWords;
}

function getWordsByLength(srcWordArr){

  let startingArr = (typeof srcWordArr == 'string') ? convertStrToWordArr(srcWordArr) : srcWordArr;
  
  let wordsByLength = [];

  startingArr.forEach(function(singleWord){
      let thisIndex = null
      // check if this word is already in array
      let thisWordLength = singleWord.length
      if (wordsByLength.some((arrObj, arrObjInd) => {
            if(arrObj.size == thisWordLength){
              thisIndex = arrObjInd
            }
            return arrObj.size == thisWordLength
          })
      ) {
        wordsByLength[thisIndex].occurances +=1
      } else {
        wordsByLength.push({size: thisWordLength, occurances: 1})
      }
  });

  return wordsByLength.sort((a,b) => b.occurances - a.occurances).slice(0,8);
}

function getLongestThirty(arr){
 
  let startingArr = (typeof arr == 'string') ? convertStrToWordArr(arr) : arr;

  //make NO REPEATS
  let uniqueWords = startingArr.reduce(function(acc,val){
    if (acc.indexOf(val.toLowerCase()) < 0 ) acc.push(val.toLowerCase());
    return acc;
  },[]);
  
  //sort the word by longest-at-the-top
  uniqueWords.sort(function(a, b){

    // DESC  sorting -> b.length - a.length
    return b.length - a.length;
  
  });

  let topTewnty = uniqueWords.slice(0,30);

  return topTewnty;
}

function ingWords(str){
  
  let findEnding = /\w*ing\b/g;
  let res = str.match(findEnding);
  return res;
}

function edWords(str){
  
  let findEnding = /\w*ed\b/g;
  let res = str.match(findEnding).sort();
  return res;
}

function ingWordsAndNextWord(str){
  let regex = /\w*ing\b\s*(\S+)/g;
  return str.match(regex)
}

function getSentences(srcTxt){

  let twoWhiteSpaces = /(\s{2})/gm;
  let sentRegex = /(~~)\s/g;


  //arr of sentences
  let sentences = srcTxt.replace(twoWhiteSpaces, " ")
    .replace(/\.\s/g, ".~~ ")
    .replace(/\?\s/g, "?~~ ")
    .replace(/!\s/g, "!~~ ")
    .split(sentRegex);

  sentences = sentences
    .filter((d, idx) => idx % 2 === 0)
    .map(s => {
      return {
        text: s.trim(), //'three word sentence'
        wordCount: s.trim().split(' ').length //3
      }
    })

  return sentences
}

module.exports = { 
  convertStrToWordArr,
  getLongestThirty, 
  getWordsByCount, 
  getWordsByLength, 
  ingWords,
  edWords,
  getSentences
}