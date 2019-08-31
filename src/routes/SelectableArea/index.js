import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'

const SelectableArea = () => {
	let [srcData, setSrcData] = React.useState(null)
	let [brushFn, setBrushFn] = React.useState(null)
	let brushRef = React.useRef()
	
	function brushedFn(){
		var selectedPixels = d3Select.event.selection; //|| timeline.x.range()
		console.log('selectedPixels')
		console.log(selectedPixels)
	}
	//load the data
	React.useEffect(() => {
		fetch('../../data/areaData.json')
			.then(res => res.json())
			.then(setSrcData)
	}, [])
	
	//connect the brush to the g wrapper?!
	React.useEffect(() => {
		if(brushRef.current){
			let brushBox = d3Select.select(brushRef.current)
			let brushFn = brush.brushX()
				.handleSize(10)
				.on('start', () => brushedFn());
				// .extent([ [0,0], [700, 100] ]);

				brushBox.call(brushFn)

				// setBrushFn(brushFn)
		}
	}, [srcData])

	if(!srcData){
		return (<p>Loading data...</p>)
	}
	
	//Set Scales
	let xScale = scale.scaleLinear()
		.domain([1, srcData.length])
		.range([0, 700])

	let yScale = scale.scaleLinear()
		.domain([0, d3Arr.max(srcData, d => d.y)])
		.range([100, 0])

	//build areaFn
	let areaFn = d3Shape.area()
		.x((d, i) => xScale(i + 1))
		.y0(100)
		.y1((d) => yScale(d.y))

	return(
		<svg id="selectable" style={{
			width: '700px',
			height: '100px',
			border: '1px solid green'
		}}>
			<g className="g-wrapper">
				<path d={areaFn(srcData)}
					fill={'#ccc'}
				/>
				<g className="brush-g-window" ref={brushRef}></g>
			</g>
		</svg>
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