import React from 'react';
import CombineTwo from './'

import {TextProvider, TextProviderWithSelectedWord} from '../../TextContext'
import {WordListProvider} from '../../WordListContext'

/*
	Add more providers per UI selectable element...
		words-by-size etc.
*/

const Wrapped = () => {
	console.log('%c WRAPPER', 'background-color: steelblue; color: white;')
	return (
		<TextProvider>
			<AreaProvider>
				<CombineTwo />
			</AreaProvider>
		</TextProvider>
	)
}

export default Wrapped