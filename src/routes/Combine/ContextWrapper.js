import React from 'react';
import Combined from './'
import {TextProvider} from '../../TextContext'
import {WordListProvider} from '../../WordListContext'

const Wrapped = () => {
	console.log('Wrapper');
	return (
		<TextProvider>
			<WordListProvider>
				<Combined />
			</WordListProvider>
		</TextProvider>
	)
}

export default Wrapped