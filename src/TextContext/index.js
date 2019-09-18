import React from 'react';
let TextContext = React.createContext(); 
let {Provider, Consumer} = TextContext

const getQueriedWord = (text, hlText) => {

    //remove existing tags associated with this selection
    let removeRegex = /.\w*\s\w*=\"selected-text\".(\w*)<\/\w*>/g;
    
    /*
        let newStyleRegex = new RegExp(`\W(${hlText})\W`, 'gi');
        IN JS th '\' has to be escaped, a-la \\b 
    */ 
    
    // add tags associated with this selection
    let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
    
    //update the text body
    let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)

    
    return <p dangerouslySetInnerHTML={{__html: resText}}></p>

}

let TextProvider = (props) => {

	/*
			State management
	*/
	const initialContext = {text: ''};

	const reducer = (state, action) => {
		console.log('TextProvider reducer switch!!');
			let resText;
		switch(action.type){
			case "COMMON_WORD":
				/*
					WHERE will the text-blob property, here, come from?

				*/
				resText = getQueriedWord(text, action.payload)
				return {text: resText}
			default:
				resText = getQueriedWord(action.payload)
				return {text: resText}	
		}
	}

	let [commonWord, setCommonWord] = React.useState(null)
	let [{text}, textDispatch] = React.useReducer(reducer, initialContext)

	//load the text from textFile on load
	React.useEffect(() => {
		console.log('LOADING TEXT in textProvider');
		fetch('../../data/demo.txt')
			.then(res => res.text().then(textRes => {
					textDispatch({type: "TEXT", payload: textRes})
				}))
	}, [])

	React.useEffect(() => {
		if(commonWord !== null){
			console.log('New Common word in text provider!!');
		}
	}, [commonWord])

	//build provider value
	let providerVal = {text, textDispatch}
	
	return(<Provider value={providerVal}>
		{props.children}
	</Provider>)
}

// export default Provider;
export {
	TextProvider, 
	Consumer as TextConsumer,
	TextContext
}