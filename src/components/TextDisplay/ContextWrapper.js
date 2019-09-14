import React from 'react';
import {TextProvider} from '../../TextContext'
import {WordListProvider} from '../../WordListContext'
import TextDisplay from './'

const WrappedComponent = () => {
	return(
		<TextDisplay />
	)
}

export default WrappedComponent;