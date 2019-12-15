const fs = require('fs')

fs.readFile('./themes.tsv', 'utf8', (err,data) => {
	if(err){
		console.log('ERROR')
		console.log(err)
	}else{
		// let resObj = {}
		let parsed = data.split('\n') // d = 1	Patriotism	President
		
		let res = []
		let themeObj = {}
		
		//loop through tsv lines
		parsed.forEach((d,dataIndex) => { // d = 1	Patriotism	President, dataIndex = 1
			
			//ignore the header
			// if(dataIndex === 0) {};
			
			//split line into theme & sentenceInddex
			let splat = d.split('\t')
			let sentenceIndex = splat[0] - 1
			let thisTheme = splat[1]
			let arrOfKeyword = splat[2].split(',')
			
			//MAKE array in res arr if not present
			if (!Array.isArray(res[sentenceIndex])){
				res[sentenceIndex] = []
			}

			//add THIS theme to resArr at matching index
			res[sentenceIndex].push(thisTheme)

			themeObj[thisTheme] = themeObj[thisTheme] ? 
				[...new Set(themeObj[thisTheme],...arrOfKeyword)] : 
				arrOfKeyword;
		})		
	}
})