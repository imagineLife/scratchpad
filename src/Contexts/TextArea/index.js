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

  const [textAnalyticsStore, textAreaDispatch] = useReducer(reducer, initialContext);
  const [areaData, setAreaData] = useState(null);
  const [themesData, setThemesData] = useState(null);

  /*
		load the text from textFile 'on load'
	*/
  useEffect(() => {
    const textFileURL = process.env.NODE_ENV == 'development' ? '../../data/fullText.txt' : './data/fullText.txt';
    const themesURL = process.env.NODE_ENV == 'development' ? '../../data/themesArrSlim.json' : './data/themesArrSlim.json';

    fetch(textFileURL)
      .then((textFileRes) => textFileRes.text()
      	.then((textRes) => {
	        const sentences = getSentences(textRes);
	        const maxWordCount = arr.max(sentences, (d) => d.wordCount);


	        // update Provider state, triggering reducer with dispatched actions
	        textAreaDispatch({type: "DONE_FETCHING_TEXT", payload: {
            text: textRes,
            sentences,
            maxWords: maxWordCount
          }})
	        fetch(themesURL)
	          .then((themeRes) => themeRes.json().then(setThemesData));
	      }));
  }, []);

  console.log('%c TextArea Provider', 'background-color: pink; color: black;')
  
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
