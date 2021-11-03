import React, {Component} from "react"
import "./email_bar.module.css"
import TrashPic from "./TrashPic.png"
import email_barcss from "./email_bar.module.css";

function Email_Bar() {
    return (
        <button className={email_barcss.Email_Bar}>
            <input type="checkbox" id="?" name="?" value="?"></input>
            <button class="button"><img src={TrashPic} alt="TrashPic"></img></button>
            <a> Title... </a>
            <a> Description... </a>
        </button>
    );
}

export default Email_Bar