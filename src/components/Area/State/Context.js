import React, { createContext, useState, useContext } from 'react';
import { TextAreaContext } from '../../../Contexts/TextArea';

const AreaContext = createContext();

const { Provider } = AreaContext;

const AreaProvider = ({ children, dims, hoverLine }) => {
  const { selectedAreaArr, sentences } = useContext(TextAreaContext);

  const [curSentence, setCurSentence] = useState(null);
  const [curSentenceObj, setCurSentenceObj] = useState(null);
  const [sentenceNumber, setSentenceNumber] = useState(null);
  const [xOffset, setXOffset] = useState(null);
  const [showLine, setShowLine] = useState(null);
  const [offestSentenceNumber, setOffsetSentenceNumber] = useState(null);

  const stoppedMoving = () => {
  	setCurSentence(null);
  	setSentenceNumber(null);
    setOffsetSentenceNumber(null);
  	setShowLine(false);
  };

  // mousedOver && mouseMove
  const moused = (d, xScale) => {
    const areaSVG = document.getElementsByClassName('area-svg')[0];

    // $FlowSVGBug
    const areaSVGXOffset = areaSVG.getBoundingClientRect().x;

    const xPos = d.pageX - areaSVGXOffset;

    if (xPos >= (xScale.range()[0] - 5)) {
      const thisSentence = Math.ceil(xScale.invert(xPos)) + selectedAreaArr[0];
      const sentenceWOffset = thisSentence - selectedAreaArr[0];
      if (thisSentence > -1) {
      	setCurSentenceObj(sentences[thisSentence]);
        setCurSentence(sentences[thisSentence].text);
        setSentenceNumber(thisSentence);
        setOffsetSentenceNumber(sentenceWOffset);
        setShowLine(true);
        setXOffset(areaSVGXOffset);
      }
    }
  };

  return (
    <Provider value={{
      dims,
      hoverLine,
      curSentence,
      curSentenceObj,
      moused,
      offestSentenceNumber,
      setCurSentence,
      setCurSentenceObj,
      sentenceNumber,
      setSentenceNumber,
      setXOffset,
      showLine,
      setShowLine,
      setOffsetSentenceNumber,
      stoppedMoving,
      xOffset,
    }}
    >
      {children}
    </Provider>
  );
};
export { AreaContext, AreaProvider };
