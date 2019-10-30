import React from 'react';
import './index.css'
import useDimensions from '../../lib/useDims'

const mockData = [
  {
    "size": 3,
    "occurances": 90
  },
  {
    "size": 4,
    "occurances": 51
  },
  {
    "size": 2,
    "occurances": 50
  },
  {
    "size": 5,
    "occurances": 39
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
    "size": 8,
    "occurances": 22
  },
  {
    "size": 9,
    "occurances": 16
  }
]
const Circles = () => {
	
	const dims = useDimensions()
	let [ref, {height, width}] = dims
	const [m] = React.useState({t: 10, r: 25, b: 10, l: 25})
	const [lessM, setLessM] = React.useState({})

	//set dimensions for chart
	React.useEffect(() => {

		//on first-render-calculation
		let firstCalc = (height && width && lessM['w'] == undefined)
		if(firstCalc){
			setLessM({
				h: height - m.t - m.b,
				w: width - m.l - m.r
			})
		}

		//on new-width (resize)
		let newWidth = (width - m.l - m.r !== lessM.w)
		let alreadyCalcdWidthOnce = lessM.w !== undefined
		if(newWidth && alreadyCalcdWidthOnce){
			setLessM({
				h: height - m.t - m.b,
				w: width - m.l - m.r
			})
		}
		
	}, [ref, height, width])

	return(
		<div id="circle-box" ref={ref}>
			<h2>Circles</h2>
			<div id="circlesBox"></div>
		</div>
	)
}

export default Circles;