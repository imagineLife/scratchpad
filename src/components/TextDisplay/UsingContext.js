import React from 'react';
import './index.css'

import { TextContext } from '../../TextContext'

const getQueriedWord = (text, hlText) => {

    //remove existing tags associated with this selection
    let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    
    /*
        let newStyleRegex = new RegExp(`\W(${hlText})\W`, 'gi');
        IN JS th '\' has to be escaped, a-la \\b 
    */ 
    
    // add tags associated with this selection
    let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    
    //update the text body
    let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)

    
    return <p dangerouslySetInnerHTML={{__html: resText}}></p>

}

const TextDisplay = () => {

    const txtContextVals = React.useContext(TextContext);

    // let resText = (commonWord) ? getQueriedWord(txtContextVals.text, commonWord) : txtContextVals.text;
    let resText = txtContextVals.text;
    
    resText = !resText ? 'placeholder...' : resText;
    return(
        <div id="text-display">{resText}</div>
    )
}

export default TextDisplay;