import React, {Component} from "react"
import Login from "./components/Login/Login";
import Header from "./components/Header/Header.js";
import NavBar from "./components/NavBar/NavBar.js";
import Footer from "./components/Footer/Footer.js";
import "./App.css"

function App(){
  return(
    <div>
      <Login/>
      <Header/>
      <NavBar/>
      {/*<Main/>*/}
      <Footer/>
    </div>
  )
}
export default App