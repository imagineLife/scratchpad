import React from 'react'
import './index.css'

const SelectableArea = ({dims,pathD,areaRef}) => {
	return(
		<svg id="selectable" style={dims}>
				<g className="g-wrapper">
					<path d={pathD}
						fill={'#ccc'}
					/>
					<g className="brush-g-window" ref={areaRef}></g>
				</g>
			</svg>)
}

export default SelectableArea