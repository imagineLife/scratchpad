import React from "react"
import ReactDOM from "react-dom"
import Router from './router'
import './index.css'

if(document){
	ReactDOM.render(<Router />, document.getElementById("app"));
}