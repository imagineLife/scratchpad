import React from 'react';
let TextAreaContext = React.createContext(); 
let {Provider, Consumer} = TextAreaContext
import {getQueriedWord} from '../../lib/getQueriedWord'
import { getSentences } from '../../lib/stats'

let TextAreaProvider = (props) => {
	/*
			State management
	*/
	const initialContext = {text: ''};

	const reducer = (state, action) => {
			let resText;
		switch(action.type){
			case "SENTENCES": {
				return {...state, sentences: action.payload}
			}
			default:
				return {...state, text: action.payload}	
		}
	}

	let [textStore, textDispatch] = React.useReducer(reducer, initialContext)
	let [areaData, setAreaData] = React.useState(null)
	/*
		load the text from textFile 'on load'
	*/
	React.useEffect(() => {
		console.log('LOADING TEXT in textAreaProvider');
		fetch('../../data/fullText.txt')
			.then(res => res.text().then(textRes => {
				console.log('Fetched Data');
					textDispatch({type: "TEXT", payload: textRes})
					textDispatch({type: "SENTENCES", payload: getSentences(textRes)})
				}))
	}, [])

	//build provider value, CONST
	const providerVal = {textStore, textDispatch, areaData, setAreaData}
	
	return(<Provider value={providerVal}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextAreaProvider, 
	Consumer as TextAreaConsumer,
	TextAreaContext
}