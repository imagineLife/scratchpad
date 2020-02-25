/*
	Auto-Generate themse from text...?!

	1. Break-up text into sentences
	2. fetch
		themeKeyWords = a list/object of keyWords-to-Theme matching
	3. make an empty arr,
		will store arrayy, 1-per-sentence, storing the themes in each sentence

	4. loop through text sentences
		make an array of arrays, each arr represents a sentence,
		words in arr repreesent THEME(s) in the sentence

		[
			[themeWord1, themeWord2, ]//sentence 1 [patriotism, unity]
			[themeWord3, themeWord4 ]//sentence 2 [patriotism, unity]
		]

*/


const fs = require('fs');

fs.readFile('./fullText.txt', 'utf8', (err, txt) => {
  fs.readFile('./themeObj.json', 'utf8', (err2, themeJson) => {
  	// maybe?! =--> EMOJI + FUNKY CHARACTERS...
	  const srcTxt = txt.toString();

  	// usable json object
  	const themesData = JSON.parse(themeJson);

	  const twoWhiteSpaces = /(\s{2})/gm;
	  const sentRegex = /(~~)\s/g;

	  /*
			arr of sentences
			sentence,
			~~,
			sentence,
			~~ ...
	  */
	  const sentences = srcTxt
	  	.replace(twoWhiteSpaces, ' ')
	    .replace(/\.\s/g, '.~~ ') // replace . with .~~
	    .replace(/\?\s/g, '?~~ ') // replace ? with ?~~
	    .replace(/!\s/g, '!~~ ') // replace ! with !~~
	    .split(sentRegex); // split on (`~~ `)

	  /*
			will store arrs
				each arr represents a sentence
				containing themes for the given sentence
	  */
	  const sentenceArr = [];

	  /*
			[
				[theme1, theme2], // sentence 1
				[theme1, theme3] // sentence 2
				...etc
			]
	  */
	  const themesArrResult = [];

	  //	i+= 2 to skip the ~~
	  // ++i++ does the same as i+=2

	  for (let i = 0; i < sentences.length; i += 2) {
	  	// storage
	  	const thisSentenceThemes = [];

	  	// loop through theme keys
	  	for (const themeKey in themesData) {
	  		// parse themes from arr to str with |sv
	  		const joinedThemes = themesData[themeKey].join('\\W|\\W');

	  		// wrap in a regex obj
	  		const joinThemesRegex = new RegExp(joinedThemes, 'gi');

	  		const themesInSentence = sentences[i].match(joinThemesRegex);

	  		if (themesInSentence) {
	  			thisSentenceThemes.push(themeKey);
	  		}
	  	}

	  	themesArrResult.push(thisSentenceThemes);
	  }

	  console.log('themesArrResult');
	  console.log(themesArrResult);
  });
});
