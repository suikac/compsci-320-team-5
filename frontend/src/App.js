import React, {Component} from "react"
import Login from "./Login/Login"
import "./App.css"

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