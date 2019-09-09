import React from 'react';

const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;

const WordListProvider = (props) => {

	let [selectedList, setSelectedList] = React.useState(null)
	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords] = React.useState(['president', 'the', 'we', 'to'])
	let [listData] = React.useState({
		"Common Words": ['president', 'the', 'we', 'to'],
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
		],
		"Action Words": [
			"Walking",
			"Running",
			"Singing",
			"Dancing"
		]
	})

	//set initial 'chosen' list
	React.useEffect(() => {
		setSelectedList(Object.keys(listData)[0])
	}, [])


	console.log('%c WORD LIST CONTEXT', 'background-color: orange; color: white;')
	
	/*
		es6, commented for sanity-purpose, 
		debigging the non=updating-text-blob

		let contextVal = {
			listData,
			selectedWord,
			setSelectedWord,
			setSelectedList,
			commonWords
		}
	*/

	let contextVal = {
		listData:listData,
		selectedWord:selectedWord,
		setSelectedWord:setSelectedWord,
		setSelectedList:setSelectedList,
		commonWords:commonWords
	}

	console.log('contextVal.selectedWord')
	console.log(contextVal.selectedWord)	
	
	return(<Provider value={contextVal}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	WordListProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}