import React, {
  useReducer, useState, useEffect, createContext,
} from 'react';
import * as arr from 'd3-array';
import { getQueriedWord } from '../../lib/getQueriedWord';
import { getSentences } from '../../lib/stats';

const TextAreaContext = createContext();
const { Provider, Consumer } = TextAreaContext;

const updateDisplayText = (sentenceArr, selectedSentenceArr) => {
  let resString = '';
  let curIdx = selectedSentenceArr[0];
  while (curIdx < selectedSentenceArr[1]) {
    resString += `${sentenceArr[curIdx++].text} `;
  }
  return resString;
};

const TextAreaProvider = (props) => {
  const initialContext = { text: '' };
  const [themeColors] = useState([
    'rgb(166,206,227)',
    'rgb(31,120,180)',
    'rgb(178,223,138)',
    'rgb(51,160,44)',
    'rgb(251,154,153)',
    'rgb(227,26,28)',
    'rgb(253,191,111)',
    'rgb(255,127,0)',
    'rgb(202,178,214)',
    'rgb(106,61,154)',
    'rgb(255,255,153)',
    'rgb(177,89,40)',
  ]);

  const [curColor, setCurColor] = useState(null);

  const reducer = (state, action) => {
    let resText;

    switch (action.type) {
    case 'SENTENCES':
      return {
        ...state,
        sentences: action.payload,
      };
      break;

    case 'UPDATE_DISPLAY_TEXT_FROM_AREA':
      return {
        ...state,
        selectedAreaArr: action.payload,
        displayText: updateDisplayText(state.sentences, action.payload),
      };
      break;

    case 'WORD_LENGTH':
      return {
        ...state,
        wordLength: action.payload,
      };
      break;

    case 'TEXT':
      return {
        ...state,
        text: action.payload,
      };

    case 'MAX_WORDS':
      return {
        ...state,
        maxWordsPerSentence: action.payload,
      };

    case 'THEME':
      const randLength = Math.floor(Math.random() * themeColors.length);
      let randClr = null;
      if (action.payload) {
        randClr = themeColors[randLength];
      }

      setCurColor(randClr);
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return { ...state, text: action.payload };
      break;
    }
  };


  const [textAnalyticsStore, textAreaDispatch] = useReducer(reducer, initialContext);
  const [areaData, setAreaData] = useState(null);
  const [themesData, setThemesData] = useState(null);

  /*
		load the text from textFile 'on load'
	*/
  useEffect(() => {
    const textFileURL = process.env.NODE_ENV == 'development' ? '../../data/fullText.txt' : './data/fullText.txt';
    const themesURL = process.env.NODE_ENV == 'development' ? '../../data/themesArrSlim.json' : './data/themesArrSlim.json';

    // console.log('LOADING TEXT in textAreaProvider');
    fetch(textFileURL)
      .then((textFileRes) => textFileRes.text()
      	.then((textRes) => {
	        const sentences = getSentences(textRes);
	        const maxWordCount = arr.max(sentences, (d) => d.wordCount);

	        // update Provider state, triggering reducer with dispatched actions
	        textAreaDispatch({ type: 'TEXT', payload: textRes });
	        textAreaDispatch({ type: 'SENTENCES', payload: sentences });
	        textAreaDispatch({ type: 'MAX_WORDS', payload: maxWordCount });

	        fetch(themesURL)
	          .then((themeRes) => themeRes.json().then(setThemesData));
	      }));
  }, []);

  console.log('%c PROVIDER', 'background-color: blue; color: white;');

  console.log('curColor');
  console.log(curColor);


  return (
    <Provider value={{
      textAreaDispatch,
      areaData,
      curColor,
      setAreaData,
      themesData,
      ...textAnalyticsStore,
    }}
    >
      {props.children}
    </Provider>
  );
};

// export default Provider;
export {
  TextAreaProvider,
  Consumer as TextAreaConsumer,
  TextAreaContext,
};
