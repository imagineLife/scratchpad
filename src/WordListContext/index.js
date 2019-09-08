import React from 'react';

const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext

const WordListProvider = (props) => {

	let [selectedList, setSelectedList] = React.useState(null)
	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords] = React.useState(['president', 'the', 'we', 'to'])
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


	return(<Provider value={{
		listData,
		selectedWord,
		setSelectedWord,
		setSelectedList,
		commonWords
	}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	WordListProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}