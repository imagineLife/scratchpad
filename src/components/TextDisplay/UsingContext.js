import React from 'react';
import './index.css'

import { TextContext } from '../../TextContext'
import { WordListContext } from '../../WordListContext'
import { getQueriedWord } from '../../lib/getQueriedWord'

const TextDisplay = React.memo(function TextDisplay(){
	console.log('%c TextDisplay Render', 'background-color: orange; color: white;')
	
    const {textStore, textDispatch} = React.useContext(TextContext);
    const { selectedWord } = React.useContext(WordListContext);
    
    let resText = (selectedWord) ? getQueriedWord(textStore.text, selectedWord) : textStore.text;
    // let resText = (commonWord) ? getLongestWord(txt, longestWord) : txt;

    // resText = !resText ? 'placeholder...' : resText;
	return(
		<div id="text-display">{resText || 'placeholder...'}</div>
	)
})

export default TextDisplay;