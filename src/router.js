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
import CombineFiveContexted from './routes/CombineFive/ContextWrapper'
import MultiWordSelector from './routes/MultiWordSelector/ContextWrapper'
import Circles from './routes/Circles'
import Layout from './routes/Layout'
import FlexLayout from './routes/FlexLayout'
import FlexGrid from './routes/FlexGrid'
import Together from './routes/Together/ContextWrapper'
import './index.css'

let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

const ThisRouter = () => {
  let [themeClass, setThemeClass] = React.useState('dark'); //light

  return(
    <div id="parent-div" className={`${themeClass}`}>
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
        <CombineFiveContexted path="combineFive"/>  
        <MultiWordSelector path="multiWord"/>  
        <Circles path="circles"/>  
        <Layout path="layout"/>  
        <FlexLayout path="flex"/>  
        <FlexGrid path="flexgrid"/>
        <Together path="together"/>  
        <Redirect from="/*" to="/"/>
      </Router>
    </div>
  )
} 

export default ThisRouter