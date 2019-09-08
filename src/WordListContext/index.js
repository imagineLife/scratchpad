import React from 'react';

const WordListContext = React.createContext(); 
const {Provider, Consumer} = WordListContext

const WordListProvider = (props) => {

	let [text, setText] = React.useState(null)

	//load the text from textFile on load
	React.useEffect(() => {
		fetch('../../data/demo.txt')
			.then(res => res.text())
			.then(setText)
	}, [])

	return(<Provider value={text}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	WordListProvider, 
	Consumer as WordListConsumer, 
	WordListContext
}