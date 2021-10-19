import React, {Component} from "react"
import Login from "./components/Login/Login";
import Header from "./components/Header/Header.js";
import NavBar from "./components/NavBar/navBar.js";
import Footer from "./components/Footer/Footer.js";
import Main from "./components/Main/Main.js";
import "./App.css"

function App(){
  return(
    <div>
      <Header/>
      <NavBar/>
      <Main/>
      <Footer/>
    </div>
  )
}
export default App