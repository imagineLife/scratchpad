import React from "react"
import { render } from "react-dom"
import { Router, Link } from "@reach/router"
import SelectableArea from './routes/SelectableArea'
import TextAndSelection from './routes/TextAndSelection'
import WordLists from './routes/WordLists'

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
      <TextAndSelection path="text"/>  
      <WordLists path="wordLists" />  
    </Router>
  )
} 

export default ThisRouter