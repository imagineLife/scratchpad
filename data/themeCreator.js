const fs = require('fs')


/*
	INPUT: themes tsv...
		sentenceNumber(2). themeWord	words,related,to,the,themeWord
		sentenceNumber(3). themeWord	more,words,related,to,the,themeWord....
	OUTPUTs an object...
		{
			themeWord: [array,or,words,that,point,to,the,theme,word],
			themeWord2: [array,or,words,that,point,to,the,theme,word2]
			themeWord3: [array,or,words,that,point,to,the,theme,word3]
		}
*/
fs.readFile('./themes.tsv', 'utf8', (err,data) => {
	if(err){
		console.log('ERROR')
		console.log(err)
		return;
	}
	let parsed = data.split('\n')

	let themeObj = {}
	
	//loop through tsv lines
	parsed.forEach((d,dataIndex) => {

		//split line into theme & sentenceInddex
		let splat = d.split('\t')
		let thisTheme = splat[1]
		let arrOfKeyword = splat[2].split(',')
		

		if(themeObj[thisTheme]){
			let newArr = [...themeObj[thisTheme],...arrOfKeyword]
			themeObj[thisTheme] = [...new Set([...newArr])]
		}else{
			themeObj[thisTheme] = arrOfKeyword
		}
	})

	console.log('themeObj')
	console.dir(themeObj)
	
})