import React from 'react';
import './index.css';
import { TextAreaContext } from '../../Contexts/TextArea';
import { WordListContext } from '../../Contexts/CommonWords';

const CommonWords = () => {
  const { displayText } = React.useContext(TextAreaContext);
  const {
    makeCommonWords,
    wordLists,
    selectWordList,
    setSelectedWord,
    selectedWord,
    wordListFocus,
  } = React.useContext(WordListContext);

  // MAKE common words after display-text gets added to context
  React.useEffect(() => {
    if (displayText) {
      makeCommonWords(displayText);
    }
  }, [displayText]);

  // AUTO-SELECT a word-list 'onLoad'
  React.useEffect(() => {
    if (displayText && wordLists && !wordListFocus) {
      const lists = Object.keys(wordLists);
      selectWordList(lists[0]);
    }
  }, [displayText, wordListFocus, wordLists]);

  if (!wordLists) {
    return <p>Missing Word Lists</p>;
  }

  const lists = Object.keys(wordLists);

  return (
    <section id="words-of-interest-for-ui">
      {/* List of List-Titles */}
      <section id="word-list">
        <h3 className="word-list-title">Word Lists</h3>
        <ul id="word-lists">
          {lists.map((l, idx) => (
            <li
              key={`${l}-${idx}`}
              className={`word-list-option${wordListFocus === l ? ' selected' : ''}`}
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
            {wordLists[wordListFocus].map((l, idx) => {
            	const thisWord = wordListFocus === 'Common Words' ? l.word : l;
					    	return (
                <li
    key={`${thisWord}-${idx}`}
    className={`focus-word-option ${selectedWord && selectedWord === thisWord ? ' selected-focus-word' : ''}`}
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
  );
};

export default CommonWords;
