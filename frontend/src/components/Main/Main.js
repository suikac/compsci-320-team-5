import React from "react";
import maincss from "./Main.module.css";

function Main(){
    return(
        <div className = {maincss.MainContainer}>
            <input type="submit" value="REFER" class="refer-button" />
            <h1 class = "rec"> RECOMMENDED</h1>
            <div className = {maincss.MainJobContainer}>
                <h1 class = "jobTitle"> Job Title</h1>
                <h1 class = "managerInfo"> Manager Info</h1>
                <h1 class = "tags"> Tags</h1>
            </div>
        </div>
    )
}

export default Main;