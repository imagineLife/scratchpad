import React from 'react';
import './index.css'
import useDimensions from '../../lib/useDims'
import { TextAreaContext } from '../../Contexts/TextArea'
import { CirclesContext } from '../../Contexts/Circles'
import * as s from 'd3-scale'
import * as a from 'd3-array'

const makeDimsLessMargins = (height, width, m) => {return {h: height - m.t - m.b, w: width - m.l - m.r}}
const Circles = () => {
	
	const dims = useDimensions()
	let [ref, {height, width}] = dims
	const [m] = React.useState({t: 10, r: 25, b: 10, l: 25})
	const [lessM, setLessM] = React.useState({})
	let [circleRadiusRange, setCircleRadiusRange] = React.useState([])
	let [buffer, setBuffer] = React.useState(0)

	const updateFromResize = (dims, circleMax) => {
		setLessM(dims)
		setCircleRadiusRange([0, circleMax])
		setBuffer(dims.w * .017)
	}
	
	//load visible text string
  const { displayText } = React.useContext(TextAreaContext);
  const { calcWordsByLength, wordsByLength } = React.useContext(CirclesContext);
  
  React.useEffect(() => {
  	if(displayText && wordsByLength.length < 1){
  		calcWordsByLength(displayText)
  	}
  }, [displayText, wordsByLength])
	
	//Update state dimensions
	React.useEffect(() => {
		if(wordsByLength.length > 0){
			//on first-render-calculation
			let firstCalc = (height && width && lessM['w'] == undefined)
			let newDimsLessMargins ={};
			let newRadiusRange = []
			if(firstCalc){
				newDimsLessMargins = makeDimsLessMargins(height,width, m)
				let wDivision = wordsByLength.length + .5 
				let maxCircleHeightByWidth = newDimsLessMargins.w / wDivision * .85
				let maxCircleHeight = Math.min(maxCircleHeightByWidth, newDimsLessMargins.h * .5)
				updateFromResize(newDimsLessMargins, maxCircleHeight)
			}

			//on resize
			let newWidth = (width - m.l - m.r !== lessM.w)
			let alreadyCalcdWidthOnce = lessM.w !== undefined
			if(newWidth && alreadyCalcdWidthOnce){
				newDimsLessMargins = makeDimsLessMargins(height,width, m)
				let wDivision = wordsByLength.length + .5
				let maxCircleHeightByWidth = newDimsLessMargins.w / wDivision * .85
				let maxCircleHeight = Math.min(maxCircleHeightByWidth, newDimsLessMargins.h * .5)
				updateFromResize(newDimsLessMargins, maxCircleHeight)
			}
		}
	}, [ref, height, width, wordsByLength])

	//sanity checking wordsByLength props
	if(!(wordsByLength.length > 0)){
		return <p style={{color: 'gray'}}>Loading Circle Data...</p>
	}

	let rScale = s.scaleLinear()
		.domain([0, 90])
		.range(circleRadiusRange)
	
	let withRadius = wordsByLength.map((c, idx) => {
		let scaledR = rScale(c.occurances)
		c.scaledR = scaledR 
		c.scaledD = scaledR * 2
		c.thisXWithBuffer = buffer + scaledR
		c.prevX = idx === 0 ? 0 : wordsByLength[idx - 1].thisX
		c.thisX = c.prevX + c.thisXWithBuffer;
		return c
	})

	return(
		<div id="circlesBox" ref={ref}>
			<svg id="circle-svg" width={width} height={height}>
				<g transform={`translate(${m.l}, ${m.t})`}>
					{lessM && lessM.h && circleRadiusRange !== null &&
						withRadius.map((c, idx) => {
							let circleX = c.thisX + c.prevX
							let circleY = lessM.h * .45
							return(
								<React.Fragment key={`${c.size}-${idx}`}>
									<circle
										className='word-circle'
										r={rScale(c.occurances)}
										stroke="black"
										strokeWidth={3}
										cx={circleX}
										cy={circleY} />
									<text>
										<tspan x={circleX} y={lessM.h - 18} className="circle-label">{c.size}-Letter</tspan>
										<tspan x={circleX} y={lessM.h - 5} className="circle-label">Words</tspan>
									</text>
									<text>
										<tspan x={circleX} y={circleY} className="circle-label count">{c.occurances}</tspan>
									</text>
								</React.Fragment>
							)
						})}
				</g>
			</svg>
		</div>
	)
}

export default Circles;