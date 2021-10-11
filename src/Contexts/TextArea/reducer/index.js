import {
  SENTENCES,
  UPDATE_DISPLAY_TEXT_FROM_AREA,
  WORD_LENGTH,
  TEXT,
  MAX_WORDS,
  THEMES
} from './types';

const updateDisplayText = (sentenceArr, selectedSentenceArr) => {
  let resString = '';
  let curIdx = selectedSentenceArr[0];
  while (curIdx < selectedSentenceArr[1]) {
    resString += `${sentenceArr[curIdx++].text} `;
  }
  return resString;
};

const reducer = (state, action) => {
  let resText;

  switch (action.type) {
  case SENTENCES:
    return {
      ...state,
      sentences: action.payload,
    };

  case UPDATE_DISPLAY_TEXT_FROM_AREA:
    return {
      ...state,
      selectedAreaArr: action.payload,
      displayText: updateDisplayText(state.sentences, action.payload),
    };

  case WORD_LENGTH:
    return {
      ...state,
      wordLength: action.payload,
    };

  case TEXT:
    return {
      ...state,
      text: action.payload,
    };

  case MAX_WORDS:
    return {
      ...state,
      maxWordsPerSentence: action.payload,
    };

  case THEME:
    const randLength = Math.floor(Math.random() * themeColors.length);
    let randClr = null;
    if (action.payload) {
      randClr = themeColors[randLength];
    }
    return {
      ...state,
      theme: action.payload,
      curColor: randClr
    };

  default:
    return { ...state, text: action.payload };
    break;
  }
};

export default reducer;