import React from 'react'
import WordList from '../../components/WordList'
import WrappedTextDisplay from '../../components/TextDisplay/TextContextWrapper'
import WrappedWordList from '../../components/WordList/ContextWrapper'
const Combined = () => {
	
	return(
		<React.Fragment>
			<WrappedWordList />
			<WrappedTextDisplay />
		</React.Fragment>
	)
}

export default Combined