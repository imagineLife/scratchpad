import React from 'react';
import TextDisplay from './'
import { TextProvider } from '../../TextContext'

const WrappedComponent = () => {
	return(
		<TextProvider>
			<TextDisplay/>
		</TextProvider>
	)
}

export default WrappedComponent;