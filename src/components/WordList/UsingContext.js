import React from 'react';
import './index.css'
import { WordListContext } from '../../WordListContext'
import { TextContext } from '../../TextContext'

const WordList = () => {

	let {commonWords, selectedWord, updateSelectedWord} = React.useContext(WordListContext);
	let txtVals = React.useContext(TextContext)

	return(<ul>
		{commonWords.map((w,i) => (
			<li 
				key={`${w}$i`} 
				style={{
					textDecoration: (selectedWord === w) ? 'underline' : 'none',
					listStyleType: 'none',
					cursor: 'pointer'
				}}
				className={'word'}
				onClick={() => updateSelectedWord(w)}>
				{w}
			</li>
		))}
	</ul>)
}

export default WordList