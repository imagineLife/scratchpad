import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
import { getWordsByCount, getLongestThirty, convertStrToWordArr } from '../../lib/stats'
import { TextAreaContext } from '../TextArea/'

const CommonWordsProvider = (props) => {

	let txtVals = React.useContext(TextAreaContext)	
	
	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords, setCommonWords] = React.useState([])
	let [longestNine, setLongestNine] = React.useState([])
	// let [wordLists, setWordLists] = React.useState([])

	const makeCommonWords = (sentencesString)=> {
		let arrayOfWords = convertStrToWordArr(sentencesString)		
		setCommonWords(getWordsByCount(arrayOfWords).slice(0,10))
		setLongestNine(getLongestThirty(arrayOfWords).slice(0,10))
		// setWordLists({"Common Words" : getWordsByCount(arrayOfWords).slice(0,10)})
		// setWordLists({"Longest Words" : getLongestThirty(arrayOfWords).slice(0,10)})
	}

	return(<Provider value={{ selectedWord, setSelectedWord, makeCommonWords, commonWords, longestNine}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	CommonWordsProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}