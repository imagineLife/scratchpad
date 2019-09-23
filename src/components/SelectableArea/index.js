import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import './index.css'

const SelectableArea = ({dims, onMove, data}) => {
	console.log('SelectableArea fn');
	let [brushFn, setBrushFn] = React.useState(null)
	let [hoverArr, setHoverArr] = React.useState([0,175])
	let [brushBox,setBrushBox] = React.useState(null)
	let brushRef = React.useRef()
	
	function brushedFn(){
		// console.log('%c brushed fn', 'background-color: steelblue; color: black;')
		
		var selectedPixels = d3Select.event.selection;
		
		let scaledBegin = Math.floor(translateScale(selectedPixels[0]))
		let scaledEnd = Math.floor(translateScale(selectedPixels[1]))

		setHoverArr(selectedPixels)
		onMove([scaledBegin, scaledEnd])

		// console.log('%c - - - - -', 'background-color: steelblue; color: black;')
		
	}

	/*
		select && save the 'brushBox' to state
	*/
	React.useEffect(() => {
		if(data){
			setBrushBox(d3Select.select(brushRef.current))
		}
	}, [data])
	
	/*
		connect the brush to the g wrapper?!
	*/
	React.useEffect(() => {
		if(brushRef.current && brushBox){
			
			//build the brushFn
			brushFn = brush.brushX()
				.handleSize(10)
				.on('brush', brushedFn)

			// set the brushFn to the burshBox, 'instantiating'
			// the brush UI element(s)
			brushBox.call(brushFn);

			//set the initial overlay to 1/4 width
			brushFn.move(brushBox, hoverArr)
		}
	}, [brushBox])

	//////////////////////////// /////
	//// default loading return /////
	//////////////////////////// /////
	if(!data){
		return (<p>Loading data...</p>)
	}
	

	//////////////////////////// /////
	//// 			If SourceData		   /////
	//////////////////////////// /////
	//Set Scales
	let xScale = scale.scaleLinear()
		.domain([0, data.length - 1])
		.range([0, 700])

	let yScale = scale.scaleLinear()
		.domain([0, d3Arr.max(data, d => d.y)])
		.range([100, 0])

	let translateScale = scale.scaleLinear()
		.domain([0, 700])
		.range([0, data.length - 1])

	//build areaFn
	let areaFn = d3Shape.area()
		.x((d, i) => xScale(i + 1))
		.y0(100)
		.y1((d) => yScale(d.y))


	// console.log('%c SCALED sentence indexes', 'background-color: orange; color: white;')
	// console.log(Math.floor(translateScale(hoverArr[0])))
	// console.log(Math.floor(translateScale(hoverArr[1])))
	// console.log('%c  - - - - ', 'background-color: orange; color: white;')

	const pathD = areaFn(data)

	return(
		<svg id="selectable" style={dims}>
		  <g className="g-wrapper">
		    <path 
		      d={pathD}
					fill={'#ccc'} />
				<g className="brush-g-window" ref={brushRef} />
			</g>
		</svg>)
}

export default SelectableArea