import React from "react";
import logo from "../Login/Logo2.png";
import NotifPic from "./Notif.png";
import ProfPic from "./ProfPic.png";
import searchicon from "./searchicon.png"
import headercss from "./Header.module.css";

function Header(){
    return(
        <div className = {headercss.HeaderContainer}>
            <div>
                <img className ={headercss.notifpic} src={NotifPic} alt="NotifPic"></img>
                <img className ={headercss.profpic} src ={ProfPic} alt ="ProfPic"></img>
                <input className ={headercss.sbar} type ="text" placeholder="Search"></input>
                <img className ={headercss.searchicon} src ={searchicon} alt="Search Icon"></img>
                <h1> Company Text Header </h1>
                <h2> Company Text Sub-Header</h2>
            </div>
            <div className ={headercss.logocontainer}>
                <img className = {headercss.logoimg} src = {logo} alt = "A logo"></img>
            </div>
        </div>
    )
}

export default Header;