import React from 'react';
import './index.css'
import { WordListContext } from '../../WordListContext'

const WordList = () => {

	let {commonWords, selectedWord, setSelectedWord} = React.useContext(WordListContext);
	
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
				onClick={() => setSelectedWord(w)}>
				{w}
			</li>
		))}
	</ul>)
}

export default WordList