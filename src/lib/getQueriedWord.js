import React from 'react';

    //(text: source text blob, hlText: selectedWord-to-hightlight)
const getQueriedWord = (text, hlText, classToUse) => {

    //remove existing tags associated with this selection

    //insert classToUse in where the selected-text goes
    let removeRegex = new RegExp("/.\w*\s\w*=\/" + classToUse + ".(\w*)<\/\w*>/g")
    // let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    
    // add tags associated with this selection
    // let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    let newStyleRegex = new RegExp("\\b(" + hlText + ")\\b", 'gi');
    
    //update the text body
    // let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)
    let resText = text
        .replace(removeRegex,"$1")
        .replace(newStyleRegex, `<span class="${classToUse}">$1</span>`)

    return resText

}

export {getQueriedWord}