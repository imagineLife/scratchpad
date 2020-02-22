import React from 'react';
import {
  getWordsByCount,
  getLongestThirty,
  convertStrToWordArr,
  ingWords,
  arrayOfWords,
  getWordsByLength,
} from '../../lib/stats';
import { TextAreaContext } from '../TextArea';

const WordListContext = React.createContext();
const { Provider, Consumer } = WordListContext;

const CommonWordsProvider = (props) => {
 	const initialState = {
 		'Common Words': [],
 		'Longest Words': [],
 		'Action Words': [],
 	};

 	const reducer = (state, action) => {
    let resText;
    switch (action.type) {
    case 'LONGEST_WORDS':
      return {
        ...state,
        'Longest Words': action.payload,
      };
      break;

    case 'COMMON_WORDS':
      return {
        ...state,
        'Common Words': action.payload,
      };
      break;

    case 'ACTION_WORDS':
      return {
        ...state,
        'Action Words': action.payload,
      };
      break;

    default:
      return { ...state };
      break;
    }
  };


  const [wordLists, setWordLists] = React.useReducer(reducer, initialState);

  const txtVals = React.useContext(TextAreaContext);

  const [selectedWord, setSelectedWord] = React.useState(null);
  const [commonWords, setCommonWords] = React.useState([]);
  const [longestNine, setLongestNine] = React.useState([]);
  const [wordListFocus, selectWordList] = React.useState(null);
  const makeCommonWords = (sentencesString) => {
    const arrayOfWords = convertStrToWordArr(sentencesString);
    setCommonWords(getWordsByCount(arrayOfWords).slice(0, 10));
    setLongestNine(getLongestThirty(arrayOfWords).slice(0, 10));
    setWordLists({ type: 'COMMON_WORDS', payload: getWordsByCount(arrayOfWords).slice(0, 10) });
    setWordLists({ type: 'LONGEST_WORDS', payload: getLongestThirty(arrayOfWords).slice(0, 10) });
    setWordLists({ type: 'WORDS_BY_LENGTH', payload: getWordsByLength(arrayOfWords) });
    setWordLists({
      type: 'ACTION_WORDS',
      payload: (function getINGWords() {
        const words = ingWords(sentencesString);
        if (!words) {
          return [];
        }
        return words.filter((itm, idx) => words.indexOf(itm) === idx);
      }()),
    });
  };

  return (
    <Provider value={{
      selectedWord,
      setSelectedWord,
      makeCommonWords,
      commonWords,
      longestNine,
      wordLists,
      selectWordList,
      wordListFocus,
    }}
    >
      {props.children}
    </Provider>
  );
};

// export default Provider;
export {
  CommonWordsProvider,
  Consumer as WordListConsumer,
  WordListContext,
};
