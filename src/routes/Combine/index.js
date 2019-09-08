import React from 'react'
import WordList from '../../components/WordList'
import TextDisplay from '../../components/TextDisplay'

const Combined = () => {
	
	let [srcText, setSrcText] = React.useState(null);
	let [word, setWord] = React.useState(null);
	let [words] = React.useState(['president', 'the', 'we', 'to'])
	
	//load the text from textFile on load
	React.useEffect(() => {
		fetch('../../data/demo.txt')
			.then(res => res.text())
			.then(setSrcText)
	}, [])

	const selectWord = (w) => {
		setWord(w)
	}

	if(!srcText){
		return(<p>loading...</p>)
	}
	
	return(
		<React.Fragment>
			<h2>Text And Selection</h2>
			<WordList 
				words={words} 
				selectWord={selectWord} 
				selectedWord={word}/>
			<TextDisplay txt={srcText} selectedWord={word}/>
		</React.Fragment>
	)
}

export default Combined