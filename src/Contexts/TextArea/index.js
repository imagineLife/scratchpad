import React, { useReducer, useState, useEffect, createContext } from 'react';
let TextAreaContext = createContext(); 
let {Provider, Consumer} = TextAreaContext;
import {getQueriedWord} from '../../lib/getQueriedWord'
import { getSentences } from '../../lib/stats'
import * as arr from 'd3-array'

const updateDisplayText = (sentenceArr, selectedSentenceArr) => {
	let resString = '';
	let curIdx = selectedSentenceArr[0];
	while(curIdx < selectedSentenceArr[1]){
		resString += sentenceArr[curIdx++].text+' '
	}
	return resString
}

let TextAreaProvider = (props) => {
	
	const initialContext = {text: ''};

	const reducer = (state, action) => {
		let resText;
		
		switch(action.type){
			case "SENTENCES": 
				return {
					...state, 
					sentences: action.payload
				}
				break;

			case "UPDATE_DISPLAY_TEXT_FROM_AREA":
				return {
					...state,
					selectedAreaArr: action.payload,
					displayText: updateDisplayText(state.sentences, action.payload)
				}
				break;

			case "WORD_LENGTH":
				return {
					...state,
					wordLength: action.payload
				};
				break;

			case "TEXT":
				return {
					...state,
					text: action.payload
				}

			case "MAX_WORDS":
				return {
					...state,
					maxWordsPerSentence: action.payload
				}

			case "THEME":
				return {
					...state,
					theme: action.payload
				}

			default:
				return {...state, text: action.payload}	
				break;
		}
	}


	let [textAnalyticsStore, textAreaDispatch] = useReducer(reducer, initialContext)
	let [areaData, setAreaData] = useState(null)
	let [themesData, setThemesData] = useState(null)

	/*
		load the text from textFile 'on load'
	*/
	useEffect(() => {
		let textFileURL = process.env.NODE_ENV == 'development' ? '../../data/fullText.txt' : './data/fullText.txt'
		let themesURL = process.env.NODE_ENV == 'development' ? '../../data/themesArrSlim.json' : './data/themesArrSlim.json'

		// console.log('LOADING TEXT in textAreaProvider');
		fetch(textFileURL)
			.then(res => res.text().then(textRes => {
					let sentences = getSentences(textRes)
					let maxWordCount = arr.max(sentences, d => d.wordCount)
					
		      //update Provider state, triggering reducer with dispatched actions
					textAreaDispatch({type: "TEXT", payload: textRes})
					textAreaDispatch({type: "SENTENCES", payload: sentences})
					textAreaDispatch({type: "MAX_WORDS", payload: maxWordCount})

					fetch(themesURL)
					.then(res => res.json().then(setThemesData)
					)
				}))
	}, [])
	
	return(<Provider value={{
		textAreaDispatch, 
		areaData, 
		themesData, 
		setAreaData, 
		...textAnalyticsStore
	}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextAreaProvider, 
	Consumer as TextAreaConsumer,
	TextAreaContext
}