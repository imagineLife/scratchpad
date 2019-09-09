import React from 'react'
import WrappedWordList from '../../components/WordList/ContextWrapper'
import WrappedTextDisplay from '../../components/TextDisplay/ContextWrapper'
const Combined = () => {
	
	return(
		<React.Fragment>
			<WrappedWordList />
			<WrappedTextDisplay />
		</React.Fragment>
	)
}

export default Combined