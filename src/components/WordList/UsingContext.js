import React from 'react';
import './index.css'
import { TextAreaContext } from '../../Contexts/TextArea'
import { WordListContext } from '../../Contexts/CommonWords'
import { getWordsByCount } from '../../lib/stats'


const CommonWords = () => {
	let {displayText} = React.useContext(TextAreaContext)
	let { commonWords, makeCommonWords, selectedWord, setSelectedWord } = React.useContext(WordListContext);
	console.log('selectedWord')
	console.log(selectedWord)
	
	React.useEffect(() => { //look into useLayoutEffect
		if(displayText){
			makeCommonWords(displayText)
		}
	}, [displayText])

	if(!displayText && commonWords.length < 1){
		return(<p>loading Common words...</p>)
	}
	
	return(
		<ul>
			{commonWords.map((w,i) => (
					<li 
						key={`${w.word}${i}`} 
						style={{
							textDecoration: (selectedWord === w.word) ? 'underline' : 'none',
							listStyleType: 'none',
							cursor: 'pointer'
						}}
						className={'word'}
						onClick={() => {
							setSelectedWord(w.word)
							// textDispatch({type:"COMMON_WORD",payload: w})
						}}>
						{w.word}
					</li>
				)
			)}		
		</ul>
	)
}

export default CommonWords