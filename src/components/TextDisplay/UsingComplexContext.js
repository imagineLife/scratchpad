import React from 'react';
import './index.css'

import { TextAreaContext } from '../../Contexts/TextArea'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){
	console.log('%c TextDisplay Render', 'background-color: orange; color: white;')
  const { textStore } = React.useContext(TextAreaContext);

	if(!textStore || !textStore.displayText){
		return(<p>ONLY Text with Context</p>)
	}

	return(
		<p>{textStore.displayText}</p>)
})

export default TextDisplay;