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
	/*
			State management
	*/
	const initialContext = {text: ''};

	/*
		STATE
			{
				text: 'string...',
				displayText: 'stri..' (affected by area-selection)
				sentences: [
					{y: 8}
				]
			}
	*/
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
					displayText: updateDisplayText(state.sentences, action.payload)	// [0, 23]
				}
				break;
			// case "COMMON_WORDS": 
			// 	return {
			// 		...state,
			// 		commonWords: action.payload
			// 	}
			// 	break;
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
				// console.log('Fetched Data');

					/*
						regex Prep 
						taken from say-what-api
						for most-common word, 
							&& other word-statistics
					*/

					//gets rid of line-break or whatever
		      let newReg = /(^)?\s*$/gm;

		      let uniqueWordRegex = /([a-z]\w+)(?![\s\S]*\1)/gi

		      //remove some punc
		      let puncRegEx = /[.,-]/g

		      //apply regex
		      const regexTxt = textRes.replace(newReg," ").replace(puncRegEx, "")
		      const uniqueWordCount = textRes.match(uniqueWordRegex).length
		      
		      //split txt into arr of words
		      let arrOfText =  regexTxt.split(" ")

		      //update Provider state, triggering reducer with dispatched actions
					textAreaDispatch({type: "TEXT", payload: textRes})
					textAreaDispatch({type: "SENTENCES", payload: getSentences(textRes)})
					// textAreaDispatch({type: "COMMON_WORDS", payload: getWordsByCount(arrOfText).slice(0,9)})
				}))
	}, [])

	//build provider value, CONST
	// const providerVal = {textStore, textAreaDispatch, areaData, setAreaData}
	
	// console.log('textStore')
	// console.log(textStore)
	
	return(<Provider value={{textStore, textAreaDispatch, areaData, setAreaData}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextAreaProvider, 
	Consumer as TextAreaConsumer,
	TextAreaContext
}