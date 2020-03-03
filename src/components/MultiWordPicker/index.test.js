import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CommonWords from '.';

// State
import { WordListContext } from '../../Contexts/CommonWords';

// Mock Data
import mockWordLists from '../../__mocks__/wordLists.json';
import displayText from '../../__mocks__/displayText.js';

const mockProps = {
  // wordLists: mockWordLists,
  wordListNames: ['Common Words', 'Longest Words', 'Action Words'],
  selectedWord: null,
  wordListFocus: 'Common Words',
};

describe('<MultiWordPicker />', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();
  const mockFn4 = jest.fn();

  const theseProps = {
    ...mockProps,
    sortByWordAlpha: mockFn3,
    setSelectedWord: mockFn2,
    makeCommonWords: mockFn1,
    selectWordList: mockFn4,
  };

  const wrapper = mount(
    <WordListContext.Provider
      value={{ ...theseProps }}
    >
      <CommonWords />
    </WordListContext.Provider>,
  );
  it('matches snap', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handles no wordLists', () => {
  	const pTag = wrapper.find('p').text();
  	expect(pTag).toBe('Missing Word Lists');
  });

  describe('handles props', () => {
  	const thisWrapper = mount(
    <WordListContext.Provider
        value={{ ...theseProps, wordLists: mockWordLists }}
      >
        <CommonWords />
      </WordListContext.Provider>,
    );

    it('builds word-lists from "wordListNames" prop', () => {
    	const wlChoices = thisWrapper.find('#word-lists');
    	const listItems = wlChoices.find('ListItem');
    	expect(listItems).toHaveLength(3);
    });
  });
});
