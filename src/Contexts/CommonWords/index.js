import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
import { getWordsByCount } from '../../lib/stats'
import { TextAreaContext } from '../TextArea/'

const CommonWordsProvider = (props) => {

	let txtVals = React.useContext(TextAreaContext)	
	console.log('txtVals')
	console.log(txtVals)
	
	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords, setCommonWords] = React.useState([])

	const makeCommonWords = (sentenceArr)=> {
		setCommonWords(getWordsByCount(sentenceArr).slice(0,9))
	}
	// let contextVal = { selectedWord, setSelectedWord }	

// console.log('%c C o m o n words context', 'background-color: pink; color: white;')
	return(<Provider value={{ selectedWord, setSelectedWord, makeCommonWords, commonWords }}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	CommonWordsProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}