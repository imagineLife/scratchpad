import React from 'react'
import * as scale from 'd3-scale'
import * as arr from 'd3-array'
import * as shape from 'd3-shape'
import * as select from 'd3-selection'

const SelectableArea = () => {
	let [srcData, setSrcData] = React.useState(null)
	let brushRef = React.useRef()
	
	//load the data
	React.useEffect(() => {
		fetch('../../data/areaData.json')
			.then(res => res.json())
			.then(setSrcData)
	}, [])
	
	//connect the brush to the g wrapper?!
	React.useEffect(() => {
		if(brushRef.current){
			let brushBox = select.select(brushRef)
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
		.domain([0, arr.max(srcData, d => d.y)])
		.range([100, 0])

	//build areaFn
	let areaFn = shape.area()
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

*/