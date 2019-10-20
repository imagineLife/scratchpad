import React from "react"
import { render } from "react-dom"
import { Router, Link, Redirect } from "@reach/router"
import SelectableArea from './routes/SelectableArea'
import TextWithComplexState from './routes/TextWithComplexState'
import WordLists from './routes/WordLists'
import CombineContexted from './routes/Combine/ContextWrapper'
import CombineTwoContexted from './routes/CombineTwo/ContextWrapper'
import CombineThreeContexted from './routes/CombineThree/ContextWrapper'
// CombineThreeContexted + multi-word-selection component
import MultiWordSelector from './routes/MultiWordSelector/ContextWrapper'
import Circles from './routes/Circles'
let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

const ThisRouter = () => {
  return(
    <Router>
      <Home path="/" />
      <Dash path="dashboard" />
      <SelectableArea path="selectable" areaVars={{
      	w: 700,
      	h: 100
      }}/>
      <TextWithComplexState path="complexText"/>  
      <WordLists path="wordLists" />
      <CombineContexted path="combine"/>  
      <CombineTwoContexted path="combineTwo"/>  
      <CombineThreeContexted path="combineThree"/>  
      <MultiWordSelector path="multiWord"/>  
      <Circles path="circles"/>  
      <Redirect from="/*" to="/combine"/>
    </Router>
  )
} 

export default ThisRouter