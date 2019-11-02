import React from 'react';
import './index.css'
import useDimensions from '../../lib/useDims'
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
	//Update state dimensions
	React.useEffect(() => {
		//on first-render-calculation
		let firstCalc = (height && width && lessM['w'] == undefined)
		let newDimsLessMargins ={};
		let newRadiusRange = []
		if(firstCalc){
			newDimsLessMargins = makeDimsLessMargins(height,width, m)
			let wDivision = data.length + .5 
			let newCircleMaxHeight = newDimsLessMargins.w / wDivision * .85
			updateFromResize(newDimsLessMargins, newCircleMaxHeight)
		}

		//on resize
		let newWidth = (width - m.l - m.r !== lessM.w)
		let alreadyCalcdWidthOnce = lessM.w !== undefined
		if(newWidth && alreadyCalcdWidthOnce){
			newDimsLessMargins = makeDimsLessMargins(height,width, m)
			let wDivision = data.length + .5
			let newCircleMaxHeight = newDimsLessMargins.w / wDivision * .85
			updateFromResize(newDimsLessMargins, newCircleMaxHeight)
		}
		
	}, [ref, height, width])

	//sanity checking data props
	if(!data){
		return <p style={{color: 'gray'}}>Loading Circle Data...</p>
	}

	let rScale = s.scaleLinear()
		.domain([0, 90])
		.range(circleRadiusRange)
	
	let withRadius = data.map((c, idx) => {
		let scaledR = rScale(c.occurances)
		c.scaledR = scaledR 
		c.scaledD = scaledR * 2
		c.thisXWithBuffer = buffer + scaledR
		c.prevX = idx === 0 ? 0 : data[idx - 1].thisX
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