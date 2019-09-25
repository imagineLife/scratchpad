import React from 'react';
let TextContext = React.createContext(); 
let {Provider, Consumer} = TextContext
import {getQueriedWord} from '../lib/getQueriedWord'
import { getSentences } from '../lib/stats'

let TextProvider = (props) => {
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

	/*
		load the text from textFile 'on load'
	*/
	React.useEffect(() => {
		console.log('LOADING TEXT in textProvider');
		fetch('../../data/fullText.txt')
			.then(res => res.text().then(textRes => {
				console.log('Fetched Data');
					textDispatch({type: "TEXT", payload: textRes})
					textDispatch({type: "SENTENCES", payload: getSentences(textRes)})
				}))
	}, [])

	//build provider value, CONST
	const providerVal = {textStore, textDispatch}
	
	return(<Provider value={providerVal}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextProvider, 
	Consumer as TextConsumer,
	TextContext
}