import React, { useContext } from 'react';
import { mount } from 'enzyme'

// State
import { TextAreaContext } from '../TextArea';
import { CommonWordsProvider, WordListContext } from './'
import withData from './context-data.json';
import noData from './no-data.json';
import mockDisplayText from './mock-display-text'

// helper
import { waitForComponentToPaint } from '../../helpers'

describe('CommonWords Context', () => {
  
  const ChildBox = () => {
    const { commonWords, wordLists, ...ctxVals } = useContext(WordListContext);
    console.log('wordLists');
    console.log(wordLists);
    return (<div id="child">
      <section id="common-words">
        {commonWords.map((d,idx) => <p key={`common-word-${idx}`} className="common-word">{d}</p>)}
      </section>
      <section id="word-lists">
        {Object.keys(wordLists).map(wordListName => (
          <div className="word-list" id={wordListName} key={wordListName}>
            {wordLists[wordListName].map((wlData, wlDataIdx) => (
              <p key={`${wordListName}-${wlData}`}>{wlDataIdx}</p>
            ))}
          </div>
        ))}
      </section>
    </div>);
  }
  
  describe('with no data', () => {
    const emptyComponent = mount(
      <TextAreaContext.Provider value={{ displayText: null }}>
        <CommonWordsProvider>
          <ChildBox />
        </CommonWordsProvider>
      </TextAreaContext.Provider>
    );
    it('no common-words',() => {
      expect(emptyComponent.find('p.common-word').length).toBe(0);
    })
    describe('word lists', () => {
      let renderedWordLists = emptyComponent.find('section#word-lists').children()

      it('renders 3 word list wrappers from word-list keys', () => {
        expect(renderedWordLists.length).toBe(3)
      })

      describe('renders no words in each wordlist', () => {
        console.log('Here?!')
        
        console.log(renderedWordLists.debug())
        expect(firstWordList.length).toBe(3)
      })
    })
  })
})