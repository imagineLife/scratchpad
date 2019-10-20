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
	
	console.log('%c - - - Word-List-Picker - - -', 'background-color: darkblue; color: white;')
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
	console.log('%c // - - - - - //', 'background-color: darkblue; color: white;')
	return(
		<section id="words-of-interest">
			<h2>Words Of Interest</h2>

			{/* List of List-Titles */}
			<section id="word-lists">
				<ul id="word-lists">
					{lists.map((l, idx) => (
						<li 
							key={`${l}-${idx}`} 
							className={`word-list-name${wordListFocus === l ? ' selected' : ''}`}
							onClick={() => {
							selectWordList((l))
						}}>{l}</li>
					))}
				</ul>
			</section>

		{/* Words from selected word-list */}
			<section id="words">
				{wordListFocus && 
					<ul id="word-lists">
					{wordLists[wordListFocus].map((l, idx) => {

						let thisWord = wordListFocus == 'Common Words' ? l.word : l
						return (
							<li 
								key={`${thisWord}-${idx}`} 
								className={`focus-word`}
								onClick={() => {
								selectWordList((l))
							}}>{thisWord}</li>
						)
					})}
				</ul>
				}
			</section>
		</section>
	)

}

export default CommonWords