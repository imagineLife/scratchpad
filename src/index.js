import React from "react"
import ReactDOM from "react-dom"
import pngImage from './static/say-what.png'
import Router from './router'
import './index.css'
const App = () => {
	return(<Router />)
}

ReactDOM.render(<App />, document.getElementById("app"));