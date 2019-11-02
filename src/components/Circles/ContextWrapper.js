import React from 'react';
import Circles from './'
import {CirclesProvider} from '../../Contexts/Circles'
const WrappedComponent = () => {
	return(
		<CirclesProvider>
			<Circles />
		</CirclesProvider>
	)
}

export default WrappedComponent;