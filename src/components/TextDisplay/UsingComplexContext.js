import React from 'react';
import './index.css'

import { TextAreaContext } from '../../Contexts/TextArea'
import { WordListContext } from '../../Contexts/CommonWords'
import { getQueriedWord } from '../../lib/getQueriedWord'
import getWordLength from '../../lib/getWordLength'
const TextDisplay = React.memo(function TextDisplay(){

	let selectedTheme = {
		unity : {
			we: [2],
			together: [2,3]
		}
	}


  //STATE
  const { 
  	displayText, 
  	selectedAreaArr, 
  	sentences, 
  	wordLength, 
  	theme, 
  	themesData
  } = React.useContext(TextAreaContext);

  const { selectedWord } = React.useContext(WordListContext);
  
  console.log('%c -- TextDisplay --', 'background-color: darkblue; color: white;')
  console.log('theme')
  console.log(theme)
  console.log('selectedAreaArr')
  console.log(selectedAreaArr)
  console.log('sentences')
  console.log(sentences)
  console.log('themesData')
  console.log(themesData)


	if(!displayText){
		return(<p>Text Display Using Complex Context</p>)
	}

	//if no selected word && no 
	let resText = displayText
	
	/*
    apply SELECTED WORD
  */
	if(selectedWord){
		resText = getQueriedWord(displayText, selectedWord, 'selected-text')
	}

  /*
    apply WORD-LENGTH
  */
	if(wordLength){
		resText = getWordLength(resText, wordLength, 'word-length')
	}

  /*
    calculate text-segment in-view
  */
	let twoWhiteSpaces = /(\s{2})/gm;
  let standarizeWS = /([?!.]\s)(.)/gm;  
  let sentRegex = /(([A-Z][a-z])|\s)+[^.!?]*([A-Za-z].[A-Za-z]|[^.!?].)/g;
  let inViewSentences = resText.replace(twoWhiteSpaces, " ")
    .replace(standarizeWS, ". $2")
    .match(sentRegex);


  //"Responsive" UI column divisions
  let columnCount = Math.ceil(inViewSentences.length / 15)
  columnCount = Math.min(columnCount, 4)

  let columnStyle = {
		columns: columnCount, //10-sentence-columns,
		overflowX: 'scroll',
		columnRuleStyle: 'solid',
		height: '450px'
	}

	/*
		BEFORE sentence-wide-styles applied...
		if(wordLength selected from circles){
			apply word-length selected styling to resulting text
		}
	*/


  /*
    from selected-theme to theme-sentence-underlined
  */

  //HELP FROM JACK
  //PLACEHOLDER, MOVE THIS ELSEWHERE
  // let themeMappedObject = { }
  // themesData && themesData.forEach((t,idx) => {
    
  //   //loop through the nested array element
  //   t.forEach(nestedThemeWord => {
  //     themeMappedObject[nestedThemeWord] = 
  //       themeMappedObject[nestedThemeWord] ?  
  //       [...themeMappedObject[nestedThemeWord], idx] : 
  //       [idx]
  //   })
  // })

  // let selectedThemeSentenceIndexes = themeMappedObject[theme]

  
  //   Sentences + Themes
  //   Calulating, getting, && applying themes to sentences
  
  // let absoluteSentenceIndexesThatIncludeSelectedTheme = []

  // if(theme){
  //   //loop through selected-sentence array
  //   for(let i = selectedAreaArr[0]; i <= selectedAreaArr[1]; i++){
      
  //     //check if the current sentence HAS the selected theme
  //     if(themesData[i].includes(theme)){
  //       absoluteSentenceIndexesThatIncludeSelectedTheme.push({i, themes: themesData[i]})
  //     }
  //   }
  // }

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