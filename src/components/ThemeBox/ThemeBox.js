import React, { useContext, useEffect, useState } from 'react';
import './ThemeBox.css'

import { TextAreaContext } from '../../Contexts/TextArea'
const ThemeBox = () => {

	const { selectedAreaArr, themesData } = useContext(TextAreaContext)
	
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
			thisSentenceIndexsThemeArr.length > 0 &&
			thisSentenceIndexsThemeArr.forEach(theme => {
				if(!selectedThemes.includes(theme)){
					selectedThemes.sort().push(theme)
				}
			})
		}
	}

	return(
		<div id="theme-box">
			<div className="theme-title">
				<h2 className="section-text">Textual Themes</h2>
				<p className="explanatory-text theme-explanatory">Colors match text to a 'theme'. CLICK</p>
			</div>
			<div id="theme-list-box">
				<ul className="theme-list">
					{
						selectedThemes && 
						selectedThemes.length > 0 && 
						selectedThemes.map((theme,idx)=>  (
							<li key={`theme-item-${theme}-${idx}`}>{theme}</li>
						))
					}
				</ul>
			</div>
		</div>)
}

export default ThemeBox