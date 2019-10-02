import React, {Fragment} from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import './index.css'

import {TextAreaContext} from '../../Contexts/TextArea'

const SelectableArea = ({dims, onMove}) => {

	let {
		sentences, 
		textAreaDispatch, 
		areaData, 
		setAreaData
	} = React.useContext(TextAreaContext)

	let [brushFn, setBrushFn] = React.useState(null)
	let [hoverArr, setHoverArr] = React.useState([0,175])
	let [brushBoxG,setBrushBoxG] = React.useState(null)
	let [brushed, setBrushed] = React.useState(false)
	let brushRef = React.useRef()
	
	/*
		called 'onBrush'
	*/
	function brushedFn(){
		var selectedPixels = d3Select.event.selection;
		let scaledBegin = Math.floor(translateScale(selectedPixels[0]))
		let scaledEnd = Math.floor(translateScale(selectedPixels[1]))
		setHoverArr(selectedPixels)

		//dispatch Context-updater
		textAreaDispatch({type: 'UPDATE_DISPLAY_TEXT_FROM_AREA', payload: [scaledBegin, scaledEnd]})

		onMove([scaledBegin, scaledEnd])
	}

	/*
		Set Area Context data 'initially', 
			from textStore sentences array
	*/
	React.useEffect(()=>{
		if(sentences && !areaData){
			let preppedAreaData = []
			sentences.forEach((s,ind) => {
				preppedAreaData.push({y: s.wordCount})
			})
			setAreaData(preppedAreaData)
		}
	},[sentences])

	////    //////////////////////// /////
	//	select && save the 'brushBoxG' to state
	////    //////////////////////// /////
	// React.useEffect(() => {
	// 	if(areaData){
	// 		setBrushBoxG(d3Select.select(brushRef.current))
	// 	}
	// }, [areaData])

	
	////    //////////////////////// /////
	//	connect the brush to the g wrapper
	////    //////////////////////// /////
	React.useEffect(() => {
		if(brushRef && brushRef.current && areaData){
			
			//build the brushFn
			let thisBrushFN = brush.brushX()
				// .extent([0,0], [[700, 100]])
				.handleSize(10)
				.on('brush', brushedFn)

			// set the brushFn to the burshBox, 'instantiating'
			// the brush UI element(s)
			let thisBrushBox = d3Select.select(brushRef.current);
			thisBrushBox.call(thisBrushFN);

			//set the initial overlay to 1/4 width
			thisBrushFN.move(thisBrushBox, hoverArr)
		}
	}, [brushRef, areaData])

	//////////////////////////// /////
	//// default loading return /////
	//////////////////////////// /////
	if(!areaData || !sentences){
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

	if(!pathD || !xScale || !yScale || !areaFn || !translateScale){
		return(<p>loading...</p>)
	}

	return(
		<Fragment>
			<svg id="selectable" style={dims}>
		  <g className="g-wrapper">
		    <path 
		      d={pathD}
					fill={'#ccc'} />
				<g className="brush-g-window" ref={brushRef} />
			</g>
		</svg>
		</Fragment>
		)
}

export default SelectableArea