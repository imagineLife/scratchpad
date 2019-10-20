import React from 'react';
import './index.css'
import { TextAreaContext } from '../../Contexts/TextArea'
import { WordListContext } from '../../Contexts/CommonWords'

const CommonWords = () => {
	let {displayText} = React.useContext(TextAreaContext)
	let { 
		makeCommonWords, 
		wordLists, 
		selectWordList, 
		wordListFocus 
	} = React.useContext(WordListContext);
	
	console.log('%c Word-List-Picker', 'background-color: darkblue; color: white;')
	console.log('wordLists')
	console.log(wordLists)
	console.log('wordListFocus')
	console.log(wordListFocus)
	
	
	
	React.useEffect(() => { //look into useLayoutEffect
		if(displayText){
			makeCommonWords(displayText)
		}
	}, [displayText])

	if(!wordLists){
		return <p>Missing Word Lists</p>
	}
	
	let lists = Object.keys(wordLists)
	console.log('lists')
	console.log(lists)
	console.log('%c // - - - - - //', 'background-color: orange; color: white;')
	return(
		<section id="words-of-interest">
			<h2>Words Of Interest</h2>
			{/* List of List-Titles */}
			<ul id="word-lists">
				{lists.map((l, idx) => (
					<li 
						key={`${l}-${idx}`} 
						className={`word-list-name ${wordListFocus === l ? 'selected' : ''}`}
						onClick={() => {
						selectWordList((l))
					}}>{l}</li>
				))}
			</ul>
		</section>
	)

}

export default CommonWords

/*
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
*/