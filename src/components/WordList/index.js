import React from 'react';

const WordList = ({words, selectWord, selectedWord}) => {

	return(<ul>
		{words.map((w,i) => (
			<li 
				key={`${w}$i`} 
				style={{
					textDecoration: (selectedWord === w) ? 'underline' : 'none',
					listStyleType: 'none'
				}}
				onClick={() => selectWord(w)}>
				{w}
			</li>
		))}
	</ul>)
}

export default WordList