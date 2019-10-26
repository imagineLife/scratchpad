import React from 'react'
import './responsive.css'
import './index.css'

const Layout = () => {
	return(
		<main id="layout" className="layout">
			<div id="title-box" className="f-w i-b col-12">
				<h1 className="title">Title Box</h1>
				<div className="title-data">
					<span className="sub-title border-right">Donald Trump</span>
					<span className="sub-title border-right">On the 20th Day of February in the Year of 2017</span>
					<span>Gives his 1473-word address to the nation</span>
				</div>
			</div>
			<div id="area-box" className="i-b col-12">
				<p>Area Box</p>
			</div>
			<div id="focus-area-box" className="i-b col-4">
				<div id="focus-area-hover"></div>
				<p>Hover over this area chart to highlight the sentence 
				that was spoken at the specific point in time during the 
				president’s address.  HOVER</p>
			</div>
			<div id="area-explain-box" className="i-b col-8">
				<p>In the above area chart, the dotted-box can be used to select a specific 
					range of the speech, & update the remainder of the document 
					(move, shrink, widen) CLICK.DRAG.MOVE</p>
			</div>
			<div id="theme-box" className="i-b col-3">
				<p>Theme Box</p>
			</div>
			<div id="image-box" className="i-b col-5">
				<p>Image Box</p>
			</div>
			<div id="words-of-interest-box" className="i-b col-4">
				<p>Words-Of-Interest Box</p>
			</div>
			<div id="words-by-length-box" className="i-b col-8">
				<p>Words-By-Length Box</p>
			</div>
			<div id="divider-box" className="i-b col-12">
				<p>Divider Box</p>
			</div>
			<div id="text-display-box" className="i-b col-12">
				<p>Text-Display Box</p>
			</div>
		</main>
	)
}
export default Layout