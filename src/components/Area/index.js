import React from 'react'
import './index.css'

const Area = () => {
	return(
		<svg id="area" style={dims}>
				<defs>
			    <linearGradient id="myGradient" gradientTransform="rotate(90)">
			      <stop offset="50%" stopColor="rgb(147,147,147)" />
			      <stop offset="100%"  stopColor="rgba(49,54,61,0)" />
			    </linearGradient>
			  </defs>
			  <g className="area-g-wrapper">
			    
			    {/*Area Path*/}
			    <path 
			      d={pathD}
						fill={'url(#myGradient)'} />
				</g>
		</svg>
	)
}

export default Area;