import React from 'react';
const CircleContext = React.createContext(); 
const {Provider, Consumer} = CircleContext;
import { 
	getWordsByCount, 
	getLongestThirty, 
	convertStrToWordArr, 
	ingWords,
	arrayOfWords,
	getWordsByLength 
} from '../../lib/stats'

const CirclesProvider = (props) => {
 
	return(<Provider value={{}}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	CirclesProvider, 
	Consumer as CirclesConsumer, 
	CircleContext
}