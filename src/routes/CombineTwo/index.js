import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import TextDisplay from '../../components/TextDisplay'
// import './index.css'

const SelectableArea = () => {
	let [srcData, setSrcData] = React.useState(null)
	let [brushFn] = React.useState(null)
	let [fullText, setFullText] = React.useState(null)
	let [hoverArr, setHoverArr] = React.useState([0,175])
	let [sentenceNumbers, setSentenceNumbers] = React.useState([])
	let [brushBox,setBrushBox] = React.useState(null)
	let brushRef = React.useRef()
	
	function brushedFn(){
		var selectedPixels = d3Select.event.selection; //|| timeline.x.range()
		let sentStart = Math.floor(translateScale(hoverArr[0]))
		let sentEnd = Math.floor(translateScale(hoverArr[1]))
		setHoverArr(selectedPixels)
		setSentenceNumbers([sentStart, sentEnd])
	}

	//load the data
	React.useEffect(() => {
		fetch('../../data/areaData.json')
			.then(res => res.json())
			.then(setSrcData)

		fetch('../../data/fullText.txt')
			.then(res => res.text())
			.then(setFullText)
	}, [])

	//select && save the 'brushBox' to state
	React.useEffect(() => {
		setBrushBox(d3Select.select(brushRef.current))
	}, [srcData, fullText])
	
	//connect the brush to the g wrapper?!
	React.useEffect(() => {
		if(brushRef.current){
			
			//build the brushFn
			let brushFn = brush.brushX()
				.handleSize(10)
				.on('brush', brushedFn)

			// set the brushFn to the burshBox, 'instantiating'
			// the brush UI element(s)
			brushBox.call(brushFn);

			//set the initial overlay to 1/4 width
			brushFn.move(brushBox, hoverArr)
		}
	}, [brushBox])

	if(!srcData || !fullText){
		return (<p>Loading data...</p>)
	}
	
	//Set Scales
	let xScale = scale.scaleLinear()
		.domain([0, srcData.length - 1])
		.range([0, 700])

	let yScale = scale.scaleLinear()
		.domain([0, d3Arr.max(srcData, d => d.y)])
		.range([100, 0])

	let translateScale = scale.scaleLinear()
		.domain([0, 700])
		.range([0, srcData.length - 1])

	//build areaFn
	let areaFn = d3Shape.area()
		.x((d, i) => xScale(i + 1))
		.y0(100)
		.y1((d) => yScale(d.y))
	
	console.log('%c ----', 'background-color: blue; color: white;')
	
	console.log('sentenceNumbers')
	console.log(sentenceNumbers)
	console.log('%c ----', 'background-color: blue; color: white;')
	return(
		<React.Fragment>
			<svg id="selectable" style={{
				width: '700px',
				height: '100px'
			}}>
				<g className="g-wrapper">
					<path d={areaFn(srcData)}
						fill={'#ccc'}
					/>
					<g className="brush-g-window" ref={brushRef}></g>
				</g>
			</svg>
			<TextDisplay txt={fullText} selectedRange={sentenceNumbers}/>
		</React.Fragment>
	)
}

export default SelectableArea