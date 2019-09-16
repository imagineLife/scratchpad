import React from 'react';
import './index.css'

import { TextContext } from '../../TextContext'
import { WordListContext } from '../../WordListContext'

const getQueriedWord = (text, hlText) => {

    //remove existing tags associated with this selection
    let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    
    // add tags associated with this selection
    let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    
    //update the text body
    let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)

    
    return <p dangerouslySetInnerHTML={{__html: resText}}></p>

}

const TextDisplay = () => {

    const {text} = React.useContext(TextContext);
    
    // let resText = (commonWord) ? getQueriedWord(txtContextVals.text, commonWord) : txtContextVals.text;
    
    let resText = !text ? 'placeholder...' : text;
    return(
        <div id="text-display">{resText}</div>
    )
}

export default TextDisplay;