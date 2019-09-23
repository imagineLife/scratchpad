import React from 'react';
let AreaContext = React.createContext(); 
let {Provider, Consumer} = AreaContext
import {getQueriedWord} from '../lib/getQueriedWord'

let AreaProvider = (props) => {

	//AREA DATA
	let [areaData, setAreaData] = React.useState(null)

	/*
		load area data
	*/
	React.useEffect(() => {
		fetch('../../data/areaData.json')
			.then(res => res.json())
			.then(setAreaData)
	}, [])
	
	return(<Provider value={areaData}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	AreaProvider, 
	Consumer as AreaConsumer,
	AreaContext
}