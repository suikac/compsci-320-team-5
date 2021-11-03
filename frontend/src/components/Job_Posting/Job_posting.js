import React, {Component} from "react";
import styles from "./Job_posting.module.css"
import { apiPost } from "../../utils/api-fetch"
import{JobCreateSuccessedPopUp,JobCreateFailedPopUp} from "./Job_postingPopUp"
import { style } from "dom-helpers";

class CreateJobPosting extends Component{
    constructor(props) {
        super(props)
        this.state = {title: "", salary: "", minYearsExperience: "", tags:"",
        description:"",createJobSuccess:false}
        this.defaulttags = ['Git','MySQL','React','Kotlin','Kafka']
        this.submit_credentials = this.submit_credentials.bind(this)
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
                        >
                        </input>
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
                    <div className = {styles.DescriptionContainer}>
                        <textarea required
                            type= 'text'
                            name = 'description'
                            className = {styles.DescriptionText}
                            value = {this.state.description}
                            onChange={this.handleCredentialsChange}
                            placeholder = "enter the job description"
                        />
                    </div>
                    <JobCreateSuccessedPopUp trigger = {this.state.createJobSuccess}
                    effect = {() => setTimeout(() => this.setState({
                        createJobSuccess: false}), 3000)}>
                    </JobCreateSuccessedPopUp>
                    {/* <JobCreateFailedPopUp trigger = {this.state.createJobFailed}
                    effect = {() => setTimeout(() => this.setState({
                        createJobFailed: false}), 3000)}>
                    </JobCreateFailedPopUp> */}
                </h2>
                {this.state.title != "" && this.state.description !=""?
                            <button 
                            type ="button"
                            onSubmit = {this.submit_credentials}
                            className = {styles.createButton}>Create</button>
                            :
                            <button
                            type = 'button'
                            disabled
                            className = {styles.disabledcreateButton}>Create
                            </button>
                }
            </form>
        );
    }
    async submit_credentials() {
        // if (this.state.title == "" || this.state.description == ""){
        //     this.setState({
        //         createJobFailed: true}
        //     )
        //     return
        // }
        const payload = {
            tags:this.state.tags.split(" "),
            title:this.state.title,
            minYearExperience:this.state.minYearsExperience,
            description:this.state.description,
            salary:this.state.salary
        }
        const response = await apiPost('/createPosition', payload)
        if(response.status == 200){
            this.setState({
                createJobSuccess: true}
            )
        }
    }
}

export default CreateJobPosting