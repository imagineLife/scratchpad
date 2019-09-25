import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import './index.css'

import {AreaContext} from '../../AreaContext'
import {TextContext} from '../../TextContext/complex'

const SelectableArea = ({dims, onMove}) => {

	let {textStore} = React.useContext(TextContext)
	console.log('%c SelectableArea txtVals - - -', 'background-color: darkgreen; color: white;')
	console.log(textStore)
	
	let [brushFn, setBrushFn] = React.useState(null)
	let [hoverArr, setHoverArr] = React.useState([0,175])
	let [brushBox,setBrushBox] = React.useState(null)
	let brushRef = React.useRef()
	
	let {areaData, setAreaData} = React.useContext(AreaContext)
	
	/*
		called 'onBrush'
	*/
	function brushedFn(){
		var selectedPixels = d3Select.event.selection;
		let scaledBegin = Math.floor(translateScale(selectedPixels[0]))
		let scaledEnd = Math.floor(translateScale(selectedPixels[1]))
		setHoverArr(selectedPixels)
		onMove([scaledBegin, scaledEnd])
	}

	/*
		Set Area Context data 'initially', 
			from textStore sentences array
	*/
	React.useEffect(()=>{
		if(textStore.sentences && !areaData){
			let preppedAreaData = []
			textStore.sentences.forEach((s,ind) => {
				preppedAreaData.push({y: s.wordCount})
			})
			setAreaData(preppedAreaData)
		}
	},[textStore.sentences])

	/*
		select && save the 'brushBox' to state
	*/
	React.useEffect(() => {
		if(areaData){
			setBrushBox(d3Select.select(brushRef.current))
		}
	}, [areaData])
	
	/*
		connect the brush to the g wrapper
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
	if(!areaData || !textStore.sentences){
		return (<p>Loading areaData...</p>)
	}
	

	////////////////////////// /////
	// 			If SourceData		   /////
	////////////////////////// /////
	// Set Scales
	let xScale = scale.scaleLinear()
		.domain([0, areaData.length - 1])
		.range([0, 700])

	let yScale = scale.scaleLinear()
		.domain([0, d3Arr.max(areaData, d => d.y)])
		.range([100, 0])

	let translateScale = scale.scaleLinear()
		.domain([0, 700])
		.range([0, areaData.length - 1])

	//build areaFn
	let areaFn = d3Shape.area()
		.x((d, i) => xScale(i + 1))
		.y0(100)
		.y1((d) => yScale(d.y))

	const pathD = areaFn(areaData)

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