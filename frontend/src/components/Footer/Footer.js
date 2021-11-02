import React from "react"
import Footercss from "./Footer.module.css";

function Footer(){
    return(
        <div className ={Footercss.row}>
            <div className={Footercss.TopInfo}>
                <h2>About our referral process</h2>
                <h3>Info for process sub-text</h3>
                <p>Border only for showing the fact that it is two column</p>
            </div>
            <div className={Footercss.column}>
                <h4>Column 1</h4>
                <p>Some Text...</p>
            </div>
            <div className={Footercss.column}>
                <h4>Column 2</h4>
                <p>Some Text...</p>
            </div>
        </div>
    )
}

export default Footer