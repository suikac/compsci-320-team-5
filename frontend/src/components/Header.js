import React from "react";
import logo from "./Logo2.png";
import "./components-style/Header.module.css";

function Header(){
    return (
        <div className = "Header">
            <input className = "searchBar" type = "text" placeholder = "Search..."></input>
            <img className = "teamLogo" src = {logo} alt = "Our Team Logo"></img>
        </div>
    )
}

export default Header;