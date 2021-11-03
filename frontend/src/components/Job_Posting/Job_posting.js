import React, {Component} from "react";
import styles from "./Job_posting.module.css"
import { apiPost } from "../../utils/api-fetch"

class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {title: "", salary: "", minYearsExperience: "", tags:"",description:""}
        this.defaulttags = ['Git','MySQL','React','Kotlin','Kafka']
        this.submit_credentials = this.submit_credentials.bind(this);
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this)
    }

    handleCredentialsChange(event) {
        const type = event.target.name
        this.setState({
            [type]: event.target.value
        })
    }

    render(){
        return(
            <form>
                <h2> Job Creating
                    <div className = {styles.jobTitleContainer}>
                        <input
                            name='title'
                            type="text"
                            value = {this.state.title}
                            className = {styles.jobTitleText}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter job title"
                        />
                    </div>
                    <div className = {styles.salaryContainer}>
                        <input
                            name = 'salary'
                            type = 'number'
                            className = {styles.salaryText}
                            value = {this.state.salary}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter job salary"
                        />
                    </div>
                    <div className = {styles.minYearofExpContainer}>
                        <input
                            name = 'minYearsExperience'
                            type = 'number'
                            className={styles.minYearofExpText}
                            value = {this.state.minYearsExperience}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter job minimum year of Experience"
                        />
                    </div>
                    <div className = {styles.tagSearchBarContainer}>
                        <textarea
                            type='text'
                            name= 'tags'
                            className = {styles.tagSearchBarText}
                            value = {this.state.tags}
                            onChange={this.handleCredentialsChange}
                            placeholder = "choose job required tags"
                        />
                    </div>
                    <button
                    type ="button"
                    onClick = {this.submit_credentials}
                    className = {styles.createButton}>Create</button>
                    <div className = {styles.DescriptionContainer}>
                        <textarea
                            type= 'text'
                            name = 'description'
                            className = {styles.DescriptionText}
                            value = {this.state.description}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter the job description"
                        />
                    </div>
                </h2>
            </form>
        );
    }
    async submit_credentials() {
        console.log(this.state)
        const payload = {
            tags:this.state.tags.split(" "),
            title:this.state.title,
            minYearExperience:this.state.minYearsExperience,
            description:this.state.description,
            salary:this.state.salary
        }
        const response = await apiPost('/position/createPosition', payload)
    }
}

export default CreateJobPosting
