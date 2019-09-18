import React from 'react';
import './index.css'

// const getQueriedWord = (text, hlText) => {

//     //remove existing tags associated with this selection
//     let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    
//     /*
//         let newStyleRegex = new RegExp(`\W(${hlText})\W`, 'gi');
//         IN JS th '\' has to be escaped, a-la \\b 
//     */ 
    
//     // add tags associated with this selection
//     let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    
//     //update the text body
//     let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)

    
//     return <p dangerouslySetInnerHTML={{__html: resText}}></p>

// }

const TextDisplay = (props) => {

    console.log('TextDisplay props')
    console.log(props)
    

	// let resText = (props.commonWord) ? getQueriedWord(props.text, props.commonWord) : props.text;
    // let resText = (commonWord) ? getLongestWord(txt, longestWord) : txt;

    // resText = !resText ? 'placeholder...' : resText;
	return(
		<div id="text-display">{props.text || 'placeholder...'}</div>
	)
}

export default TextDisplay;