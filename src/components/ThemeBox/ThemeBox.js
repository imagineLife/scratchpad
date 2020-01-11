import React, { useContext } from 'react';
import './ThemeBox.css'

import { TextAreaContext } from '../../Contexts/TextArea'
const ThemeBox = () => {

	const { selectedAreaArr, themesData } = useContext(TextAreaContext)
	console.log('%c ---- THEME BOX----', 'background-color: orange; color: black;')
	
	/*
		Get all selected Themes, store in a single Array, no duplicates
	*/
	let selectedThemes = []
	if(selectedAreaArr && themesData){
		for(
			let thisThemeArrayIndex = selectedAreaArr[0]; 
			thisThemeArrayIndex <= selectedAreaArr[1]; 
			thisThemeArrayIndex++
		){
			let thisSentenceIndexsThemeArr = themesData[thisThemeArrayIndex]
			thisSentenceIndexsThemeArr.forEach(theme => {
				if(!selectedThemes.includes(theme)){
					selectedThemes.push(theme)
				}
			})
		}
	}

	console.log('selectedThemes')
	console.log(selectedThemes)
	
	
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