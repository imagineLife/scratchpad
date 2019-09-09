import React from 'react';
import {TextProvider} from '../../TextContext'
import {WordListProvider} from '../../WordListContext'
import TextDisplay from './UsingContext'

const WrappedComponent = () => {
	return(
		<TextProvider>
			<WordListProvider>
				<TextDisplay />
			</WordListProvider>
		</TextProvider>
	)
}

export default WrappedComponent;