import React from 'react';

    //(text: source text blob, hlText: selectedWordLength-to-hightlight)
const getWordLength = (text, textLength, classToUse) => { 

    let removeRegex = new RegExp("/.\w*\s\w*=\/" + classToUse + ".(\w*)<\/\w*>/g")
    let newStyleRegex = new RegExp("\\s(\\w{"+textLength+"})[\\s.!?,]", "g"); //"/\\s(\\w{"+textLength+"})[\\s.!?,]/"

    //update the text body
    let resText = text
        .replace(removeRegex,"$1")
        .replace(newStyleRegex, ` <span class="${classToUse}">$1</span> `)
    
    return resText

}

export default getWordLength