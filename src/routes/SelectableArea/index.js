import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import SelectableArea from '../../components/SelectableArea'
import './index.css'

const SelectableAreaRoute = () => {
	
	const moved = (d) => {
		console.log('%c MOVED!!', 'background-color: darkblue; color: white;')
		console.log('d')
		console.log(d)
		
	}
	return(
		<SelectableArea 
			dims={{
				width: '700px',
				height: '100px'
			}}
			onMove={moved}
		/>
	)
}

export default SelectableAreaRoute