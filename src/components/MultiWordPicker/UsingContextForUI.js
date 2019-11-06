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
		setSelectedWord,
		selectedWord,
		wordListFocus
	} = React.useContext(WordListContext);
	
	React.useEffect(() => { //look into useLayoutEffect
		if(displayText){
			makeCommonWords(displayText)
		}
	}, [displayText])

	if(!wordLists){
		return <p>Missing Word Lists</p>
	}
	
	let lists = Object.keys(wordLists)

	return(
		<section id="words-of-interest-for-ui">
			{/* List of List-Titles */}
			<section id="word-list">
				<ul id="word-lists">
					{lists.map((l, idx) => (
						<li 
							key={`${l}-${idx}`} 
							className={`word-list-option${wordListFocus === l ? ' selected' : ''}`}
							onClick={() => {
							selectWordList((l))
						}}>{l}</li>
					))}
				</ul>
			</section>

		{/* Words from selected word-list */}
			<section id="focus-words">
				<h3 className="word-list-title">List Results</h3>
				{wordListFocus && 
					<ul id="focus-word-list">
					{wordLists[wordListFocus].map((l, idx) => {

						let thisWord = wordListFocus == 'Common Words' ? l.word : l
						return (
							<li 
								key={`${thisWord}-${idx}`} 
								className={`focus-word-option ${ selectedWord && selectedWord === thisWord ? ' selected' : ''}`}
								onClick={() => {
								setSelectedWord((thisWord))
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