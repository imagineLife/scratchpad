import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import Area from './Area';

// state
import { TextAreaContext } from '../../Contexts/TextArea';
import { AreaContext } from './State/Context';

/*
    const {
    sentences,
    selectedAreaArr,
    maxWordsPerSentence
  } = useContext(TextAreaContext);

  const {
    dims,
    hoverLine,
    curSentence,
    moused,
    offsetSentenceNumber,
    showLine,
    stoppedMoving
  } = useContext(AreaContext);
*/
describe('<Area/>', () => {
  const mousedFn = jest.fn()
  const textAreaState = {
    sentences: null,
    selectedAreaArr: [],
    maxWordsPerSentence: null
  }

  const areaState = {
    dims: null,
    hoverLine: null,
    curSentence: null,
    moused: mousedFn,
    offsetSentenceNumber: null,
    showLine: null,
    stoppedMoving: null
  }

  const compNoProps = mount(
    <TextAreaContext.Provider value={textAreaState}>
      <AreaContext.Provider value={areaState}>
        <Area />
      </AreaContext.Provider>
    </TextAreaContext.Provider>
  );
  it('matches snapshot', () => {
    expect(toJson(compNoProps)).toMatchSnapshot();
  });

  it('shows "loading area..." with no data', () => {
    expect(compNoProps.find('p').text()).toBe('loading area...')
  });
});
