import React from 'react';
import CirclesForUI from './forUI'
import {CirclesProvider} from '../../Contexts/Circles'
const WrappedComponent = () => {
	return(
		<CirclesProvider>
			<CirclesForUI />
		</CirclesProvider>
	)
}

export default WrappedComponent;