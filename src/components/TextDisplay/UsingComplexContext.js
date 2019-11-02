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


  let columnCount = Math.ceil(inViewSentences.length / 15)
  columnCount = Math.min(columnCount, 4)

  let columnStyle = {
		columns: columnCount, //10-sentence-columns,
		overflowX: 'scroll',
		columnRuleStyle: 'solid',
		height: '450px'
	}

	/* apply theme to theme-d sentence*/
	if(selectedTheme){

		//first sentence index from text-area box
		let viewableFirstSentenceIndex = selectedAreaArr[0]

		// array of selected-theme words ['unity']
		let themesArray = Object.keys(selectedTheme)
		
		// arr of key-words related to the theme ['we, 'together']
		let themeKeywords = selectedTheme[themesArray]

		//loop through theme words
	  for(let keyWord in themeKeywords){
	  	
	  	//Apply theme html to each sentence
	  	//[2] or [2,3]
		  themeKeywords[keyWord].forEach((sentenceNumber, idx) => {

		  		//sentence offset magic
		  		// deal with 0-based arr indexing
		  		let sentenceOffset = sentenceNumber - viewableFirstSentenceIndex - 1 
		  		
		  		if(inViewSentences[sentenceOffset]){
		  			const matchedThemeRegex = new RegExp(keyWord, 'gi')
			  		//italicize theme-key-word
			  		let matchedThemeTxt = inViewSentences[sentenceOffset]
			  			.replace(matchedThemeRegex, `<i>${keyWord}</i>`) //figure-out the capitalization

			  		//apply theme
			  		inViewSentences[sentenceOffset] = `<span class="themed theme-${keyWord}">${matchedThemeTxt}</span>` //inViewSentences[sentenceOffset]
		  		}
		  })
	  }

	  //re-join sentences
	  resText = inViewSentences.join("")
	}
	return <p className="display-text" style={columnStyle} dangerouslySetInnerHTML={{__html: resText}}></p>
})

export default TextDisplay;