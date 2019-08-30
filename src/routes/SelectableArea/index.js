import React from 'react'
import * as scale from 'd3-scale'
import * as arr from 'd3-array'

const SelectableArea = () => {
	let [srcData, setSrcData] = React.useState(null)
	React.useEffect(() => {
		fetch('../../data/areaData.json')
			.then(res => res.json())
			.then(setSrcData)
	}, [])
	
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

	return(
		<svg id="selectable" style={{
			width: '700px',
			height: '100px',
			border: '1px solid green'
		}}>
			<g className="gWrapper">
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