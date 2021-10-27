import React, {Component} from "react";
import logo from "./Logo2.png";
import styles from "./Job_posting.module.css"

class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {titile: "", salary: 0, minYearsExperience: 0, managerId: 00, tags:[]}
        defaulttags = ['Git','MySQL','React','Kotlin','Kafka']
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
    }
    
    handleCredentialsChange(event) {
        const type = event.target.type
        this.setState({
            [type]: event.target.value
        })
    }

    render(){
        return(
            <div classNmae = {styles.container}>
                <h1> Job Posting</h1>
                <div className = {styles.pageHeader}>
                    <div className = {styles.logo2} onClick = {()=>console.log("return to main page")}>
                    </div>
                    <div className = {styles.bell} onClick = {()=>console.log("open notification")}>
                    </div>
                    <div className = {styles.avatar} onClick ={()=>console.log("open personal profile")}>
                    </div>
                </div> 
                <h2>
                </h2>
            </div>
        );
    }
}

export default CreateJobPosting