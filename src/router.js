import React from "react"
import { render } from "react-dom"
import { Router, Link, Redirect } from "@reach/router"
import './index.css'
// import FlexGrid from './routes/FlexGrid';
// import FlexLayout from './routes/FlexLayout';
// import Layout from './routes/Layout';
// import Circles from './routes/Circles';
const SelectableArea = React.lazy(() =>  import('./routes/SelectableArea'))
const TextWithComplexState = React.lazy(() =>  import('./routes/TextWithComplexState'))
const WordLists = React.lazy(() =>  import('./routes/WordLists'))
const CombineContexted = React.lazy(() =>  import('./routes/Combine/ContextWrapper'))
const CombineTwoContexted = React.lazy(() =>  import('./routes/CombineTwo/ContextWrapper'))
const CombineThreeContexted = React.lazy(() =>  import('./routes/CombineThree/ContextWrapper'))
const CombineFourContexted = React.lazy(() =>  import('./routes/CombineFour/ContextWrapper'))
const CombineFiveContexted = React.lazy(() =>  import('./routes/CombineFive/ContextWrapper'))
const MultiWordSelector = React.lazy(() =>  import('./routes/MultiWordSelector/ContextWrapper'))
const Circles = React.lazy(() =>  import('./routes/Circles'))
const Layout = React.lazy(() =>  import('./routes/Layout'))
const FlexLayout = React.lazy(() =>  import('./routes/FlexLayout'))
const FlexGrid = React.lazy(() =>  import('./routes/FlexGrid'))
const Together = React.lazy(() =>  import('./routes/Together/ContextWrapper'))

let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

const ThisRouter = () => {
  let [themeClass, setThemeClass] = React.useState('dark'); //light

  return(
    <React.Suspense fallback={<div>loading...</div>}>
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
    </React.Suspense>
  )
} 

export default ThisRouter