import React from 'react';
let TextAreaContext = React.createContext(); 
let {Provider, Consumer} = TextAreaContext;
import {getQueriedWord} from '../../lib/getQueriedWord'
import { getSentences } from '../../lib/stats'

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
					displayText: updateDisplayText(state.sentences, action.payload)	// [0, 23]
				}
				break;

			case "WORD_LENGTH":
				console.log('Selected Circle, in t.a.provider reducer!');
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

			default:
				return {...state, text: action.payload}	
				break;
		}
	}


	let [textStore, textAreaDispatch] = React.useReducer(reducer, initialContext)
	let [areaData, setAreaData] = React.useState(null)

	/*
		load the text from textFile 'on load'
	*/
	React.useEffect(() => {
		// console.log('LOADING TEXT in textAreaProvider');
		fetch('../../data/fullText.txt')
			.then(res => res.text().then(textRes => {

		      //update Provider state, triggering reducer with dispatched actions
					textAreaDispatch({type: "TEXT", payload: textRes})
					textAreaDispatch({type: "SENTENCES", payload: getSentences(textRes)})
				}))
	}, [])
	
	return(<Provider value={{textAreaDispatch, areaData, setAreaData, ...textStore}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextAreaProvider, 
	Consumer as TextAreaConsumer,
	TextAreaContext
}