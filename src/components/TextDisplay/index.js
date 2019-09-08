import React from 'react';
import './index.css'

const THIS_UPPER_CASE_MESS = require('thatMess') //'thisUpperCaseMess'

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

const TextDisplay = ({txt ,commonWord}) => {

	let resText = (commonWord) ? getQueriedWord(txt, commonWord, themeType) : txt;
    // let resText = (commonWord) ? getLongestWord(txt, longestWord) : txt;

	return(
		<div id="text-display">{resText}</div>
	)
}

export default TextDisplay;


/*

    TextDisplay = () => {
        
        // { srcText } = useTextStore()
        { longestWord, theme, commonWord } = useStoreContext()
        
        const setLongestWord = txtParam => {
            return txtParam.applyLongestWordRegexHere...()
        }

        NOTE: 
            helper function will prob be in a separate file

        let alteredText = srcText
        alteredText = longestWord && setLongestWord(alteredText)
        alteredText = theme && setTheme(alteredText)
        alteredText = commonWord && setCommonWord(alteredText)

        return alteredText

    }

    resText = txt; 
    selectedWord && getQueriedWord


    Use Context
    Parent Context
        textBlob

    longestWordCtx
        longWordVal setter

    themeCtx
        theme, setTheme

    <TextDisplay>
        let { txtCtn} = useContext(thisContext)
        let { lwCtx } = useContext(LongestWordCtx)
        let { cwCtx } = useContext(thisContext)
        show fancy text here
    </TextDisplay>

    <LongestWordProvider>
        <LongestWord />
    </LongestWordProvider>        
*
