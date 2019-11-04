import React from "react"
import { render } from "react-dom"
import { Router, Link, Redirect } from "@reach/router"
import SelectableArea from './routes/SelectableArea'
import TextWithComplexState from './routes/TextWithComplexState'
import WordLists from './routes/WordLists'
import CombineContexted from './routes/Combine/ContextWrapper'
import CombineTwoContexted from './routes/CombineTwo/ContextWrapper'
import CombineThreeContexted from './routes/CombineThree/ContextWrapper'
import CombineFourContexted from './routes/CombineFour/ContextWrapper'
import MultiWordSelector from './routes/MultiWordSelector/ContextWrapper'
import Circles from './routes/Circles'
import Layout from './routes/Layout'
import FlexLayout from './routes/FlexLayout'
import FlexGrid from './routes/FlexGrid'
let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

const mockCircleData = [
  {
    "size": 9,
    "occurances": 16
  },
  {
    "size": 8,
    "occurances": 22
  },
  {
    "size": 7,
    "occurances": 32
  },
  {
    "size": 6,
    "occurances": 30
  },
  {
    "size": 5,
    "occurances": 39
  },
  {
    "size": 4,
    "occurances": 51
  },
  {
    "size": 3,
    "occurances": 90
  },
  {
    "size": 2,
    "occurances": 50
  }
]

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
      <CombineFourContexted path="combineFour"/>  
      <MultiWordSelector path="multiWord"/>  
      <Circles path="circles"/>  
      <Layout path="layout"/>  
      <FlexLayout path="flex"/>  
      <FlexGrid path="flexgrid"/>  

      <Redirect from="/*" to="/combine"/>
    </Router>
  )
} 

export default ThisRouter