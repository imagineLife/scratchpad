import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import TextDisplay from '../../components/TextDisplay'
import './index.css'

const SelectableArea = () => {
	let [srcData, setSrcData] = React.useState(null)
	let [brushFn, setBrushFn] = React.useState(null)
	let [fullText, setFullText] = React.useState(null)
	let [hoverArr, setHoverArr] = React.useState([0,175])
	let [brushBox,setBrushBox] = React.useState(null)
	let brushRef = React.useRef()
	
	function brushedFn(){
		var selectedPixels = d3Select.event.selection; //|| timeline.x.range()
		setHoverArr(selectedPixels)
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

	//select && save the brushBox to state
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

	if(!srcData || !fullText || !brushBox){
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


	// console.log('%c SCALED VALUES', 'background-color: orange; color: white;')
	// console.log('srcData.length')
	// console.log(srcData.length)
	
	// console.log('hoverArr')
	// console.log(hoverArr)
	
	// console.log('translateScale(hoverArr[0])')
	// console.log()
	// console.log('translateScale(hoverArr[1])')		
	// console.log(translateScale(hoverArr[1]))
	// console.log('%c  - - - - ', 'background-color: orange; color: white;')
	
	// let resText = srcData.map((d, i) => {
	// 	if(i >= translateScale(hoverArr[0]) && i <= translateScale(hoverArr[1])){
	// 		return d
	// 	}else return
	// }).filter(d => d)
	// console.log('resText')
	// console.log(resText)
	
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
			<TextDisplay />
		</React.Fragment>
	)
}

export default SelectableArea

/*
	Notes

 	- UPDATES state
 	- only responds to initial state && itself,
 		no other inputs besided user mouse/click
	
	

	ELEMENTS
		svg
		gWrapper
		
	DATA
		xScale
		yScale

	xAxisG
		trans 0, height

	areaPath
		fill #ccc

	brushWindow
		gObj.append(g)
		class brushGWindow
		.call brushFn

	brushFn
		let brushFn = d3.brushX()
			.handleSize(10)
			.extent([ [0,0], [state.timeline.w, state.timeline.h] ])
			.on('brush', brushedFn)

	brushedFn
		var selectedPixels = d3.event.selection || timeline.x.range();
    var newValues = selectedPixels.map(state.timeline.xScale.invert)

    updateLine(state.filteredData[state.activeCoin], newValues)


	UPDATING TIMELINE
		a fn passing data && yVariable?!
		it updates other things on the screen, for later...


UPDATES
	tooltip - word-list content, displaying/revealing sentence
	TExtBlock - add some selected references
		underlines
		font-changes

MVP INTERACTIVE SPEECH-TEXT

WRAPPER

	useEffect
		triggered when selected-list updates

	CHILD: word-list
		Li 
			onClick, 
				updates 'state', selected word(s)


	CHILD: speech-text
		
		<div>
			<p></p>
		</div>

*/