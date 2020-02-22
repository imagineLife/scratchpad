import React from 'react';
import './index.css';
import { TextAreaContext } from '../../Contexts/TextArea';
import { WordListContext } from '../../Contexts/CommonWords';

const CommonWords = () => {
  const { displayText } = React.useContext(TextAreaContext);
  const {
    makeCommonWords,
    wordLists,
    wordListNames,
    selectWordList,
    setSelectedWord,
    selectedWord,
    sortByWordAlpha,
    wordListFocus,
  } = React.useContext(WordListContext);

  if (!wordLists) {
    return <p>Missing Word Lists</p>;
  }

  const selectedWordList = wordLists[wordListFocus] || [];

  const sortedWordList = selectedWordList.sort(sortByWordAlpha);

  return (
    <div id="words-of-interest-box">
      <h2 className="section-text">Words Of Interest</h2>
      <p className="explanatory-text">
        Here are some various types of words that were spoken.
        The word lists are toggle-able & the words are selectable.
        <span className="interaction-note">SELECT.SELECT</span>
      </p>
      <section id="words-of-interest-for-ui">
        {/* List of List-Titles */}
        <section id="word-list">
          <h3 className="word-list-title">Word Lists</h3>
          <ul id="word-lists">
            {wordListNames && wordListNames.map((l, idx) => (
              <li
                key={`${l}-${idx}`}
                className={`word-list-option${wordListFocus === l && ' selected'}`}
                onClick={() => {
                  selectWordList((l));
                }}
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* Words from selected word-list */}
        <section id="focus-words">
          <h3 className="word-list-title">List Results</h3>
          {wordListFocus && (
            <ul id="focus-word-list">
              {sortedWordList.map((l, idx) => {
              	const thisWord = wordListFocus === 'Common Words' ? l.word : l;
  					    	return (
                  <li
      key={`${thisWord}-${idx}`}
      className={`focus-word-option ${selectedWord && selectedWord === thisWord && ' selected'}`}
      onClick={() => {
  						          if (selectedWord === thisWord) {
  						            setSelectedWord(null);
  						          } else {
  						            setSelectedWord(thisWord);
  						          }
  						        }}
    > 
      {thisWord}
    </li>
  						    );
  					    })}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
};

export default CommonWords;
