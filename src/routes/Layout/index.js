import React from 'react'
import './responsive.css'
import './index.css'

const Layout = () => {
	return(
		<main id="layout" className="layout">
			<div id="title-box" className="f-w i-b col-12">
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
			<div id="area-box" className="i-b col-12">
				<p>Area Box</p>
			</div>
			<div id="focus-area-box" className="i-b col-4">
				<h2 className="section-text">A Glance At The Text</h2>
				<div id="focus-area-hover">
				</div>
				<p className="explanatory-text">Hover over this area chart to highlight the sentence 
				that was spoken at the specific point in time during the 
				president’s address.  HOVER</p>
			</div>
			<div id="area-explain-box" className="i-b col-8">
				<p className="explanatory-text">In the above area chart, the dotted-box can be used to select a specific 
					range of the speech, & update the remainder of the document 
					(move, shrink, widen) CLICK.DRAG.MOVE</p>
			</div>
			<div id="theme-box" className="i-b col-3">
				<h2 className="section-text">Textual Themes</h2>
				<p className="explanatory-text">Colors match text to a 'theme'. CLICK</p>
				<p>Theme Box</p>
			</div>
			<div id="image-box" className="i-b col-5">
				<p>Image Box</p>
				<h2 className="image-subtext">The President Addresses The Nation</h2>
			</div>
			<div id="words-of-interest-box" className="i-b col-4">
				<h2 className="section-text">Words Of Interest</h2>
				<p className="explanatory-text">Here are some various types of words that were spoken. 
				The word lists are toggle-able & the words are selectable. SELECT.SELECT</p>
				<p>Words-Of-Interest Box</p>
			</div>
			<div id="words-by-length-box" className="i-b col-8">
				<h2 className="section-text">Words By Length</h2>
				<p>Words-By-Length Box</p>
			</div>
			<div id="divider-box" className="i-b col-12">
				<p>The text content of the speech, below, is responsive to interactions above.</p>
			</div>
			<div id="text-display-box" className="i-b col-12">
				<p>Text-Display Box</p>
			</div>
		</main>
	)
}
export default Layout