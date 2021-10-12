import React from "react"
import NavBarcss from "./NavBar.module.css";

function NavBar(){
    return(
            <ul className={NavBarcss.NavBarContainer}>
                <li><a href ="#">HOME</a></li>
                <li><a href ="#">REFER</a></li>
                <li><a href ="#">MAILBOX</a></li>
                <li><a href ="#">PREVIOUS REF</a></li>
                <li><a href ="#">EXPLORE</a></li>
            </ul>
    )
}

export default NavBar;