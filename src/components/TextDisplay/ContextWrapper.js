import React from 'react';
import TextDisplay from './'
import { TextContext } from '../../TextContext'

const WrappedComponent = () => {

	const { text } = React.useContext(TextContext)
	
	return(
		<TextDisplay txt={text}/>
	)
}

export default WrappedComponent;