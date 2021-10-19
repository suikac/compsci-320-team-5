import React, {Component} from "react";
import Header from "./components/Header/Header.js";
import NavBar from "./components/NavBar/NavBar.js";
import Footer from "./components/Footer/Footer.js";
import Main_Mailbox from "./components/Main_Mailbox/main_mailbox.js";
import "./App.css"
{/*import Login from "./components/Login/Login.js"*/}

function App(){
  return(
    <div>
      {/*<Login/>*/}
      <Header/>
      <NavBar/>
      <Main_Mailbox/>
      <Footer/>
    </div>
  )
}
export default App