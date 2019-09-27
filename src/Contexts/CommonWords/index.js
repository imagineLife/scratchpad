import React from 'react';
const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext;
// import { TextContext } from '../TextContext'

const WordListProvider = (props) => {

	let [selectedWord, setSelectedWord] = React.useState(null);
	let [commonWords] = React.useState(['president', 'the', 'we', 'to'])

	let contextVal = {
		selectedWord:selectedWord,
		setSelectedWord,
		commonWords:commonWords
	}	
	
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