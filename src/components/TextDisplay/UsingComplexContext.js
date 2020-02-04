import React, { useContext, useState } from 'react';
import './index.css';

import { TextAreaContext } from '../../Contexts/TextArea';
import { WordListContext } from '../../Contexts/CommonWords';
import { getQueriedWord } from '../../lib/getQueriedWord';
import getWordLength from '../../lib/getWordLength';


function splitStr(str, idx) {
  const firstPart = str.substring(0, idx);
  const secondPart = str.substring(idx);
  return [firstPart, secondPart];
}

const TextDisplay = () => {
  const {
    displayText,
    selectedAreaArr,
    sentences,
    wordLength,
    theme,
    themesData,
  } = useContext(TextAreaContext);

  const { selectedWord } = useContext(WordListContext);
  const [closingSentenceTag] = useState('</i>');
  const [openingSentenceTag] = useState('<i class="theme-sentence">');

  if (!displayText) {
    return (<p>Loading Text Display...</p>);
  }

  // if no selected word && no
  let resText = displayText;

  /*
    apply SELECTED WORD
  */
  if (selectedWord) {
    resText = getQueriedWord(displayText, selectedWord, 'selected-text');
  }

  /*
    apply WORD-LENGTH
  */
  if (wordLength) {
    resText = getWordLength(resText, wordLength, 'word-length');
  }

  /*
    calculate text-segment in-view
  */
  const inViewSentences = sentences.filter((s, i) => i >= selectedAreaArr[0] && i <= selectedAreaArr[1]);

  // "Responsive" UI column divisions
  let columnCount = Math.ceil(inViewSentences.length / 15);
  columnCount = Math.min(columnCount, 4);

  const columnStyle = {
    columns: columnCount, // 10-sentence-columns,
    overflowX: 'scroll',
    columnRuleStyle: 'solid',
    height: '450px',
  };

  /*
    CALCULATE THEME data...
  */


  /*
    from selected-theme to theme-sentence-underlined
  */

  // HELP FROM JACK
  // PLACEHOLDER, MOVE THIS ELSEWHERE
  const themeMappedObject = { };
  themesData && themesData.forEach((t, idx) => {
    // loop through the nested array element
    t.forEach((nestedThemeWord) => {
      themeMappedObject[nestedThemeWord] = themeMappedObject[nestedThemeWord]
        ? [...themeMappedObject[nestedThemeWord], idx]
        : [idx];
    });
  });

  /*
    Sentences + Themes
    Calulating, getting, && applying themes to sentences
  */

  const absoluteSentenceIndexesThatIncludeSelectedTheme = [];

  if (theme) {
    // loop through selected-sentence array
    for (let i = selectedAreaArr[0]; i <= selectedAreaArr[1]; i++) {
      // check if the current sentence HAS the selected theme
      if (themesData[i].includes(theme)) {
        absoluteSentenceIndexesThatIncludeSelectedTheme.push({ i, relativeI: i - selectedAreaArr[0], themes: themesData[i] });
      }
    }
  }

  /*
    BACKWARDS Loop thru selected-sentences WITH matching themes...
  */
  for (let i = absoluteSentenceIndexesThatIncludeSelectedTheme.length - 1; i >= 0; i--) {
    // @ each sentence, do some magic
    const currentSentenceTextWithTheme = inViewSentences[absoluteSentenceIndexesThatIncludeSelectedTheme[i].relativeI].text;
    const openingTagIndex = resText.indexOf(currentSentenceTextWithTheme);
    const closingTagIndex = openingTagIndex + currentSentenceTextWithTheme.length;

    // Input CLOSING tag
    const splitAtSpanEnd = splitStr(resText, closingTagIndex);
    resText = `${splitAtSpanEnd[0]}${closingSentenceTag}${splitAtSpanEnd[1]}`;

    // Input OPENING tag
    const splitAtSpanBeginning = splitStr(resText, openingTagIndex);
    resText = `${splitAtSpanBeginning[0]}${openingSentenceTag}${splitAtSpanBeginning[1]}`;
  }


  return <p className="display-text" style={columnStyle} dangerouslySetInnerHTML={{ __html: resText }} />;
};

export default TextDisplay;
