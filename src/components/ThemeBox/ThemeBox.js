import React, { useContext, useEffect, useState } from 'react';
import './ThemeBox.css';

import { TextAreaContext } from '../../Contexts/TextArea';

const ThemeBox = () => {
  const {
    selectedAreaArr, themesData, theme, textAreaDispatch,
  } = useContext(TextAreaContext);

  const themeColors = useState([
  	'rgb(166,206,227)',
  	'rgb(31,120,180)',
  	'rgb(178,223,138)',
  	'rgb(51,160,44)',
  	'rgb(251,154,153)',
  	'rgb(227,26,28)',
  	'rgb(253,191,111)',
  	'rgb(255,127,0)',
  	'rgb(202,178,214)',
  	'rgb(106,61,154)',
  	'rgb(255,255,153)',
  	'rgb(177,89,40)',
  ]);
  /*
		Get all selected Themes, store in a single Array, no duplicates
	*/
  const selectedThemes = [];
  if (selectedAreaArr && themesData) {
    for (
      let thisThemeArrayIndex = selectedAreaArr[0];
      thisThemeArrayIndex <= selectedAreaArr[1];
      thisThemeArrayIndex++
    ) {
      const thisSentenceIndexsThemeArr = themesData[thisThemeArrayIndex];
      thisSentenceIndexsThemeArr.length > 0
			&& thisSentenceIndexsThemeArr.forEach((theme) => {
			  if (!selectedThemes.includes(theme)) {
			    selectedThemes.sort().push(theme);
			  }
			});
    }
  }

  return (
    <div id="theme-box">
      <div className="theme-title">
        <h2 className="section-text">Textual Themes</h2>
        <p className="explanatory-text theme-explanatory">
          Colors match text to a 'theme'.
          <span className="interaction-note">CLICK</span>
        </p>
      </div>
      <div id="theme-list-box">
        <ul className="theme-list">
          {
            selectedThemes
						&& selectedThemes.length > 0
						&& selectedThemes.map((thisTheme, idx) => (
						  <li
						    key={`theme-item-${thisTheme}-${idx}`}
						    onClick={() => {
						      if (thisTheme == theme) {
						        textAreaDispatch({ type: 'THEME', payload: null });
						      } else {
						        textAreaDispatch({ type: 'THEME', payload: thisTheme });
						      }
						    }}
						    className="theme-li"
  >
						    {<span className="theme-word">{thisTheme}</span>}
						    {thisTheme == theme && <span className="selected-underline" />}
  </li>
						))
          }
        </ul>
      </div>
    </div>
  );
};

export default ThemeBox;
