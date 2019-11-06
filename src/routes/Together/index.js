import React from 'react'
import './index.css'
import SelectableArea from '../../components/SelectableArea/complexContext'
import WordListPicker from '../../components/MultiWordPicker/UsingContextForUI'
import TextDisplay from '../../components/TextDisplay/UsingComplexContext'

const moved = () => console.log('moved');

const FlexGrid = () => {
	return(
		<main id="flex-grid-layout">
			
			<header>
				<div id="title-box" className="f-w">
					<div className="title-text-wrapper">
						<h1 className="title">SayWhat?!</h1>
						<div className="corner-box">
							<p>A Play on Newspapers, Text-Analysis, & Interaction</p>
						</div>
					</div>
					<div className="title-data">
						<span className="sub-title border-right">Donald Trump</span>
						<span className="sub-title border-right">On the 20th Day of February in the Year of 2017</span>
						<span className="sub-title">Gives his 1473-word address to the nation</span>
					</div>
				</div>
				
				<div id="area-box">
					<SelectableArea 
						dims={{
							width: '700px',
							height: '100px'
						}}
						onMove={moved}
					/>
				</div>
			</header>
			
			<section id="left-side">
				<div id="focus-area-box">
					<h2 className="section-text">A Glance At The Text</h2>
					<div id="focus-area-hover">
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
					<p className="explanatory-text">In the above area chart, the dotted-box can be used to select a specific 
						range of the speech, & update the remainder of the document 
						(move, shrink, widen) CLICK.DRAG.MOVE</p>
				</div>
				
				<div id="theme-box">
					<h2 className="section-text">Textual Themes</h2>
					<p className="explanatory-text">Colors match text to a 'theme'. CLICK</p>
					<p>Theme Box</p>
				</div>
				
				<div id="image-box">
					<p>Image Box</p>
					<h2 className="section-text image-sub">The President <br /> Addresses The Nation</h2>
				</div>
				
				<div id="words-by-length-box">
					<h2 className="section-text">Words By Length</h2>
					<p>Words-By-Length Box</p>
				</div>
			</section>
			
			<footer>
				<div id="divider-box">
					<p>The text content of the speech, below, is responsive to interactions above.</p>
				</div>
				
				<div id="text-display-box">
					<TextDisplay />
				</div>
			</footer>
			
		</main>
	)
}
export default FlexGrid