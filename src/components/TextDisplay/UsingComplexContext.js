import React from 'react';
import './index.css'

import { TextAreaContext } from '../../Contexts/TextArea'
import { WordListContext } from '../../Contexts/CommonWords'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){
  const { displayText } = React.useContext(TextAreaContext);
  const { selectedWord } = React.useContext(WordListContext);

	if(!displayText){
		return(<p>Text Display Using Complex Context</p>)
	}

	let resText = <p>{displayText}</p>

	if(selectedWord){
		resText = getQueriedWord(displayText, selectedWord)
	}

	return(resText)
})

export default TextDisplay;