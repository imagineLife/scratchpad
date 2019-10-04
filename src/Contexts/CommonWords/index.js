import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
import { getWordsByCount, getWordsByLength } from '../../lib/stats'
import { TextAreaContext } from '../TextArea/'

const CommonWordsProvider = (props) => {

	let txtVals = React.useContext(TextAreaContext)	
	
	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords, setCommonWords] = React.useState([])
	let [wordsByLength, setWordsByLength] = React.useState([])

	const makeCommonWords = (sentenceArr)=> {
		setCommonWords(getWordsByCount(sentenceArr).slice(0,9))
		setWordsByLength(getWordsByLength(sentenceArr).slice(0,9))
	}
	
	return(<Provider value={{ selectedWord, setSelectedWord, makeCommonWords, commonWords,  wordsByLength}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	CommonWordsProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}