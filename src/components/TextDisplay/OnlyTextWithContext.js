import React from 'react';
import './index.css'

import { TextContext } from '../../TextContext'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){
	console.log('%c TextDisplay Render', 'background-color: orange; color: white;')
	
    // const {textStore, textDispatch} = React.useContext(TextContext);
    const txCtx = React.useContext(TextContext);
    console.log('txCtx')
    console.log(txCtx)
    
    
 //    let resText = (selectedWord) ? getQueriedWord(textStore.text, selectedWord) : textStore.text;

	// return(
	// 	<div id="text-display">{resText || 'placeholder...'}</div>
	// )
	return(<p>Test</p>)
})

export default TextDisplay;