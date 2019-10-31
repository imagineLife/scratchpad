import React from 'react';
import './index.css'
import useDimensions from '../../lib/useDims'
import * as s from 'd3-scale'
import * as a from 'd3-array'

const makeNewSizes = (height, width, m) => {return {h: height - m.t - m.b, w: width - m.l - m.r}}
const mockData = [
  {
    "size": 9,
    "occurances": 16
  },
  {
    "size": 8,
    "occurances": 22
  },
  {
    "size": 7,
    "occurances": 32
  },
  {
    "size": 6,
    "occurances": 30
  },
  {
    "size": 5,
    "occurances": 39
  },
  {
    "size": 4,
    "occurances": 51
  },
  {
    "size": 3,
    "occurances": 90
  },
  {
    "size": 2,
    "occurances": 50
  }
]
const Circles = () => {
	
	const dims = useDimensions()
	let [ref, {height, width}] = dims
	const [m] = React.useState({t: 10, r: 25, b: 10, l: 25})
	const [lessM, setLessM] = React.useState({})
	let [circleRadiusRange, setCircleRadiusRange] = React.useState([])
	let [buffer, setBuffer] = React.useState(0)

	//Update state dimensions
	React.useEffect(() => {

		//on first-render-calculation
		let firstCalc = (height && width && lessM['w'] == undefined)
		let newDimsLessMargins ={};
		let newRadiusRange = []
		if(firstCalc){
			newDimsLessMargins = makeNewSizes(height,width, m)
			setLessM(newDimsLessMargins)
			let wDivision = mockData.length + .5 
			let newCircleMaxHeight = newDimsLessMargins.w / wDivision
			setCircleRadiusRange([0, newCircleMaxHeight])
			setBuffer(newDimsLessMargins.w * .01)
		}

		//on new-width (resize)
		let newWidth = (width - m.l - m.r !== lessM.w)
		let alreadyCalcdWidthOnce = lessM.w !== undefined
		if(newWidth && alreadyCalcdWidthOnce){
			newDimsLessMargins = makeNewSizes(height,width, m)
			setLessM(newDimsLessMargins)
			let wDivision = mockData.length + 1 
			let newCircleMaxHeight = newDimsLessMargins.w / wDivision
			setCircleRadiusRange([0, newCircleMaxHeight])
			setBuffer(newDimsLessMargins.w * .01)
		}
		
	}, [ref, height, width])

	let rScale = s.scaleLinear()
		.domain([0, 90])
		.range(circleRadiusRange)
	
	let withRadius = mockData.map((c, idx) => {
		let scaledR = rScale(c.occurances)
		c.scaledR = scaledR 
		c.scaledD = scaledR * 2
		c.thisXWithBuffer = buffer + scaledR
		c.prevX = idx === 0 ? 0 : mockData[idx - 1].thisX
		c.thisX = c.prevX + c.thisXWithBuffer;
		return c
	})
	let widthSection = lessM.w / (mockData.length + 1)
	return(
		<React.Fragment>
			<h2>Circles</h2>
			<div id="circlesBox" ref={ref}>
				<svg id="circle-svg" width={width} height={height}>
					<g transform={`translate(${m.l}, ${m.t})`}>
						{lessM && lessM.h && circleRadiusRange !== null &&
							withRadius.map((c, idx) => {
								console.log('c')
								console.log(c)
								
								return(
									<circle
										key={`${c.size}-${idx}`}
										r={rScale(c.occurances)}
										stroke="black"
										strokeWidth={3}
										cx={c.thisX + c.prevX}
										cy={lessM.h / 2}
									/>
									
								)
							})}
					</g>
				</svg>
			</div>
		</React.Fragment>
	)
}

export default Circles;