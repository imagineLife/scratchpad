import React from "react"
import { render } from "react-dom"
import { Router, Link, Redirect } from "@reach/router"
import './index.css'
const Together = React.lazy(() =>  import('./routes/Together/ContextWrapper'))

const ThisRouter = () => {
  let [themeClass, setThemeClass] = React.useState('dark'); //light

  return(
    <React.Suspense fallback={<div>loading...</div>}>
        <div id="parent-div" className={`${themeClass}`}>
          <Router>
            <Together path="/"/>  
            <Redirect from="/*" to="/" noThrow/>
          </Router>
        </div>
    </React.Suspense>
  )
} 

export default ThisRouter