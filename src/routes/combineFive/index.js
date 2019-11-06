import React from 'react'
import * as scale from 'd3-scale'
import * as d3Arr from 'd3-array'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as brush from 'd3-brush'
import TextDisplay from '../../components/TextDisplay/UsingComplexContext'
import SelectableArea from '../../components/SelectableArea/complexContext'
import Circles from '../../components/Circles/ContextWrapper'
import CommonWords from '../../components/WordList/UsingContext'
// import './index.css'

const CombineFour = ({data}) => {

	const moved = (d) => {
		// console.log('MOVED');
		// console.log(d);
	}

	return(
		<React.Fragment>
			<SelectableArea 
				dims={{
					width: '700px',
					height: '100px'
				}}
				onMove={moved}
			/>
			<CommonWords />
			<Circles />
			<TextDisplay />
		</React.Fragment>
	)
}

export default CombineFour