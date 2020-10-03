import React from 'react';
import DashboardUI from './'

import {TextAreaProvider} from '../../Contexts/TextArea'
import {CommonWordsProvider} from '../../Contexts/CommonWords'

const Wrapped = () => {
	return (
		<TextAreaProvider>
			<CommonWordsProvider>
				<DashboardUI />
			</CommonWordsProvider>
		</TextAreaProvider>
	)
}

export default Wrapped