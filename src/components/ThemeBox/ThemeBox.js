import React from 'react';
import './ThemeBox.css'

const ThemeBox = () => {
	return(
		<div id="theme-box">
			<div className="theme-title">
				<h2 className="section-text">Textual Themes</h2>
				<p className="explanatory-text theme-explanatory">Colors match text to a 'theme'. CLICK</p>
			</div>
			<ul className="theme-list">
				<li>Employment</li>
				<li>Trade</li>
				<li>Protection</li>
				<li>Patriotism</li>
			</ul>
		</div>)
}

export default ThemeBox