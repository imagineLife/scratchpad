const fs = require('fs')

fs.readFile('./themes.tsv', 'utf8', (err,data) => {
	if(err){
		console.log('ERROR')
		console.log(err)
	}else{
		// let resObj = {}
		let parsed = data.split('\n') // d = 1	Patriotism	President
		
		let res = []
		
		//loop through tsv lines
		parsed.forEach((d,dataIndex) => { // d = 1	Patriotism	President, dataIndex = 1
			
			//ignore the header
			// if(dataIndex === 0) {};
			
			//split line into theme & sentenceInddex
			let splat = d.split('\t')
			let sentenceIndex = splat[0] - 1
			let thisTheme = splat[1]
			
			//MAKE array in res arr if not present
			if (!Array.isArray(res[sentenceIndex])){
				res[sentenceIndex] = []
			}

			//add THIS theme to resArr at matching index
			res[sentenceIndex].push(thisTheme)
		})		
		
		console.log(res.filter(d => d))
	}
})


/*
	buil arr of arrs
	[[patriotism], [theme1,theme2]]

	
*/