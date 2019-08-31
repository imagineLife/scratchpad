import React from 'react';
import './index.css'

const getHighlightedText = (text, higlight) => {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold', fontSize: '22px' } : {} }>
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