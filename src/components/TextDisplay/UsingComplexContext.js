import React from 'react';
import './index.css'

import { TextAreaContext } from '../../Contexts/TextArea'
import { WordListContext } from '../../Contexts/CommonWords'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){

	let selectedTheme = {
		thankful : [1, 3]
		// angry: [2]
	}
	//1. load txt string
  const { displayText, selectedAreaArr } = React.useContext(TextAreaContext);

  //2. get selected word from selectedWordList 
  const { selectedWord } = React.useContext(WordListContext);
  

	if(!displayText){
		return(<p>Text Display Using Complex Context</p>)
	}

	//if no selected word && no 
	let resText = displayText

	//apply selected word to text display
	if(selectedWord){
		resText = getQueriedWord(displayText, selectedWord)
	}

	/* apply theme to theme-d sentence
		
		THEME => color
		
		sentence# => which part of text to underline

		// INPUT
		- text-blob => resText
		- sentence array => 'sentences' (from textAreaContext)
		- associate theme with sentence array (above example)
		*/

		if(selectedTheme){


			
			let firstSentenceIndex = selectedAreaArr[0]
			console.log('firstSentenceIndex')
			console.log(firstSentenceIndex)
			
			let twoWhiteSpaces = /(\s{2})/gm;
		  let standarizeWS = /([?!.]\s)(.)/gm;  
		  let sentRegex = /(([A-Z][a-z])|\s)+[^.!?]*([A-Za-z].[A-Za-z]|[^.!?].)/g;
		  
  		console.log('resText')
  		console.log(resText)
  		
		  let inViewSentences = resText.replace(twoWhiteSpaces, " ")
		    .replace(standarizeWS, ". $2")
		    .match(sentRegex);

		  	let curThemeStr = Object.keys(selectedTheme)
		  	let curThemeArr = selectedTheme[curThemeStr]
		  curThemeArr.forEach((theme, idx) => {
		  		
		  		//sentence offset magic
		  		let sentenceOffset = theme - firstSentenceIndex
		  		console.log('sentenceOffset')
		  		console.log(sentenceOffset)
		  		
		  		//apply theme
		  		inViewSentences[sentenceOffset] = `<span class="themed theme-${curThemeStr}">${inViewSentences[sentenceOffset]}</span>`
		  })

		  //re-join sentences
		  resText = inViewSentences.join()

		}
		return <p className="display-text" dangerouslySetInnerHTML={{__html: resText}}></p>
})

export default TextDisplay;