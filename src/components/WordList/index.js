import React from 'react';

const WordList = ({words}) => {
	return(<ul>
		{words.map((w,i) => (
			<li key={`${w}$i`}>{w}</li>
		))}
	</ul>)
}

export default WordList