/*

	Currently not used

*/

import React from 'react';
let TextContext = React.createContext(); 
let {Provider, Consumer} = TextContext
import {getQueriedWord} from '../lib/getQueriedWord'
import { getSentences } from '../lib/stats'
import reducer from './reducer';
import initialState from './reducer/initialState';

let TextProvider = (props) => {
	/*
			State management
	*/
	


	let [textStore, textDispatch] = React.useReducer(reducer, initialContext)

	/*
		load the text from textFile 'on load'
	*/
	React.useEffect(() => {
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