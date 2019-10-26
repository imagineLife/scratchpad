import React from 'react'
import './responsive.css'
import './index.css'

const Layout = () => {
	return(
		<main id="layout" className="layout">
			<div id="title-box" className="f-w i-b col-12">
				<p>Title Box</p>
			</div>
			<div id="area-box" className="i-b col-12">
				<p>Area Box</p>
			</div>
			<div id="focus-area-box" className="i-b col-4">
				<p>Focus-Area Box</p>
			</div>
			<div id="area-explain-box" className="i-b col-8">
				<p>Area-Explain Box</p>
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