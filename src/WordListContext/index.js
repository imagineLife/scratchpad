import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
import { TextContext } from '../TextContext'

const WordListProvider = (props) => {

	let [selectedWord, setSelectedWord] = React.useState(null);
	const { textDispatch } = React.useContext(TextContext)
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

	const updateSelectedWord = (word) => {
		console.log('%c updateSelectedWord!!', 'background-color: darkblue; color: white;')
		
		setSelectedWord(word);
		textDispatch({type: "COMMON_WORD", payload:word})
	}

	let [selectedList, setSelectedList] = React.useState(Object.keys(listData)[0])

	let contextVal = {
		listData:listData,
		selectedWord:selectedWord,
		updateSelectedWord,
		setSelectedWord,
		setSelectedList:setSelectedList,
		commonWords:commonWords
	}	
	
	return(<Provider value={contextVal}>
		{props.children}
	</Provider>)
}

// function withSelectedListItem(Component){
// 	return function PassedListItem(props){
// 		return(
// 		  <Consumer>
// 		    { ( {selectedWord} )  => (
// 		    	<Component {...props} selectedWord={selectedWord} />
// 		    )}
// 		  </Consumer>
// 		)
// 	}
// }

// export default Provider;
export {
	WordListProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}