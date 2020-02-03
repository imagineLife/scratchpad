import React from 'react';

// (text: source text blob, hlText: selectedWord-to-hightlight)
const getQueriedWord = (text, hlText, classToUse) => {
  // remove any pre-existing classToUse where the selected-text goes
  const removeRegex = new RegExp(`/.\w*\s\w*=\/${classToUse}.(\w*)<\/\w*>/g`);

  // add tags associated with this selection
  // let newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');
  const newStyleRegex = new RegExp(`\\b(${hlText})\\b`, 'gi');

  // update the text body
  // let resText = text.replace(removeRegex,"$1").replace(newStyleRegex, `<span class="selected-text">$1</span>`)
  const resText = text
    .replace(removeRegex, '$1')
    .replace(newStyleRegex, `<i class="${classToUse}">$1</i>`);

  return resText;
};

export { getQueriedWord };
