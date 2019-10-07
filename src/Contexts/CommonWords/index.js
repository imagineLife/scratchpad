import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
import { getWordsByCount, getLongestThirty, convertStrToWordArr } from '../../lib/stats'
import { TextAreaContext } from '../TextArea/'

const CommonWordsProvider = (props) => {
 
 	const initialState = {
 		"Common Words": [],
 		"Longest Words": []
 	};

 	const reducer = (state, action) => {
		let resText;
		switch(action.type){
			case "LONGEST_WORD":
				return {
					...state,
					"Longest Words" : action.payload
				}
				break;
			
			case "COMMON_WORDS":
				return {
					...state,
					"Common Words" : action.payload
				}
				break;
			
			default:
				return {...state}	
				break;
		}
	}


	let [wordLists, setWordLists] = React.useReducer(reducer, initialState)
 
	let txtVals = React.useContext(TextAreaContext)	

	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords, setCommonWords] = React.useState([])
	let [longestNine, setLongestNine] = React.useState([])

	const makeCommonWords = (sentencesString)=> {
		let arrayOfWords = convertStrToWordArr(sentencesString)		
		setCommonWords(getWordsByCount(arrayOfWords).slice(0,10))
		setLongestNine(getLongestThirty(arrayOfWords).slice(0,10))
		setWordLists({type: "COMMON_WORDS", payload: getWordsByCount(arrayOfWords).slice(0,10)})
		setWordLists({type: "LONGEST_WORD", payload: getLongestThirty(arrayOfWords).slice(0,10)})
	}

	console.log('%c ---wordLists---', 'background-color: steelblue; color: white;')
	console.log(wordLists)
	console.log('// - - - - - //')
	
	

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