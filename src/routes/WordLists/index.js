import React from 'react';

const WordLists = () => {

	let [listData] = React.useState({
		"Common Words": ["our", "we", "the", "them"],
		"Longest Words": [
			"Administration",
			"Infrastructure",
			"Understanding",
			"Neighborhoods",
			"Redistributed",
			"Disagreements",
			"Establishment",
			"Transferring",
			"Technologies",
			"Celebration",
			"Politicians",
			"Importantly"
		]
	})
	
	return(
		<h2>Word Lists</h2>
	)
}

export default WordLists;