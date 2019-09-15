import React from 'react'
import WordListContexted from '../../components/WordList/ContextWrapper'
import TextDisplayContexted from '../../components/TextDisplay/ContextWrapper'
const Combined = () => {
	
	return(
		<React.Fragment>
			<WordListContexted />
			<TextDisplayContexted />
		</React.Fragment>
	)
}

export default Combined