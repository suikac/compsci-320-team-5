import React, { Component } from "react";
import Footer from "../Footer/Footer";
import maincss from "./main_home.module.css";

class Main_Home extends Component{

  constructor(props) {
    super(props)
    this.state = {jobTitle: "", tags: "", managerInfo: ""}
  
}
  render(){
    return(
        <div className = {maincss.MainContainer}>
            <h1 class = "rec"> RECOMMENDED</h1>
            <div className = {maincss.MainJobContainer}>
                <h1 class = "jobTitle"> Job Title</h1>
                <h1 class = "managerInfo"> Manager Info</h1>
                <h1 class = "tags"> Tags</h1>
                <div className = {maincss.refButton}>
                  <input type="submit" value="REFER" class="refer-button" />
                </div>
            </div>
            <Footer />
        </div>
    )
  }
}

export default Main_Home