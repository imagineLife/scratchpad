import React from 'react';

const TextContext = React.createContext(); 
const {Provider, Consumer} = TextContext

const TextProvider = (props) => {

	let [text, setText] = React.useState(null)

	return(<Provider value={text}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextProvider, 
	Consumer as TextConsumer, 
	TextContext
}
/*
	Contains 
		Context.Consumer, 
		Context.Provider
*/