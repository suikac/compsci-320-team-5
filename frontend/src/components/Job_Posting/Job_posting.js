import React, {Component} from "react";
import styles from "./Job_posting.module.css"

class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {titile: "", salary: 0, minYearsExperience: 0, managerId: 0, tags:[],description:""}
        this.defaulttags = ['Git','MySQL','React','Kotlin','Kafka']
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
            <div className={styles.container}>
                <h1>
                    <div className = {styles.jobTitle}>
                        <input
                            type="title"
                            value = {this.state.titile}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter job title"
                        />
                    </div>
                    <div className = {styles.salary}>
                        <input
                            type="salary"
                            value = {this.state.salary}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter job salary"
                        />
                    </div>
                    <div className = {styles.minYearofExp}>
                        <input
                            type="minYearsExperience"
                            value = {this.state.minYearsExperience}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter job minimum year of Experience"
                        />
                    </div>
                    <div className = {styles.DescriptionBox}>
                        <input
                            type="description"
                            value = {this.state.description}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter the job description"
                        />
                    </div>
                    <button type ="button"
                    onClick = {this.submit_credentials}
                    className = {styles.createButton}>Create Job
                    </button>
                </h1>
            </div>
        );
    }
    async submit_credentials() {
    }
}

export default CreateJobPosting