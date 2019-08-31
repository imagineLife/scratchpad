import React from 'react'

const TextAndSelection = () => {
	
	let [srcText, setSrcText] = React.useState(null);

	//load the text from textFile?!
	React.useEffect(() => {
		fetch('../../data/demo.txt')
			.then(res => res.text())
			.then(setSrcText)
	}, [])

	if(!srcText){
		return(<p>loading...</p>)
	}
	return(
		<React.Fragment>
			<h2>Text And Selection</h2>
		</React.Fragment>
	)
}

export default TextAndSelection