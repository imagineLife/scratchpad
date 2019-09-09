import React from 'react';

let TextContext = React.createContext(); 
let {Provider, Consumer} = TextContext

let TextProvider = (props) => {

	let [text, setText] = React.useState(null)

	//load the text from textFile on load
	React.useEffect(() => {
		fetch('../../data/demo.txt')
			.then(res => res.text())
			.then(setText)
	}, [])

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