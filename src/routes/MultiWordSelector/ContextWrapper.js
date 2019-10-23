import React from 'react';
import MultiWordSelector from './'

import {TextAreaProvider} from '../../Contexts/TextArea'
import {CommonWordsProvider} from '../../Contexts/CommonWords'

/*
	Add more providers per UI selectable element...
		words-by-size etc.
*/

const Wrapped = () => {
	console.log('%c WRAPPER', 'background-color: steelblue; color: white;')
	return (
		<TextAreaProvider>
			<CommonWordsProvider>
				<MultiWordSelector />
			</CommonWordsProvider>
		</TextAreaProvider>
	)
}

export default Wrapped