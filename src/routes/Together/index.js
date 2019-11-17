import React from 'react'
import './index.css'
import SelectableArea from '../../components/SelectableArea/dimsFromParent'
import WordListPicker from '../../components/MultiWordPicker/UsingContextForUI'
import TextDisplay from '../../components/TextDisplay/UsingComplexContext'
import AreaBox from '../../components/Area'
import Circles from '../../components/Circles/ContextWrapperForUI'
import useDimensions from '../../lib/useDims'
import trumpImg from '../../../data/trump.jpg'
import * as d3data from 'd3-fetch'
const moved = () => console.log('moved');

const FlexGrid = () => {

	const [areaBoxRef, {width: areaBoxWidth, height: areaBoxHeight}] = useDimensions();
	const [focusAreaRef, {width: focusAreaW, height: focusAreaH}] = useDimensions();
	let [themeObj, setThemeObj] = React.useState({})
	let [themeArr] = React.useState([['Patriotism','Thankful'], ['timeframe','unity','change'], ['unity'], ['we'],['unity','pessimism','comparison']])
	/*
		DEV ONLY - convert csv-type data to an object consumable by this project
	*/
	React.useEffect(() => {
		let newObj={}
		d3data.tsv('../../../data/themes.tsv').then(res => {
			
			/*Option 1*/
			res.map((tsv, idx) => {
				if(!newObj.hasOwnProperty(tsv.theme)){
					let theseWords = tsv.keywords.split(",")
					newObj[tsv.theme] = theseWords
				}
				if(newObj.hasOwnProperty(tsv.theme)){
					
					let startArr = newObj[tsv.theme]
					
					let newArr = tsv.keywords.split(',')
					
					// let resArr = [...startArr, ...newArr]

					/*
						SET?!
						https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
						remove duplicates
					*/
					let resArr = [...new Set([...startArr, ...newArr])]
					
					newObj[tsv.theme] = resArr

				}
			})	
			setThemeObj(newObj)
		})
	}, [])

	// console.log('themeObj')
	// console.log(themeObj)
	// console.log('themeArr')
	// console.log(themeArr)
	

	return(
		<main id="flex-grid-layout">
			
			<header>
				<div id="title-box" className="f-w">
					<div className="title-text-wrapper">
						<h1 className="title">The Slice-N-Dice Times</h1>
						<div className="corner-box">
							<p>A Play on Newspapers, Text-Analysis, & Interaction</p>
						</div>
					</div>
					<ul className="title-data">
						<li className="sub-title border-right">Donald Trump</li>
						<li className="sub-title border-right">On the 20th Day of February in the Year of 2017</li>
						<li className="sub-title">Gives his 1473-word address to the nation</li>
					</ul>
				</div>
				
				<div id="area-box" ref={areaBoxRef}>
					<SelectableArea 
						dims={{
							width: areaBoxWidth,
							height: areaBoxHeight
						}}
						onMove={moved}
					/>
				</div>
			</header>
			
			<section id="left-side">
				<div id="focus-area-box">
					<h2 className="section-text">A Glance At The Text</h2>
					<div id="focus-area-hover" ref={focusAreaRef}>
						<AreaBox />
					</div>
					<p className="explanatory-text">Hover over this area chart to highlight the sentence 
					that was spoken at the specific point in time during the 
					president’s address.  HOVER</p>
				</div>

				<div id="words-of-interest-box">
					<h2 className="section-text">Words Of Interest</h2>
					<WordListPicker />
					<p className="explanatory-text">Here are some various types of words that were spoken. 
					The word lists are toggle-able & the words are selectable. SELECT.SELECT</p>
				</div>
			</section>
			
			<section id="right-side">
				<div id="area-explain-box">
					<p className="explanatory-text selectable-area-explain">In the above area chart, the dotted-box can be used to select a specific 
						range of the speech, & update the remainder of the document 
						(move, shrink, widen) <br />
						CLICK.DRAG.MOVE</p>
				</div>
				
				<div id="theme-box">
					<h2 className="section-text">Textual Themes</h2>
					<p className="explanatory-text theme-explanatory">Colors match text to a 'theme'. CLICK</p>
					<ul className="theme-list">
						<li>Employment</li>
						<li>Trade</li>
						<li>Protection</li>
						<li>Patriotism</li>
					</ul>
				</div>
				
				<div id="image-box">
					<img className="face-image" src={trumpImg}/>
					<h2 className="section-text image-sub">The President <br /> Addresses The Nation</h2>
				</div>
				
				<div id="words-by-length-box">
					<h2 className="section-text">Words By Length</h2>
					<Circles />
				</div>
			</section>
			
			<footer>
				<div id="divider-box">
					<p className="explanatory-text">The text content of the speech, below, is responsive to interactions above.</p>
				</div>
				
				<div id="text-display-box">
					<TextDisplay />
				</div>
			</footer>
			
		</main>
	)
}
export default FlexGrid