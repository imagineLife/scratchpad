import React, {
  useReducer, useState, useEffect, createContext,
} from 'react';
import * as arr from 'd3-array';
import { getQueriedWord } from '../../lib/getQueriedWord';
import { getSentences } from '../../lib/stats';
import reducer from './reducer'
const TextAreaContext = createContext();
const { Provider, Consumer } = TextAreaContext;

const TextAreaProvider = (props) => {
  const initialContext = { text: '', curColor: null };
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

  return (
    <Provider value={{
      textAreaDispatch,
      areaData,
      curColor: textAnalyticsStore.curColor,
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
