import React from "react"
import "./email_bar.module.css"
import TrashPic from "./TrashPic.png"
import email_barcss from "./email_bar.module.css";

function Email_Bar(props) {
  console.log(props.referrer)
  return (
    <div className = {email_barcss.email_bar_container}>
      <button className={email_barcss.Email_Bar}>
        <input type="checkbox" id="?" name="?" value="?"></input>
        <button class="button"><img src={TrashPic} alt="TrashPic"></img></button>
        <a> {props.job} </a>
        <a> {props.referrer + ' refers ' +
        props.referee} </a>
      </button>
    </div>
  );
}

export default Email_Bar
