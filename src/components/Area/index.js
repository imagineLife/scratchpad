import React from 'react'
import './index.css'
import {TextAreaContext} from '../../Contexts/TextArea'
import * as scale from'd3-scale';
import * as d3Shape from'd3-shape';
import * as arr from 'd3-array'

const Area = ({dims}) => {

	let {sentences, selectedAreaArr, maxWordsPerSentence} = React.useContext(TextAreaContext)
	let [curSentence, setCurSentence] = React.useState(null)
	//sanity checking
	if(!sentences || !selectedAreaArr || !dims){
		return <p>loading area...</p>
	}

	let howManySentences = selectedAreaArr[1] - selectedAreaArr[0]
	let xScale = scale.scaleLinear()
	.domain([0, howManySentences])
	.range([0, dims.width])

	let selectedSentences = sentences.reduce((acc, curVal, curIdx) => {		
		if (curIdx >= selectedAreaArr[0] && curIdx <= selectedAreaArr[1]){
			return acc.concat(curVal)
		}else{
			return acc
		}
	}, [])

	let yScale = scale.scaleLinear()
	.domain([0, maxWordsPerSentence])//arr.max(selectedSentences, d => d.wordCount)])
	.range([dims.height, 0])
	
	//build areaFn
	let areaFn = d3Shape.area()
		.x((d, i) => xScale(i))
		.y0(yScale(0))
		.y1((d) => yScale(d.wordCount))
		// .curve(d3Shape.curveCatmullRom)

	const pathD = areaFn(selectedSentences)

	//mousedOver && mouseMove
  const moused = d => {
    let areaSVG = document.getElementsByClassName('area-svg')[0]

    //$FlowSVGBug
    let areaSVGXOffset = areaSVG.getBoundingClientRect().x
    
    let xPos = d.pageX - areaSVGXOffset
    
    if(xPos > xScale.range()[0]){
      let sentenceNumber = Math.ceil(xScale.invert(xPos)) + selectedAreaArr[0]
      
      if(sentenceNumber > -1){
      	console.log(sentences[sentenceNumber - 1])
        setCurSentence(sentences[sentenceNumber - 1].text)
      }
    } 
  }
	return(
		<React.Fragment>
			<svg 
				id="area" 
				style={dims} 
				className='area-svg'
				onMouseOver={moused}
	      onMouseMove={moused}>
					<defs>
				    <linearGradient id="areaGradient" gradientTransform="rotate(90)">
				      <stop offset="1%" stopColor="rgb(147,147,147)" />
				      <stop offset="95%"  stopColor="rgba(147,147,147,.05)" />
				    </linearGradient>
				  </defs>
						{/*Area Path*/}
			    <path 
			      d={pathD}
						fill={'rgba(147,147,147,.25)'} />
			</svg>
			<p className="explanatory-text">{!curSentence && `Hover over this area chart to highlight the sentence 
									that was spoken at the specific point in time during the 
									president’s address.  HOVER`}
						{curSentence && curSentence}</p>
		</React.Fragment>
	)
}

export default Area;