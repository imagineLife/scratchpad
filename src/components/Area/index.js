import React, { useState, useContext } from 'react';
import './index.css';
import * as scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as arr from 'd3-array';
import { TextAreaContext } from '../../Contexts/TextArea';

const Area = ({ dims, hoverLine }) => {
  const { sentences, selectedAreaArr, maxWordsPerSentence } = useContext(TextAreaContext);
  const [curSentence, setCurSentence] = useState(null);
  const [curSentenceObj, setCurSentenceObj] = useState(null);
  // sanity checking
  if (!sentences || !selectedAreaArr || !dims) {
    return <p>loading area...</p>;
  }

  const howManySentences = selectedAreaArr[1] - selectedAreaArr[0];
  const xScale = scale.scaleLinear()
    .domain([0, howManySentences])
    .range([0, dims.width]);

  const selectedSentences = sentences.reduce((acc, curVal, curIdx) => {
    if (curIdx >= selectedAreaArr[0] && curIdx <= selectedAreaArr[1]) {
      return acc.concat(curVal);
    }
    return acc;
  }, []);

  const yScale = scale.scaleLinear()
    .domain([0, maxWordsPerSentence])// arr.max(selectedSentences, d => d.wordCount)])
    .range([dims.height, 0]);

  // build areaFn
  const areaFn = d3Shape.area()
    .x((d, i) => xScale(i))
    .y0(yScale(0))
    .y1((d) => yScale(d.wordCount));
  // .curve(d3Shape.curveCatmullRom)

  const pathD = areaFn(selectedSentences);

  // mousedOver && mouseMove
  const moused = (d) => {
    const areaSVG = document.getElementsByClassName('area-svg')[0];

    // $FlowSVGBug
    const areaSVGXOffset = areaSVG.getBoundingClientRect().x;

    const xPos = d.pageX - areaSVGXOffset;

    if (xPos > xScale.range()[0]) {
      const sentenceNumber = Math.ceil(xScale.invert(xPos)) + selectedAreaArr[0];

      if (sentenceNumber > -1) {
      	setCurSentenceObj(sentences[sentenceNumber - 1]);
        setCurSentence(sentences[sentenceNumber - 1].text);
      }
    }
  };

  const stoppedMoving = () => setCurSentence(null);

  /*
    Hover-line
  */
  const optHoverLine = !hoverLine
    || sentenceNumber < 0
    || !sentenceNumber
    || sentenceNumber > xScale.domain()[1]
    || !showLine ? null : (
      <line
        pointerEvents="none"
        strokeWidth="1"
        stroke="rgb(150,150,150)"
        strokeDasharray="5 15"
        x1={xScale(sentenceNumber) - xOffset}
        x2={xScale(sentenceNumber) - xOffset}
        y1={yScale(0)}
        y2={yScale(Math.max(...remappedData.map((d) => d.y)) * 1.05)}
      />
    );


  /*
    Hover-circle
  */
  const hoverCircle = !hoverLine
    || sentenceNumber < 0
    || !sentenceNumber
    || !showLine ? null : (
      <circle
        pointerEvents="none"
        r={8}
        fill="rgba(255,255,255,.3)"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="2 3"
        cx={xScale(sentenceNumber) - xOffset}
        cy={yScale(remappedData[sentenceNumber - 1].y)}
      />
    );

  console.log('curSentenceObj');
  console.log(curSentenceObj);


  return (
    <>
      <svg
        id="area"
        style={dims}
        className="area-svg"
        onMouseOver={moused}
        onMouseMove={moused}
        onMouseOut={stoppedMoving}
      >
        <defs>
          <linearGradient id="areaGradient" gradientTransform="rotate(90)">
            <stop offset="1%" stopColor="rgb(147,147,147)" />
            <stop offset="95%" stopColor="rgba(147,147,147,.05)" />
          </linearGradient>
        </defs>
        {/* Area Path */}
        <path
          d={pathD}
          fill="rgba(147,147,147,.25)"
        />
      </svg>
      <div className="explanation-wrapper">
        <p className="explanatory-text">
          {!curSentence && `Hover over this area chart to highlight the sentence 
						that was spoken at the specific point in time during the 
						president’s address.  HOVER`}
          {curSentence && curSentence}
        </p>
      </div>
    </>
  );
};

export default Area;
