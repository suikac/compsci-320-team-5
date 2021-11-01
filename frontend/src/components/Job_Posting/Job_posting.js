import React, {Component} from "react";
import styles from "./Job_posting.module.css"

class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {titile: "", salary: "", minYearsExperience: "", managerId: "", tags:"",description:""}
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
            <div className = {styles.container}>
                <div className = {styles.jobTitleContainer}>
                    <input
                        type="title"
                        className = {styles.jobTitleText}
                        value = {this.state.titile}
                        onChange={this.handleCredentialsChange}
                        placeholder = "enter job title"
                    />
                </div>
                <div className = {styles.salaryContainer}>
                    <input
                        className = {styles.salaryText}
                        type="salary"
                        value = {this.state.salary}
                        onChange={this.handleCredentialsChange}
                        placeholder = "enter job salary"
                    />
                </div>
                <div className = {styles.minYearofExpContainer}>
                    <input
                        className={styles.minYearofExpText}
                        type="minYearsExperience"
                        value = {this.state.minYearsExperience}
                        onChange={this.handleCredentialsChange}
                        placeholder = "enter job minimum year of Experience"
                    />
                </div>
                <div className = {styles.tagSearchBarContainer}>
                    <textarea
                        type="tags"
                        className = {styles.tagSearchBarText}
                        value = {this.state.tags}
                        onChange={this.handleCredentialsChange}
                        placeholder = "choose job required tags"
                    />
                </div>
                <button 
                type ="button"
                onClick = {this.submit_credentials}
                className = {styles.createButton}>Create Job
                </button>
                <div className = {styles.DescriptionContainer}>
                    <textarea
                        className = {styles.DescriptionText}
                        type="description"
                        value = {this.state.description}
                        onChange={this.handleCredentialsChange}
                        placeholder = "enter the job description"
                    />
                </div>
            </div>
        );
    }
    async submit_credentials() {
    }
}

export default CreateJobPosting