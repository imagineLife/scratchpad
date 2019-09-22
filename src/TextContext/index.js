import React from 'react';
let TextContext = React.createContext(); 
let {Provider, Consumer} = TextContext
import {getQueriedWord} from '../lib/getQueriedWord'

let TextProvider = (props) => {

	/*
			State management
	*/
	const initialContext = {text: ''};

	const reducer = (state, action) => {
			let resText;
		switch(action.type){
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
		fetch('../../data/demo.txt')
			.then(res => res.text().then(textRes => {
				console.log('Fetched Data');
					textDispatch({type: "TEXT", payload: textRes})
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