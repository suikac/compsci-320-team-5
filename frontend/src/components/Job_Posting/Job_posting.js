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

    }
}

export default CreateJobPosting