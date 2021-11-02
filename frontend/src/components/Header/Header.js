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
                <div className ={headercss.profpic}>
                    <div class="dropdown">
                        <a href="#" id="imageDropdown" data-toggle="dropdown">
                            <img src= {ProfPic}></img>
                        </a>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="imageDropdown">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Menu item 1</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Menu item 2</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Menu item 3</a></li>
                        <li role="presentation" class="divider"></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Menu item 4</a></li>
                    </ul>
                    </div>
                </div>
                <h1> Insert Company logo here from the backend </h1>
            </div>
            <div className ={headercss.logocontainer}>
                <img className = {headercss.logoimg} src = {logo} alt = "A logo"></img>
            </div>

        </div>
    )
}

export default Header;
