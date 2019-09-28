import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
import { getWordsByCount } from '../../lib/stats'
// import { TextAreaProvider } from '../TextArea/'

const CommonWordsProvider = (props) => {

	// let tpvals = React.useContext(TextAreaProvider)	
	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords, setCommonWords] = React.useState([])

	const makeCommonWords = (sentenceArr)=> {
		setCommonWords(getWordsByCount(sentenceArr).slice(0,9))
	}
	// let contextVal = { selectedWord, setSelectedWord }	

// console.log('%c C o m o n words context', 'background-color: pink; color: white;')
	return(<Provider value={{ selectedWord, setSelectedWord, makeCommonWords }}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	CommonWordsProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}