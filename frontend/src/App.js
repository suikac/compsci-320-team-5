import React, {Component} from "react"
import Login from "./Login"
import "./App.css"
import navBar from "./components/navBar"

function App(){
  return(
    <div>
      <Login/>
      <Header/>
      <navBar/>
      <Main/>
      <Footer/>
    </div>
  )
}
export default App