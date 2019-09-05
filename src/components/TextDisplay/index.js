import React from 'react';
import './index.css'

const getHighlightedText = (text, hlText) => {

    let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    // let newStyleRegex = new RegExp(`\W(${hlText})\W`, 'gi');
    let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    
    //update the text body
    let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)

    return <p dangerouslySetInnerHTML={{__html: resText}}></p>

}


const TextDisplay = ({txt ,selectedWord}) => {

	let resText = (selectedWord) ? getHighlightedText(txt, selectedWord) : txt;

	return(
		<div id="text-display">{resText}</div>
	)
}

export default TextDisplay;