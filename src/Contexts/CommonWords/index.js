import React, {
  useEffect,
  useState,
  createContext,
  useReducer,
  useContext,
} from 'react';
import {
  getWordsByCount,
  getLongestThirty,
  convertStrToWordArr,
  ingWords,
  arrayOfWords,
  getWordsByLength,
} from '../../lib/stats';
import { TextAreaContext } from '../TextArea';

const WordListContext = createContext();
const { Provider, Consumer } = WordListContext;

const CommonWordsProvider = (props) => {
 	const initialState = {
 		'Common Words': [],
 		'Longest Words': [],
 		'Action Words': [],
 	};

  const sortByWordAlpha = (a, b) => {
    if (typeof a === 'string') {
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      return 0;
    }

    if (a.word < b.word) { return -1; }
    if (a.word > b.word) { return 1; }
    return 0;
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


  const [wordLists, setWordLists] = useReducer(reducer, initialState);
  const [wordListNames, setWordListNames] = useState([]);

  const { displayText } = useContext(TextAreaContext);

  const [selectedWord, setSelectedWord] = useState(null);
  const [commonWords, setCommonWords] = useState([]);
  const [longestNine, setLongestNine] = useState([]);
  const [wordListFocus, selectWordList] = useState(null);
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

  // set list of word-list names (common words, longest words, etc...)
  useEffect(() => {
    setWordListNames(Object.keys(wordLists));
  }, [wordLists]);

  // MAKE common words after display-text gets added to context
  useEffect(() => {
    if (displayText) {
      makeCommonWords(displayText);
    }
  }, [displayText]);

  // AUTO-SELECT a word-list 'onLoad'
  useEffect(() => {
    if (displayText && wordLists && !wordListFocus) {
      const lists = Object.keys(wordLists);
      selectWordList(lists[0]);
    }
  }, [displayText, wordListFocus, wordLists]);

  // last-minute list-sorting
  return (
    <Provider value={{
      commonWords,
      longestNine,
      makeCommonWords,
      selectWordList,
      selectedWord,
      setSelectedWord,
      sortByWordAlpha,
      wordLists,
      wordListFocus,
      wordListNames,
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
