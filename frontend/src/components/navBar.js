import React from "react";
import "./components-style/navBar.module.css";

function navBar(){
    return(
        <div className = "navBar">
            <ul>
                <li><a>Home</a></li>
                <li><a>Refer</a></li>
                <li><a>Mailbox</a></li>
                <li><a>Previous Referrals</a></li>
                <li><a>Explore</a></li>
            </ul>
        </div>
    )
}

export default navBar;