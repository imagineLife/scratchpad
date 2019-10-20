import React from 'react';
import './index.css'

import { TextAreaContext } from '../../Contexts/TextArea'
import { WordListContext } from '../../Contexts/CommonWords'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){

	let selectedTheme = {
		unity : {
			we: [2],
			together: [2,3]
		}
	}



	//1. load txt string
  const { displayText, selectedAreaArr, sentences } = React.useContext(TextAreaContext);

  //2. get selected word from selectedWordList 
  const { selectedWord } = React.useContext(WordListContext);

  let displaySentences  = [];

	if(!displayText){
		return(<p>Text Display Using Complex Context</p>)
	}

	//if no selected word && no 
	let resText = displayText

	//apply selected word to text display
	if(selectedWord){
		resText = getQueriedWord(displayText, selectedWord)
	}

	/*TODO: 
		Convert to use 'sentences' array from textAReaContext?! [ {text: 'sentenceOne...'...etc}]
		&& area-selection array [0, 24] 
	*/
	let twoWhiteSpaces = /(\s{2})/gm;
  let standarizeWS = /([?!.]\s)(.)/gm;  
  let sentRegex = /(([A-Z][a-z])|\s)+[^.!?]*([A-Za-z].[A-Za-z]|[^.!?].)/g;
	
  let inViewSentences = resText.replace(twoWhiteSpaces, " ")
    .replace(standarizeWS, ". $2")
    .match(sentRegex);


  let columnCount = Math.ceil(inViewSentences.length / 10)
  console.log('columnCount')
  console.log(columnCount)
  
  let columnStyle = {
		columns: columnCount, //10-sentence-columns,
		overflowX: 'scroll',
		columnRuleStyle: 'solid',
		maxHeight: '350px'
	}

	/* apply theme to theme-d sentence*/
	if(selectedTheme){

		//first sentence index from text-area box
		let firstSentenceIndex = selectedAreaArr[0]
		//[0]
		
	  /*
			TODO:
			Figure out best way to store & work with themes...
	  */
		let themesArray = Object.keys(selectedTheme) //['unity']
		let curThemeKeyWords = selectedTheme[themesArray] // ['we', together]

		//loop through theme words
	  for(let k in curThemeKeyWords){ //k = we, k= together
	  	
	  	//Apply theme html to each sentence
	  	//[2] or [2,3]
		  curThemeKeyWords[k].forEach((sentenceNumber, idx) => {

		  		//sentence offset magic
		  		// deal with 0-based arr indexing
		  		let sentenceOffset = sentenceNumber - firstSentenceIndex - 1 
		  		
		  		if(inViewSentences[sentenceOffset]){
		  			const matchedThemeRegex = new RegExp(k, 'gi')
			  		//italicize theme-key-word
			  		let matchedThemeTxt = inViewSentences[sentenceOffset]
			  			.replace(matchedThemeRegex, `<i>${k}</i>`) //figure-out the capitalization

			  		//apply theme
			  		inViewSentences[sentenceOffset] = `<span class="themed theme-${k}">${matchedThemeTxt}</span>` //inViewSentences[sentenceOffset]
		  		}
		  })
	  }

	  //re-join sentences
	  resText = inViewSentences.join("")
	}
	return <p className="display-text" style={columnStyle} dangerouslySetInnerHTML={{__html: resText}}></p>
})

export default TextDisplay;