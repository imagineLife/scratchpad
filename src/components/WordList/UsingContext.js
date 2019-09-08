import React from 'react';
import './index.css'
import { WordListContext } from '../../WordListContext'

const WordList = () => {

	return(<ul>
		{words.map((w,i) => (
			<li 
				key={`${w}$i`} 
				style={{
					textDecoration: (selectedWord === w) ? 'underline' : 'none',
					listStyleType: 'none',
					cursor: 'pointer'
				}}
				className={'word'}
				onClick={() => selectWord(w)}>
				{w}
			</li>
		))}
	</ul>)
}

export default WordList