import React from 'react';
import './index.css'

const getHighlightedText = (text, hlText) => {
    // Split on hlText term and include term into parts, ignore case
    let rxStr = `(${hlText})`//`(${hlText})`

    let highlitRegex = new RegExp(rxStr, 'gi')
    
    let parts = text.split(highlitRegex);
    
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === hlText.toLowerCase() ? { fontWeight: 'bold', fontSize: '22px' } : {} }>
            { part }
        </span>)
    } </span>;
}

const TextDisplay = ({txt ,selectedWord}) => {

	let resText = (selectedWord) ? getHighlightedText(txt, selectedWord) : txt;

	return(
		<div id="text-display">{resText}</div>
	)
}

export default TextDisplay;