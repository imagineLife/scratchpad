import React from 'react';
import TextDisplay from './index'
import {TextProvider} from '../../TextContext'
const WrappedComponent = () => {
	return(
		<TextProvider>
			<TextDisplay />
		</TextProvider>
	)
}

export default WrappedComponent;