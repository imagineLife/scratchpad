import React from 'react';
import './index.css'
import { TextContext } from '../../TextContext'
import { WordListContext } from '../../WordListContext'

const getQueriedWord = (text, hlText) => {

    //remove existing tags associated with this selection
    let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    
    /*
        let newStyleRegex = new RegExp(`\W(${hlText})\W`, 'gi');
        IN JS the '\' has to be escaped, a-la \\b 
    */ 
    
    // add tags associated with this selection
    let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    
    //update the text body
    let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)

    
    return <p dangerouslySetInnerHTML={{__html: resText}}></p>

}

const TextDisplay = () => {

    //hook into the needed context(s)
    let resText = React.useContext(TextContext)
    let WordListContextVals = React.useContext(WordListContext)

    console.log('%c <TextDisplay/>, WordListContextVals from context ===>', 'background-color: steelblue; color: white;')
    console.log(WordListContextVals)
    
    //get calculated display-able text, including the selectedWord from context
	resText = (WordListContextVals.selectedWord) ? getQueriedWord(resText, WordListContextVals.selectedWord) : resText;
    // let resText = (commonWord) ? getLongestWord(txt, longestWord) : txt;

    //PLACEHOLDER
    resText = !resText ? 'placeholder...' : resText;
    
	return(
		<div id="text-display">{resText}</div>
	)
}

export default TextDisplay;