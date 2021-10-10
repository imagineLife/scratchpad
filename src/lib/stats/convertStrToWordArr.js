const convertStrToWordArr = (str) => {
  // gets rid of line-break or whatever
  const newReg = /(^)?\s*$/gm;

  // const uniqueWordRegex = /([a-z]\w+)(?![\s\S]*\1)/gi;

  // remove some punc
  const puncRegEx = /[.,-]/g;

  // apply regex
  const regexTxt = str.replace(newReg, '').replace(puncRegEx, '');

  // split txt into arr of words
  return regexTxt.split(' ');
};

export default convertStrToWordArr;