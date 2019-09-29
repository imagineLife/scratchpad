import React from 'react';
import './index.css'

import { TextAreaContext } from '../../Contexts/TextArea'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){
  const { displayText } = React.useContext(TextAreaContext);

	if(!displayText){
		return(<p>Text Display Using Complex Context</p>)
	}

	return(
		<p>{displayText}</p>)
})

export default TextDisplay;