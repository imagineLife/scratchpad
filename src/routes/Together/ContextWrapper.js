import React from 'react';
import Together from './'

import {TextAreaProvider} from '../../Contexts/TextArea'
import {CommonWordsProvider} from '../../Contexts/CommonWords'

const Wrapped = () => {
	return (
		<TextAreaProvider>
			<CommonWordsProvider>
				<Together />
			</CommonWordsProvider>
		</TextAreaProvider>
	)
}

export default Wrapped