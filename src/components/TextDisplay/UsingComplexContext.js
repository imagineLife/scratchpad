import React from 'react';
import './index.css'

import { TextContext } from '../../TextContext/complex'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){
	console.log('%c TextDisplay Render', 'background-color: orange; color: white;')
	
    // const {textStore, textDispatch} = React.useContext(TextContext);
    const { textStore } = React.useContext(TextContext);
    console.log('{ textStore }')
    console.log(textStore)

	if(!textStore || !textStore.text){
		return(<p>ONLY Text with Context</p>)
	}

	return(
		<p>{textStore.text}</p>)
})

export default TextDisplay;